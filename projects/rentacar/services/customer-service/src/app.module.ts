import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { CustomersModule } from './presentation/customers/customers.module';
import { HealthModule } from './presentation/health/health.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, CustomersModule, HealthModule],
})
export class AppModule {}
