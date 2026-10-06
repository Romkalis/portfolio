import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ILocationRepository,
  LOCATION_REPOSITORY,
} from '../../domain/repositories/location.repository.interface';
import { CreateLocationDto } from '../../presentation/locations/dto/create-location.dto';
import { UpdateLocationDto } from '../../presentation/locations/dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(@Inject(LOCATION_REPOSITORY) private readonly locations: ILocationRepository) {}

  list() {
    return this.locations.findMany();
  }

  async getById(id: string) {
    const location = await this.locations.findById(id);
    if (!location) throw new NotFoundException('Location not found');
    return location;
  }

  create(dto: CreateLocationDto) {
    return this.locations.create(dto);
  }

  async update(id: string, dto: UpdateLocationDto) {
    await this.getById(id);
    return this.locations.update(id, dto);
  }

  async remove(id: string) {
    await this.getById(id);
    return this.locations.softDelete(id);
  }
}
