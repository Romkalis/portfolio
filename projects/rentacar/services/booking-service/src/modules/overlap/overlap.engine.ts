import { OverlapCheckResult, OverlapConflict, TimeRange } from './overlap.types';

export function rangesOverlap(a: TimeRange, b: TimeRange): boolean {
  return a.startAt < b.endAt && b.startAt < a.endAt;
}

export function detectOverlaps(
  requested: TimeRange,
  bookings: TimeRange[],
  blocks: Array<TimeRange & { id: string; type: 'booking' | 'block'; reason?: string }>,
): OverlapCheckResult {
  const conflicts: OverlapConflict[] = [];

  for (const booking of bookings) {
    if (rangesOverlap(requested, booking)) {
      conflicts.push({
        type: 'booking',
        id: 'booking-range',
        startAt: booking.startAt,
        endAt: booking.endAt,
        reason: 'Overlapping booking',
      });
    }
  }

  for (const block of blocks) {
    if (rangesOverlap(requested, block)) {
      conflicts.push({
        type: 'block',
        id: block.id,
        startAt: block.startAt,
        endAt: block.endAt,
        reason: block.reason ?? block.type,
      });
    }
  }

  return { isAvailable: conflicts.length === 0, conflicts };
}

export function buildCleaningBlock(startAt: Date, endAt: Date, bookingId: string) {
  return {
    carId: '',
    type: 'cleaning' as const,
    startAt,
    endAt,
    bookingId,
    reason: 'Post-booking cleaning buffer',
  };
}
