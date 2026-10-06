import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TemplatesService } from '../../application/templates/templates.service';
import { UpdateTemplateDto } from './dto/update-template.dto';

@ApiTags('templates')
@Controller({ path: 'notifications/templates', version: '1' })
export class TemplatesController {
  constructor(private readonly templates: TemplatesService) {}

  @Get()
  @ApiOperation({ summary: 'List notification templates' })
  list(@Query('eventType') eventType?: string) {
    return this.templates.list(eventType);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get template by id' })
  findOne(@Param('id') id: string) {
    return this.templates.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update template subject/body' })
  update(@Param('id') id: string, @Body() dto: UpdateTemplateDto) {
    return this.templates.update(id, dto);
  }
}
