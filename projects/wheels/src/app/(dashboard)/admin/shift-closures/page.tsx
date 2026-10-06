import { prisma } from "@/shared/lib/prisma";
import { ShiftClosureStatus } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { PendingClosureReview } from "@/features/shift-closures/pending-closure-review";
import { AdminCloseDayCard } from "@/features/shift-closures/close-day-client";
import { decimalToNumber, formatDate, formatDateOnly, formatMoney } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";

export default async function AdminShiftClosuresPage() {
  const [pending, approvedShop] = await Promise.all([
    prisma.shiftClosure.findMany({
      where: { status: ShiftClosureStatus.PENDING },
      include: { employee: { include: { user: true } } },
      orderBy: { date: "desc" },
    }),
    prisma.shiftClosure.findMany({
      where: { status: ShiftClosureStatus.APPROVED, scopeKey: "shop" },
      orderBy: { date: "desc" },
      take: 10,
    }),
  ]);

  const pendingItems = pending.map((c) => ({
    id: c.id,
    date: formatDateOnly(c.date),
    employeeName: c.employee?.user.name ?? "—",
    cashAmount: decimalToNumber(c.cashAmount),
    salaryAmount: decimalToNumber(c.salaryAmount),
    discopravAmount: decimalToNumber(c.discopravAmount),
    expensesAmount: c.expensesAmount != null ? decimalToNumber(c.expensesAmount) : null,
    expensesNote: c.expensesNote,
    comment: c.comment,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1>Финансы по сменам</h1>
        <p className="text-[var(--muted-foreground)] mt-1">
          Закрытие дня начальником и проверка отчётов сотрудников
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Закрыть смену за день (начальник)</CardTitle>
          <p className="text-sm text-[var(--muted-foreground)]">
            Данные сразу попадают в статистику и раздел «Финансы»
          </p>
        </CardHeader>
        <CardContent>
          <AdminCloseDayCard />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>На проверке от сотрудников</CardTitle>
        </CardHeader>
        <CardContent>
          <PendingClosureReview items={pendingItems} />
        </CardContent>
      </Card>

      {approvedShop.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Последние закрытия дня (начальник)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {approvedShop.map((c) => (
              <div
                key={c.id}
                className="flex flex-wrap justify-between gap-2 rounded-lg border border-[var(--border)] p-3 text-sm"
              >
                <span>{formatDate(c.date)}</span>
                <span>{formatMoney(decimalToNumber(c.cashAmount))}</span>
                <Badge variant="success">В статистике</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
