import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookingStatus } from '@prisma/booking-client';
import { DomainEventType } from '@rentacar/shared-types';
import { toUtcDate } from '@rentacar/shared-utils';
import { BookingEventsService } from '../../infrastructure/events/booking-events.service';
import { BookingPricingClient } from '../../infrastructure/pricing/booking-pricing.client';
import {
  BOOKING_REPOSITORY,
  IBookingRepository,
} from '../../domain/repositories/booking.repository.interface';
import { AuditService } from '../../infrastructure/audit/audit.service';
import { OverlapService } from '../../modules/overlap/overlap.service';
import { assertStatusTransition } from './booking-status.transitions';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { CalendarQueryDto } from '../../presentation/bookings/dto/calendar-query.dto';
import { CheckAvailabilityDto } from '../../presentation/bookings/dto/check-availability.dto';
import { CreateBlockDto } from '../../presentation/bookings/dto/create-block.dto';
import { CreateBookingDto } from '../../presentation/bookings/dto/create-booking.dto';
import { RescheduleBookingDto } from '../../presentation/bookings/dto/reschedule-booking.dto';
import { UpdateBookingStatusDto } from '../../presentation/bookings/dto/update-booking-status.dto';
import { ListBookingsQueryDto } from '../../presentation/bookings/dto/list-bookings-query.dto';
import { UpdateBookingSettingsDto } from '../../presentation/bookings/dto/update-booking-settings.dto';
import { ListBlocksQueryDto } from '../../presentation/bookings/dto/list-blocks-query.dto';

@Injectable()
export class BookingsService {
  constructor(
    @Inject(BOOKING_REPOSITORY) private readonly bookings: IBookingRepository,
    private readonly overlap: OverlapService,
    private readonly audit: AuditService,
    private readonly events: BookingEventsService,
    private readonly pricing: BookingPricingClient,
    private readonly prisma: PrismaService,
  ) {}

  list(query: ListBookingsQueryDto) {
    const page = query.page ?? 1;
    const limit = Math.min(query.limit ?? 20, 100);
    return this.bookings
      .findMany({
        page,
        limit,
        carId: query.carId,
        customerId: query.customerId,
        status: query.status,
        from: query.from ? toUtcDate(query.from) : undefined,
        to: query.to ? toUtcDate(query.to) : undefined,
      })
      .then(({ data, total }) => ({
        data,
        meta: { page, limit, total, totalPages: Math.ceil(total / limit) || 1 },
      }));
  }

