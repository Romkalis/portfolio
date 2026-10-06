import { PaymentProvider } from '@prisma/payment-client';
import {
  CreatePaymentIntentInput,
  IPaymentProvider,
  PaymentIntentResult,
} from '../../domain/payment/payment-provider.interface';

/** PayPal integration stub — wire PAYPAL_CLIENT_ID when ready. */
export class PayPalPaymentProvider implements IPaymentProvider {
  readonly name = PaymentProvider.paypal;

  async createIntent(input: CreatePaymentIntentInput): Promise<PaymentIntentResult> {
    return {
      externalId: `paypal_stub_${input.paymentId}`,
      status: 'pending',
      redirectUrl: process.env.PAYPAL_RETURN_URL ?? 'https://example.com/paypal/return',
    };
  }
}
