import { z } from "zod";

/** Prisma cuid() — базовая проверка формата id в actions. */
export const entityIdSchema = z.string().min(20).max(30).regex(/^c[a-z0-9]+$/i);

export function parseEntityId(id: string): string | null {
  const parsed = entityIdSchema.safeParse(id);
  return parsed.success ? parsed.data : null;
}
