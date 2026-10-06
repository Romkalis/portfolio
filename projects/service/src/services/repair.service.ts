import { prisma } from "@/shared/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function listRepairsByCar(carId: string) {
  return prisma.repairHistory.findMany({
    where: { carId },
    orderBy: { repairDate: "desc" },
  });
}

export async function getRepair(id: string) {
  return prisma.repairHistory.findUnique({
    where: { id },
    include: { car: { include: { owner: true } } },
  });
}

export async function createRepair(data: Prisma.RepairHistoryCreateInput) {
  return prisma.repairHistory.create({ data });
}

export async function updateRepair(id: string, data: Prisma.RepairHistoryUpdateInput) {
  return prisma.repairHistory.update({ where: { id }, data });
}

export async function deleteRepair(id: string) {
  return prisma.repairHistory.delete({ where: { id } });
}
