import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentProvider } from '@prisma/payment-client';
import { IPaymentProvider } from '../../domain/payment/payment-provider.interface';
import { CashPaymentProvider } from './cash.provider';
import { ManualPaymentProvider } from './manual.provider';
import { PayPalPaymentProvider } from './paypal.provider';
import { StripePaymentProvider } from './stripe.provider';

@Injectable()
export class PaymentProviderRegistry {
  private readonly providers: Map<PaymentProvider, IPaymentProvider>;

  constructor() {
    const list: IPaymentProvider[] = [
      new ManualPaymentProvider(),
      new CashPaymentProvider(),
      new StripePaymentProvider(),
      new PayPalPaymentProvider(),
    ];
    this.providers = new Map(list.map((p) => [p.name, p]));
  }

  get(provider: PaymentProvider): IPaymentProvider {
    const instance = this.providers.get(provider);
    if (!instance) throw new NotFoundException(`Payment provider ${provider} not registered`);
    return instance;
  }
}
