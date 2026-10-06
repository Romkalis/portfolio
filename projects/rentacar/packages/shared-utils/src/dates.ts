/**
 * All DB timestamps are stored in UTC.
 * Convert to user timezone only at presentation layer.
 */

export function toUtcDate(input: Date | string | number): Date {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) {
    throw new Error('Invalid date input');
  }
  return new Date(d.toISOString());
}

export function toUtcIsoString(input: Date | string | number): string {
  return toUtcDate(input).toISOString();
}

/** Parse local calendar date + time in a location timezone → UTC Date */
export function localToUtc(
  dateStr: string,
  timeStr: string,
  timeZone: string,
): Date {
  const localIso = `${dateStr}T${timeStr}:00`;
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const probe = new Date(localIso + 'Z');
  const parts = formatter.formatToParts(probe);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? '00';

  const reconstructed = `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}`;
  const utcMs = Date.parse(reconstructed + 'Z');
  const offset =
    probe.getTime() -
    new Date(
      `${dateStr}T${timeStr}:00`.replace(
        /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/,
        '$1-$2-$3T$4:$5:00',
      ),
    ).getTime();

  return new Date(Date.parse(localIso) - offset);
}

export function formatInTimezone(date: Date, timeZone: string, locale = 'ru-RU'): string {
  return new Intl.DateTimeFormat(locale, {
    timeZone,
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export function addHoursUtc(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}
