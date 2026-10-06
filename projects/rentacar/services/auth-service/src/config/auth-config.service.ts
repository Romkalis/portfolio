import { Injectable } from '@nestjs/common';
import { createEnvSchema, parseEnv } from '@rentacar/shared-utils';
import { z } from 'zod';

const authEnvSchema = createEnvSchema({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3001),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GOOGLE_CALLBACK_URL: z.string().url().optional(),
  APPLE_CLIENT_ID: z.string().optional(),
  APPLE_TEAM_ID: z.string().optional(),
  APPLE_KEY_ID: z.string().optional(),
  APPLE_PRIVATE_KEY: z.string().optional(),
  APPLE_CALLBACK_URL: z.string().url().optional(),
  OAUTH_FRONTEND_REDIRECT_URL: z.string().url().optional(),
});

@Injectable()
export class AuthConfigService {
  readonly env = parseEnv(authEnvSchema);

  get jwtAccessSecret() {
    return this.env.JWT_ACCESS_SECRET;
  }

  get jwtRefreshSecret() {
    return this.env.JWT_REFRESH_SECRET;
  }

  get jwtAccessExpiresIn() {
    return this.env.JWT_ACCESS_EXPIRES_IN;
  }

  get jwtRefreshExpiresIn() {
    return this.env.JWT_REFRESH_EXPIRES_IN;
  }

  get googleOAuthEnabled() {
    return Boolean(this.env.GOOGLE_CLIENT_ID && this.env.GOOGLE_CLIENT_SECRET);
  }

  get appleIdTokenEnabled() {
    return Boolean(this.env.APPLE_CLIENT_ID);
  }

  get applePassportEnabled() {
    return Boolean(
      this.env.APPLE_CLIENT_ID &&
        this.env.APPLE_TEAM_ID &&
        this.env.APPLE_KEY_ID &&
        this.env.APPLE_PRIVATE_KEY &&
        this.env.APPLE_CALLBACK_URL,
    );
  }

  get appleOAuthEnabled() {
    return this.appleIdTokenEnabled || this.applePassportEnabled;
  }
}
