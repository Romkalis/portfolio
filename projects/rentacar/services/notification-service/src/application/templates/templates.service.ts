import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { UpdateTemplateDto } from '../../presentation/templates/dto/update-template.dto';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  list(eventType?: string) {
    return this.prisma.notificationTemplate.findMany({
      where: eventType ? { eventType } : undefined,
      orderBy: [{ eventType: 'asc' }, { locale: 'asc' }],
    });
  }

  async update(id: string, dto: UpdateTemplateDto) {
    await this.findById(id);
    return this.prisma.notificationTemplate.update({ where: { id }, data: dto });
  }

  async findById(id: string) {
    const template = await this.prisma.notificationTemplate.findUnique({ where: { id } });
    if (!template) throw new NotFoundException('Template not found');
    return template;
  }
}
