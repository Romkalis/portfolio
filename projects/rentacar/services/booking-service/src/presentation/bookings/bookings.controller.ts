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
import { BookingsService } from '../../application/bookings/bookings.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { CalendarQueryDto } from './dto/calendar-query.dto';
import { CheckAvailabilityDto } from './dto/check-availability.dto';
import { CreateBlockDto } from './dto/create-block.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { RescheduleBookingDto } from './dto/reschedule-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { ListBookingsQueryDto } from './dto/list-bookings-query.dto';
import { UpdateBookingSettingsDto } from './dto/update-booking-settings.dto';
import { ListBlocksQueryDto } from './dto/list-blocks-query.dto';

@ApiTags('bookings')
@Controller({ path: 'bookings', version: '1' })
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  @ApiOperation({ summary: 'List bookings with filters' })
  list(@Query() query: ListBookingsQueryDto) {
    return this.bookingsService.list(query);
  }

  @Get('options')
  @ApiOperation({ summary: 'Active booking add-ons' })
  listOptions() {
    return this.bookingsService.listOptions();
  }

  @Get('settings')
  @ApiOperation({ summary: 'Local booking settings (cleaning buffer fallback)' })
  getSettings() {
    return this.bookingsService.getSettings();
  }

  @Patch('settings')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.CAN_MANAGE_BOOKINGS)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update local cleaning buffer hours' })
  updateSettings(
    @Body() dto: UpdateBookingSettingsDto,
    @CurrentUser() user: { sub: string },
  ) {
    return this.bookingsService.updateSettings(dto, user.sub);
  }

  @Get('blocks')
  @ApiOperation({ summary: 'List blocks for car in date range' })
  listBlocks(@Query() query: ListBlocksQueryDto) {
    return this.bookingsService.listBlocks(query);
  }

  @Delete('blocks/:blockId')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.CAN_MANAGE_BOOKINGS)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete a block' })
  deleteBlock(@Param('blockId') blockId: string, @CurrentUser() user: { sub: string }) {
    return this.bookingsService.deleteBlock(blockId, user.sub);
  }

  @Get('calendar')
  @ApiOperation({ summary: 'Calendar feed for admin timeline' })
  calendar(@Query() query: CalendarQueryDto) {
    return this.bookingsService.getCalendar(query);
  }

  @Post('availability')
  @ApiOperation({ summary: 'Check car availability with overlap engine' })
  availability(@Body() dto: CheckAvailabilityDto) {
    return this.bookingsService.checkAvailability(dto);
  }

  @Post('blocks')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.CAN_MANAGE_BOOKINGS)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create manual/service/maintenance block' })
  createBlock(@Body() dto: CreateBlockDto, @CurrentUser() user: { sub: string }) {
    return this.bookingsService.createBlock(dto, user.sub);
  }

  @Post('client')
  @ApiOperation({ summary: 'Create client booking request (public)' })
  createClient(@Body() dto: CreateBookingDto) {
    return this.bookingsService.create(dto);
  }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.CAN_MANAGE_BOOKINGS)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create booking (admin)' })
  create(@Body() dto: CreateBookingDto, @CurrentUser() user: { sub: string }) {
    return this.bookingsService.create(dto, user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking by id' })
  getById(@Param('id') id: string) {
    return this.bookingsService.getById(id);
  }

  @Patch(':id/reschedule')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.CAN_MANAGE_BOOKINGS)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reschedule booking (calendar drag/resize)' })
  reschedule(
    @Param('id') id: string,
    @Body() dto: RescheduleBookingDto,
    @CurrentUser() user: { sub: string },
  ) {
    return this.bookingsService.reschedule(id, dto, user.sub);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.CAN_MANAGE_BOOKINGS)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update booking status' })
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateBookingStatusDto,
    @CurrentUser() user: { sub: string },
  ) {
    return this.bookingsService.updateStatus(id, dto, user.sub);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.CAN_MANAGE_BOOKINGS)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete booking' })
  remove(@Param('id') id: string, @CurrentUser() user: { sub: string }) {
    return this.bookingsService.remove(id, user.sub);
  }
}
