import { Module } from '@nestjs/common';
import { SettingsService } from '../../application/settings/settings.service';
import { SettingsController } from './settings.controller';

@Module({ controllers: [SettingsController], providers: [SettingsService] })
export class SettingsModule {}
