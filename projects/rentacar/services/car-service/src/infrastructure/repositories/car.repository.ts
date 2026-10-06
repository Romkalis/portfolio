import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/car-client';
import { notDeleted } from '@rentacar/prisma';
import {
  CarSearchQuery,
  CarWithRelations,
  CreateCarInput,
  ICarRepository,
} from '../../domain/repositories/car.repository.interface';
import { PrismaService } from '../prisma/prisma.service';

const include = {
  photos: { orderBy: { sortOrder: 'asc' } },
  location: { select: { id: true, name: true, city: true, country: true, timezone: true } },
  serviceIntervals: true,
} satisfies Prisma.CarInclude;

@Injectable()
export class CarRepository implements ICarRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(query: CarSearchQuery) {
    const page = query.page ?? 1;
    const limit = Math.min(query.limit ?? 20, 100);
    const where: Prisma.CarWhereInput = {
      ...notDeleted(),
      class: query.class,
      status: query.status,
      locationId: query.locationId,
      transmission: query.transmission,
      fuelType: query.fuelType,
      seats: query.minSeats ? { gte: query.minSeats } : undefined,
      pricePerDay: {
        gte: query.minPrice,
        lte: query.maxPrice,
      },
    };

    const [data, total] = await Promise.all([
      this.prisma.car.findMany({
        where,
        include,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.car.count({ where }),
    ]);

    return { data: data as CarWithRelations[], total };
  }

  findById(id: string) {
    return this.prisma.car.findFirst({
      where: { id, ...notDeleted() },
      include,
    }) as Promise<CarWithRelations | null>;
  }

  async create(data: CreateCarInput) {
    return this.prisma.car.create({
      data: {
        locationId: data.locationId,
        brand: data.brand,
        model: data.model,
        class: data.class,
        year: data.year,
        transmission: data.transmission,
        seats: data.seats,
        horsepower: data.horsepower,
        engineVolume: data.engineVolume,
        fuelType: data.fuelType,
        color: data.color,
        trunkVolume: data.trunkVolume,
        pricePerDay: data.pricePerDay,
        status: data.status,
        vin: data.vin,
        mileage: data.mileage ?? 0,
        purchasePrice: data.purchasePrice,
        expenses: data.expenses,
        photos: data.photoUrls?.length
          ? {
              create: data.photoUrls.map((url, index) => ({
                url,
                sortOrder: index,
                isPrimary: index === 0,
              })),
            }
          : undefined,
        serviceIntervals: { create: {} },
      },
      include,
    }) as Promise<CarWithRelations>;
  }

  update(id: string, data: Prisma.CarUpdateInput) {
    return this.prisma.car.update({ where: { id }, data, include }) as Promise<CarWithRelations>;
  }

  softDelete(id: string) {
    return this.prisma.car.update({
      where: { id },
      data: { deletedAt: new Date(), isArchived: true, status: 'inactive' },
    });
  }
}
