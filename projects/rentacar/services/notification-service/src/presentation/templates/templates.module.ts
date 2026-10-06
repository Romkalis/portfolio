import { Module } from '@nestjs/common';
import { TemplateRendererService } from '../../application/templates/template-renderer.service';
import { TemplatesService } from '../../application/templates/templates.service';
import { TemplatesController } from './templates.controller';

@Module({
  controllers: [TemplatesController],
  providers: [TemplatesService, TemplateRendererService],
  exports: [TemplatesService, TemplateRendererService],
})
export class TemplatesModule {}
