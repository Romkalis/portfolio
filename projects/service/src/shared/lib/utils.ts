import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatMoney(
  amount: number | string | { toString(): string } | null | undefined,
): string {
  const n = Number(amount ?? 0);
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string, time?: string): string {
  const d = formatDate(date);
  return time ? `${d} ${time}` : d;
}

export function fullName(
  lastName: string,
  firstName: string,
  middleName?: string | null,
): string {
  return [lastName, firstName, middleName].filter(Boolean).join(" ");
}

export function carLabel(brand: string, model: string, year?: number): string {
  return year ? `${brand} ${model} (${year})` : `${brand} ${model}`;
}

export async function generateOrderNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const count = await import("./prisma").then(({ prisma }) =>
    prisma.order.count({
      where: { createdAt: { gte: new Date(`${year}-01-01`) } },
    }),
  );
  return `ORD-${year}-${String(count + 1).padStart(4, "0")}`;
}
