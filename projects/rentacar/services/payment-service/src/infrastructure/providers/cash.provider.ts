import { PaymentProvider } from '@prisma/payment-client';
import {
  CreatePaymentIntentInput,
  IPaymentProvider,
  PaymentIntentResult,
} from '../../domain/payment/payment-provider.interface';

export class CashPaymentProvider implements IPaymentProvider {
  readonly name = PaymentProvider.cash;

  async createIntent(input: CreatePaymentIntentInput): Promise<PaymentIntentResult> {
    return {
      externalId: `cash_${input.paymentId}`,
      status: 'completed',
    };
  }
}
