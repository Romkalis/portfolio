import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PricingService } from '../../application/pricing/pricing.service';
import { CalculatePriceDto } from './dto/calculate-price.dto';
import { UpdateLoyaltyDto } from './dto/update-loyalty.dto';
import { UpdatePricingSettingsDto } from './dto/update-pricing-settings.dto';
import { UpsertCarOverrideDto } from './dto/upsert-car-override.dto';

@ApiTags('pricing')
@Controller({ path: 'pricing', version: '1' })
export class PricingController {
  constructor(private readonly pricing: PricingService) {}

  @Get('settings')
  @ApiOperation({ summary: 'Global pricing multipliers' })
  settings() {
    return this.pricing.getSettings();
  }

  @Patch('settings')
  @ApiOperation({ summary: 'Update global pricing multipliers' })
  updateSettings(@Body() dto: UpdatePricingSettingsDto) {
    return this.pricing.updateSettings(dto);
  }

  @Get('loyalty')
  @ApiOperation({ summary: 'Loyalty discount rules' })
  loyalty() {
    return this.pricing.getLoyalty();
  }

  @Patch('loyalty')
  @ApiOperation({ summary: 'Update loyalty rules' })
  updateLoyalty(@Body() dto: UpdateLoyaltyDto) {
    return this.pricing.updateLoyalty(dto);
  }

  @Get('cars/:carId/override')
  @ApiOperation({ summary: 'Car-specific pricing override' })
  getCarOverride(@Param('carId') carId: string) {
    return this.pricing.getCarOverride(carId);
  }

  @Put('cars/:carId/override')
  @ApiOperation({ summary: 'Upsert car pricing override' })
  upsertCarOverride(@Param('carId') carId: string, @Body() dto: UpsertCarOverrideDto) {
    return this.pricing.upsertCarOverride(carId, dto);
  }

  @Delete('cars/:carId/override')
  @ApiOperation({ summary: 'Soft delete car override' })
  deleteCarOverride(@Param('carId') carId: string) {
    return this.pricing.deleteCarOverride(carId);
  }

  @Post('calculate')
  @ApiOperation({ summary: 'Calculate booking price' })
  calculate(@Body() dto: CalculatePriceDto) {
    return this.pricing.calculate(dto);
  }
}
