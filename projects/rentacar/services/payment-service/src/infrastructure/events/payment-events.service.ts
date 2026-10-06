import { Injectable, Logger } from '@nestjs/common';
import { DomainEventType } from '@rentacar/shared-types';
import { internalApiKeyHeaders } from '@rentacar/shared-utils';
import { PaymentConfigService } from '../../config/payment-config.service';

@Injectable()
export class PaymentEventsService {
  private readonly logger = new Logger(PaymentEventsService.name);

  constructor(private readonly config: PaymentConfigService) {}

  async publishPaymentCompleted(
    paymentId: string,
    payload: Record<string, unknown>,
  ) {
    try {
      const response = await fetch(
        `${this.config.notificationServiceUrl}/api/v1/notifications/events/publish`,
        {
          method: 'POST',
          headers: internalApiKeyHeaders(),
          body: JSON.stringify({
            type: DomainEventType.PAYMENT_COMPLETED,
            aggregateId: paymentId,
            aggregateType: 'Payment',
            payload,
          }),
        },
      );

      if (!response.ok) {
        this.logger.warn(`PAYMENT_COMPLETED publish HTTP ${response.status}`);
      }
    } catch (error) {
      this.logger.warn(`PAYMENT_COMPLETED publish failed: ${String(error)}`);
    }
  }
}
