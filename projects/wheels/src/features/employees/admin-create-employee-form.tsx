"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { EmployeeEmploymentType } from "@prisma/client";
import { adminCreateEmployeeSchema } from "@/shared/lib/validators";
import { EMPLOYMENT_TYPE_LABELS } from "@/shared/lib/employees";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import type { z } from "zod";
import { createEmployeeByAdmin } from "./actions";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";

type FormValues = z.infer<typeof adminCreateEmployeeSchema>;

export function AdminCreateEmployeeForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employmentType, setEmploymentType] = useState<EmployeeEmploymentType>(
    EmployeeEmploymentType.PERMANENT,
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(adminCreateEmployeeSchema),
    defaultValues: { position: "Мастер" },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (v !== undefined && v !== null) fd.append(k, String(v));
    });
    fd.set("employmentType", employmentType);
    const res = await createEmployeeByAdmin(fd);
    setLoading(false);

    if (res.error) {
      if (typeof res.error === "string") {
        toast.error(res.error);
        return;
      }
      const msg = Object.values(res.error).flat().join(", ");
      toast.error(msg || "Ошибка создания");
      return;
    }

    toast.success("Сотрудник создан. Вход по email и заданному паролю.");
    reset({ position: "Мастер" });
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Добавить сотрудника</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новый сотрудник</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-[var(--muted-foreground)]">
          Email — логин для входа. Пароль задаёте вы и передаёте сотруднику.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emp-name">ФИО</Label>
            <Input id="emp-name" {...register("name")} />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="emp-email">Email (логин)</Label>
            <Input id="emp-email" type="email" autoComplete="off" {...register("email")} />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="emp-password">Пароль</Label>
            <Input id="emp-password" type="password" autoComplete="new-password" {...register("password")} />
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="emp-phone">Телефон</Label>
            <Input id="emp-phone" {...register("phone")} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="emp-position">Должность</Label>
              <Input id="emp-position" {...register("position")} />
              {errors.position && (
                <p className="text-xs text-red-500">{errors.position.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="emp-rate">Ставка ₽/ч</Label>
              <Input id="emp-rate" type="number" step="1" {...register("hourlyRate")} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Статус занятости</Label>
            <Select
              value={employmentType}
              onValueChange={(v) => setEmploymentType(v as EmployeeEmploymentType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PERMANENT">{EMPLOYMENT_TYPE_LABELS.PERMANENT}</SelectItem>
                <SelectItem value="PART_TIME">{EMPLOYMENT_TYPE_LABELS.PART_TIME}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Сохранение..." : "Создать"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
