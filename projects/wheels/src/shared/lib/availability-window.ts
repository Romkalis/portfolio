import { addDays, eachDayOfInterval, endOfWeek, format, startOfWeek } from "date-fns";
import { ru } from "date-fns/locale";
import { localDateToYmd } from "./utils";

const WEEK_OPTS = { weekStartsOn: 1 as const };

export function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Можно выбрать только дни после сегодня (с завтра). */
export function isAvailabilityDaySelectable(day: Date, reference = new Date()): boolean {
  const dayStart = startOfLocalDay(day).getTime();
  const tomorrow = addDays(startOfLocalDay(reference), 1).getTime();
  return dayStart >= tomorrow;
}

/** Понедельник–воскресенье текущей недели (включая прошедшие дни — для отображения). */
export function getCurrentWeekDays(reference = new Date()): Date[] {
  const start = startOfWeek(reference, WEEK_OPTS);
  return eachDayOfInterval({ start, end: addDays(start, 6) });
}

/** 30 календарных дней, начиная с завтра. */
export function getMonthAvailabilityDays(reference = new Date()): Date[] {
  const start = addDays(startOfLocalDay(reference), 1);
  return eachDayOfInterval({ start, end: addDays(start, 29) });
}

/** Дни, которые можно отправить в заявке (неделя ∩ с завтра + 30 дней). */
export function getSelectableAvailabilityYmdSet(reference = new Date()): Set<string> {
  const week = getCurrentWeekDays(reference).filter((d) =>
    isAvailabilityDaySelectable(d, reference),
  );
  const month = getMonthAvailabilityDays(reference);
  return new Set([...week, ...month].map(localDateToYmd));
}

export function formatAvailabilityRange(days: Date[]): string {
  if (days.length === 0) return "";
  const first = format(days[0], "d MMM", { locale: ru });
  const last = format(days[days.length - 1], "d MMM yyyy", { locale: ru });
  return `${first} — ${last}`;
}

export function formatSelectableAvailabilityRange(
  days: Date[],
  reference = new Date(),
): string {
  const selectable = days.filter((d) => isAvailabilityDaySelectable(d, reference));
  return formatAvailabilityRange(selectable);
}
