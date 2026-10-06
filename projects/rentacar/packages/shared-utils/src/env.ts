import { z } from 'zod';

export function createEnvSchema<T extends z.ZodRawShape>(shape: T) {
  return z.object(shape);
}

export function parseEnv<T extends z.ZodTypeAny>(schema: T): z.infer<T> {
  const result = schema.safeParse(process.env);
  if (!result.success) {
    const formatted = result.error.flatten().fieldErrors;
    throw new Error(`Invalid environment variables: ${JSON.stringify(formatted)}`);
  }
  return result.data;
}
