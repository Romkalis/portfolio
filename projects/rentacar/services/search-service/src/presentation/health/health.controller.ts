import { Controller, Get } from '@nestjs/common';
import { SearchConfigService } from '../../config/search-config.service';

@Controller({ path: 'health', version: '1' })
export class HealthController {
  constructor(private readonly config: SearchConfigService) {}

  @Get()
  check() {
    return { status: 'ok', service: 'search-service' };
  }

  @Get('dependencies')
  async dependencies() {
    const targets = [
      { name: 'car-service', url: `${this.config.carServiceUrl}/api/v1/health` },
      { name: 'booking-service', url: `${this.config.bookingServiceUrl}/api/v1/health` },
      { name: 'pricing-service', url: `${this.config.pricingServiceUrl}/api/v1/health` },
    ];

    const results = await Promise.all(
      targets.map(async (target) => {
        try {
          const response = await fetch(target.url);
          return { ...target, ok: response.ok };
        } catch (error) {
          return { ...target, ok: false, error: String(error) };
        }
      }),
    );

    return {
      status: results.every((r) => r.ok) ? 'ok' : 'degraded',
      dependencies: results,
    };
  }
}
