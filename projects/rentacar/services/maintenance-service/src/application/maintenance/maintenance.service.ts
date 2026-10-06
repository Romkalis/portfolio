import { Injectable, NotFoundException } from '@nestjs/common';
import { notDeleted } from '@rentacar/prisma';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { MaintenanceEventsService } from '../../infrastructure/events/maintenance-events.service';
import { CreateMaintenanceDto } from '../../presentation/maintenance/dto/create-maintenance.dto';

@Injectable()
export class MaintenanceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly events: MaintenanceEventsService,
  ) {}

  async create(dto: CreateMaintenanceDto) {
    const record = await this.prisma.maintenanceRecord.create({
      data: {
        carId: dto.carId,
        mileage: dto.mileage,
        performedAt: new Date(dto.performedAt),
        works: dto.works,
        recommendations: dto.recommendations,
        cost: dto.cost,
      },
    });

    await this.upsertProfile(dto.carId, dto.mileage);

    await this.events.publishCreated(record.id, {
      carId: record.carId,
      mileage: record.mileage,
      cost: record.cost ? Number(record.cost) : null,
    });

    return record;
  }

  listByCar(carId: string) {
    return this.prisma.maintenanceRecord.findMany({
      where: { carId, ...notDeleted() },
      orderBy: { performedAt: 'desc' },
    });
  }

  async upcoming(carId?: string) {
    const profiles = await this.prisma.carMaintenanceProfile.findMany({
      where: carId ? { carId } : undefined,
    });

    return profiles.map((profile) => {
      const kmSinceService = profile.lastMileage;
      return {
        carId: profile.carId,
        oilChangeDueInKm: Math.max(0, profile.oilChangeKm - kmSinceService),
        airFilterDueInKm: Math.max(0, profile.airFilterKm - kmSinceService),
        sparkPlugDueInKm: Math.max(0, profile.sparkPlugKm - kmSinceService),
      };
    });
  }

  async upsertProfile(carId: string, mileage: number) {
    return this.prisma.carMaintenanceProfile.upsert({
      where: { carId },
      update: { lastMileage: mileage },
      create: { carId, lastMileage: mileage },
    });
  }

  async getById(id: string) {
    const record = await this.prisma.maintenanceRecord.findFirst({
      where: { id, ...notDeleted() },
    });
    if (!record) throw new NotFoundException('Maintenance record not found');
    return record;
  }

  getProfile(carId: string) {
    return this.prisma.carMaintenanceProfile.findUnique({ where: { carId } });
  }

  async remove(id: string) {
    await this.getById(id);
    return this.prisma.maintenanceRecord.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
