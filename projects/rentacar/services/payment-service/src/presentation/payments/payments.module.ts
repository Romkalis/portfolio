import { Module } from '@nestjs/common';
import { PaymentsService } from '../../application/payments/payments.service';
import { PaymentEventsService } from '../../infrastructure/events/payment-events.service';
import { PaymentProviderRegistry } from '../../infrastructure/providers/payment-provider.registry';
import { PaymentsController } from './payments.controller';
import { WebhookSecretGuard } from './webhook-secret.guard';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentProviderRegistry, PaymentEventsService, WebhookSecretGuard],
})
export class PaymentsModule {}
