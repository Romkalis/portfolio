import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@ApiTags('logs')
@Controller({ path: 'notifications/logs', version: '1' })
export class LogsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'List processed domain event logs' })
  list(@Query('limit') limit = '50', @Query('eventType') eventType?: string) {
    const take = Math.min(Number(limit) || 50, 200);
    return this.prisma.notificationLog.findMany({
      where: eventType ? { eventType } : undefined,
      include: { deliveries: true },
      orderBy: { createdAt: 'desc' },
      take,
    });
  }
}
