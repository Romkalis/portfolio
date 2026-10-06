import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/car-client';
import { notDeleted } from '@rentacar/prisma';
import {
  CreateLocationInput,
  ILocationRepository,
} from '../../domain/repositories/location.repository.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LocationRepository implements ILocationRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany() {
    return this.prisma.location.findMany({
      where: notDeleted(),
      orderBy: [{ country: 'asc' }, { city: 'asc' }, { name: 'asc' }],
    });
  }

  findById(id: string) {
    return this.prisma.location.findFirst({ where: { id, ...notDeleted() } });
  }

  create(data: CreateLocationInput) {
    return this.prisma.location.create({ data });
  }

  update(id: string, data: Prisma.LocationUpdateInput) {
    return this.prisma.location.update({ where: { id }, data });
  }

  softDelete(id: string) {
    return this.prisma.location.update({
      where: { id },
      data: { deletedAt: new Date(), isArchived: true },
    });
  }
}
