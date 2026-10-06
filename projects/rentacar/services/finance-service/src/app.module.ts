import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { FinanceModule } from './presentation/finance/finance.module';
import { HealthModule } from './presentation/health/health.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, FinanceModule, HealthModule],
})
export class AppModule {}
