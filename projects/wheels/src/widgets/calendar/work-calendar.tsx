"use client";

import { useMemo, useState } from "react";
import {
  addDays,
  eachDayOfInterval,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { localDateToYmd } from "@/shared/lib/utils";
import { cn, formatDate, parseDateOnly } from "@/shared/lib/utils";
import { percentInRange } from "@/shared/lib/schedule-time";
import type { CalendarDayData } from "@/services/work-calendar.service";
import { DayDetailDialog, type EmployeeOption } from "./day-detail-dialog";
import { ShopHoursForm } from "@/features/schedule/shop-hours-form";
import { CalendarMonthNav } from "./calendar-month-nav";
import { CalendarViewToggle } from "@/features/shifts/calendar-view-toggle";
import { useUiStore } from "@/shared/store/ui-store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Badge } from "@/shared/ui/badge";
import type { ShiftStatus } from "@prisma/client";

const WEEK_HEADERS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] as const;

type GridDay = {
  date: string;
  inMonth: boolean;
  day: CalendarDayData | null;
};

const statusBadge: Record<
  ShiftStatus,
  { label: string; variant: "success" | "warning" | "danger" }
> = {
  CONFIRMED: { label: "Подтверждена", variant: "success" },
  PENDING: { label: "Ожидает", variant: "warning" },
  REJECTED: { label: "Отклонена", variant: "danger" },
};

export function WorkCalendar({
  monthLabel,
  shopStart,
  shopEnd,
  gridDays,
  days,
  monthAnchorYmd,
  prevMonthYmd,
  nextMonthYmd,
  isAdmin,
  monthBasePath,
  adminEmployees,
  defaultStartTime,
  defaultEndTime,
}: {
  monthLabel: string;
  shopStart: string;
  shopEnd: string;
  gridDays: GridDay[];
  days: CalendarDayData[];
  monthAnchorYmd: string;
  prevMonthYmd: string;
  nextMonthYmd: string;
  isAdmin?: boolean;
  monthBasePath: string;
  adminEmployees?: EmployeeOption[];
  defaultStartTime?: string;
  defaultEndTime?: string;
}) {
  const view = useUiStore((s) => s.calendarView);
  const [selectedDay, setSelectedDay] = useState<CalendarDayData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const dayMap = useMemo(() => new Map(days.map((d) => [d.date, d])), [days]);

  const monthAnchor = useMemo(
    () => parseDateOnly(monthAnchorYmd),
    [monthAnchorYmd],
  );

  const weekDays = useMemo(() => {
    const today = new Date();
    const anchor = isSameMonth(monthAnchor, today) ? today : addDays(startOfMonth(monthAnchor), 7);
    const start = startOfWeek(anchor, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end: addDays(start, 6) });
  }, [monthAnchor]);

  const openDay = (date: string) => {
    const d = parseDateOnly(date);
    const WEEKDAY_SHORT = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"] as const;
    const data =
      dayMap.get(date) ??
      ({
        date,
        weekdayLabel: WEEKDAY_SHORT[d.getUTCDay()],
        shopStart,
        shopEnd,
        blocks: [],
        hasCoverage: false,
        uncoveredMinutes: 0,
      } satisfies CalendarDayData);
    setSelectedDay(data);
    setDialogOpen(true);
  };

  const calendarBody =
    view === "table" ? (
      <ScheduleTable days={days} onRowClick={openDay} />
    ) : view === "week" ? (
      <WeekGrid
        weekDays={weekDays}
        dayMap={dayMap}
        shopStart={shopStart}
        shopEnd={shopEnd}
        onOpenDay={openDay}
      />
    ) : (
      <MonthGrid
        gridDays={gridDays}
        shopStart={shopStart}
        shopEnd={shopEnd}
        onOpenDay={openDay}
      />
    );

  return (
    <div className="space-y-4">
      {isAdmin && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <p className="mb-2 text-sm font-medium">Базовое рабочее время (для всех)</p>
          <ShopHoursForm defaultStartTime={shopStart} defaultEndTime={shopEnd} />
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CalendarMonthNav
          monthLabel={monthLabel}
          basePath={monthBasePath}
          prevMonthYmd={prevMonthYmd}
          nextMonthYmd={nextMonthYmd}
        />
        <CalendarViewToggle />
      </div>

      <p className="text-center text-xs text-[var(--muted-foreground)]">
        Режим {shopStart}–{shopEnd}. Красный — график не закрыт. Нажмите на день для деталей
        {isAdmin ? " и назначения сотрудников" : ""}.
      </p>

      <div className="mx-auto w-full max-w-3xl">{calendarBody}</div>

      <DayDetailDialog
        day={selectedDay}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        adminEmployees={isAdmin ? adminEmployees : undefined}
        defaultStartTime={defaultStartTime ?? shopStart}
        defaultEndTime={defaultEndTime ?? shopEnd}
      />
    </div>
  );
}

