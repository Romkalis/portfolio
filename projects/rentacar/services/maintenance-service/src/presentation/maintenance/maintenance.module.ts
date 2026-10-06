import { Module } from '@nestjs/common';
import { MaintenanceService } from '../../application/maintenance/maintenance.service';
import { MaintenanceEventsService } from '../../infrastructure/events/maintenance-events.service';
import { MaintenanceController } from './maintenance.controller';

@Module({
  controllers: [MaintenanceController],
  providers: [MaintenanceService, MaintenanceEventsService],
})
export class MaintenanceModule {}
