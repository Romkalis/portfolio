import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookingConfigModule } from './config/booking-config.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { AuthModule } from './presentation/auth/auth.module';
import { BookingsModule } from './presentation/bookings/bookings.module';
import { HealthModule } from './presentation/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BookingConfigModule,
    PrismaModule,
    AuthModule,
    BookingsModule,
    HealthModule,
  ],
})
export class AppModule {}
