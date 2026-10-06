import { prisma } from "@/shared/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function listCars(search?: string) {
  const where: Prisma.CarWhereInput = search
    ? {
        OR: [
          { vin: { contains: search, mode: "insensitive" } },
          { brand: { contains: search, mode: "insensitive" } },
          { model: { contains: search, mode: "insensitive" } },
          { owner: { lastName: { contains: search, mode: "insensitive" } } },
        ],
      }
    : {};

  const cars = await prisma.car.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    include: {
      owner: true,
      repairs: { orderBy: { repairDate: "desc" }, take: 1 },
    },
  });

  return cars;
}

export async function getCar(id: string) {
  return prisma.car.findUnique({
    where: { id },
    include: {
      owner: true,
      repairs: { orderBy: { repairDate: "desc" } },
      orders: { orderBy: { date: "desc" } },
    },
  });
}

export async function createCar(data: Prisma.CarCreateInput) {
  return prisma.car.create({ data });
}

export async function updateCar(id: string, data: Prisma.CarUpdateInput) {
  return prisma.car.update({ where: { id }, data });
}

export async function deleteCar(id: string) {
  return prisma.car.delete({ where: { id } });
}
