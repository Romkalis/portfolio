import { Injectable, Logger } from '@nestjs/common';
import { DomainEventType } from '@rentacar/shared-types';
import { internalApiKeyHeaders } from '@rentacar/shared-utils';

@Injectable()
export class BookingEventsService {
  private readonly logger = new Logger(BookingEventsService.name);

  private get notificationUrl() {
    return process.env.NOTIFICATION_SERVICE_URL ?? 'http://localhost:3009';
  }

  async publish(
    type: DomainEventType,
    aggregateId: string,
    payload: Record<string, unknown>,
  ) {
    try {
      const response = await fetch(`${this.notificationUrl}/api/v1/notifications/events/publish`, {
        method: 'POST',
        headers: internalApiKeyHeaders(),
        body: JSON.stringify({
          type,
          aggregateId,
          aggregateType: 'Booking',
          payload,
        }),
      });

      if (!response.ok) {
        this.logger.warn(`Event publish HTTP ${response.status} for ${type}`);
      }
    } catch (error) {
      this.logger.warn(`Event publish failed for ${type}: ${String(error)}`);
    }
  }
}
