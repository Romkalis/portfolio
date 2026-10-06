import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(value: number | string | { toString(): string }) {
  const num = typeof value === "number" ? value : Number(value);
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(num);
}

/** YYYY-MM-DD → Date в UTC (без сдвига на предыдущий день в PostgreSQL). */
export function parseDateOnly(value: string): Date {
  const datePart = value.includes("T") ? value.slice(0, 10) : value;
  const [y, m, d] = datePart.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

/** Date из БД (@db.Date) → YYYY-MM-DD. */
export function formatDateOnly(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatDate(date: Date | string, style: "short" | "long" = "short") {
  const d =
    typeof date === "string" ? parseDateOnly(date.slice(0, 10)) : date;
  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: "UTC",
    day: "numeric",
    month: style === "long" ? "long" : "short",
    year: style === "long" ? "numeric" : undefined,
  }).format(d);
}

export function toDateInputValue(date: Date) {
  return formatDateOnly(date);
}

/** Локальная дата из UI-календаря → YYYY-MM-DD для API и БД. */
export function localDateToYmd(day: Date): string {
  const y = day.getFullYear();
  const m = String(day.getMonth() + 1).padStart(2, "0");
  const d = String(day.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Сравнение даты смены (строка YYYY-MM-DD) с днём в календаре (local Date из UI). */
export function isShiftOnCalendarDay(shiftDateYmd: string, calendarDay: Date): boolean {
  const y = calendarDay.getFullYear();
  const m = String(calendarDay.getMonth() + 1).padStart(2, "0");
  const d = String(calendarDay.getDate()).padStart(2, "0");
  return shiftDateYmd.slice(0, 10) === `${y}-${m}-${d}`;
}

/** Безопасный redirect после логина (только внутренние пути приложения). */
export function sanitizeCallbackUrl(
  callbackUrl: string | null | undefined,
  defaultPath = "/",
): string {
  if (!callbackUrl) return defaultPath;
  if (callbackUrl.startsWith("/") && !callbackUrl.startsWith("//")) {
    const path = callbackUrl.split("?")[0];
    if (path.startsWith("/admin") || path.startsWith("/employee") || path === "/") {
      return callbackUrl;
    }
  }
  return defaultPath;
}

export function startOfDay(date: Date) {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0),
  );
}

export function endOfDay(date: Date) {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59, 999),
  );
}

export function decimalToNumber(value: { toString(): string } | number | null | undefined) {
  if (value == null) return 0;
  return typeof value === "number" ? value : Number(value);
}
