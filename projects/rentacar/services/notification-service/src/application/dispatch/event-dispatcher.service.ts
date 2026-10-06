import { Injectable, Logger } from '@nestjs/common';
import { NotificationLogStatus } from '@prisma/notification-client';
import { DomainEvent } from '@rentacar/shared-types';
import { NotificationConfigService } from '../../config/notification-config.service';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { TemplateRendererService } from '../templates/template-renderer.service';
import { NotificationSenderService } from './notification-sender.service';

@Injectable()
export class EventDispatcherService {
  private readonly logger = new Logger(EventDispatcherService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: NotificationConfigService,
    private readonly renderer: TemplateRendererService,
    private readonly sender: NotificationSenderService,
  ) {}

  async dispatch(event: DomainEvent) {
    const existing = await this.prisma.notificationLog.findUnique({
      where: { eventId: event.id },
    });
    if (existing) {
      this.logger.debug(`Duplicate event ${event.id}, skipping`);
      return existing;
    }

    const log = await this.prisma.notificationLog.create({
      data: {
        eventId: event.id,
        eventType: event.type,
        aggregateId: event.aggregateId,
        aggregateType: event.aggregateType,
        payload: event.payload as object,
        status: NotificationLogStatus.received,
      },
    });

    try {
      const locale = this.config.env.NOTIFICATION_DEFAULT_LOCALE;
      const templates = await this.prisma.notificationTemplate.findMany({
        where: { eventType: event.type, isActive: true, locale },
      });

      const context = this.renderer.buildContext({
        id: event.id,
        type: event.type,
        aggregateId: event.aggregateId,
        aggregateType: event.aggregateType,
        payload: event.payload as Record<string, unknown>,
        occurredAt: event.occurredAt,
      });

      const recipient =
        (event.payload as Record<string, unknown>).email?.toString() ??
        this.config.env.NOTIFICATION_DEFAULT_EMAIL;

      for (const template of templates) {
        const delivery = await this.prisma.notificationDelivery.create({
          data: {
            logId: log.id,
            channel: template.channel,
            locale: template.locale,
            recipient: recipient ?? null,
            subject: this.renderer.render(template.subject, context),
            body: this.renderer.render(template.body, context),
          },
        });
        await this.sender.sendDelivery(delivery.id);
      }

      return this.prisma.notificationLog.update({
        where: { id: log.id },
        data: { status: NotificationLogStatus.processed, processedAt: new Date() },
        include: { deliveries: true },
      });
    } catch (error) {
      await this.prisma.notificationLog.update({
        where: { id: log.id },
        data: { status: NotificationLogStatus.failed, error: String(error) },
      });
      throw error;
    }
  }
}
