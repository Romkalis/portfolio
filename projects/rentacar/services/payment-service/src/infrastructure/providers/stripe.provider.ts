import { PaymentProvider } from '@prisma/payment-client';
import {
  CreatePaymentIntentInput,
  IPaymentProvider,
  PaymentIntentResult,
} from '../../domain/payment/payment-provider.interface';

/** Stripe integration stub — wire STRIPE_SECRET_KEY when ready. */
export class StripePaymentProvider implements IPaymentProvider {
  readonly name = PaymentProvider.stripe;

  async createIntent(input: CreatePaymentIntentInput): Promise<PaymentIntentResult> {
    if (!process.env.STRIPE_SECRET_KEY) {
      return {
        externalId: `stripe_stub_${input.paymentId}`,
        status: 'pending',
        clientSecret: 'stub_client_secret',
      };
    }

    return {
      externalId: `stripe_stub_${input.paymentId}`,
      status: 'pending',
      clientSecret: 'configure_stripe_sdk',
    };
  }
}
