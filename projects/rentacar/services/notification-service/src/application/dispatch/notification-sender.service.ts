import { Injectable, Logger } from '@nestjs/common';
import { DeliveryStatus, NotificationChannel } from '@prisma/notification-client';
import { NotificationConfigService } from '../../config/notification-config.service';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@Injectable()
export class NotificationSenderService {
  private readonly logger = new Logger(NotificationSenderService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: NotificationConfigService,
  ) {}

  async sendDelivery(deliveryId: string) {
    const delivery = await this.prisma.notificationDelivery.findUnique({
      where: { id: deliveryId },
    });
    if (!delivery || delivery.status === DeliveryStatus.sent) return delivery;

    const recipient =
      delivery.recipient ?? this.config.env.NOTIFICATION_DEFAULT_EMAIL ?? 'noreply@rentacar.local';

    if (!this.config.env.NOTIFICATION_SEND_ENABLED) {
      this.logger.debug(
        `[stub] ${delivery.channel} → ${recipient}: ${delivery.subject}`,
      );
      return this.prisma.notificationDelivery.update({
        where: { id: deliveryId },
        data: {
          status: DeliveryStatus.skipped,
          recipient,
          sentAt: new Date(),
        },
      });
    }

    try {
      if (delivery.channel === NotificationChannel.email) {
        await this.sendEmailStub(recipient, delivery.subject, delivery.body);
      } else if (delivery.channel === NotificationChannel.sms) {
        await this.sendSmsStub(recipient, delivery.body);
      } else {
        this.logger.log(`[in_app] ${delivery.subject}`);
      }

      return this.prisma.notificationDelivery.update({
        where: { id: deliveryId },
        data: { status: DeliveryStatus.sent, recipient, sentAt: new Date() },
      });
    } catch (error) {
      return this.prisma.notificationDelivery.update({
        where: { id: deliveryId },
        data: {
          status: DeliveryStatus.failed,
          recipient,
          error: String(error),
        },
      });
    }
  }

  private async sendEmailStub(to: string, subject: string, body: string) {
    this.logger.log(`[email stub] to=${to} subject="${subject}" len=${body.length}`);
  }

  private async sendSmsStub(to: string, body: string) {
    this.logger.log(`[sms stub] to=${to} body="${body.slice(0, 80)}..."`);
  }
}
