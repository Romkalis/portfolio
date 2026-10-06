import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaymentProvider, PaymentStatus, Prisma } from '@prisma/payment-client';
import { PaginatedResult } from '@rentacar/shared-types';
import { PaymentConfigService } from '../../config/payment-config.service';
import { PaymentEventsService } from '../../infrastructure/events/payment-events.service';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { PaymentProviderRegistry } from '../../infrastructure/providers/payment-provider.registry';
import { CreatePaymentDto } from '../../presentation/payments/dto/create-payment.dto';
import { CreateRefundDto } from '../../presentation/payments/dto/create-refund.dto';
import { ListPaymentsQueryDto } from '../../presentation/payments/dto/list-payments-query.dto';
import { ProviderWebhookDto } from '../../presentation/payments/dto/provider-webhook.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly providers: PaymentProviderRegistry,
    private readonly events: PaymentEventsService,
    private readonly config: PaymentConfigService,
  ) {}

  async create(dto: CreatePaymentDto) {
    const payment = await this.prisma.payment.create({
      data: {
        bookingId: dto.bookingId,
        customerId: dto.customerId,
        provider: dto.provider,
        amount: dto.amount,
        currency: dto.currency ?? 'EUR',
        metadata: dto.metadata as Prisma.InputJsonValue | undefined,
      },
    });

    const provider = this.providers.get(dto.provider);
    const intent = await provider.createIntent({
      paymentId: payment.id,
      amount: Number(payment.amount),
      currency: payment.currency,
      bookingId: payment.bookingId ?? undefined,
      customerId: payment.customerId ?? undefined,
      metadata: dto.metadata,
    });

    const status =
      intent.status === 'completed' ? PaymentStatus.completed : PaymentStatus.processing;

    const updated = await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        externalId: intent.externalId,
        status,
        metadata: {
          ...(dto.metadata ?? {}),
          intent,
        } as Prisma.InputJsonValue,
      },
      include: { refunds: true },
    });

    if (status === PaymentStatus.completed) {
      await this.emitCompleted(updated);
    }

    return updated;
  }

  async list(query: ListPaymentsQueryDto): Promise<PaginatedResult<unknown>> {
    const page = query.page ?? 1;
    const limit = Math.min(query.limit ?? 20, 100);
    const skip = (page - 1) * limit;

    const where: Prisma.PaymentWhereInput = {
      bookingId: query.bookingId,
      customerId: query.customerId,
      status: query.status,
      provider: query.provider,
    };

    const [total, data] = await Promise.all([
      this.prisma.payment.count({ where }),
      this.prisma.payment.findMany({
        where,
        include: { refunds: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  async findById(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: { refunds: true },
    });
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async findByBookingId(bookingId: string) {
    return this.prisma.payment.findMany({
      where: { bookingId },
      include: { refunds: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async complete(id: string) {
    const payment = await this.findById(id);
    if (payment.status === PaymentStatus.completed) return payment;
    if (payment.status === PaymentStatus.refunded) {
      throw new BadRequestException('Cannot complete a refunded payment');
    }

    const updated = await this.prisma.payment.update({
      where: { id },
      data: { status: PaymentStatus.completed },
      include: { refunds: true },
    });

    await this.emitCompleted(updated);
    return updated;
  }

  async markFailed(id: string, reason?: string) {
    const payment = await this.findById(id);
    if (
      payment.status === PaymentStatus.completed ||
      payment.status === PaymentStatus.refunded
    ) {
      throw new BadRequestException(`Cannot fail payment in status ${payment.status}`);
    }

    return this.prisma.payment.update({
      where: { id },
      data: {
        status: PaymentStatus.failed,
        metadata: {
          ...(payment.metadata as object),
          failureReason: reason ?? 'manual',
          failedAt: new Date().toISOString(),
        },
      },
      include: { refunds: true },
    });
  }

  async markCancelled(id: string, reason?: string) {
    const payment = await this.findById(id);
    if (payment.status === PaymentStatus.completed) {
      throw new BadRequestException('Cannot cancel a completed payment');
    }

    return this.prisma.payment.update({
      where: { id },
      data: {
        status: PaymentStatus.cancelled,
        metadata: {
          ...(payment.metadata as object),
          cancelReason: reason ?? 'manual',
          cancelledAt: new Date().toISOString(),
        },
      },
      include: { refunds: true },
    });
  }

  async refund(id: string, dto: CreateRefundDto) {
    const payment = await this.findById(id);
    if (payment.status !== PaymentStatus.completed) {
      throw new BadRequestException('Only completed payments can be refunded');
    }

    const refundTotal = payment.refunds.reduce((sum, r) => sum + Number(r.amount), 0);
    if (refundTotal + dto.amount > Number(payment.amount)) {
      throw new BadRequestException('Refund amount exceeds payment total');
    }

    const provider = this.providers.get(payment.provider);
    let externalRefundId: string | undefined;

    if (payment.externalId && provider.refund) {
      externalRefundId = await provider.refund(payment.externalId, dto.amount);
    }

    const refund = await this.prisma.refund.create({
      data: {
        paymentId: id,
        amount: dto.amount,
        reason: dto.reason,
        status: PaymentStatus.completed,
      },
    });

    const isFullRefund = refundTotal + dto.amount >= Number(payment.amount);

    return this.prisma.payment.update({
      where: { id },
      data: {
        status: isFullRefund ? PaymentStatus.refunded : payment.status,
        metadata: {
          ...(payment.metadata as object),
          lastRefundId: refund.id,
          externalRefundId,
        },
      },
      include: { refunds: true },
    });
  }

  async handleProviderWebhook(provider: 'stripe' | 'paypal', dto: ProviderWebhookDto) {
    if (!dto.paymentId && !dto.externalId) {
      throw new BadRequestException('paymentId or externalId required');
    }

    const payment = dto.paymentId
      ? await this.findById(dto.paymentId)
      : await this.prisma.payment.findFirst({
          where: { externalId: dto.externalId, provider },
        });

    if (!payment) throw new NotFoundException('Payment not found for webhook');

    if (dto.status === 'failed') {
      return this.markFailed(payment.id, `webhook:${provider}`);
    }

    if (dto.status === 'completed') {
      return this.complete(payment.id);
    }

    return {
      received: true,
      paymentId: payment.id,
      note: 'Webhook acknowledged; configure provider SDK for automatic status',
      configured: Boolean(
        provider === 'stripe'
          ? this.config.env.STRIPE_WEBHOOK_SECRET
          : this.config.env.PAYPAL_WEBHOOK_ID,
      ),
    };
  }

  private async emitCompleted(payment: {
    id: string;
    bookingId: string | null;
    customerId: string | null;
    amount: Prisma.Decimal;
    currency: string;
    provider: PaymentProvider;
  }) {
    await this.events.publishPaymentCompleted(payment.id, {
      bookingId: payment.bookingId,
      customerId: payment.customerId,
      amount: Number(payment.amount),
      currency: payment.currency,
      provider: payment.provider,
    });
  }
}
