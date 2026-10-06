import { prisma } from "@/shared/lib/prisma";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import type { Prisma } from "@prisma/client";

export type EarningsFilters = {
  from?: string;
  to?: string;
  clientId?: string;
  carId?: string;
};

function buildWhere(filters: EarningsFilters): Prisma.OrderWhereInput {
  const where: Prisma.OrderWhereInput = {
    status: "COMPLETED",
    earnings: { not: null },
  };

  if (filters.clientId) where.clientId = filters.clientId;
  if (filters.carId) where.carId = filters.carId;
  if (filters.from || filters.to) {
    where.date = {};
    if (filters.from) where.date.gte = new Date(filters.from);
    if (filters.to) where.date.lte = new Date(filters.to);
  }

  return where;
}

export async function listEarnings(filters: EarningsFilters = {}) {
  return prisma.order.findMany({
    where: buildWhere(filters),
    orderBy: { date: "desc" },
    include: { client: true, car: true },
  });
}

export async function sumEarnings(filters: EarningsFilters = {}) {
  const result = await prisma.order.aggregate({
    where: buildWhere(filters),
    _sum: { earnings: true },
    _count: true,
  });
  return {
    total: Number(result._sum.earnings ?? 0),
    count: result._count,
  };
}

export async function getEarningsSummary() {
  const now = new Date();
  const dayStart = startOfDay(now);
  const dayEnd = endOfDay(now);
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  const baseWhere: Prisma.OrderWhereInput = {
    status: "COMPLETED",
    earnings: { not: null },
  };

  const [day, week, month] = await Promise.all([
    prisma.order.aggregate({
      where: { ...baseWhere, date: { gte: dayStart, lte: dayEnd } },
      _sum: { earnings: true },
    }),
    prisma.order.aggregate({
      where: { ...baseWhere, date: { gte: weekStart, lte: weekEnd } },
      _sum: { earnings: true },
    }),
    prisma.order.aggregate({
      where: { ...baseWhere, date: { gte: monthStart, lte: monthEnd } },
      _sum: { earnings: true },
    }),
  ]);

  return {
    day: Number(day._sum.earnings ?? 0),
    week: Number(week._sum.earnings ?? 0),
    month: Number(month._sum.earnings ?? 0),
  };
}

export async function getEarningsChart(filters: EarningsFilters = {}) {
  const orders = await listEarnings(filters);
  const byDate = new Map<string, number>();

  for (const order of orders) {
    const key = order.date.toISOString().slice(0, 10);
    byDate.set(key, (byDate.get(key) ?? 0) + Number(order.earnings ?? 0));
  }

  return Array.from(byDate.entries())
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
