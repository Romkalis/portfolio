import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MaintenanceService } from '../../application/maintenance/maintenance.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';

@ApiTags('maintenance')
@Controller({ path: 'maintenance', version: '1' })
export class MaintenanceController {
  constructor(private readonly maintenance: MaintenanceService) {}

  @Get('upcoming')
  @ApiOperation({ summary: 'Upcoming maintenance by mileage intervals' })
  upcoming(@Query('carId') carId?: string) {
    return this.maintenance.upcoming(carId);
  }

  @Get('cars/:carId')
  @ApiOperation({ summary: 'Maintenance history for car' })
  history(@Param('carId') carId: string) {
    return this.maintenance.listByCar(carId);
  }

  @Get('cars/:carId/profile')
  @ApiOperation({ summary: 'Car maintenance profile (mileage intervals)' })
  profile(@Param('carId') carId: string) {
    return this.maintenance.getProfile(carId);
  }

  @Put('cars/:carId/profile')
  @ApiOperation({ summary: 'Update car mileage profile' })
  upsertProfile(@Param('carId') carId: string, @Body('mileage') mileage: number) {
    return this.maintenance.upsertProfile(carId, mileage);
  }

  @Get('records/:id')
  @ApiOperation({ summary: 'Get maintenance record' })
  getById(@Param('id') id: string) {
    return this.maintenance.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create maintenance record' })
  create(@Body() dto: CreateMaintenanceDto) {
    return this.maintenance.create(dto);
  }

  @Delete('records/:id')
  @ApiOperation({ summary: 'Soft delete maintenance record' })
  remove(@Param('id') id: string) {
    return this.maintenance.remove(id);
  }
}
