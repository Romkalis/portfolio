import { PaymentProvider } from '@prisma/payment-client';
import {
  CreatePaymentIntentInput,
  IPaymentProvider,
  PaymentIntentResult,
} from '../../domain/payment/payment-provider.interface';

export class ManualPaymentProvider implements IPaymentProvider {
  readonly name = PaymentProvider.manual;

  async createIntent(input: CreatePaymentIntentInput): Promise<PaymentIntentResult> {
    return {
      externalId: `manual_${input.paymentId}`,
      status: 'pending',
    };
  }
}
