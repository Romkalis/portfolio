import { ExpenseCategory } from "@prisma/client";
import { decimalToNumber, endOfDay, startOfDay } from "./utils";

export type PeriodRange = { from: Date; to: Date };

export const EXPENSE_CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  WEIGHTS: "Грузики",
  MATERIALS: "Материалы",
  RENT: "Аренда",
  WHEEL_BALANCER: "Дископрав",
  OTHER: "Прочее",
};

export function getWinterSeasonRange(year: number): PeriodRange {
  return {
    from: new Date(year, 6, 1),
    to: endOfDay(new Date(year, 11, 31)),
  };
}

export function getSummerSeasonRange(year: number): PeriodRange {
  return {
    from: new Date(year, 0, 1),
    to: endOfDay(new Date(year, 6, 1)),
  };
}

export function sumAmounts<T extends { amount: { toString(): string } | number }>(items: T[]) {
  return items.reduce((acc, item) => acc + decimalToNumber(item.amount), 0);
}

export function calcNetProfit(revenue: number, salaries: number, expenses: number) {
  return revenue - salaries - expenses;
}

export type FinanceSummary = {
  revenue: number;
  salaries: number;
  expenses: number;
  netProfit: number;
};

export function buildFinanceSummary(
  revenues: { amount: { toString(): string } }[],
  salaries: { amount: { toString(): string } }[],
  expenses: { amount: { toString(): string } }[],
): FinanceSummary {
  const revenue = sumAmounts(revenues);
  const salaryTotal = sumAmounts(salaries);
  const expenseTotal = sumAmounts(expenses);
  return {
    revenue,
    salaries: salaryTotal,
    expenses: expenseTotal,
    netProfit: calcNetProfit(revenue, salaryTotal, expenseTotal),
  };
}

export function inPeriod(date: Date, range: PeriodRange) {
  const d = startOfDay(date).getTime();
  return d >= startOfDay(range.from).getTime() && d <= endOfDay(range.to).getTime();
}

export function groupByDay<T extends { date: Date; amount: { toString(): string } }>(
  items: T[],
): { date: string; total: number }[] {
  const map = new Map<string, number>();
  for (const item of items) {
    const key = `${item.date.getUTCFullYear()}-${String(item.date.getUTCMonth() + 1).padStart(2, "0")}-${String(item.date.getUTCDate()).padStart(2, "0")}`;
    map.set(key, (map.get(key) ?? 0) + decimalToNumber(item.amount));
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, total]) => ({ date, total }));
}

export function groupByWeek<T extends { date: Date; amount: { toString(): string } }>(
  items: T[],
): { week: string; total: number }[] {
  const map = new Map<string, number>();
  for (const item of items) {
    const d = new Date(item.date);
    const onejan = new Date(d.getFullYear(), 0, 1);
    const week = Math.ceil(((d.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
    const key = `${d.getFullYear()}-W${String(week).padStart(2, "0")}`;
    map.set(key, (map.get(key) ?? 0) + decimalToNumber(item.amount));
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([week, total]) => ({ week, total }));
}
