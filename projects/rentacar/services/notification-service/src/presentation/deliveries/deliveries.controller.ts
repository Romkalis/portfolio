import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeliveryStatus } from '@prisma/notification-client';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@ApiTags('deliveries')
@Controller({ path: 'notifications/deliveries', version: '1' })
export class DeliveriesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'List rendered notification deliveries' })
  list(
    @Query('limit') limit = '50',
    @Query('status') status?: DeliveryStatus,
    @Query('eventType') eventType?: string,
  ) {
    const take = Math.min(Number(limit) || 50, 200);
    return this.prisma.notificationDelivery.findMany({
      where: {
        status,
        log: eventType ? { eventType } : undefined,
      },
      include: { log: { select: { eventType: true, aggregateId: true, eventId: true } } },
      orderBy: { createdAt: 'desc' },
      take,
    });
  }
}
