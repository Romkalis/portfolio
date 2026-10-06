import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchService } from '../../application/search/search.service';
import { SearchCarsQueryDto } from './dto/search-cars-query.dto';

@ApiTags('search')
@Controller({ path: 'search', version: '1' })
export class SearchController {
  constructor(private readonly search: SearchService) {}

  @Get('cars')
  @ApiOperation({ summary: 'Search cars with filters, availability, and price estimate' })
  findCars(@Query() query: SearchCarsQueryDto) {
    return this.search.search(query);
  }
}
