import { Global, Module } from '@nestjs/common';
import { DispatchModule } from '../../application/dispatch/dispatch.module';
import { EventConsumerService } from './event-consumer.service';
import { EventPublisherService } from './event-publisher.service';

@Global()
@Module({
  imports: [DispatchModule],
  providers: [EventPublisherService, EventConsumerService],
  exports: [EventPublisherService],
})
export class MessagingModule {}
