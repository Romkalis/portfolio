import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SettingsService } from '../../application/settings/settings.service';
import { UpdatePlatformSettingsDto } from './dto/update-platform-settings.dto';

@ApiTags('settings')
@Controller({ path: 'settings', version: '1' })
export class SettingsController {
  constructor(private readonly settings: SettingsService) {}

  @Get('platform')
  @ApiOperation({ summary: 'Get platform-wide settings' })
  getPlatform() {
    return this.settings.getPlatform();
  }

  @Patch('platform')
  @ApiOperation({ summary: 'Update platform settings' })
  updatePlatform(@Body() dto: UpdatePlatformSettingsDto) {
    return this.settings.updatePlatform(dto);
  }
}
