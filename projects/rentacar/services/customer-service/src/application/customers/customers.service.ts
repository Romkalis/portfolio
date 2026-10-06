import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { notDeleted } from '@rentacar/prisma';
import { Prisma } from '@prisma/customer-client';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { CreateCustomerDto } from '../../presentation/customers/dto/create-customer.dto';
import { UpdateCustomerDto } from '../../presentation/customers/dto/update-customer.dto';
import { ListCustomersQueryDto } from '../../presentation/customers/dto/list-customers-query.dto';
import { RecordBookingStatsDto } from '../../presentation/customers/dto/record-booking-stats.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  list(query: ListCustomersQueryDto) {
    const page = query.page ?? 1;
    const take = Math.min(query.limit ?? 20, 100);
    const where: Prisma.CustomerWhereInput = {
      ...notDeleted(),
      blacklist: query.blacklist,
      ...(query.search
        ? {
            OR: [
              { firstName: { contains: query.search, mode: 'insensitive' } },
              { lastName: { contains: query.search, mode: 'insensitive' } },
              { email: { contains: query.search, mode: 'insensitive' } },
              { phone: { contains: query.search } },
            ],
          }
        : {}),
    };

    return Promise.all([
      this.prisma.customer.findMany({
        where,
        skip: (page - 1) * take,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.customer.count({ where }),
    ]).then(([data, total]) => ({
      data,
      meta: { page, limit: take, total, totalPages: Math.ceil(total / take) || 1 },
    }));
  }

  async getById(id: string) {
    const customer = await this.prisma.customer.findFirst({ where: { id, ...notDeleted() } });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async create(dto: CreateCustomerDto) {
    if (dto.email) {
      const existing = await this.prisma.customer.findFirst({
        where: { email: dto.email.toLowerCase(), ...notDeleted() },
      });
      if (existing) throw new ConflictException('Email already used by another customer');
    }

    return this.prisma.customer.create({
      data: { ...dto, email: dto.email?.toLowerCase() },
    });
  }

  async update(id: string, dto: UpdateCustomerDto) {
    await this.getById(id);
    return this.prisma.customer.update({
      where: { id },
      data: {
        ...dto,
        email: dto.email?.toLowerCase(),
      },
    });
  }

  async setBlacklist(id: string, blacklist: boolean) {
    await this.getById(id);
    return this.prisma.customer.update({ where: { id }, data: { blacklist } });
  }

  async recordBookingStats(id: string, dto: RecordBookingStatsDto) {
    const customer = await this.getById(id);
    const increment =
      dto.outcome === 'completed'
        ? { successfulBookings: 1 }
        : { cancelledBookings: 1 };

    return this.prisma.customer.update({
      where: { id },
      data: {
        totalBookings: customer.totalBookings + 1,
        ...increment,
        totalSpent:
          dto.outcome === 'completed' && dto.amount
            ? { increment: dto.amount }
            : undefined,
      },
    });
  }

  async remove(id: string) {
    await this.getById(id);
    return this.prisma.customer.update({
      where: { id },
      data: { deletedAt: new Date(), isArchived: true },
    });
  }
}
