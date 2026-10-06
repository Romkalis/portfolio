import { Suspense } from "react";
import { OrdersList } from "@/features/orders/OrdersList/OrdersList";
import * as orderService from "@/services/order.service";
import { prisma } from "@/shared/lib/prisma";
import type { OrderStatus } from "@prisma/client";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    from?: string;
    to?: string;
    clientId?: string;
    carId?: string;
  }>;
}) {
  const params = await searchParams;
  const filters = {
    status: params.status as OrderStatus | undefined,
    from: params.from,
    to: params.to,
    clientId: params.clientId,
    carId: params.carId,
  };

  const [orders, owners, cars] = await Promise.all([
    orderService.listOrders(filters),
    prisma.owner.findMany({ orderBy: { lastName: "asc" } }),
    prisma.car.findMany({ orderBy: { brand: "asc" } }),
  ]);

  return (
    <Suspense>
      <OrdersList orders={orders} owners={owners} cars={cars} filters={filters} />
    </Suspense>
  );
}
