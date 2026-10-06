"use client";

import { useMemo, useState } from "react";
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from "date-fns";
import { ru } from "date-fns/locale";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  formatAvailabilityRange,
  formatSelectableAvailabilityRange,
  getCurrentWeekDays,
  getMonthAvailabilityDays,
  isAvailabilityDaySelectable,
} from "@/shared/lib/availability-window";
import { cn, localDateToYmd } from "@/shared/lib/utils";
import { createShiftRequestsBatch } from "./actions";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import type { ShiftStatus } from "@prisma/client";

export type ExistingRequestDay = {
  date: string;
  status: ShiftStatus;
};

const statusDot: Record<ShiftStatus, string> = {
  PENDING: "bg-amber-400",
  CONFIRMED: "bg-emerald-500",
  REJECTED: "bg-red-400",
};

const statusTitle: Record<ShiftStatus, string> = {
  PENDING: "На согласовании",
  CONFIRMED: "Подтверждено",
  REJECTED: "Отклонено — можно выбрать снова",
};

const WEEKDAY_LABELS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] as const;

export function AvailabilityCalendar({
  existingRequests,
  shopStartTime,
  shopEndTime,
}: {
  existingRequests: ExistingRequestDay[];
  shopStartTime: string;
  shopEndTime: string;
}) {
  const router = useRouter();
  const weekDays = useMemo(() => getCurrentWeekDays(), []);
  const monthDays = useMemo(() => getMonthAvailabilityDays(), []);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [comment, setComment] = useState("");
  const [startTime, setStartTime] = useState(shopStartTime);
  const [endTime, setEndTime] = useState(shopEndTime);
  const [loading, setLoading] = useState(false);

  const statusByDate = useMemo(() => {
    const map = new Map<string, ShiftStatus>();
    for (const r of existingRequests) {
      map.set(r.date.slice(0, 10), r.status);
    }
    return map;
  }, [existingRequests]);

  const toggleDay = (day: Date) => {
    if (!isAvailabilityDaySelectable(day)) return;
    const ymd = localDateToYmd(day);
    const status = statusByDate.get(ymd);
    if (status === "PENDING" || status === "CONFIRMED") return;

    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(ymd)) next.delete(ymd);
      else next.add(ymd);
      return next;
    });
  };

  const submit = async () => {
    if (selected.size === 0) {
      toast.error("Выберите хотя бы один день");
      return;
    }
    setLoading(true);
    if (endTime <= startTime) {
      toast.error("Время окончания должно быть позже начала");
      return;
    }
    const res = await createShiftRequestsBatch(
      [...selected],
      startTime,
      endTime,
      comment || undefined,
    );
    setLoading(false);
    if (res.error) {
      toast.error(typeof res.error === "string" ? res.error : "Проверьте данные");
      return;
    }
    const created = res.created ?? selected.size;
    const skipped = res.skipped ?? 0;
    toast.success(
      skipped > 0
        ? `Отправлено: ${created} (${skipped} уже в системе)`
        : `Отправлено заявок: ${created}`,
    );
    setSelected(new Set());
    setComment("");
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-8">
      <div className="w-full max-w-[17.5rem] shrink-0">
        <p className="mb-2 text-xs text-[var(--muted-foreground)] leading-snug">
          Выберите дни. Заявка уходит мастеру.
        </p>

        <div
          className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-sm"
          role="group"
          aria-label="Выбор дней для смены"
        >
          <Tabs defaultValue="week">
            <TabsList className="mb-2 grid h-8 w-full grid-cols-2 p-0.5">
              <TabsTrigger value="week" className="h-7 px-2 text-xs">
                Неделя
              </TabsTrigger>
              <TabsTrigger value="month" className="h-7 px-2 text-xs">
                30 дней
              </TabsTrigger>
            </TabsList>

            <TabsContent value="week" className="mt-0 space-y-2">
              <PickerCaption>
                {formatAvailabilityRange(weekDays)}
                <span className="block text-[10px] font-normal normal-case opacity-80">
                  {formatSelectableAvailabilityRange(weekDays)
                    ? `можно выбрать: ${formatSelectableAvailabilityRange(weekDays)}`
                    : "в этой неделе нет доступных дней"}
                </span>
              </PickerCaption>
              <PickerGrid
                gridDays={weekDays}
                periodDays={weekDays}
                selected={selected}
                statusByDate={statusByDate}
                onToggle={toggleDay}
              />
            </TabsContent>

            <TabsContent value="month" className="mt-0 space-y-2">
              <PickerCaption>{formatAvailabilityRange(monthDays)}</PickerCaption>
              <PickerGrid
                gridDays={monthGridDays(monthDays)}
                periodDays={monthDays}
                selected={selected}
                statusByDate={statusByDate}
                onToggle={toggleDay}
              />
            </TabsContent>
          </Tabs>

          <PickerLegend className="mt-2 border-t border-[var(--border)] pt-2" />
        </div>

        <div className="mt-3 space-y-2">
          <p className="text-xs text-[var(--muted-foreground)]">
            Ваше время в смену (в пределах {shopStartTime}–{shopEndTime})
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="avail-start" className="text-xs">
                С
              </Label>
              <Input
                id="avail-start"
                type="time"
                className="h-8 text-sm"
                min={shopStartTime}
                max={shopEndTime}
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="avail-end" className="text-xs">
                До
              </Label>
              <Input
                id="avail-end"
                type="time"
                className="h-8 text-sm"
                min={shopStartTime}
                max={shopEndTime}
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <Label htmlFor="avail-comment" className="text-xs">
            Комментарий
          </Label>
          <Input
            id="avail-comment"
            placeholder="Необязательно"
            className="h-8 text-sm"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex items-center justify-between gap-2 text-xs text-[var(--muted-foreground)]">
            <span>
              Выбрано: <strong className="text-[var(--foreground)]">{selected.size}</strong>
            </span>
            <Button
              type="button"
              size="sm"
              className="h-8 px-3 text-xs"
              onClick={submit}
              disabled={loading || selected.size === 0}
            >
              {loading ? "…" : "Отправить"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PickerCaption({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center text-[11px] font-medium capitalize text-[var(--muted-foreground)]">
      {children}
    </p>
  );
}

function PickerLegend({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap justify-center gap-x-2 gap-y-1 text-[10px] text-[var(--muted-foreground)]", className)}>
      <span className="inline-flex items-center gap-1">
        <span className="size-2 rounded-full ring-2 ring-[var(--primary)] bg-[var(--primary)]/30" />
        выбрано
      </span>
      <span className="inline-flex items-center gap-1">
        <span className={cn("size-1.5 rounded-full", statusDot.PENDING)} />
        ожид.
      </span>
      <span className="inline-flex items-center gap-1">
        <span className={cn("size-1.5 rounded-full", statusDot.CONFIRMED)} />
        ок
      </span>
    </div>
  );
}

function monthGridDays(days: Date[]): Date[] {
  if (days.length === 0) return [];
  const gridStart = startOfWeek(days[0], { weekStartsOn: 1 });
  const gridEnd = endOfWeek(days[days.length - 1], { weekStartsOn: 1 });
  return eachDayOfInterval({ start: gridStart, end: gridEnd });
}

function PickerGrid({
  gridDays,
  periodDays,
  selected,
  statusByDate,
  onToggle,
}: {
  gridDays: Date[];
  periodDays: Date[];
  selected: Set<string>;
  statusByDate: Map<string, ShiftStatus>;
  onToggle: (day: Date) => void;
}) {
  const inPeriod = useMemo(
    () => new Set(periodDays.map(localDateToYmd)),
    [periodDays],
  );

  return (
    <div className="space-y-0.5">
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {WEEKDAY_LABELS.map((d) => (
          <span key={d} className="py-0.5 text-[10px] font-medium text-[var(--muted-foreground)]">
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {gridDays.map((day) => {
          const ymd = localDateToYmd(day);
          if (!inPeriod.has(ymd)) {
            return <div key={ymd} className="h-8 w-8" aria-hidden />;
          }
          return (
            <DayCell
              key={ymd}
              day={day}
              selectable={isAvailabilityDaySelectable(day)}
              selected={selected.has(ymd)}
              status={statusByDate.get(ymd)}
              onToggle={onToggle}
            />
          );
        })}
      </div>
    </div>
  );
}

function DayCell({
  day,
  selectable,
  selected,
  status,
  onToggle,
}: {
  day: Date;
  selectable: boolean;
  selected: boolean;
  status?: ShiftStatus;
  onToggle: (day: Date) => void;
}) {
  const disabled =
    !selectable || status === "PENDING" || status === "CONFIRMED";
  const title = [
    format(day, "d MMMM yyyy", { locale: ru }),
    !selectable ? "Прошедший или текущий день" : undefined,
    status ? statusTitle[status] : undefined,
    selected ? "Выбрано" : undefined,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onToggle(day)}
      title={title}
      className={cn(
        "relative flex h-8 w-8 flex-col items-center justify-center rounded-md border text-[11px] font-medium transition-colors",
        disabled && "cursor-not-allowed",
        !selectable && "opacity-35",
        selectable && disabled && "opacity-55",
        !disabled && "cursor-pointer hover:border-[var(--primary)] hover:bg-[var(--primary)]/8",
        selected && !disabled && "border-[var(--primary)] bg-[var(--primary)]/15 text-[var(--primary)] ring-1 ring-[var(--primary)]",
        status === "PENDING" && !selected && "border-amber-400/40 bg-amber-500/10",
        status === "CONFIRMED" && !selected && "border-emerald-500/40 bg-emerald-500/10",
        status === "REJECTED" && !selected && "border-red-400/30 bg-red-500/5",
        !selected && !status && "border-transparent bg-transparent text-[var(--foreground)]",
      )}
    >
      {format(day, "d")}
      {(status || selected) && (
        <span
          className={cn(
            "absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full",
            selected && !status && "bg-[var(--primary)]",
            status && statusDot[status],
          )}
        />
      )}
    </button>
  );
}
