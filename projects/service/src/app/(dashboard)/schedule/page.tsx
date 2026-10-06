import { ScheduleView } from "@/features/schedule/ScheduleView/ScheduleView";
import * as scheduleService from "@/services/schedule.service";
import { prisma } from "@/shared/lib/prisma";
import { addDays, startOfDay } from "date-fns";

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const params = await searchParams;
  const view = params.view === "month" ? "month" : "week";
  const from = startOfDay(new Date());
  const to = addDays(from, view === "month" ? 30 : 7);

  const [appointments, owners, cars] = await Promise.all([
    scheduleService.listAppointments(from, to),
    prisma.owner.findMany({ orderBy: { lastName: "asc" } }),
    prisma.car.findMany({ include: { owner: true }, orderBy: { brand: "asc" } }),
  ]);

  return (
    <ScheduleView
      appointments={appointments}
      owners={owners}
      cars={cars.map((c) => ({
        id: c.id,
        brand: c.brand,
        model: c.model,
        year: c.year,
        ownerId: c.ownerId,
      }))}
      view={view}
    />
  );
}