function MonthGrid({
  gridDays,
  shopStart,
  shopEnd,
  onOpenDay,
}: {
  gridDays: GridDay[];
  shopStart: string;
  shopEnd: string;
  onOpenDay: (date: string) => void;
}) {
  return (
    <>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-[var(--muted-foreground)]">
        {WEEK_HEADERS.map((h) => (
          <div key={h} className="py-1">
            {h}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {gridDays.map(({ date, inMonth, day }) => {
          if (!inMonth || !day) {
            return <div key={date} className="aspect-[4/5] min-h-[4rem]" aria-hidden />;
          }
          return (
            <DayCell
              key={date}
              day={day}
              shopStart={shopStart}
              shopEnd={shopEnd}
              onOpen={() => onOpenDay(date)}
            />
          );
        })}
      </div>
    </>
  );
}

function WeekGrid({
  weekDays,
  dayMap,
  shopStart,
  shopEnd,
  onOpenDay,
}: {
  weekDays: Date[];
  dayMap: Map<string, CalendarDayData>;
  shopStart: string;
  shopEnd: string;
  onOpenDay: (date: string) => void;
}) {
  const WEEKDAY_SHORT = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"] as const;

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
      {weekDays.map((d) => {
        const date = localDateToYmd(d);
        const day =
          dayMap.get(date) ??
          ({
            date,
            weekdayLabel: WEEKDAY_SHORT[d.getDay()],
            shopStart,
            shopEnd,
            blocks: [],
            hasCoverage: false,
            uncoveredMinutes: 0,
          } satisfies CalendarDayData);

        return (
          <DayCell
            key={date}
            day={day}
            shopStart={shopStart}
            shopEnd={shopEnd}
            onOpen={() => onOpenDay(date)}
            large
          />
        );
      })}
    </div>
  );
}

function ScheduleTable({
  days,
  onRowClick,
}: {
  days: CalendarDayData[];
  onRowClick: (date: string) => void;
}) {
  const allRows = days.flatMap((d) =>
    d.blocks.map((b) => ({
      ...b,
      date: d.date,
    })),
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Дата</TableHead>
          <TableHead>Сотрудник</TableHead>
          <TableHead>Время</TableHead>
          <TableHead>Статус</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allRows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-[var(--muted-foreground)]">
              Нет смен в этом месяце
            </TableCell>
          </TableRow>
        ) : (
          allRows.map((r) => (
            <TableRow
              key={`${r.source}-${r.id}`}
              className="cursor-pointer hover:bg-[var(--muted)]/50"
              onClick={() => onRowClick(r.date)}
            >
              <TableCell>{formatDate(r.date)}</TableCell>
              <TableCell>{r.employeeName}</TableCell>
              <TableCell>
                {r.startTime}–{r.endTime}
              </TableCell>
              <TableCell>
                <Badge variant={statusBadge[r.status].variant}>
                  {r.source === "request" ? "Заявка" : statusBadge[r.status].label}
                </Badge>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

function DayCell({
  day,
  shopStart,
  shopEnd,
  onOpen,
  large,
}: {
  day: CalendarDayData;
  shopStart: string;
  shopEnd: string;
  onOpen: () => void;
  large?: boolean;
}) {
  const uncovered = !day.hasCoverage;
  const d = parseDateOnly(day.date);
  const dayNum = d.getUTCDate();

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group relative flex w-full flex-col rounded-lg border p-1 text-left transition-colors",
        large ? "min-h-[5.5rem] p-3" : "aspect-[4/5] min-h-[4rem] sm:min-h-[4.5rem] sm:p-1.5",
        uncovered
          ? "border-red-300/60 bg-red-500/15 hover:bg-red-500/25"
          : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5",
        "cursor-pointer",
      )}
    >
      <div className="flex items-start justify-between gap-0.5">
        <span
          className={cn(
            "text-xs font-bold sm:text-sm",
            uncovered ? "text-red-800 dark:text-red-200" : "text-[var(--foreground)]",
          )}
        >
          {dayNum}
        </span>
        <span className="text-[9px] font-medium text-[var(--muted-foreground)]">
          {day.weekdayLabel}
        </span>
      </div>

      {day.blocks.length > 0 ? (
        <div className="mt-auto flex-1 space-y-0.5 overflow-hidden pt-1">
          {day.blocks.slice(0, large ? 4 : 3).map((b) => {
            const pos = percentInRange(b.startTime, b.endTime, shopStart, shopEnd);
            return (
              <div key={`${b.source}-${b.id}`} className={cn(!large && "hidden sm:block")}>
                <p className="truncate text-[9px] font-medium leading-tight">
                  {b.employeeName.split(" ")[0]}
                </p>
                <div className="relative mt-0.5 h-1.5 rounded-full bg-[var(--muted)]">
                  <div
                    className={cn(
                      "absolute inset-y-0 rounded-full",
                      b.status === "CONFIRMED" ? "bg-emerald-500" : "bg-amber-400",
                    )}
                    style={{ left: `${pos.left}%`, width: `${Math.max(pos.width, 8)}%` }}
                  />
                </div>
              </div>
            );
          })}
          <p className="text-[9px] text-[var(--muted-foreground)] sm:hidden">
            {day.blocks.length} чел.
          </p>
          {day.uncoveredMinutes > 0 && (
            <p className="text-[8px] text-red-600 dark:text-red-400">пробелы</p>
          )}
        </div>
      ) : (
        <p className="mt-auto text-[9px] text-red-600/80">нет смен</p>
      )}
    </button>
  );
}
