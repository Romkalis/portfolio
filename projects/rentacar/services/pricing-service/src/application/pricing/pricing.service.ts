import { Injectable, NotFoundException } from '@nestjs/common';
import { notDeleted } from '@rentacar/prisma';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { CalculatePriceDto } from '../../presentation/pricing/dto/calculate-price.dto';
import { UpdateLoyaltyDto } from '../../presentation/pricing/dto/update-loyalty.dto';
import { UpdatePricingSettingsDto } from '../../presentation/pricing/dto/update-pricing-settings.dto';
import { UpsertCarOverrideDto } from '../../presentation/pricing/dto/upsert-car-override.dto';

@Injectable()
export class PricingService {
  constructor(private readonly prisma: PrismaService) {}

  getSettings() {
    return this.prisma.pricingSettings.findUnique({ where: { id: 'default' } });
  }

  updateSettings(dto: UpdatePricingSettingsDto) {
    return this.prisma.pricingSettings.upsert({
      where: { id: 'default' },
      create: { id: 'default', ...dto },
      update: dto,
    });
  }

  getLoyalty() {
    return this.prisma.loyaltyRule.findUnique({ where: { id: 'default' } });
  }

  updateLoyalty(dto: UpdateLoyaltyDto) {
    return this.prisma.loyaltyRule.upsert({
      where: { id: 'default' },
      create: { id: 'default', ...dto },
      update: dto,
    });
  }

  getCarOverride(carId: string) {
    return this.prisma.carPricingOverride.findFirst({
      where: { carId, ...notDeleted() },
    });
  }

  upsertCarOverride(carId: string, dto: UpsertCarOverrideDto) {
    return this.prisma.carPricingOverride.upsert({
      where: { carId },
      create: { carId, ...dto },
      update: dto,
    });
  }

  async deleteCarOverride(carId: string) {
    const existing = await this.getCarOverride(carId);
    if (!existing) throw new NotFoundException('Car pricing override not found');
    return this.prisma.carPricingOverride.update({
      where: { carId },
      data: { deletedAt: new Date() },
    });
  }

  async calculate(dto: CalculatePriceDto) {
    const settings = await this.getSettings();
    const override = await this.prisma.carPricingOverride.findFirst({
      where: { carId: dto.carId, ...notDeleted() },
    });
    const loyalty = await this.getLoyalty();

    const start = new Date(dto.startAt);
    const end = new Date(dto.endAt);
    const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / 86_400_000));

    let basePerDay = Number(override?.pricePerDay ?? dto.basePricePerDay);
    let rateType: 'daily' | 'weekly' | 'monthly' = 'daily';

    if (days >= 30 && override?.pricePerMonth) {
      basePerDay = Number(override.pricePerMonth) / 30;
      rateType = 'monthly';
    } else if (days >= 7 && override?.pricePerWeek) {
      basePerDay = Number(override.pricePerWeek) / 7;
      rateType = 'weekly';
    }

    let multiplier = 1;
    const month = start.getUTCMonth() + 1;
    const isWeekend = [0, 6].includes(start.getUTCDay());

    if (settings) {
      if (isWeekend) multiplier *= Number(settings.weekendMultiplier);
      if (month >= 6 && month <= 8) {
        multiplier *= Number(override?.customSummerMultiplier ?? settings.summerMultiplier);
      }
      if (month <= 2 || month === 12) {
        multiplier *= Number(override?.customWinterMultiplier ?? settings.winterMultiplier);
      }
      multiplier *= Number(override?.customDemandMultiplier ?? settings.highDemandMultiplier);
    }

    const subtotal = basePerDay * days * multiplier;
    let loyaltyDiscount = 0;

    if (loyalty?.isEnabled && dto.customerBookingCount !== undefined) {
      if (dto.customerBookingCount > loyalty.tier30Percent) {
        loyaltyDiscount = Number(loyalty.discount30);
      } else if (dto.customerBookingCount > loyalty.tier10Percent) {
        loyaltyDiscount = Number(loyalty.discount10);
      }
      if (loyalty.manualDiscount) {
        loyaltyDiscount = Math.max(loyaltyDiscount, Number(loyalty.manualDiscount));
      }
    }

    const discountAmount = subtotal * loyaltyDiscount;
    const total = subtotal - discountAmount + (dto.optionsTotal ?? 0);

    return {
      days,
      basePerDay,
      rateType,
      multiplier,
      subtotal,
      loyaltyDiscountPercent: loyaltyDiscount,
      discountAmount,
      optionsTotal: dto.optionsTotal ?? 0,
      total,
      currency: 'EUR',
    };
  }
}
