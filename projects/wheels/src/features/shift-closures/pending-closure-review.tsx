"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { formatDate, formatMoney } from "@/shared/lib/utils";
import { approveShiftClosure, rejectShiftClosure } from "./actions";
import { ShiftClosureForm, type ShiftClosureFormValues } from "./shift-closure-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";

export type PendingClosureItem = {
  id: string;
  date: string;
  employeeName: string;
  cashAmount: number;
  salaryAmount: number;
  discopravAmount: number;
  expensesAmount: number | null;
  expensesNote: string | null;
  comment: string | null;
};

export function PendingClosureReview({ items }: { items: PendingClosureItem[] }) {
  const router = useRouter();

  if (items.length === 0) {
    return (
      <p className="text-sm text-[var(--muted-foreground)]">Нет закрытий на проверке</p>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base">{item.employeeName}</CardTitle>
              <p className="text-sm text-[var(--muted-foreground)]">{formatDate(item.date)}</p>
            </div>
            <Badge variant="warning">На проверке</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
              <div>
                <span className="text-[var(--muted-foreground)]">Касса</span>
                <p className="font-medium">{formatMoney(item.cashAmount)}</p>
              </div>
              <div>
                <span className="text-[var(--muted-foreground)]">Зарплата</span>
                <p className="font-medium">{formatMoney(item.salaryAmount)}</p>
              </div>
              <div>
                <span className="text-[var(--muted-foreground)]">Дископрав</span>
                <p className="font-medium">{formatMoney(item.discopravAmount)}</p>
              </div>
              {item.expensesAmount != null && item.expensesAmount > 0 && (
                <div>
                  <span className="text-[var(--muted-foreground)]">Расходы</span>
                  <p className="font-medium">{formatMoney(item.expensesAmount)}</p>
                </div>
              )}
            </div>
            <ShiftClosureForm
              hiddenId={item.id}
              submitLabel="Подтвердить и в статистику"
              defaultDate={item.date}
              defaultValues={{
                date: item.date,
                cashAmount: item.cashAmount,
                salaryAmount: item.salaryAmount,
                discopravAmount: item.discopravAmount,
                expensesAmount: item.expensesAmount ?? undefined,
                expensesNote: item.expensesNote ?? undefined,
                comment: item.comment ?? undefined,
              }}
              onSubmit={async (data) => {
                const fd = new FormData();
                fd.append("id", item.id);
                Object.entries(data).forEach(([k, v]) => {
                  if (v !== undefined && v !== null) fd.append(k, String(v));
                });
                const res = await approveShiftClosure(fd);
                if (res.error) {
                  toast.error(typeof res.error === "string" ? res.error : "Ошибка");
                  return res;
                }
                toast.success("Принято в статистику");
                router.refresh();
                return res;
              }}
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={async () => {
                const res = await rejectShiftClosure(item.id);
                if (res.error) toast.error(typeof res.error === "string" ? res.error : "Ошибка");
                else {
                  toast.success("Отклонено");
                  router.refresh();
                }
              }}
            >
              Отклонить
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