  listOptions() {
    return this.prisma.bookingOption.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  getSettings() {
    return this.bookings.getLocalSettings();
  }

  updateSettings(dto: UpdateBookingSettingsDto, changedBy?: string) {
    return this.bookings.updateLocalSettings(dto.cleaningBufferHours).then(async (settings) => {
      await this.audit.log({
        entity: 'BookingSettings',
        entityId: 'default',
        action: 'UPDATE',
        newValue: settings,
        changedBy,
      });
      return settings;
    });
  }

  listBlocks(query: ListBlocksQueryDto) {
    const from = toUtcDate(query.from);
    const to = toUtcDate(query.to);
    if (from >= to) throw new BadRequestException('Invalid date range');
    return this.bookings.findBlocks(query.carId, from, to);
  }

  async deleteBlock(blockId: string, changedBy?: string) {
    const block = await this.bookings.deleteBlock(blockId);
    await this.audit.log({
      entity: 'BookingBlock',
      entityId: blockId,
      action: 'DELETE',
      changedBy,
    });
    return block;
  }

  async create(dto: CreateBookingDto, changedBy?: string) {
    const range = this.parseRange(dto.startAt, dto.endAt);
    await this.assertAvailable(dto.carId, range.startAt, range.endAt);

    let totalPrice = dto.totalPrice;
    if (totalPrice === undefined && dto.basePricePerDay !== undefined) {
      const optionsTotal = await this.calculateOptionsTotal(dto);
      const calculated = await this.pricing.calculate({
        carId: dto.carId,
        startAt: dto.startAt,
        endAt: dto.endAt,
        basePricePerDay: dto.basePricePerDay,
        customerBookingCount: dto.customerBookingCount,
        optionsTotal,
      });
      if (calculated) totalPrice = calculated.total;
    }

    const booking = await this.bookings.create({
      carId: dto.carId,
      customerId: dto.customerId,
      pickupLocationId: dto.pickupLocationId,
      returnLocationId: dto.returnLocationId,
      startAt: range.startAt,
      endAt: range.endAt,
      totalPrice,
      notes: dto.notes,
      optionIds: dto.options?.map((option) => option.bookingOptionId),
    });

    await this.audit.log({
      entity: 'Booking',
      entityId: booking.id,
      action: 'CREATE',
      newValue: { carId: booking.carId, startAt: booking.startAt, endAt: booking.endAt },
      changedBy,
    });

    await this.events.publish(DomainEventType.BOOKING_CREATED, booking.id, {
      carId: booking.carId,
      customerId: booking.customerId,
      startAt: booking.startAt.toISOString(),
      endAt: booking.endAt.toISOString(),
    });

    return booking;
  }

  async getCalendar(query: CalendarQueryDto) {
    const from = toUtcDate(query.from);
    const to = toUtcDate(query.to);
    if (from >= to) throw new BadRequestException('Invalid calendar range');

    const bookings = await this.bookings.findCalendar(from, to, query.carId);
    const blocks = query.carId
      ? await this.bookings.findOverlappingBlocks(query.carId, from, to)
      : [];

    return { bookings, blocks };
  }

  async getById(id: string) {
    const booking = await this.bookings.findById(id);
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async reschedule(id: string, dto: RescheduleBookingDto, changedBy?: string) {
    const existing = await this.getById(id);
    const range = this.parseRange(dto.startAt, dto.endAt);

    const availability = await this.checkAvailability({
      carId: existing.carId,
      startAt: dto.startAt,
      endAt: dto.endAt,
      excludeBookingId: id,
    });

    if (!availability.available) {
      throw new ConflictException('Car is not available for selected dates');
    }

    const updated = await this.bookings.reschedule(id, range.startAt, range.endAt);

    await this.audit.log({
      entity: 'Booking',
      entityId: id,
      action: 'RESCHEDULE',
      oldValue: { startAt: existing.startAt, endAt: existing.endAt },
      newValue: { startAt: updated.startAt, endAt: updated.endAt },
      changedBy,
    });

    return updated;
  }

  async updateStatus(id: string, dto: UpdateBookingStatusDto, changedBy?: string) {
    const existing = await this.getById(id);
    assertStatusTransition(existing.status, dto.status);
    const updated = await this.bookings.updateStatus(id, dto.status);

    if (dto.status === BookingStatus.completed && existing.status !== BookingStatus.completed) {
      await this.bookings.createCleaningBufferAfterBooking(
        updated.id,
        updated.carId,
        updated.endAt,
      );
    }

    await this.audit.log({
      entity: 'Booking',
      entityId: id,
      action: 'STATUS_CHANGE',
      oldValue: { status: existing.status },
      newValue: { status: updated.status },
      changedBy,
    });

    if (dto.status === BookingStatus.completed) {
      await this.events.publish(DomainEventType.BOOKING_COMPLETED, id, {
        carId: updated.carId,
        endAt: updated.endAt.toISOString(),
      });
    }
    if (dto.status === BookingStatus.cancelled) {
      await this.events.publish(DomainEventType.BOOKING_CANCELLED, id, {
        carId: updated.carId,
      });
    }

    return updated;
  }

  async checkAvailability(dto: CheckAvailabilityDto) {
    const start = toUtcDate(dto.startAt);
    const end = toUtcDate(dto.endAt);
    if (start >= end) throw new BadRequestException('Invalid date range');

    const bufferHours = await this.bookings.getCleaningBufferHours();
    const [overlaps, blocks] = await Promise.all([
      this.bookings.findOverlappingBookings(dto.carId, start, end, dto.excludeBookingId),
      this.bookings.findOverlappingBlocks(dto.carId, start, end),
    ]);

    const hasBookingOverlap = overlaps.some((booking) =>
      this.overlap.hasOverlap(start, end, booking.startAt, booking.endAt, bufferHours),
    );
    const hasBlockOverlap = blocks.some((block) =>
      this.overlap.hasOverlap(start, end, block.startAt, block.endAt),
    );

    return {
      available: !hasBookingOverlap && !hasBlockOverlap,
      reasons: {
        bookingOverlap: hasBookingOverlap,
        blockOverlap: hasBlockOverlap,
      },
      cleaningBufferHours: bufferHours,
    };
  }

  async createBlock(dto: CreateBlockDto, changedBy?: string) {
    const range = this.parseRange(dto.startAt, dto.endAt);
    const availability = await this.checkAvailability({
      carId: dto.carId,
      startAt: dto.startAt,
      endAt: dto.endAt,
    });

    if (!availability.available) {
      throw new ConflictException('Block overlaps existing reservation');
    }

    const block = await this.bookings.createBlock({
      carId: dto.carId,
      type: dto.type,
      startAt: range.startAt,
      endAt: range.endAt,
      reason: dto.reason,
    });

    await this.audit.log({
      entity: 'BookingBlock',
      entityId: block.id,
      action: 'CREATE',
      newValue: { ...dto },
      changedBy,
    });

    return block;
  }

  async remove(id: string, changedBy?: string) {
    await this.getById(id);
    const booking = await this.bookings.softDelete(id);

    await this.audit.log({
      entity: 'Booking',
      entityId: id,
      action: 'SOFT_DELETE',
      changedBy,
    });

    await this.events.publish(DomainEventType.BOOKING_CANCELLED, id, {
      carId: booking.carId,
      reason: 'soft_delete',
    });

    return booking;
  }

  private parseRange(startAt: string, endAt: string) {
    const start = toUtcDate(startAt);
    const end = toUtcDate(endAt);
    if (start >= end) throw new BadRequestException('Invalid date range');
    return { startAt: start, endAt: end };
  }

  private async calculateOptionsTotal(dto: CreateBookingDto) {
    if (!dto.options?.length) return 0;
    const options = await this.prisma.bookingOption.findMany({
      where: { id: { in: dto.options.map((o) => o.bookingOptionId) }, isActive: true },
    });
    return options.reduce((sum, option) => sum + Number(option.pricePerDay), 0);
  }

  private async assertAvailable(carId: string, startAt: Date, endAt: Date) {
    const result = await this.checkAvailability({
      carId,
      startAt: startAt.toISOString(),
      endAt: endAt.toISOString(),
    });

    if (!result.available) {
      throw new ConflictException('Car is not available for selected dates');
    }
  }
}
