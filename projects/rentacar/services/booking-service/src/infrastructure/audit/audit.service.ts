import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/booking-client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  log(input: {
    entity: string;
    entityId: string;
    action: string;
    oldValue?: Prisma.InputJsonValue;
    newValue?: Prisma.InputJsonValue;
    changedBy?: string;
  }) {
    return this.prisma.auditLog.create({ data: input });
  }
}
