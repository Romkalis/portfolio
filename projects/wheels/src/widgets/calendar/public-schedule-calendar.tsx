import { cn, parseDateOnly } from "@/shared/lib/utils";
import type { CalendarDayData } from "@/services/work-calendar.service";
import { CalendarMonthNav } from "./calendar-month-nav";

const WEEK_HEADERS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] as const;

type GridDay = {
  date: string;
  inMonth: boolean;
  day: CalendarDayData | null;
};

function formatHoursRange(start: string, end: string): string {
  const trim = (t: string) => t.replace(/^0/, "");
  return `${trim(start)}–${trim(end)}`;
}

function firstName(full: string): string {
  return full.split(/\s+/)[0] ?? full;
}

export function PublicScheduleCalendar({
  monthLabel,
  shopStart,
  shopEnd,
  gridDays,
  prevMonthYmd,
  nextMonthYmd,
}: {
  monthLabel: string;
  shopStart: string;
  shopEnd: string;
  gridDays: GridDay[];
  prevMonthYmd: string;
  nextMonthYmd: string;
}) {
  return (
    <div className="mx-auto w-full max-w-[15.5rem] space-y-2">
      <CalendarMonthNav
        monthLabel={monthLabel}
        basePath="/"
        prevMonthYmd={prevMonthYmd}
        nextMonthYmd={nextMonthYmd}
        compact
      />
      <p className="text-center text-[10px] leading-snug text-[var(--muted-foreground)]">
        Режим {shopStart}–{shopEnd}. Красный — выходной (нет сотрудников).
      </p>
      <div className="grid grid-cols-7 gap-px text-center text-[9px] font-medium text-[var(--muted-foreground)]">
        {WEEK_HEADERS.map((h) => (
          <span key={h} className="py-0.5">
            {h}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px">
        {gridDays.map(({ date, inMonth, day }) => {
          if (!inMonth || !day) {
            return <div key={date} className="h-11" aria-hidden />;
          }
          return <PublicDayCell key={date} day={day} />;
        })}
      </div>
    </div>
  );
}

function PublicDayCell({ day }: { day: CalendarDayData }) {
  const isWorking = day.blocks.length > 0;
  const d = parseDateOnly(day.date);
  const dayNum = d.getUTCDate();

  return (
    <div
      className={cn(
        "flex h-11 flex-col rounded px-0.5 py-0.5 text-left",
        isWorking
          ? "bg-[var(--card)] ring-1 ring-[var(--border)]"
          : "bg-red-500/20 ring-1 ring-red-400/40",
      )}
      title={
        isWorking
          ? day.blocks
              .map(
                (b) =>
                  `${b.employeeName}: ${formatHoursRange(b.startTime, b.endTime)}`,
              )
              .join("\n")
          : "Выходной"
      }
    >
      <div className="flex items-center justify-between leading-none">
        <span
          className={cn(
            "text-[10px] font-bold",
            isWorking ? "text-[var(--foreground)]" : "text-red-800 dark:text-red-200",
          )}
        >
          {dayNum}
        </span>
        <span className="text-[8px] text-[var(--muted-foreground)]">{day.weekdayLabel}</span>
      </div>
      {isWorking ? (
        <ul className="mt-0.5 flex-1 space-y-px overflow-hidden">
          {day.blocks.slice(0, 2).map((b) => (
            <li
              key={`${b.source}-${b.id}`}
              className="truncate text-[7px] leading-tight text-[var(--foreground)]"
            >
              {formatHoursRange(b.startTime, b.endTime)}{" "}
              <span className="text-[var(--muted-foreground)]">
                {firstName(b.employeeName)}
              </span>
            </li>
          ))}
          {day.blocks.length > 2 && (
            <li className="text-[7px] text-[var(--muted-foreground)]">
              +{day.blocks.length - 2}
            </li>
          )}
        </ul>
      ) : (
        <span className="mt-auto text-[7px] text-red-700/80 dark:text-red-300/90">—</span>
      )}
    </div>
  );
}
