import { auth } from "@/auth";
import { prisma } from "@/shared/lib/prisma";
import type { Role } from "@prisma/client";
import type { Session } from "next-auth";
import { headers } from "next/headers";
import { rateLimit } from "./rate-limit";

export type AppSession = Session & {
  user: {
    id: string;
    email: string;
    name: string;
    role: Role;
    employeeProfileId?: string;
  };
};

export async function getClientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

export async function rateLimitAction(action: string, limit = 20): Promise<{ error?: string }> {
  const ip = await getClientIp();
  const result = rateLimit(`${action}:${ip}`, { limit, windowMs: 60_000 });
  if (!result.ok) {
    return { error: `Слишком много запросов. Повторите через ${result.retryAfterSec} с.` };
  }
  return {};
}

export async function requireSession(): Promise<AppSession | { error: string }> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Не авторизован" };
  return session as AppSession;
}

export async function requireAdmin(): Promise<AppSession | { error: string }> {
  const session = await requireSession();
  if ("error" in session) return session;
  if (session.user.role !== "ADMIN") return { error: "Нет доступа" };
  return session;
}

export async function requireEmployee(): Promise<AppSession | { error: string }> {
  const session = await requireSession();
  if ("error" in session) return session;
  if (session.user.role !== "EMPLOYEE") return { error: "Нет доступа" };
  if (!session.user.employeeProfileId) return { error: "Профиль сотрудника не найден" };
  return session;
}

/** Повторная проверка роли из БД (для критичных server actions). */
export async function assertRoleInDb(userId: string, expected: Role): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  return user?.role === expected;
}

export function isRegistrationAllowed(): boolean {
  return process.env.ALLOW_REGISTRATION !== "false";
}
