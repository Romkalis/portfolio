import { Injectable } from '@nestjs/common';
import { createEnvSchema, parseEnv } from '@rentacar/shared-utils';
import { z } from 'zod';

const paymentEnvSchema = createEnvSchema({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3006),
  NOTIFICATION_SERVICE_URL: z.string().url().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  PAYPAL_WEBHOOK_ID: z.string().optional(),
});

@Injectable()
export class PaymentConfigService {
  readonly env = parseEnv(paymentEnvSchema);

  get notificationServiceUrl() {
    return this.env.NOTIFICATION_SERVICE_URL ?? 'http://localhost:3009';
  }
}
