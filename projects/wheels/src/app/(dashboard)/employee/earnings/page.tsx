import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/shared/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { StatsCard } from "@/entities/stats-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { decimalToNumber, formatDate, formatMoney } from "@/shared/lib/utils";
import { subDays, subMonths } from "date-fns";
import { CircleDollarSign } from "lucide-react";

export default async function EmployeeEarningsPage() {
  const session = await auth();
  const profileId = session?.user?.employeeProfileId;
  if (!profileId) redirect("/login");

  const now = new Date();
  const [weekSalaries, monthSalaries, allSalaries] = await Promise.all([
    prisma.salary.findMany({ where: { employeeId: profileId, date: { gte: subDays(now, 7) } } }),
    prisma.salary.findMany({ where: { employeeId: profileId, date: { gte: subMonths(now, 1) } } }),
    prisma.salary.findMany({ where: { employeeId: profileId }, orderBy: { date: "desc" } }),
  ]);

  const weekTotal = weekSalaries.reduce((a, s) => a + decimalToNumber(s.amount), 0);
  const monthTotal = monthSalaries.reduce((a, s) => a + decimalToNumber(s.amount), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1>Заработок</h1>
        <p className="text-[var(--muted-foreground)] mt-1">Выплаты за выбранные периоды</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <StatsCard title="За неделю" value={weekTotal} icon={CircleDollarSign} />
        <StatsCard title="За месяц" value={monthTotal} icon={CircleDollarSign} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>История выплат</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Дата</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Комментарий</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allSalaries.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{formatDate(s.date)}</TableCell>
                  <TableCell>{formatMoney(decimalToNumber(s.amount))}</TableCell>
                  <TableCell>{s.comment ?? "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
