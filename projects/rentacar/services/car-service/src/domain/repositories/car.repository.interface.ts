import { Car, CarClass, CarStatus, FuelType, Prisma, Transmission } from '@prisma/car-client';

export type CarWithRelations = Car & {
  photos: { id: string; url: string; sortOrder: number; isPrimary: boolean }[];
  location: { id: string; name: string; city: string; country: string; timezone: string };
  serviceIntervals: {
    oilChangeKm: number;
    airFilterKm: number;
    fuelFilterKm: number;
    cabinFilterKm: number;
    sparkPlugKm: number;
    customIntervals: Prisma.JsonValue;
  } | null;
};

export interface CreateCarInput {
  locationId: string;
  brand: string;
  model: string;
  class: CarClass;
  year: number;
  transmission: Transmission;
  seats: number;
  horsepower?: number;
  engineVolume?: number;
  fuelType: FuelType;
  color: string;
  trunkVolume?: number;
  pricePerDay: number;
  status?: CarStatus;
  vin: string;
  mileage?: number;
  purchasePrice?: number;
  expenses?: Prisma.InputJsonValue;
  photoUrls?: string[];
}

export interface CarSearchQuery {
  page?: number;
  limit?: number;
  class?: CarClass;
  status?: CarStatus;
  locationId?: string;
  transmission?: Transmission;
  fuelType?: FuelType;
  minPrice?: number;
  maxPrice?: number;
  minSeats?: number;
}

export interface ICarRepository {
  findMany(query: CarSearchQuery): Promise<{ data: CarWithRelations[]; total: number }>;
  findById(id: string): Promise<CarWithRelations | null>;
  create(data: CreateCarInput): Promise<CarWithRelations>;
  update(id: string, data: Prisma.CarUpdateInput): Promise<CarWithRelations>;
  softDelete(id: string): Promise<Car>;
}

export const CAR_REPOSITORY = Symbol('CAR_REPOSITORY');
