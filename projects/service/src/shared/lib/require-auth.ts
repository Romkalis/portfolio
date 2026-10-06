import { auth } from "@/auth";

const UNAUTHORIZED = { error: "Требуется авторизация" as const };

/**
 * Проверка сессии для Server Actions.
 * Middleware защищает страницы; actions — отдельный POST, проверка обязательна.
 */
export async function requireAdminSession() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return { unauthorized: true as const };
  }
  return { session, unauthorized: false as const };
}

export async function guardAdminAction<T extends Record<string, unknown>>(
  fn: () => Promise<T>,
): Promise<T | typeof UNAUTHORIZED> {
  const check = await requireAdminSession();
  if (check.unauthorized) return UNAUTHORIZED;
  return fn();
}
