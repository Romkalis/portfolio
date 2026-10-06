import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationConfigModule } from './config/notification-config.module';
import { EventsModule } from './presentation/events/events.module';
import { HealthModule } from './presentation/health/health.module';
import { LogsModule } from './presentation/logs/logs.module';
import { TemplatesModule } from './presentation/templates/templates.module';
import { DeliveriesModule } from './presentation/deliveries/deliveries.module';
import { MessagingModule } from './infrastructure/messaging/messaging.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NotificationConfigModule,
    PrismaModule,
    TemplatesModule,
    DeliveriesModule,
    MessagingModule,
    EventsModule,
    LogsModule,
    HealthModule,
  ],
})
export class AppModule {}
