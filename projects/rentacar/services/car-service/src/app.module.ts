import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CarConfigModule } from './config/car-config.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { StorageModule } from './infrastructure/storage/storage.module';
import { CarsModule } from './presentation/cars/cars.module';
import { CarPhotosModule } from './presentation/photos/car-photos.module';
import { LocationsModule } from './presentation/locations/locations.module';
import { HealthModule } from './presentation/health/health.module';
import { AuthModule } from './presentation/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CarConfigModule,
    PrismaModule,
    StorageModule,
    AuthModule,
    CarsModule,
    CarPhotosModule,
    LocationsModule,
    HealthModule,
  ],
})
export class AppModule {}
