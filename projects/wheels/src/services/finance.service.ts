import { ExpenseCategory } from "@prisma/client";
import { prisma } from "@/shared/lib/prisma";
import {
  buildFinanceSummary,
  getSummerSeasonRange,
  getWinterSeasonRange,
  groupByDay,
  groupByWeek,
  inPeriod,
  EXPENSE_CATEGORY_LABELS,
} from "@/shared/lib/finance";
import { decimalToNumber, endOfDay, parseDateOnly, startOfDay } from "@/shared/lib/utils";

export async function getFinanceDataInPeriod(from: Date, to: Date) {
  const range = { from: startOfDay(from), to: endOfDay(to) };

  const [revenues, salaries, expenses] = await Promise.all([
    prisma.revenue.findMany({
      where: { date: { gte: range.from, lte: range.to } },
      orderBy: { date: "asc" },
    }),
    prisma.salary.findMany({
      where: { date: { gte: range.from, lte: range.to } },
      include: { employee: { include: { user: true } } },
    }),
    prisma.expense.findMany({
      where: { date: { gte: range.from, lte: range.to } },
      orderBy: { date: "desc" },
    }),
  ]);

  const summary = buildFinanceSummary(revenues, salaries, expenses);

  const expensesByCategory = Object.values(ExpenseCategory).map((cat) => ({
    name: EXPENSE_CATEGORY_LABELS[cat],
    value: expenses
      .filter((e) => e.category === cat)
      .reduce((a, e) => a + decimalToNumber(e.amount), 0),
  })).filter((x) => x.value > 0);

  const salariesByEmployee = Object.values(
    salaries.reduce<Record<string, { name: string; total: number }>>((acc, s) => {
      const key = s.employeeId;
      if (!acc[key]) acc[key] = { name: s.employee.user.name, total: 0 };
      acc[key].total += decimalToNumber(s.amount);
      return acc;
    }, {}),
  );

  const profitByWeek = groupByWeek(
    revenues.map((r) => ({
      date: r.date,
      amount: {
        toString: () =>
          String(
            decimalToNumber(r.amount) -
              salaries.filter((s) => inPeriod(s.date, { from: r.date, to: r.date })).reduce((a, x) => a + decimalToNumber(x.amount), 0) -
              expenses.filter((e) => inPeriod(e.date, { from: r.date, to: r.date })).reduce((a, x) => a + decimalToNumber(x.amount), 0),
          ),
      },
    })),
  );

  return {
    summary,
    revenues,
    salaries,
    expenses,
    revenueByDay: groupByDay(revenues),
    profitByWeek,
    expensesByCategory,
    salariesByEmployee,
  };
}

export async function getAnalyticsBundle(fromStr: string, toStr: string) {
  const from = parseDateOnly(fromStr);
  const to = parseDateOnly(toStr);
  const current = await getFinanceDataInPeriod(from, to);

  const year = from.getFullYear();
  const winter = await getFinanceDataInPeriod(
    getWinterSeasonRange(year).from,
    getWinterSeasonRange(year).to,
  );
  const summer = await getFinanceDataInPeriod(
    getSummerSeasonRange(year).from,
    getSummerSeasonRange(year).to,
  );

  const periodCompare = [
    { label: "Текущий период", revenue: current.summary.revenue, profit: current.summary.netProfit },
    { label: "Зимний сезон", revenue: winter.summary.revenue, profit: winter.summary.netProfit },
    { label: "Летний сезон", revenue: summer.summary.revenue, profit: summer.summary.netProfit },
  ];

  return { current, winter, summer, periodCompare };
}
