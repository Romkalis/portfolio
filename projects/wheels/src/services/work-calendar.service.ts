import { prisma } from "@/shared/lib/prisma";
import { formatDateOnly, parseDateOnly } from "@/shared/lib/utils";
import {
  hasScheduleCoverage,
  uncoveredMinutes,
} from "@/shared/lib/schedule-time";
import { getShopSettings } from "./shop-settings.service";
import { ShiftStatus } from "@prisma/client";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";

export type CalendarTimeBlock = {
  id: string;
  employeeId: string;
  employeeName: string;
  startTime: string;
  endTime: string;
  status: ShiftStatus;
  source: "shift" | "request";
};

export type CalendarDayData = {
  date: string;
  weekdayLabel: string;
  shopStart: string;
  shopEnd: string;
  blocks: CalendarTimeBlock[];
  hasCoverage: boolean;
  uncoveredMinutes: number;
};

const WEEKDAY_SHORT = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"] as const;

function weekdayLabel(date: Date): string {
  return WEEKDAY_SHORT[date.getDay()];
}

export async function getWorkCalendarMonth(anchor = new Date()): Promise<{
  shopStart: string;
  shopEnd: string;
  monthLabel: string;
  days: CalendarDayData[];
  gridDays: { date: string; inMonth: boolean; day: CalendarDayData | null }[];
}> {
  const shop = await getShopSettings();
  const monthStart = startOfMonth(anchor);
  const monthEnd = endOfMonth(anchor);
  const rangeStart = monthStart;
  const rangeEnd = monthEnd;

  const [shifts, requests] = await Promise.all([
    prisma.shift.findMany({
      where: {
        date: { gte: rangeStart, lte: rangeEnd },
        status: { in: [ShiftStatus.CONFIRMED, ShiftStatus.PENDING] },
      },
      include: { employee: { include: { user: true } } },
    }),
    prisma.shiftRequest.findMany({
      where: {
        date: { gte: rangeStart, lte: rangeEnd },
        status: { in: [ShiftStatus.CONFIRMED, ShiftStatus.PENDING] },
      },
      include: { employee: { include: { user: true } } },
    }),
  ]);

  const blocksByDate = new Map<string, CalendarTimeBlock[]>();

  for (const s of shifts) {
    const date = formatDateOnly(s.date);
    const list = blocksByDate.get(date) ?? [];
    list.push({
      id: s.id,
      employeeId: s.employeeId,
      employeeName: s.employee.user.name,
      startTime: s.startTime,
      endTime: s.endTime,
      status: s.status,
      source: "shift",
    });
    blocksByDate.set(date, list);
  }

  for (const r of requests) {
    const date = formatDateOnly(r.date);
    const list = blocksByDate.get(date) ?? [];
    if (list.some((b) => b.employeeId === r.employeeId && b.source === "shift")) {
      continue;
    }
    if (list.some((b) => b.employeeId === r.employeeId && b.source === "request")) {
      continue;
    }
    list.push({
      id: r.id,
      employeeId: r.employeeId,
      employeeName: r.employee.user.name,
      startTime: r.startTime,
      endTime: r.endTime,
      status: r.status,
      source: "request",
    });
    blocksByDate.set(date, list);
  }

  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const days: CalendarDayData[] = monthDays.map((d) => {
    const date = formatDateOnly(d);
    const blocks = blocksByDate.get(date) ?? [];
    const uncovered = uncoveredMinutes(
      shop.defaultStartTime,
      shop.defaultEndTime,
      blocks,
    );
    return {
      date,
      weekdayLabel: weekdayLabel(d),
      shopStart: shop.defaultStartTime,
      shopEnd: shop.defaultEndTime,
      blocks,
      hasCoverage: hasScheduleCoverage(
        shop.defaultStartTime,
        shop.defaultEndTime,
        blocks,
      ),
      uncoveredMinutes: uncovered,
    };
  });

  const dayMap = new Map(days.map((d) => [d.date, d]));
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const gridInterval = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const gridDays = gridInterval.map((d) => {
    const date = formatDateOnly(d);
    const inMonth = d >= monthStart && d <= monthEnd;
    return {
      date,
      inMonth,
      day: inMonth ? dayMap.get(date) ?? null : null,
    };
  });

  const monthLabel = new Intl.DateTimeFormat("ru-RU", {
    month: "long",
    year: "numeric",
  }).format(anchor);

  return {
    shopStart: shop.defaultStartTime,
    shopEnd: shop.defaultEndTime,
    monthLabel,
    days,
    gridDays,
  };
}

export async function getWorkCalendarDay(dateYmd: string): Promise<CalendarDayData | null> {
  const shop = await getShopSettings();
  const date = parseDateOnly(dateYmd);

  const [shifts, requests] = await Promise.all([
    prisma.shift.findMany({
      where: {
        date,
        status: { in: [ShiftStatus.CONFIRMED, ShiftStatus.PENDING] },
      },
      include: { employee: { include: { user: true } } },
    }),
    prisma.shiftRequest.findMany({
      where: {
        date,
        status: { in: [ShiftStatus.CONFIRMED, ShiftStatus.PENDING] },
      },
      include: { employee: { include: { user: true } } },
    }),
  ]);

  const blocks: CalendarTimeBlock[] = [];
  for (const s of shifts) {
    blocks.push({
      id: s.id,
      employeeId: s.employeeId,
      employeeName: s.employee.user.name,
      startTime: s.startTime,
      endTime: s.endTime,
      status: s.status,
      source: "shift",
    });
  }
  for (const r of requests) {
    if (blocks.some((b) => b.employeeId === r.employeeId && b.source === "shift")) {
      continue;
    }
    if (!blocks.some((b) => b.employeeId === r.employeeId && b.source === "request")) {
      blocks.push({
        id: r.id,
        employeeId: r.employeeId,
        employeeName: r.employee.user.name,
        startTime: r.startTime,
        endTime: r.endTime,
        status: r.status,
        source: "request",
      });
    }
  }

  const d = parseDateOnly(dateYmd);
  return {
    date: dateYmd,
    weekdayLabel: weekdayLabel(d),
    shopStart: shop.defaultStartTime,
    shopEnd: shop.defaultEndTime,
    blocks,
    hasCoverage: hasScheduleCoverage(shop.defaultStartTime, shop.defaultEndTime, blocks),
    uncoveredMinutes: uncoveredMinutes(
      shop.defaultStartTime,
      shop.defaultEndTime,
      blocks,
    ),
  };
}

export function getAdjacentMonthAnchor(anchor: Date, delta: number): string {
  const next = addMonths(anchor, delta);
  return formatDateOnly(
    new Date(Date.UTC(next.getUTCFullYear(), next.getUTCMonth(), 1)),
  );
}
