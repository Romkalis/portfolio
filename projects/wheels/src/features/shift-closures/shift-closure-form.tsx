"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { shiftClosureSchema } from "@/shared/lib/validators";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { toDateInputValue } from "@/shared/lib/utils";

export type ShiftClosureFormValues = z.infer<typeof shiftClosureSchema>;

type Props = {
  defaultDate?: string;
  defaultValues?: Partial<ShiftClosureFormValues>;
  submitLabel: string;
  onSubmit: (data: ShiftClosureFormValues) => Promise<{ error?: unknown; success?: boolean }>;
  hiddenId?: string;
};

export function ShiftClosureForm({
  defaultDate,
  defaultValues,
  submitLabel,
  onSubmit,
  hiddenId,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShiftClosureFormValues>({
    resolver: zodResolver(shiftClosureSchema),
    defaultValues: {
      date: defaultDate ?? toDateInputValue(new Date()),
      cashAmount: 0,
      salaryAmount: 0,
      discopravAmount: 0,
      ...defaultValues,
    },
  });

  return (
    <form
      className="grid gap-3 sm:grid-cols-2"
      onSubmit={handleSubmit(async (data) => {
        await onSubmit(data);
      })}
    >
      {hiddenId && <input type="hidden" name="id" value={hiddenId} />}
      <div className="space-y-2 sm:col-span-2">
        <Label>Дата смены</Label>
        <Input type="date" {...register("date")} />
        {errors.date && <p className="text-xs text-red-500">{String(errors.date.message)}</p>}
      </div>
      <div className="space-y-2">
        <Label>Касса (нал + безнал)</Label>
        <Input type="number" step="0.01" {...register("cashAmount", { valueAsNumber: true })} />
        {errors.cashAmount && (
          <p className="text-xs text-red-500">{String(errors.cashAmount.message)}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Зарплата</Label>
        <Input type="number" step="0.01" {...register("salaryAmount", { valueAsNumber: true })} />
        {errors.salaryAmount && (
          <p className="text-xs text-red-500">{String(errors.salaryAmount.message)}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Дископрав</Label>
        <Input type="number" step="0.01" {...register("discopravAmount", { valueAsNumber: true })} />
      </div>
      <div className="space-y-2">
        <Label>Расходы (сумма)</Label>
        <Input type="number" step="0.01" {...register("expensesAmount", { valueAsNumber: true })} />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label>Расходы (комментарий)</Label>
        <Input placeholder="Необязательно" {...register("expensesNote")} />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label>Комментарий</Label>
        <Input {...register("comment")} />
      </div>
      <Button type="submit" disabled={isSubmitting} className="sm:col-span-2">
        {isSubmitting ? "Сохранение..." : submitLabel}
      </Button>
    </form>
  );
}
