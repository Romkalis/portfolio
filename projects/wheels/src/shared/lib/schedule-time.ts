/** Минуты от полуночи для "HH:mm". */
export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export type TimeInterval = { start: number; end: number };

export function mergeIntervals(intervals: TimeInterval[]): TimeInterval[] {
  if (intervals.length === 0) return [];
  const sorted = [...intervals].sort((a, b) => a.start - b.start);
  const merged: TimeInterval[] = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const last = merged[merged.length - 1];
    const cur = sorted[i];
    if (cur.start <= last.end) {
      last.end = Math.max(last.end, cur.end);
    } else {
      merged.push({ ...cur });
    }
  }
  return merged;
}

export function intervalMinutes(interval: TimeInterval): number {
  return Math.max(0, interval.end - interval.start);
}

/** Непокрытые минуты внутри [shopStart, shopEnd] после вычитания блоков сотрудников. */
export function uncoveredMinutes(
  shopStart: string,
  shopEnd: string,
  blocks: { startTime: string; endTime: string }[],
): number {
  const shop: TimeInterval = {
    start: timeToMinutes(shopStart),
    end: timeToMinutes(shopEnd),
  };
  if (shop.end <= shop.start) return 0;

  const employeeIntervals = mergeIntervals(
    blocks
      .map((b) => ({
        start: Math.max(shop.start, timeToMinutes(b.startTime)),
        end: Math.min(shop.end, timeToMinutes(b.endTime)),
      }))
      .filter((i) => i.end > i.start),
  );

  let uncovered = shop.end - shop.start;
  for (const block of employeeIntervals) {
    uncovered -= intervalMinutes(block);
  }
  return Math.max(0, uncovered);
}

export function hasScheduleCoverage(
  shopStart: string,
  shopEnd: string,
  blocks: { startTime: string; endTime: string }[],
): boolean {
  if (blocks.length === 0) return false;
  return uncoveredMinutes(shopStart, shopEnd, blocks) === 0;
}

/** ISO weekday: 1 = пн … 7 = вс */
export function isoWeekdayFromDate(date: Date): number {
  const d = date.getDay();
  return d === 0 ? 7 : d;
}

export function percentInRange(
  startTime: string,
  endTime: string,
  rangeStart: string,
  rangeEnd: string,
): { left: number; width: number } {
  const rs = timeToMinutes(rangeStart);
  const re = timeToMinutes(rangeEnd);
  const span = re - rs;
  if (span <= 0) return { left: 0, width: 0 };
  const s = Math.max(rs, timeToMinutes(startTime));
  const e = Math.min(re, timeToMinutes(endTime));
  if (e <= s) return { left: 0, width: 0 };
  return {
    left: ((s - rs) / span) * 100,
    width: ((e - s) / span) * 100,
  };
}
