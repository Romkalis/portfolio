import { Injectable } from '@nestjs/common';
import { createEnvSchema, parseEnv } from '@rentacar/shared-utils';
import { z } from 'zod';

const carEnvSchema = createEnvSchema({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3002),
  JWT_ACCESS_SECRET: z.string().min(32),
  NOTIFICATION_SERVICE_URL: z.string().url().optional(),
  STORAGE_ENABLED: z
    .enum(['true', 'false'])
    .default('true')
    .transform((v) => v === 'true'),
  MINIO_ENDPOINT: z.string().default('localhost'),
  MINIO_PORT: z.coerce.number().default(9000),
  MINIO_USE_SSL: z
    .enum(['true', 'false'])
    .default('false')
    .transform((v) => v === 'true'),
  MINIO_ACCESS_KEY: z.string().default('rentacar'),
  MINIO_SECRET_KEY: z.string().default('rentacar123'),
  MINIO_BUCKET: z.string().default('rentacar-cars'),
  MINIO_PUBLIC_URL: z.string().default('http://localhost:9000/rentacar-cars'),
});

@Injectable()
export class CarConfigService {
  readonly env = parseEnv(carEnvSchema);

  get jwtAccessSecret() {
    return this.env.JWT_ACCESS_SECRET;
  }

  get notificationServiceUrl() {
    return this.env.NOTIFICATION_SERVICE_URL ?? 'http://localhost:3009';
  }
}
