import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { SettingsModule } from './presentation/settings/settings.module';
import { HealthModule } from './presentation/health/health.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, SettingsModule, HealthModule],
})
export class AppModule {}
