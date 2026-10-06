import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PricingConfigModule } from './config/pricing-config.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { PricingModule } from './presentation/pricing/pricing.module';
import { HealthModule } from './presentation/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PricingConfigModule,
    PrismaModule,
    PricingModule,
    HealthModule,
  ],
})
export class AppModule {}
