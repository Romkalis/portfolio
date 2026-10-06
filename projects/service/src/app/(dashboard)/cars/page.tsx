import { CarsList } from "@/features/cars/CarsList/CarsList";
import * as carService from "@/services/car.service";
import { prisma } from "@/shared/lib/prisma";

export default async function CarsPage() {
  const [cars, owners] = await Promise.all([
    carService.listCars(),
    prisma.owner.findMany({ orderBy: { lastName: "asc" } }),
  ]);
  return <CarsList cars={cars} owners={owners} />;
}
