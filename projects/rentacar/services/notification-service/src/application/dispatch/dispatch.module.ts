import { Module } from '@nestjs/common';
import { TemplatesModule } from '../../presentation/templates/templates.module';
import { EventDispatcherService } from './event-dispatcher.service';
import { NotificationSenderService } from './notification-sender.service';

@Module({
  imports: [TemplatesModule],
  providers: [EventDispatcherService, NotificationSenderService],
  exports: [EventDispatcherService, NotificationSenderService],
})
export class DispatchModule {}
