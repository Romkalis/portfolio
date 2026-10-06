import { prisma } from "@/shared/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function listOwners(search?: string) {
  const where: Prisma.OwnerWhereInput = search
    ? {
        OR: [
          { lastName: { contains: search, mode: "insensitive" } },
          { firstName: { contains: search, mode: "insensitive" } },
          { phone: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  return prisma.owner.findMany({
    where,
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
    include: { _count: { select: { cars: true, orders: true } } },
  });
}

export async function getOwner(id: string) {
  return prisma.owner.findUnique({
    where: { id },
    include: {
      cars: { orderBy: { brand: "asc" } },
      orders: {
        orderBy: { date: "desc" },
        take: 20,
        include: { car: true },
      },
      appointments: { orderBy: { date: "desc" }, take: 10 },
    },
  });
}

export async function createOwner(data: Prisma.OwnerCreateInput) {
  return prisma.owner.create({ data });
}

export async function updateOwner(id: string, data: Prisma.OwnerUpdateInput) {
  return prisma.owner.update({ where: { id }, data });
}

export async function deleteOwner(id: string) {
  return prisma.owner.delete({ where: { id } });
}
