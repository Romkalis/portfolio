import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { WebhookSecretGuard } from './webhook-secret.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from '../../application/payments/payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreateRefundDto } from './dto/create-refund.dto';
import { ListPaymentsQueryDto } from './dto/list-payments-query.dto';
import { ProviderWebhookDto } from './dto/provider-webhook.dto';

@ApiTags('payments')
@Controller({ path: 'payments', version: '1' })
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create payment and provider intent' })
  create(@Body() dto: CreatePaymentDto) {
    return this.payments.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List payments with filters and pagination' })
  list(@Query() query: ListPaymentsQueryDto) {
    return this.payments.list(query);
  }

  @Get('booking/:bookingId')
  @ApiOperation({ summary: 'Payments for a booking' })
  byBooking(@Param('bookingId') bookingId: string) {
    return this.payments.findByBookingId(bookingId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment by id' })
  findOne(@Param('id') id: string) {
    return this.payments.findById(id);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Mark payment completed (manual/cash/webhook)' })
  complete(@Param('id') id: string) {
    return this.payments.complete(id);
  }

  @Patch(':id/fail')
  @ApiOperation({ summary: 'Mark payment failed' })
  fail(@Param('id') id: string, @Body('reason') reason?: string) {
    return this.payments.markFailed(id, reason);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel pending payment' })
  cancel(@Param('id') id: string, @Body('reason') reason?: string) {
    return this.payments.markCancelled(id, reason);
  }

  @Post(':id/refunds')
  @ApiOperation({ summary: 'Refund payment (full or partial)' })
  refund(@Param('id') id: string, @Body() dto: CreateRefundDto) {
    return this.payments.refund(id, dto);
  }

  @Post('webhooks/stripe')
  @UseGuards(WebhookSecretGuard)
  @ApiOperation({ summary: 'Stripe webhook stub (pass paymentId + status)' })
  stripeWebhook(@Body() dto: ProviderWebhookDto) {
    return this.payments.handleProviderWebhook('stripe', dto);
  }

  @Post('webhooks/paypal')
  @UseGuards(WebhookSecretGuard)
  @ApiOperation({ summary: 'PayPal webhook stub (pass paymentId + status)' })
  paypalWebhook(@Body() dto: ProviderWebhookDto) {
    return this.payments.handleProviderWebhook('paypal', dto);
  }
}
