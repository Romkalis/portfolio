import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchConfigService {
  get carServiceUrl() {
    return process.env.CAR_SERVICE_URL ?? 'http://localhost:3002';
  }

  get bookingServiceUrl() {
    return process.env.BOOKING_SERVICE_URL ?? 'http://localhost:3003';
  }

  get pricingServiceUrl() {
    return process.env.PRICING_SERVICE_URL ?? 'http://localhost:3004';
  }
}
