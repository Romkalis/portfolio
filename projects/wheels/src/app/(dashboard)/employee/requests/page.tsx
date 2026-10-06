import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/shared/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { AvailabilityCalendar } from "@/features/shifts/availability-calendar";
import { formatDate, formatDateOnly } from "@/shared/lib/utils";
import { getShopSettings } from "@/services/shop-settings.service";
import type { ShiftStatus } from "@prisma/client";

const statusMap: Record<ShiftStatus, { label: string; variant: "success" | "warning" | "danger" }> = {
  CONFIRMED: { label: "Подтверждена", variant: "success" },
  PENDING: { label: "Ожидает", variant: "warning" },
  REJECTED: { label: "Отклонена", variant: "danger" },
};

export default async function EmployeeRequestsPage() {
  const session = await auth();
  const profileId = session?.user?.employeeProfileId;
  if (!profileId) redirect("/login");

  const shop = await getShopSettings();

  const requests = await prisma.shiftRequest.findMany({
    where: { employeeId: profileId },
    orderBy: { createdAt: "desc" },
  });

  const statusPriority: Record<ShiftStatus, number> = {
    CONFIRMED: 3,
    PENDING: 2,
    REJECTED: 1,
  };
  const statusByDate = new Map<string, ShiftStatus>();
  for (const r of requests) {
    const d = formatDateOnly(r.date);
    const cur = statusByDate.get(d);
    if (!cur || statusPriority[r.status] > statusPriority[cur]) {
      statusByDate.set(d, r.status);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1>Заявки на смены</h1>
        <p className="text-[var(--muted-foreground)] mt-1">Укажите дни, когда можете работать</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start">
        <Card className="w-fit">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Выбор дней</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <AvailabilityCalendar
              shopStartTime={shop.defaultStartTime}
              shopEndTime={shop.defaultEndTime}
              existingRequests={[...statusByDate.entries()].map(([date, status]) => ({
                date,
                status,
              }))}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>История заявок</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
          {requests.map((r) => (
            <div
              key={r.id}
              className="flex flex-col gap-2 rounded-lg border border-[var(--border)] p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium">
                  {formatDate(r.date)} · {r.startTime}–{r.endTime}
                </p>
                {r.comment && <p className="text-sm text-[var(--muted-foreground)]">{r.comment}</p>}
              </div>
              <Badge variant={statusMap[r.status].variant}>{statusMap[r.status].label}</Badge>
            </div>
          ))}
        </CardContent>
        </Card>
      </div>
    </div>
  );
}
