"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { submitShiftClosureByEmployee, updateOwnPendingClosure } from "./actions";
import { ShiftClosureForm, type ShiftClosureFormValues } from "./shift-closure-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { formatDate, formatMoney } from "@/shared/lib/utils";

export type MyClosureItem = {
  id: string;
  date: string;
  status: string;
  cashAmount: number;
  salaryAmount: number;
  discopravAmount: number;
};

export function EmployeeCloseShiftClient({
  shiftDates,
  myClosures,
}: {
  shiftDates: string[];
  myClosures: MyClosureItem[];
}) {
  const router = useRouter();
  const pending = myClosures.filter((c) => c.status === "PENDING");

  const toFormData = (data: ShiftClosureFormValues, id?: string) => {
    const fd = new FormData();
    if (id) fd.append("id", id);
    Object.entries(data).forEach(([k, v]) => {
      if (v !== undefined && v !== null) fd.append(k, String(v));
    });
    return fd;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Закрыть смену</CardTitle>
          <p className="text-sm text-[var(--muted-foreground)]">
            Доступно только для дней с подтверждённой сменой. Данные уйдут начальнику на проверку.
          </p>
        </CardHeader>
        <CardContent>
          {shiftDates.length === 0 ? (
            <p className="text-sm text-[var(--muted-foreground)]">Нет подтверждённых смен</p>
          ) : (
            <ShiftClosureForm
              defaultDate={shiftDates[0]?.slice(0, 10)}
              submitLabel="Отправить на проверку"
              onSubmit={async (data) => {
                const res = await submitShiftClosureByEmployee(toFormData(data));
                if (res.error) {
                  toast.error(typeof res.error === "string" ? res.error : "Ошибка");
                  return res;
                }
                toast.success("Отправлено начальнику");
                router.refresh();
                return res;
              }}
            />
          )}
        </CardContent>
      </Card>

      {pending.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Ожидают проверки</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pending.map((c) => (
              <div key={c.id} className="rounded-lg border border-[var(--border)] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-medium">{formatDate(c.date)}</span>
                  <Badge variant="warning">На проверке</Badge>
                </div>
                <p className="mb-3 text-sm text-[var(--muted-foreground)]">
                  Касса {formatMoney(c.cashAmount)} · ЗП {formatMoney(c.salaryAmount)}
                </p>
                <ShiftClosureForm
                  defaultDate={c.date.slice(0, 10)}
                  defaultValues={{
                    cashAmount: c.cashAmount,
                    salaryAmount: c.salaryAmount,
                    discopravAmount: c.discopravAmount,
                  }}
                  submitLabel="Сохранить изменения"
                  onSubmit={async (data) => {
                    const res = await updateOwnPendingClosure(toFormData(data, c.id));
                    if (res.error) toast.error(typeof res.error === "string" ? res.error : "Ошибка");
                    else {
                      toast.success("Обновлено");
                      router.refresh();
                    }
                    return res;
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
