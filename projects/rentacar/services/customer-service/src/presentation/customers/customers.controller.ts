import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomersService } from '../../application/customers/customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ListCustomersQueryDto } from './dto/list-customers-query.dto';
import { RecordBookingStatsDto } from './dto/record-booking-stats.dto';

@ApiTags('customers')
@Controller({ path: 'customers', version: '1' })
export class CustomersController {
  constructor(private readonly customers: CustomersService) {}

  @Get()
  @ApiOperation({ summary: 'List customers with search and filters' })
  list(@Query() query: ListCustomersQueryDto) {
    return this.customers.list(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get customer by id' })
  getById(@Param('id') id: string) {
    return this.customers.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create customer (CRM)' })
  create(@Body() dto: CreateCustomerDto) {
    return this.customers.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update customer' })
  update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    return this.customers.update(id, dto);
  }

  @Patch(':id/blacklist')
  @ApiOperation({ summary: 'Add/remove customer from blacklist' })
  setBlacklist(@Param('id') id: string, @Body('blacklist') blacklist: boolean) {
    return this.customers.setBlacklist(id, blacklist);
  }

  @Post(':id/booking-stats')
  @ApiOperation({ summary: 'Increment booking metrics (internal/event hook)' })
  recordStats(@Param('id') id: string, @Body() dto: RecordBookingStatsDto) {
    return this.customers.recordBookingStats(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete customer' })
  remove(@Param('id') id: string) {
    return this.customers.remove(id);
  }
}
