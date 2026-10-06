import { prisma } from "@/shared/lib/prisma";
import { generateOrderNumber } from "@/shared/lib/utils";
import type { OrderStatus, Prisma } from "@prisma/client";

export type OrderFilters = {
  status?: OrderStatus;
  from?: string;
  to?: string;
  clientId?: string;
  carId?: string;
};

export async function listOrders(filters: OrderFilters = {}) {
  const where: Prisma.OrderWhereInput = {};

  if (filters.status) where.status = filters.status;
  if (filters.clientId) where.clientId = filters.clientId;
  if (filters.carId) where.carId = filters.carId;
  if (filters.from || filters.to) {
    where.date = {};
    if (filters.from) where.date.gte = new Date(filters.from);
    if (filters.to) where.date.lte = new Date(filters.to);
  }

  return prisma.order.findMany({
    where,
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    include: { client: true, car: true },
  });
}

export async function getOrder(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: { client: true, car: true, appointment: true },
  });
}

export async function createOrder(
  data: Omit<Prisma.OrderCreateInput, "orderNumber" | "client" | "car"> & {
    clientId: string;
    carId: string;
  },
) {
  const orderNumber = await generateOrderNumber();
  return prisma.order.create({
    data: {
      orderNumber,
      clientId: data.clientId,
      carId: data.carId,
      date: data.date as Date,
      time: data.time as string,
      problem: data.problem as string,
      comment: data.comment as string | undefined,
      status: (data.status as OrderStatus) ?? "PENDING",
    },
    include: { client: true, car: true },
  });
}

export async function updateOrder(id: string, data: Prisma.OrderUpdateInput) {
  return prisma.order.update({
    where: { id },
    data,
    include: { client: true, car: true },
  });
}

export async function completeOrder(id: string, totalAmount: number, earnings: number) {
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) throw new Error("Заказ не найден");
  if (order.status === "COMPLETED") throw new Error("Заказ уже закрыт");

  return prisma.order.update({
    where: { id },
    data: {
      status: "COMPLETED",
      totalAmount,
      earnings,
    },
  });
}

export async function deleteOrder(id: string) {
  return prisma.order.delete({ where: { id } });
}
