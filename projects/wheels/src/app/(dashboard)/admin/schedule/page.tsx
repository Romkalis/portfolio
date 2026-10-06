import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/shared/lib/prisma";
import { WorkCalendar } from "@/widgets/calendar/work-calendar";
import { loadScheduleCalendarMonth } from "@/shared/lib/schedule-calendar-page";
import { getActiveEmployeesForSelect } from "@/shared/lib/employee-select";
import { EMPLOYMENT_TYPE_LABELS } from "@/shared/lib/employees";
import { getShopSettings } from "@/services/shop-settings.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { formatDate } from "@/shared/lib/utils";
import { AdminShiftRequestActions } from "@/features/shifts/admin-shift-actions";

type SearchParams = Promise<{ month?: string }>;

export default async function AdminSchedulePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/employee/schedule");

  const params = await searchParams;
  const [data, employees, shop, requests] = await Promise.all([
    loadScheduleCalendarMonth(params.month),
    getActiveEmployeesForSelect(),
    getShopSettings(),
    prisma.shiftRequest.findMany({
      where: { status: "PENDING" },
      include: { employee: { include: { user: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const employeeOptions = employees.map((e) => ({
    id: e.id,
    name: `${e.name} (${EMPLOYMENT_TYPE_LABELS[e.employmentType]})`,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1>График и смены</h1>
          <p className="text-[var(--muted-foreground)] mt-1">
            Календарь, назначение сотрудников и заявки
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/shift-closures">Закрыть смену за день</Link>
        </Button>
      </div>

      {requests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Заявки на подтверждение ({requests.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {requests.map((r) => (
              <div
                key={r.id}
                className="flex flex-col gap-3 rounded-lg border border-[var(--border)] p-4 lg:flex-row lg:items-center lg:justify-between"
              >
                <div>
                  <p className="font-medium">{r.employee.user.name}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {formatDate(r.date)} · {r.startTime}–{r.endTime}
                  </p>
                  {r.comment && <p className="text-sm mt-1">{r.comment}</p>}
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="warning">Ожидает</Badge>
                  <AdminShiftRequestActions id={r.id} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <WorkCalendar
        monthLabel={data.monthLabel}
        shopStart={data.shopStart}
        shopEnd={data.shopEnd}
        gridDays={data.gridDays}
        days={data.days}
        monthAnchorYmd={data.monthAnchorYmd}
        prevMonthYmd={data.prevMonthYmd}
        nextMonthYmd={data.nextMonthYmd}
        monthBasePath="/admin/schedule"
        isAdmin
        adminEmployees={employeeOptions}
        defaultStartTime={shop.defaultStartTime}
        defaultEndTime={shop.defaultEndTime}
      />
    </div>
  );
}
