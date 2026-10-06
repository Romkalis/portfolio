import { BookingStatus } from '@prisma/booking-client';
import { BadRequestException } from '@nestjs/common';

const ALLOWED: Record<BookingStatus, BookingStatus[]> = {
  [BookingStatus.pending]: [BookingStatus.confirmed, BookingStatus.cancelled],
  [BookingStatus.confirmed]: [BookingStatus.active, BookingStatus.cancelled],
  [BookingStatus.active]: [
    BookingStatus.completed,
    BookingStatus.overdue,
    BookingStatus.cancelled,
  ],
  [BookingStatus.overdue]: [
    BookingStatus.active,
    BookingStatus.completed,
    BookingStatus.cancelled,
  ],
  [BookingStatus.completed]: [],
  [BookingStatus.cancelled]: [],
};

export function assertStatusTransition(from: BookingStatus, to: BookingStatus) {
  if (from === to) return;
  const allowed = ALLOWED[from] ?? [];
  if (!allowed.includes(to)) {
    throw new BadRequestException(`Cannot transition booking from ${from} to ${to}`);
  }
}
