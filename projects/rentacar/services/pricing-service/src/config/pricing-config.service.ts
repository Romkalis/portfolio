import { Injectable } from '@nestjs/common';
import { createEnvSchema, parseEnv } from '@rentacar/shared-utils';
import { z } from 'zod';

const pricingEnvSchema = createEnvSchema({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3004),
});

@Injectable()
export class PricingConfigService {
  readonly env = parseEnv(pricingEnvSchema);
}
