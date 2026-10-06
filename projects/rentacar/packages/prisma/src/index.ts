/** Shared Prisma client factory utilities for microservices */

export type PrismaLogLevel = 'query' | 'info' | 'warn' | 'error';

export interface PrismaClientOptions {
  databaseUrl: string;
  log?: PrismaLogLevel[];
}

export function getDatabaseUrlFromEnv(key = 'DATABASE_URL'): string {
  const url = process.env[key];
  if (!url) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return url;
}

/** Soft-delete aware where clause */
export function notDeleted() {
  return { deletedAt: null, isArchived: false };
}
