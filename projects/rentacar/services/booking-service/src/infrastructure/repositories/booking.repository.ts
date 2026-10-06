import { Injectable } from '@nestjs/common';
import { BlockType, BookingStatus } from '@prisma/booking-client';
import { notDeleted } from '@rentacar/prisma';
import { addHoursUtc } from '@rentacar/shared-utils';
import {
  bookingInclude,
  CreateBookingInput,
  IBookingRepository,
  ListBookingsQuery,
} from '../../domain/repositories/booking.repository.interface';
import { BookingConfigService } from '../../config/booking-config.service';
import { PlatformSettingsClient } from '../settings/platform-settings.client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingRepository implements IBookingRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: BookingConfigService,
    private readonly platformSettings: PlatformSettingsClient,
  ) {}

  async findMany(query: ListBookingsQuery) {
    const page = query.page ?? 1;
    const limit = Math.min(query.limit ?? 20, 100);
    const skip = (page - 1) * limit;

    const where = {
      ...notDeleted(),
      carId: query.carId,
      customerId: query.customerId,
      status: query.status,
      ...(query.from && query.to
        ? { AND: [{ startAt: { lt: query.to } }, { endAt: { gt: query.from } }] }
        : {}),
    };

    const [total, data] = await Promise.all([
      this.prisma.booking.count({ where }),
      this.prisma.booking.findMany({
        where,
        include: bookingInclude,
        orderBy: { startAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    return { data, total };
  }

  findById(id: string) {
    return this.prisma.booking.findFirst({
      where: { id, ...notDeleted() },
      include: bookingInclude,
    });
  }

  findCalendar(from: Date, to: Date, carId?: string) {
    return this.prisma.booking.findMany({
      where: {
        ...notDeleted(),
        carId,
        status: { not: BookingStatus.cancelled },
        AND: [{ startAt: { lt: to } }, { endAt: { gt: from } }],
      },
      include: bookingInclude,
      orderBy: { startAt: 'asc' },
    });
  }

  findOverlappingBookings(carId: string, from: Date, to: Date, excludeId?: string) {
    return this.prisma.booking.findMany({
      where: {
        carId,
        ...notDeleted(),
        id: excludeId ? { not: excludeId } : undefined,
        status: { notIn: [BookingStatus.cancelled] },
        AND: [{ startAt: { lt: to } }, { endAt: { gt: from } }],
      },
    });
  }

  findOverlappingBlocks(carId: string, from: Date, to: Date) {
    return this.prisma.bookingBlock.findMany({
      where: {
        carId,
        deletedAt: null,
        AND: [{ startAt: { lt: to } }, { endAt: { gt: from } }],
      },
    });
  }

  async create(data: CreateBookingInput) {
    const options = data.optionIds?.length
      ? await this.prisma.bookingOption.findMany({
          where: { id: { in: data.optionIds }, isActive: true },
        })
      : [];

    return this.prisma.booking.create({
      data: {
        carId: data.carId,
        customerId: data.customerId,
        pickupLocationId: data.pickupLocationId,
        returnLocationId: data.returnLocationId,
        startAt: data.startAt,
        endAt: data.endAt,
        notes: data.notes,
        totalPrice: data.totalPrice,
        options: options.length
          ? {
              create: options.map((option) => ({
                optionId: option.id,
                quantity: 1,
                unitPrice: option.pricePerDay,
              })),
            }
          : undefined,
      },
      include: bookingInclude,
    });
  }

  updateStatus(id: string, status: BookingStatus) {
    return this.prisma.booking.update({
      where: { id },
      data: { status },
      include: bookingInclude,
    });
  }

  reschedule(id: string, startAt: Date, endAt: Date) {
    return this.prisma.booking.update({
      where: { id },
      data: { startAt, endAt },
      include: bookingInclude,
    });
  }

  softDelete(id: string) {
    return this.prisma.booking.update({
      where: { id },
      data: { deletedAt: new Date(), isArchived: true, status: BookingStatus.cancelled },
    });
  }

  createBlock(input: {
    carId: string;
    type: BlockType;
    startAt: Date;
    endAt: Date;
    reason?: string;
    bookingId?: string;
  }) {
    return this.prisma.bookingBlock.create({ data: input });
  }

  deleteBlock(id: string) {
    return this.prisma.bookingBlock.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  findBlocks(carId: string, from: Date, to: Date) {
    return this.prisma.bookingBlock.findMany({
      where: {
        carId,
        deletedAt: null,
        AND: [{ startAt: { lt: to } }, { endAt: { gt: from } }],
      },
      orderBy: { startAt: 'asc' },
    });
  }

  async getLocalSettings() {
    const settings = await this.prisma.bookingSettings.upsert({
      where: { id: 'default' },
      create: { id: 'default', cleaningBufferHours: this.config.defaultCleaningBufferHours },
      update: {},
    });
    return { cleaningBufferHours: settings.cleaningBufferHours };
  }

  async updateLocalSettings(cleaningBufferHours: number) {
    const settings = await this.prisma.bookingSettings.upsert({
      where: { id: 'default' },
      create: { id: 'default', cleaningBufferHours },
      update: { cleaningBufferHours },
    });
    return { cleaningBufferHours: settings.cleaningBufferHours };
  }

  async getCleaningBufferHours() {
    const fromPlatform = await this.platformSettings.getCleaningBufferHours();
    if (fromPlatform !== null) return fromPlatform;

    const settings = await this.prisma.bookingSettings.findUnique({ where: { id: 'default' } });
    return settings?.cleaningBufferHours ?? this.config.defaultCleaningBufferHours;
  }

  async createCleaningBufferAfterBooking(bookingId: string, carId: string, endAt: Date) {
    const hours = await this.getCleaningBufferHours();
    return this.createBlock({
      carId,
      type: BlockType.cleaning,
      startAt: endAt,
      endAt: addHoursUtc(endAt, hours),
      bookingId,
      reason: 'Post-booking cleaning buffer',
    });
  }
}
