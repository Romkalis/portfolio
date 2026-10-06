import { PaymentProvider } from '@prisma/payment-client';

export type CreatePaymentIntentInput = {
  paymentId: string;
  amount: number;
  currency: string;
  bookingId?: string;
  customerId?: string;
  metadata?: Record<string, unknown>;
};

export type PaymentIntentResult = {
  externalId: string;
  clientSecret?: string;
  redirectUrl?: string;
  status: 'pending' | 'completed';
};

export interface IPaymentProvider {
  readonly name: PaymentProvider;
  createIntent(input: CreatePaymentIntentInput): Promise<PaymentIntentResult>;
  capture?(externalId: string): Promise<void>;
  refund?(externalId: string, amount: number): Promise<string>;
}
