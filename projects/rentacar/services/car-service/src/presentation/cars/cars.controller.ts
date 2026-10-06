import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Permission } from '@rentacar/shared-types';
import { CarsService } from '../../application/cars/cars.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { CreateCarDto } from './dto/create-car.dto';
import { SearchCarsDto } from './dto/search-cars.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@ApiTags('cars')
@Controller({ path: 'cars', version: '1' })
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  @ApiOperation({ summary: 'Search cars with filters and pagination' })
  search(@Query() query: SearchCarsDto) {
    return this.carsService.search(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get car by id' })
  getById(@Param('id') id: string) {
    return this.carsService.getById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.CAN_MANAGE_CARS)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create car (admin)' })
  create(@Body() dto: CreateCarDto, @CurrentUser() user: { sub: string }) {
    return this.carsService.create(dto, user.sub);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.CAN_MANAGE_CARS)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update car (admin)' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCarDto,
    @CurrentUser() user: { sub: string },
  ) {
    return this.carsService.update(id, dto, user.sub);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.CAN_MANAGE_CARS)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete car (admin)' })
  remove(@Param('id') id: string, @CurrentUser() user: { sub: string }) {
    return this.carsService.remove(id, user.sub);
  }
}
