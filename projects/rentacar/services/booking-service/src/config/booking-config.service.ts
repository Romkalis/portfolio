import { Injectable } from '@nestjs/common';
import { createEnvSchema, parseEnv } from '@rentacar/shared-utils';
import { z } from 'zod';

const bookingEnvSchema = createEnvSchema({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3003),
  JWT_ACCESS_SECRET: z.string().min(32),
  DEFAULT_CLEANING_BUFFER_HOURS: z.coerce.number().default(2),
  NOTIFICATION_SERVICE_URL: z.string().url().optional(),
  SETTINGS_SERVICE_URL: z.string().url().optional(),
  PRICING_SERVICE_URL: z.string().url().optional(),
});

@Injectable()
export class BookingConfigService {
  readonly env = parseEnv(bookingEnvSchema);

  get jwtAccessSecret() {
    return this.env.JWT_ACCESS_SECRET;
  }

  get defaultCleaningBufferHours() {
    return this.env.DEFAULT_CLEANING_BUFFER_HOURS;
  }

  get pricingServiceUrl() {
    return this.env.PRICING_SERVICE_URL ?? 'http://localhost:3004';
  }
}
