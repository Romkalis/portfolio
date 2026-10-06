import { Module } from '@nestjs/common';
import { BookingsService } from '../../application/bookings/bookings.service';
import { BOOKING_REPOSITORY } from '../../domain/repositories/booking.repository.interface';
import { AuditService } from '../../infrastructure/audit/audit.service';
import { BookingEventsService } from '../../infrastructure/events/booking-events.service';
import { BookingPricingClient } from '../../infrastructure/pricing/booking-pricing.client';
import { BookingRepository } from '../../infrastructure/repositories/booking.repository';
import { PlatformSettingsClient } from '../../infrastructure/settings/platform-settings.client';
import { OverlapModule } from '../../modules/overlap/overlap.module';
import { BookingsController } from './bookings.controller';

@Module({
  imports: [OverlapModule],
  controllers: [BookingsController],
  providers: [
    BookingsService,
    AuditService,
    BookingEventsService,
    BookingPricingClient,
    PlatformSettingsClient,
    { provide: BOOKING_REPOSITORY, useClass: BookingRepository },
  ],
})
export class BookingsModule {}
