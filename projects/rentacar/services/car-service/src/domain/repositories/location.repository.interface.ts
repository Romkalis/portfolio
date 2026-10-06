import { Location, Prisma } from '@prisma/car-client';

export interface CreateLocationInput {
  name: string;
  city: string;
  country: string;
  address: string;
  timezone: string;
  latitude?: number;
  longitude?: number;
}

export interface ILocationRepository {
  findMany(): Promise<Location[]>;
  findById(id: string): Promise<Location | null>;
  create(data: CreateLocationInput): Promise<Location>;
  update(id: string, data: Prisma.LocationUpdateInput): Promise<Location>;
  softDelete(id: string): Promise<Location>;
}

export const LOCATION_REPOSITORY = Symbol('LOCATION_REPOSITORY');
