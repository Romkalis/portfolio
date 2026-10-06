import { Global, Module } from '@nestjs/common';
import { PricingConfigService } from './pricing-config.service';

@Global()
@Module({ providers: [PricingConfigService], exports: [PricingConfigService] })
export class PricingConfigModule {}
