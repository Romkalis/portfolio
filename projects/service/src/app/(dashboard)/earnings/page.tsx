import { Suspense } from "react";
import { EarningsView } from "@/features/earnings/EarningsView/EarningsView";
import * as earningsService from "@/services/earnings.service";
import { prisma } from "@/shared/lib/prisma";

export default async function EarningsPage({
  searchParams,
}: {
  searchParams: Promise<{
    from?: string;
    to?: string;
    clientId?: string;
    carId?: string;
  }>;
}) {
  const params = await searchParams;
  const filters = {
    from: params.from,
    to: params.to,
    clientId: params.clientId,
    carId: params.carId,
  };

  const [summary, orders, chartData, owners, cars, period] = await Promise.all([
    earningsService.getEarningsSummary(),
    earningsService.listEarnings(filters),
    earningsService.getEarningsChart(filters),
    prisma.owner.findMany({ orderBy: { lastName: "asc" } }),
    prisma.car.findMany({ orderBy: { brand: "asc" } }),
    earningsService.sumEarnings(filters),
  ]);

  return (
    <Suspense>
    <EarningsView
      summary={summary}
      orders={orders}
      chartData={chartData}
      owners={owners}
      cars={cars}
      filters={filters}
      periodTotal={period.total}
    />
    </Suspense>
  );
}
