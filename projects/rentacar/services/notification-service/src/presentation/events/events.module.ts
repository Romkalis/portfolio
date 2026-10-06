import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { InternalApiKeyGuard } from './internal-api-key.guard';

@Module({ controllers: [EventsController], providers: [InternalApiKeyGuard] })
export class EventsModule {}
