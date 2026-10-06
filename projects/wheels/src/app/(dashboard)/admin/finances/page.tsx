import { prisma } from "@/shared/lib/prisma";
import { getFinanceDataInPeriod } from "@/services/finance.service";
import { StatsCard } from "@/entities/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { FinanceForms } from "@/features/finance/finance-forms";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { EXPENSE_CATEGORY_LABELS } from "@/shared/lib/finance";
import { decimalToNumber, formatDate, formatMoney } from "@/shared/lib/utils";
import { subDays } from "date-fns";
import { TrendingUp, Wallet, Receipt, Users } from "lucide-react";

export default async function AdminFinancesPage() {
  const from = subDays(new Date(), 30);
  const to = new Date();
  const finance = await getFinanceDataInPeriod(from, to);

  const employees = await prisma.employeeProfile.findMany({
    include: { user: true },
    orderBy: { user: { name: "asc" } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1>Финансы</h1>
        <p className="text-[var(--muted-foreground)] mt-1">Выручка, зарплаты, расходы и чистая прибыль</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Выручка" value={finance.summary.revenue} icon={TrendingUp} hint="30 дней" />
        <StatsCard title="Расходы" value={finance.summary.expenses} icon={Receipt} />
        <StatsCard title="Зарплаты" value={finance.summary.salaries} icon={Users} />
        <StatsCard title="Чистая прибыль" value={finance.summary.netProfit} icon={Wallet} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Добавить запись</CardTitle>
          </CardHeader>
          <CardContent>
            <FinanceForms employees={employees.map((e) => ({ id: e.id, name: e.user.name }))} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Последние расходы</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>Название</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Сумма</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {finance.expenses.slice(0, 8).map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>{formatDate(e.date)}</TableCell>
                    <TableCell>{e.name}</TableCell>
                    <TableCell>{EXPENSE_CATEGORY_LABELS[e.category]}</TableCell>
                    <TableCell>{formatMoney(decimalToNumber(e.amount))}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
