"use client";

import { useMemo, useState } from "react";
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ru } from "date-fns/locale";
import { cn, formatDate, isShiftOnCalendarDay } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { useUiStore } from "@/shared/store/ui-store";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { AdminDayAssignDialog } from "@/features/shifts/admin-day-assign-dialog";
import type { ShiftStatus } from "@prisma/client";

export type ShiftCalendarItem = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: ShiftStatus;
  employeeId?: string;
  employeeName?: string;
  comment?: string | null;
};

export type EmployeeOption = {
  id: string;
  name: string;
};

const statusBadge: Record<ShiftStatus, { label: string; variant: "success" | "warning" | "danger" }> = {
  CONFIRMED: { label: "Подтверждена", variant: "success" },
  PENDING: { label: "Ожидает", variant: "warning" },
  REJECTED: { label: "Отклонена", variant: "danger" },
};

export function ShiftCalendar({
  shifts,
  anchorDate = new Date(),
  adminEmployees,
  defaultStartTime = "09:00",
  defaultEndTime = "21:00",
}: {
  shifts: ShiftCalendarItem[];
  anchorDate?: Date;
  /** Если передан — клик по дню открывает назначение сотрудников */
  adminEmployees?: EmployeeOption[];
  defaultStartTime?: string;
  defaultEndTime?: string;
}) {
  const view = useUiStore((s) => s.calendarView);
  const [dialogDay, setDialogDay] = useState<Date | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDay = (day: Date) => {
    if (!adminEmployees?.length) return;
    setDialogDay(day);
    setDialogOpen(true);
  };

  const shiftsOnDialogDay = useMemo(() => {
    if (!dialogDay) return [];
    return shifts.filter((s) => isShiftOnCalendarDay(s.date, dialogDay));
  }, [shifts, dialogDay]);

  const calendarBody =
    view === "table" ? (
      <ShiftTable shifts={shifts} />
    ) : view === "month" ? (
      <ShiftMonthView
        shifts={shifts}
        anchorDate={anchorDate}
        editable={!!adminEmployees?.length}
        onDayClick={openDay}
      />
    ) : (
      <ShiftWeekView
        shifts={shifts}
        anchorDate={anchorDate}
        editable={!!adminEmployees?.length}
        onDayClick={openDay}
      />
    );

  return (
    <>
      {calendarBody}
      {adminEmployees && adminEmployees.length > 0 && (
        <p className="mt-3 text-xs text-[var(--muted-foreground)]">
          Нажмите на день в календаре, чтобы назначить или снять сотрудников. В один день можно
          несколько человек.
        </p>
      )}
      {adminEmployees && (
        <AdminDayAssignDialog
          day={dialogDay}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          shiftsOnDay={shiftsOnDialogDay}
          employees={adminEmployees}
          defaultStartTime={defaultStartTime}
          defaultEndTime={defaultEndTime}
        />
      )}
    </>
  );
}

