import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentConfigModule } from './config/payment-config.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { PaymentsModule } from './presentation/payments/payments.module';
import { HealthModule } from './presentation/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PaymentConfigModule,
    PrismaModule,
    PaymentsModule,
    HealthModule,
  ],
})
export class AppModule {}
