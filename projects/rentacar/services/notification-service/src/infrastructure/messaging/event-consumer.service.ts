import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { connect, type Channel, type ChannelModel, type ConsumeMessage } from 'amqplib';
import { DomainEvent } from '@rentacar/shared-types';
import { EventDispatcherService } from '../../application/dispatch/event-dispatcher.service';
import { NotificationConfigService } from '../../config/notification-config.service';

@Injectable()
export class EventConsumerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(EventConsumerService.name);
  private connection: ChannelModel | null = null;
  private channel: Channel | null = null;

  constructor(
    private readonly config: NotificationConfigService,
    private readonly dispatcher: EventDispatcherService,
  ) {}

  async onModuleInit() {
    if (!this.config.env.RABBITMQ_CONSUMER_ENABLED) {
      this.logger.log('RabbitMQ consumer disabled');
      return;
    }

    try {
      const connection = await connect(this.config.env.RABBITMQ_URL ?? 'amqp://rentacar:rentacar@localhost:5672');
      this.connection = connection;
      this.channel = await connection.createChannel();

      await this.channel.assertExchange(this.config.env.RABBITMQ_EXCHANGE, 'topic', { durable: true });
      await this.channel.assertQueue(this.config.env.RABBITMQ_NOTIFICATION_QUEUE, { durable: true });
      await this.channel.assertQueue(this.config.env.RABBITMQ_DLQ_QUEUE, { durable: true });
      await this.channel.bindQueue(
        this.config.env.RABBITMQ_NOTIFICATION_QUEUE,
        this.config.env.RABBITMQ_EXCHANGE,
        '#',
      );

      await this.channel.consume(
        this.config.env.RABBITMQ_NOTIFICATION_QUEUE,
        (msg) => this.handleMessage(msg),
        { noAck: false },
      );
      this.logger.log(`Consuming ${this.config.env.RABBITMQ_NOTIFICATION_QUEUE}`);
    } catch (error) {
      this.logger.warn(`RabbitMQ consumer not started: ${String(error)}`);
    }
  }

  async onModuleDestroy() {
    await this.channel?.close().catch(() => undefined);
    await this.connection?.close().catch(() => undefined);
  }

  private async handleMessage(msg: ConsumeMessage | null) {
    if (!msg || !this.channel) return;

    try {
      const event = JSON.parse(msg.content.toString()) as DomainEvent;
      await this.dispatcher.dispatch(event);
      this.channel.ack(msg);
    } catch (error) {
      this.logger.error(`Failed to process message: ${String(error)}`);
      this.publishToDlq(msg);
      this.channel.nack(msg, false, false);
    }
  }

  private publishToDlq(msg: ConsumeMessage) {
    if (!this.channel) return;
    this.channel.sendToQueue(this.config.env.RABBITMQ_DLQ_QUEUE, msg.content, {
      persistent: true,
      contentType: msg.properties.contentType ?? 'application/json',
      headers: { ...msg.properties.headers, 'x-death-reason': 'processing_failed' },
    });
  }
}
