import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { connect, type Channel, type ChannelModel } from 'amqplib';
import { DomainEvent, DomainEventType } from '@rentacar/shared-types';

@Injectable()
export class EventPublisherService implements OnModuleDestroy {
  private readonly logger = new Logger(EventPublisherService.name);
  private connection: ChannelModel | null = null;
  private channel: Channel | null = null;

  private get url() {
    return process.env.RABBITMQ_URL ?? 'amqp://rentacar:rentacar@localhost:5672';
  }

  private get exchange() {
    return process.env.RABBITMQ_EXCHANGE ?? 'rentacar.events';
  }

  async onModuleDestroy() {
    await this.channel?.close().catch(() => undefined);
    await this.connection?.close().catch(() => undefined);
  }

  private async ensureChannel() {
    if (this.channel) return this.channel;
    const connection = await connect(this.url);
    this.connection = connection;
    this.channel = await connection.createChannel();
    await this.channel.assertExchange(this.exchange, 'topic', { durable: true });
    return this.channel;
  }

  async publish<T extends Record<string, unknown>>(input: {
    type: DomainEventType;
    aggregateId: string;
    aggregateType: string;
    payload: T;
  }) {
    const event: DomainEvent<T> = {
      id: crypto.randomUUID(),
      type: input.type,
      aggregateId: input.aggregateId,
      aggregateType: input.aggregateType,
      payload: input.payload,
      occurredAt: new Date().toISOString(),
      version: 1,
    };

    try {
      const channel = await this.ensureChannel();
      channel.publish(this.exchange, input.type, Buffer.from(JSON.stringify(event)), {
        persistent: true,
        contentType: 'application/json',
      });
      return { published: true, event };
    } catch (error) {
      this.logger.warn(`RabbitMQ publish failed: ${String(error)}`);
      return { published: false, event, error: String(error) };
    }
  }
}
