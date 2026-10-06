import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DomainEventType } from '@rentacar/shared-types';
import { EventPublisherService } from '../../infrastructure/messaging/event-publisher.service';
import { InternalApiKeyGuard } from './internal-api-key.guard';

@ApiTags('events')
@Controller({ path: 'notifications/events', version: '1' })
export class EventsController {
  constructor(private readonly publisher: EventPublisherService) {}

  @Post('publish')
  @UseGuards(InternalApiKeyGuard)
  @ApiOperation({ summary: 'Publish domain event to RabbitMQ (internal)' })
  publish(
    @Body()
    body: {
      type: DomainEventType;
      aggregateId: string;
      aggregateType: string;
      payload?: Record<string, unknown>;
    },
  ) {
    return this.publisher.publish({
      type: body.type,
      aggregateId: body.aggregateId,
      aggregateType: body.aggregateType,
      payload: body.payload ?? {},
    });
  }
}
