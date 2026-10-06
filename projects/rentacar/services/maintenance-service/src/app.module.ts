import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { MaintenanceModule } from './presentation/maintenance/maintenance.module';
import { HealthModule } from './presentation/health/health.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, MaintenanceModule, HealthModule],
})
export class AppModule {}
