import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/shared/lib/prisma";
import { StatsCard } from "@/entities/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Calendar, CircleDollarSign, ClipboardList } from "lucide-react";
import { decimalToNumber, formatDate, formatMoney } from "@/shared/lib/utils";
import { subDays } from "date-fns";
import { EmployeeProfileCard } from "@/features/employees/employee-profile-card";

export default async function EmployeeDashboardPage() {
  const session = await auth();
  const profileId = session?.user?.employeeProfileId;
  if (!profileId) redirect("/login");

  const from = subDays(new Date(), 30);
  const profile = await prisma.employeeProfile.findUnique({
    where: { id: profileId },
  });

  const [confirmed, pending, rejected, salaries] = await Promise.all([
    prisma.shift.count({ where: { employeeId: profileId, status: "CONFIRMED", date: { gte: from } } }),
    prisma.shiftRequest.count({ where: { employeeId: profileId, status: "PENDING" } }),
    prisma.shift.count({ where: { employeeId: profileId, status: "REJECTED", date: { gte: from } } }),
    prisma.salary.findMany({
      where: { employeeId: profileId, date: { gte: from } },
      orderBy: { date: "desc" },
      take: 5,
    }),
  ]);

  const earnings = salaries.reduce((a, s) => a + decimalToNumber(s.amount), 0);
  const upcoming = await prisma.shift.findMany({
    where: { employeeId: profileId, status: "CONFIRMED", date: { gte: new Date() } },
    orderBy: { date: "asc" },
    take: 5,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1>Личный кабинет</h1>
        <p className="text-[var(--muted-foreground)] mt-1">Ваше расписание и заработок</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Подтверждённые смены" value={confirmed} hint="за 30 дней" icon={Calendar} format="number" />
        <StatsCard title="Ожидают ответа" value={pending} icon={ClipboardList} format="number" />
        <StatsCard title="Отклонённые" value={rejected} icon={Calendar} format="number" />
        <StatsCard title="Заработок" value={earnings} hint="за 30 дней" icon={CircleDollarSign} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Ближайшие смены</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcoming.length === 0 ? (
            <p className="text-sm text-[var(--muted-foreground)]">Нет запланированных смен</p>
          ) : (
            upcoming.map((s) => (
              <div key={s.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[var(--border)] p-3">
                <div>
                  <p className="font-medium">{formatDate(s.date)}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {s.startTime} – {s.endTime}
                  </p>
                </div>
                <Badge variant="success">Подтверждена</Badge>
              </div>
            ))
          )}
        </CardContent>
      </Card>
      {profile && (
        <EmployeeProfileCard phone={profile.phone} position={profile.position} />
      )}
      <Card>
        <CardHeader>
          <CardTitle>Последние выплаты</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {salaries.map((s) => (
            <div key={s.id} className="flex justify-between text-sm">
              <span>{formatDate(s.date)}</span>
              <span className="font-medium">{formatMoney(decimalToNumber(s.amount))}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
