import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/car-client';
import { AuditService } from '../../infrastructure/audit/audit.service';
import { CarEventsService } from '../../infrastructure/events/car-events.service';
import {
  CAR_REPOSITORY,
  CarSearchQuery,
  ICarRepository,
} from '../../domain/repositories/car.repository.interface';
import {
  ILocationRepository,
  LOCATION_REPOSITORY,
} from '../../domain/repositories/location.repository.interface';
import { CreateCarDto } from '../../presentation/cars/dto/create-car.dto';
import { UpdateCarDto } from '../../presentation/cars/dto/update-car.dto';
import { SearchCarsDto } from '../../presentation/cars/dto/search-cars.dto';

@Injectable()
export class CarsService {
  constructor(
    @Inject(CAR_REPOSITORY) private readonly cars: ICarRepository,
    @Inject(LOCATION_REPOSITORY) private readonly locations: ILocationRepository,
    private readonly audit: AuditService,
    private readonly events: CarEventsService,
  ) {}

  search(query: SearchCarsDto) {
    return this.cars.findMany(query as CarSearchQuery).then(({ data, total }) => ({
      data,
      meta: {
        page: query.page ?? 1,
        limit: Math.min(query.limit ?? 20, 100),
        total,
        totalPages: Math.ceil(total / Math.min(query.limit ?? 20, 100)),
      },
    }));
  }

  async getById(id: string) {
    const car = await this.cars.findById(id);
    if (!car) throw new NotFoundException('Car not found');
    return car;
  }

  async create(dto: CreateCarDto, changedBy?: string) {
    const location = await this.locations.findById(dto.locationId);
    if (!location) throw new NotFoundException('Location not found');

    const car = await this.cars.create(dto);
    await this.audit.log({
      entity: 'Car',
      entityId: car.id,
      action: 'CREATE',
      newValue: { id: car.id, vin: car.vin, status: car.status },
      changedBy,
    });
    return car;
  }

  async update(id: string, dto: UpdateCarDto, changedBy?: string) {
    const existing = await this.getById(id);
    const data: Prisma.CarUpdateInput = { ...dto };
    const car = await this.cars.update(id, data);
    if (dto.status && dto.status !== existing.status) {
      await this.events.publishStatusChanged(id, existing.status, car.status);
    }
    await this.audit.log({
      entity: 'Car',
      entityId: id,
      action: 'UPDATE',
      oldValue: { status: existing.status, pricePerDay: existing.pricePerDay },
      newValue: { status: car.status, pricePerDay: car.pricePerDay },
      changedBy,
    });
    return car;
  }

  async remove(id: string, changedBy?: string) {
    await this.getById(id);
    const car = await this.cars.softDelete(id);
    await this.audit.log({
      entity: 'Car',
      entityId: id,
      action: 'SOFT_DELETE',
      changedBy,
    });
    return car;
  }
}
