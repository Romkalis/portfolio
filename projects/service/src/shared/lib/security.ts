import { timingSafeEqual } from "crypto";

/** Сравнение строк без утечки по времени (логин/пароль). */
export function safeStringEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function assertProductionSecrets() {
  if (process.env.NODE_ENV !== "production") return;

  if (!process.env.AUTH_SECRET || process.env.AUTH_SECRET.length < 32) {
    throw new Error("AUTH_SECRET must be set and at least 32 characters in production");
  }

  const login = process.env.ADMIN_LOGIN ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";
  if (login === "admin" && password === "admin123") {
    throw new Error("Change ADMIN_LOGIN and ADMIN_PASSWORD in production");
  }
}
