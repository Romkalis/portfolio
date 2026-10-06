import { Injectable } from '@nestjs/common';
import { createEnvSchema, parseEnv } from '@rentacar/shared-utils';
import { z } from 'zod';

const notificationEnvSchema = createEnvSchema({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3009),
  RABBITMQ_URL: z.string().default('amqp://rentacar:rentacar@localhost:5672'),
  RABBITMQ_EXCHANGE: z.string().default('rentacar.events'),
  RABBITMQ_NOTIFICATION_QUEUE: z.string().default('rentacar.notifications'),
  RABBITMQ_DLQ_QUEUE: z.string().default('rentacar.notifications.dlq'),
  RABBITMQ_CONSUMER_ENABLED: z
    .enum(['true', 'false'])
    .default('true')
    .transform((v) => v === 'true'),
  NOTIFICATION_DEFAULT_LOCALE: z.string().default('en'),
  NOTIFICATION_SEND_ENABLED: z
    .enum(['true', 'false'])
    .default('false')
    .transform((v) => v === 'true'),
  NOTIFICATION_DEFAULT_EMAIL: z.string().email().optional(),
});

@Injectable()
export class NotificationConfigService {
  readonly env = parseEnv(notificationEnvSchema);
}
