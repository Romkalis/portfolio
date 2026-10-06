import { Injectable, Logger } from '@nestjs/common';
import { DomainEventType } from '@rentacar/shared-types';
import { internalApiKeyHeaders } from '@rentacar/shared-utils';
import { CarConfigService } from '../../config/car-config.service';

@Injectable()
export class CarEventsService {
  private readonly logger = new Logger(CarEventsService.name);

  constructor(private readonly config: CarConfigService) {}

  async publishStatusChanged(carId: string, oldStatus: string, newStatus: string) {
    if (oldStatus === newStatus) return;

    try {
      const response = await fetch(
        `${this.config.notificationServiceUrl}/api/v1/notifications/events/publish`,
        {
          method: 'POST',
          headers: internalApiKeyHeaders(),
          body: JSON.stringify({
            type: DomainEventType.CAR_STATUS_CHANGED,
            aggregateId: carId,
            aggregateType: 'Car',
            payload: { carId, oldStatus, newStatus },
          }),
        },
      );

      if (!response.ok) {
        this.logger.warn(`CAR_STATUS_CHANGED publish HTTP ${response.status}`);
      }
    } catch (error) {
      this.logger.warn(`CAR_STATUS_CHANGED publish failed: ${String(error)}`);
    }
  }
}
