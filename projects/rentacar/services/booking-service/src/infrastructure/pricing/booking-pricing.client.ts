import { Injectable, Logger } from '@nestjs/common';
import { BookingConfigService } from '../../config/booking-config.service';

export type CalculatedPrice = {
  total: number;
  currency: string;
  days: number;
};

@Injectable()
export class BookingPricingClient {
  private readonly logger = new Logger(BookingPricingClient.name);

  constructor(private readonly config: BookingConfigService) {}

  async calculate(input: {
    carId: string;
    startAt: string;
    endAt: string;
    basePricePerDay: number;
    customerBookingCount?: number;
    optionsTotal?: number;
  }): Promise<CalculatedPrice | null> {
    try {
      const response = await fetch(`${this.config.pricingServiceUrl}/api/v1/pricing/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        this.logger.warn(`Pricing service HTTP ${response.status}`);
        return null;
      }

      const data = (await response.json()) as {
        total: number;
        currency?: string;
        days: number;
      };

      return {
        total: data.total,
        currency: data.currency ?? 'EUR',
        days: data.days,
      };
    } catch (error) {
      this.logger.warn(`Pricing service unavailable: ${String(error)}`);
      return null;
    }
  }
}
