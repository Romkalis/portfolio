import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { SearchConfigService } from '../../config/search-config.service';
import { SearchCarsQueryDto } from '../../presentation/search/dto/search-cars-query.dto';

type CarListResponse = {
  data: Array<{
    id: string;
    brand: string;
    model: string;
    class: string;
    seats: number;
    pricePerDay: string;
    status: string;
    transmission: string;
    fuelType: string;
    location: { id: string; city: string; name: string };
  }>;
  meta: { page: number; limit: number; total: number; totalPages: number };
};

@Injectable()
export class SearchService {
  constructor(
    private readonly http: HttpService,
    private readonly config: SearchConfigService,
  ) {}

  async search(query: SearchCarsQueryDto) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== 'startAt' && key !== 'endAt' && key !== 'onlyAvailable' && key !== 'sortBy' && key !== 'sortOrder') {
        params.set(key, String(value));
      }
    });

    const carsUrl = `${this.config.carServiceUrl}/api/v1/cars?${params.toString()}`;
    const { data: carsResponse } = await firstValueFrom(this.http.get<CarListResponse>(carsUrl));

    let items = carsResponse.data;

    if (query.startAt && query.endAt && query.onlyAvailable !== false) {
      const checks = await Promise.all(
        items.map(async (car) => {
          const { data } = await firstValueFrom(
            this.http.post<{ available: boolean }>(
              `${this.config.bookingServiceUrl}/api/v1/bookings/availability`,
              { carId: car.id, startAt: query.startAt, endAt: query.endAt },
            ),
          );
          return { car, available: data.available };
        }),
      );
      items = checks.filter((c) => c.available).map((c) => ({ ...c.car, available: true }));
    }

    if (query.startAt && query.endAt) {
      const priced = await Promise.all(
        items.map(async (car) => {
          try {
            const { data } = await firstValueFrom(
              this.http.post<{ total: number; currency: string }>(
                `${this.config.pricingServiceUrl}/api/v1/pricing/calculate`,
                {
                  carId: car.id,
                  startAt: query.startAt,
                  endAt: query.endAt,
                  basePricePerDay: Number(car.pricePerDay),
                },
              ),
            );
            return { ...car, estimatedTotal: data.total, currency: data.currency };
          } catch {
            return car;
          }
        }),
      );
      items = priced;
    }

    if (query.sortBy === 'price') {
      items.sort((a, b) => {
        const diff = Number(a.pricePerDay) - Number(b.pricePerDay);
        return query.sortOrder === 'desc' ? -diff : diff;
      });
    }

    return {
      data: items,
      meta: {
        ...carsResponse.meta,
        total: items.length,
        totalPages: Math.ceil(items.length / (carsResponse.meta.limit || 20)),
      },
    };
  }
}
