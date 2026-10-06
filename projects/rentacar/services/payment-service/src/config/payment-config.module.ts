import { Global, Module } from '@nestjs/common';
import { PaymentConfigService } from './payment-config.service';

@Global()
@Module({ providers: [PaymentConfigService], exports: [PaymentConfigService] })
export class PaymentConfigModule {}
