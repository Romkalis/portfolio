import {
  BlockType,
  Booking,
  BookingBlock,
  BookingStatus,
  Prisma,
} from '@prisma/booking-client';

export const bookingInclude = {
  options: { include: { option: true } },
} satisfies Prisma.BookingInclude;

export type BookingWithRelations = Prisma.BookingGetPayload<{ include: typeof bookingInclude }>;

export interface CreateBookingInput {
  carId: string;
  customerId?: string;
  pickupLocationId: string;
  returnLocationId: string;
  startAt: Date;
  endAt: Date;
  notes?: string;
  totalPrice?: number;
  optionIds?: string[];
}

export interface ListBookingsQuery {
  page?: number;
  limit?: number;
  carId?: string;
  customerId?: string;
  status?: BookingStatus;
  from?: Date;
  to?: Date;
}

export interface IBookingRepository {
  findMany(query: ListBookingsQuery): Promise<{ data: BookingWithRelations[]; total: number }>;
  findById(id: string): Promise<BookingWithRelations | null>;
  findCalendar(from: Date, to: Date, carId?: string): Promise<BookingWithRelations[]>;
  findOverlappingBookings(carId: string, from: Date, to: Date, excludeId?: string): Promise<Booking[]>;
  findOverlappingBlocks(carId: string, from: Date, to: Date): Promise<BookingBlock[]>;
  create(data: CreateBookingInput): Promise<BookingWithRelations>;
  updateStatus(id: string, status: BookingStatus): Promise<BookingWithRelations>;
  reschedule(id: string, startAt: Date, endAt: Date): Promise<BookingWithRelations>;
  softDelete(id: string): Promise<Booking>;
  createBlock(input: {
    carId: string;
    type: BlockType;
    startAt: Date;
    endAt: Date;
    reason?: string;
    bookingId?: string;
  }): Promise<BookingBlock>;
  deleteBlock(id: string): Promise<BookingBlock>;
  findBlocks(carId: string, from: Date, to: Date): Promise<BookingBlock[]>;
  getCleaningBufferHours(): Promise<number>;
  getLocalSettings(): Promise<{ cleaningBufferHours: number }>;
  updateLocalSettings(cleaningBufferHours: number): Promise<{ cleaningBufferHours: number }>;
  createCleaningBufferAfterBooking(
    bookingId: string,
    carId: string,
    endAt: Date,
  ): Promise<BookingBlock>;
}

export const BOOKING_REPOSITORY = Symbol('BOOKING_REPOSITORY');
