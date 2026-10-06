"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ExpenseCategory } from "@prisma/client";
import { expenseSchema, revenueSchema, salarySchema } from "@/shared/lib/validators";
import type { z } from "zod";
import { createExpense, createRevenue, createSalary } from "./actions";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { EXPENSE_CATEGORY_LABELS } from "@/shared/lib/finance";
import { toDateInputValue } from "@/shared/lib/utils";

type EmployeeOption = { id: string; name: string };

export function FinanceForms({ employees }: { employees: EmployeeOption[] }) {
  return (
    <Tabs defaultValue="revenue">
      <TabsList className="w-full flex-wrap h-auto">
        <TabsTrigger value="revenue">Выручка</TabsTrigger>
        <TabsTrigger value="salary">Зарплата</TabsTrigger>
        <TabsTrigger value="expense">Расход</TabsTrigger>
      </TabsList>
      <TabsContent value="revenue" className="mt-4">
        <RevenueForm />
      </TabsContent>
      <TabsContent value="salary" className="mt-4">
        <SalaryForm employees={employees} />
      </TabsContent>
      <TabsContent value="expense" className="mt-4">
        <ExpenseForm />
      </TabsContent>
    </Tabs>
  );
}

function RevenueForm() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof revenueSchema>>({
    resolver: zodResolver(revenueSchema),
    defaultValues: { date: toDateInputValue(new Date()) },
  });

  const onSubmit = async (data: z.infer<typeof revenueSchema>) => {
    setLoading(true);
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => v != null && fd.append(k, String(v)));
    const res = await createRevenue(fd);
    setLoading(false);
    if (res.error) toast.error("Ошибка");
    else { toast.success("Выручка сохранена"); reset(); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-2">
        <Label>Дата</Label>
        <Input type="date" {...register("date")} />
        {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
      </div>
      <div className="space-y-2">
        <Label>Сумма</Label>
        <Input type="number" step="0.01" {...register("amount", { valueAsNumber: true })} />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label>Комментарий</Label>
        <Input {...register("comment")} />
      </div>
      <Button type="submit" disabled={loading}>Сохранить выручку</Button>
    </form>
  );
}

function SalaryForm({ employees }: { employees: EmployeeOption[] }) {
  const [loading, setLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState(employees[0]?.id ?? "");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof salarySchema>>({
    resolver: zodResolver(salarySchema),
    defaultValues: { date: toDateInputValue(new Date()), employeeId: employees[0]?.id },
  });

  const onSubmit = async (data: z.infer<typeof salarySchema>) => {
    setLoading(true);
    const fd = new FormData();
    fd.append("employeeId", employeeId);
    fd.append("amount", String(data.amount));
    fd.append("date", data.date);
    if (data.comment) fd.append("comment", data.comment);
    const res = await createSalary(fd);
    setLoading(false);
    if (res.error) toast.error("Ошибка");
    else { toast.success("Зарплата добавлена"); reset(); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <Label>Сотрудник</Label>
        <Select value={employeeId} onValueChange={setEmployeeId}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите" />
          </SelectTrigger>
          <SelectContent>
            {employees.map((e) => (
              <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Дата</Label>
        <Input type="date" {...register("date")} />
      </div>
      <div className="space-y-2">
        <Label>Сумма</Label>
        <Input type="number" step="0.01" {...register("amount", { valueAsNumber: true })} />
      </div>
      <Button type="submit" disabled={loading}>Добавить зарплату</Button>
    </form>
  );
}

function ExpenseForm() {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<ExpenseCategory>(ExpenseCategory.OTHER);
  const { register, handleSubmit, reset } = useForm<z.infer<typeof expenseSchema>>({
    resolver: zodResolver(expenseSchema),
    defaultValues: { date: toDateInputValue(new Date()), category: ExpenseCategory.OTHER },
  });

  const onSubmit = async (data: z.infer<typeof expenseSchema>) => {
    setLoading(true);
    const fd = new FormData();
    fd.append("name", data.name);
    fd.append("amount", String(data.amount));
    fd.append("date", data.date);
    fd.append("category", category);
    if (data.comment) fd.append("comment", data.comment);
    const res = await createExpense(fd);
    setLoading(false);
    if (res.error) toast.error("Ошибка");
    else { toast.success("Расход добавлен"); reset(); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <Label>Название</Label>
        <Input {...register("name")} placeholder="Например: Грузики" />
      </div>
      <div className="space-y-2">
        <Label>Категория</Label>
        <Select value={category} onValueChange={(v) => setCategory(v as ExpenseCategory)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {Object.entries(EXPENSE_CATEGORY_LABELS).map(([k, label]) => (
              <SelectItem key={k} value={k}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Сумма</Label>
        <Input type="number" step="0.01" {...register("amount", { valueAsNumber: true })} />
      </div>
      <div className="space-y-2">
        <Label>Дата</Label>
        <Input type="date" {...register("date")} />
      </div>
      <div className="space-y-2">
        <Label>Комментарий</Label>
        <Input {...register("comment")} />
      </div>
      <Button type="submit" disabled={loading}>Добавить расход</Button>
    </form>
  );
}
