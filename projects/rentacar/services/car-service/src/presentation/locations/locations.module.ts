import { Module } from '@nestjs/common';
import { LocationsService } from '../../application/locations/locations.service';
import { LOCATION_REPOSITORY } from '../../domain/repositories/location.repository.interface';
import { LocationRepository } from '../../infrastructure/repositories/location.repository';
import { LocationsController } from './locations.controller';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService, { provide: LOCATION_REPOSITORY, useClass: LocationRepository }],
})
export class LocationsModule {}
