import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Permission } from '@rentacar/shared-types';
import { LocationsService } from '../../application/locations/locations.service';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@ApiTags('locations')
@Controller({ path: 'locations', version: '1' })
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  @ApiOperation({ summary: 'List rental locations' })
  list() {
    return this.locationsService.list();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get location by id' })
  getById(@Param('id') id: string) {
    return this.locationsService.getById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.CAN_MANAGE_CARS)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create location (admin)' })
  create(@Body() dto: CreateLocationDto) {
    return this.locationsService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.CAN_MANAGE_CARS)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update location (admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateLocationDto) {
    return this.locationsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.CAN_MANAGE_CARS)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete location (admin)' })
  remove(@Param('id') id: string) {
    return this.locationsService.remove(id);
  }
}
