import { Module } from '@nestjs/common';
import { CarsService } from '../../application/cars/cars.service';
import { CAR_REPOSITORY } from '../../domain/repositories/car.repository.interface';
import { LOCATION_REPOSITORY } from '../../domain/repositories/location.repository.interface';
import { AuditService } from '../../infrastructure/audit/audit.service';
import { CarEventsService } from '../../infrastructure/events/car-events.service';
import { CarRepository } from '../../infrastructure/repositories/car.repository';
import { LocationRepository } from '../../infrastructure/repositories/location.repository';
import { CarsController } from './cars.controller';

@Module({
  controllers: [CarsController],
  providers: [
    CarsService,
    AuditService,
    CarEventsService,
    { provide: CAR_REPOSITORY, useClass: CarRepository },
    { provide: LOCATION_REPOSITORY, useClass: LocationRepository },
  ],
})
export class CarsModule {}