function ShiftTable({ shifts }: { shifts: ShiftCalendarItem[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Дата</TableHead>
          <TableHead>Время</TableHead>
          <TableHead>Сотрудник</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Комментарий</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shifts.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-[var(--muted-foreground)]">
              Нет смен
            </TableCell>
          </TableRow>
        ) : (
          shifts.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{formatDate(s.date)}</TableCell>
              <TableCell>
                {s.startTime} – {s.endTime}
              </TableCell>
              <TableCell>{s.employeeName ?? "—"}</TableCell>
              <TableCell>
                <Badge variant={statusBadge[s.status].variant}>{statusBadge[s.status].label}</Badge>
              </TableCell>
              <TableCell className="max-w-[12rem] truncate">{s.comment ?? "—"}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

function ShiftWeekView({
  shifts,
  anchorDate,
  editable,
  onDayClick,
}: {
  shifts: ShiftCalendarItem[];
  anchorDate: Date;
  editable?: boolean;
  onDayClick?: (day: Date) => void;
}) {
  const start = startOfWeek(anchorDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end: addDays(start, 6) });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-7">
      {days.map((day) => {
        const dayShifts = shifts.filter((s) => isShiftOnCalendarDay(s.date, day));
        return (
          <DayCell
            key={format(day, "yyyy-MM-dd")}
            day={day}
            dayShifts={dayShifts}
            editable={editable}
            onDayClick={onDayClick}
            className="min-h-[8rem]"
          />
        );
      })}
    </div>
  );
}

function ShiftMonthView({
  shifts,
  anchorDate,
  editable,
  onDayClick,
}: {
  shifts: ShiftCalendarItem[];
  anchorDate: Date;
  editable?: boolean;
  onDayClick?: (day: Date) => void;
}) {
  const monthStart = startOfMonth(anchorDate);
  const monthEnd = endOfMonth(anchorDate);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  return (
    <div>
      <p className="mb-3 text-sm font-medium capitalize">
        {format(anchorDate, "LLLL yyyy", { locale: ru })}
      </p>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-[var(--muted-foreground)]">
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d) => (
          <div key={d} className="py-1 font-medium">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const dayShifts = shifts.filter((s) => isShiftOnCalendarDay(s.date, day));
          const count = dayShifts.length;
          return (
            <DayCell
              key={format(day, "yyyy-MM-dd")}
              day={day}
              dayShifts={dayShifts}
              editable={editable}
              onDayClick={onDayClick}
              dimmed={!isSameMonth(day, anchorDate)}
              compact
              count={count}
            />
          );
        })}
      </div>
    </div>
  );
}

function DayCell({
  day,
  dayShifts,
  editable,
  onDayClick,
  className,
  dimmed,
  compact,
  count,
}: {
  day: Date;
  dayShifts: ShiftCalendarItem[];
  editable?: boolean;
  onDayClick?: (day: Date) => void;
  className?: string;
  dimmed?: boolean;
  compact?: boolean;
  count?: number;
}) {
  const shiftCount = count ?? dayShifts.length;
  const Wrapper = editable ? "button" : "div";

  return (
    <Wrapper
      type={editable ? "button" : undefined}
      onClick={editable ? () => onDayClick?.(day) : undefined}
      className={cn(
        compact
          ? "aspect-square rounded-lg border border-[var(--border)] p-1 text-left text-xs sm:p-2"
          : "min-h-[8rem] rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 text-left",
        dimmed && "opacity-40",
        shiftCount > 0 && "border-[var(--primary)]/40 bg-[var(--primary)]/5",
        editable && "cursor-pointer transition-colors hover:border-[var(--primary)] hover:bg-[var(--primary)]/10",
        className,
      )}
    >
      <p
        className={cn(
          "font-semibold text-[var(--muted-foreground)]",
          compact ? "text-xs" : "mb-2 text-xs",
        )}
      >
        {compact ? format(day, "d") : format(day, "EEE d MMM", { locale: ru })}
      </p>
      {compact ? (
        <>
          {shiftCount > 0 && (
            <span className="mt-0.5 block text-[10px] text-[var(--primary)]">
              {shiftCount} {shiftCount === 1 ? "смена" : "смен"}
            </span>
          )}
          {shiftCount > 0 && dayShifts.length <= 2 && (
            <span className="mt-0.5 block truncate text-[9px] text-[var(--muted-foreground)]">
              {dayShifts.map((s) => s.employeeName?.split(" ")[0]).join(", ")}
            </span>
          )}
        </>
      ) : (
        <div className="space-y-2">
          {dayShifts.map((s) => (
            <div key={s.id} className="rounded-md bg-[var(--muted)] p-2 text-xs">
              <p className="font-medium">{s.employeeName}</p>
              <p>
                {s.startTime}–{s.endTime}
              </p>
              <Badge variant={statusBadge[s.status].variant} className="mt-1">
                {statusBadge[s.status].label}
              </Badge>
            </div>
          ))}
          {editable && dayShifts.length === 0 && (
            <p className="text-[10px] text-[var(--muted-foreground)]">+ назначить</p>
          )}
        </div>
      )}
    </Wrapper>
  );
}
