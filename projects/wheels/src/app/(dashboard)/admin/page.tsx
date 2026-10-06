import { prisma } from "@/shared/lib/prisma";
import { getFinanceDataInPeriod } from "@/services/finance.service";
import { StatsCard } from "@/entities/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Users, Wallet, Calendar, TrendingUp } from "lucide-react";
import { formatDate } from "@/shared/lib/utils";
import { subDays } from "date-fns";
import Link from "next/link";
import { Button } from "@/shared/ui/button";

export default async function AdminDashboardPage() {
  const from = subDays(new Date(), 7);
  const to = new Date();
  const finance = await getFinanceDataInPeriod(from, to);

  const [employeesCount, pendingRequests, todayShifts] = await Promise.all([
    prisma.employeeProfile.count(),
    prisma.shiftRequest.count({ where: { status: "PENDING" } }),
    prisma.shift.count({
      where: {
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    }),
  ]);

  const recentRequests = await prisma.shiftRequest.findMany({
    where: { status: "PENDING" },
    include: { employee: { include: { user: true } } },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="text-[var(--muted-foreground)] mt-1">Обзор за последние 7 дней</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/analytics">Аналитика</Link>
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Выручка" value={finance.summary.revenue} icon={TrendingUp} />
        <StatsCard title="Чистая прибыль" value={finance.summary.netProfit} icon={Wallet} />
        <StatsCard title="Сотрудники" value={employeesCount} icon={Users} format="number" />
        <StatsCard title="Смен сегодня" value={todayShifts} icon={Calendar} format="number" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Заявки на подтверждение ({pendingRequests})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentRequests.length === 0 ? (
              <p className="text-sm text-[var(--muted-foreground)]">Нет ожидающих заявок</p>
            ) : (
              recentRequests.map((r) => (
                <div key={r.id} className="flex justify-between gap-2 rounded-lg border border-[var(--border)] p-3">
                  <div>
                    <p className="font-medium">{r.employee.user.name}</p>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {formatDate(r.date)} · {r.startTime}–{r.endTime}
                    </p>
                  </div>
                  <Badge variant="warning">Ожидает</Badge>
                </div>
              ))
            )}
            <Button asChild variant="secondary" size="sm">
              <Link href="/admin/schedule">График и смены</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Финансы (7 дней)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--muted-foreground)]">Расходы</span>
              <span>{finance.summary.expenses.toLocaleString("ru-RU")} ₽</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted-foreground)]">Зарплаты</span>
              <span>{finance.summary.salaries.toLocaleString("ru-RU")} ₽</span>
            </div>
            <Button asChild className="mt-3" size="sm">
              <Link href="/admin/finances">Раздел «Финансы»</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
