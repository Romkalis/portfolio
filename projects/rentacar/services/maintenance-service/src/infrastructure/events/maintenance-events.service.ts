import { Injectable, Logger } from '@nestjs/common';
import { DomainEventType } from '@rentacar/shared-types';
import { internalApiKeyHeaders } from '@rentacar/shared-utils';

@Injectable()
export class MaintenanceEventsService {
  private readonly logger = new Logger(MaintenanceEventsService.name);

  private get notificationUrl() {
    return process.env.NOTIFICATION_SERVICE_URL ?? 'http://localhost:3009';
  }

  async publishCreated(recordId: string, payload: Record<string, unknown>) {
    try {
      await fetch(`${this.notificationUrl}/api/v1/notifications/events/publish`, {
        method: 'POST',
        headers: internalApiKeyHeaders(),
        body: JSON.stringify({
          type: DomainEventType.MAINTENANCE_CREATED,
          aggregateId: recordId,
          aggregateType: 'MaintenanceRecord',
          payload,
        }),
      });
    } catch (error) {
      this.logger.warn(`MAINTENANCE_CREATED publish failed: ${String(error)}`);
    }
  }
}
