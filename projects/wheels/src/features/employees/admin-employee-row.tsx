"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { EmployeeEmploymentType } from "@prisma/client";
import { adminUpdateEmployeeSchema } from "@/shared/lib/validators";
import type { z } from "zod";
import { updateEmployeeByAdmin, deactivateEmployee } from "./actions";
import { EMPLOYMENT_TYPE_LABELS } from "@/shared/lib/employees";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Badge } from "@/shared/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { TableCell, TableRow } from "@/shared/ui/table";
import { formatMoney } from "@/shared/lib/utils";

type FormValues = z.infer<typeof adminUpdateEmployeeSchema>;

export type EmployeeRowData = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  position: string;
  hourlyRate: number | null;
  employmentType: EmployeeEmploymentType;
  isActive: boolean;
  shiftsCount: number;
  requestsCount: number;
};

export function AdminEmployeeRow({ employee }: { employee: EmployeeRowData }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employmentType, setEmploymentType] = useState(employee.employmentType);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(adminUpdateEmployeeSchema),
    defaultValues: {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      phone: employee.phone ?? "",
      position: employee.position,
      hourlyRate: employee.hourlyRate != null ? String(employee.hourlyRate) : "",
      employmentType: employee.employmentType,
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    const fd = new FormData();
    fd.append("id", data.id);
    fd.append("name", data.name);
    fd.append("email", data.email);
    fd.append("position", data.position);
    fd.append("employmentType", employmentType);
    if (data.phone) fd.append("phone", data.phone);
    if (data.hourlyRate) fd.append("hourlyRate", data.hourlyRate);
    if (data.password) fd.append("password", data.password);
    const res = await updateEmployeeByAdmin(fd);
    setLoading(false);
    if (res.error) {
      toast.error(typeof res.error === "string" ? res.error : "Ошибка сохранения");
      return;
    }
    toast.success("Сохранено");
    setOpen(false);
    router.refresh();
  };

  const onFire = async () => {
    if (!confirm(`Уволить ${employee.name}? Вход будет заблокирован.`)) return;
    setLoading(true);
    const res = await deactivateEmployee(employee.id);
    setLoading(false);
    if (res.error) toast.error(res.error);
    else {
      toast.success("Сотрудник уволен");
      router.refresh();
    }
  };

  return (
    <TableRow className={!employee.isActive ? "opacity-50" : undefined}>
      <TableCell className="font-medium">{employee.name}</TableCell>
      <TableCell>{employee.email}</TableCell>
      <TableCell>
        <Badge variant={employee.employmentType === "PERMANENT" ? "success" : "muted"}>
          {EMPLOYMENT_TYPE_LABELS[employee.employmentType]}
        </Badge>
      </TableCell>
      <TableCell>{employee.position}</TableCell>
      <TableCell>
        {employee.hourlyRate != null ? formatMoney(employee.hourlyRate) + "/ч" : "—"}
      </TableCell>
      <TableCell>
        <Badge variant="muted">{employee.shiftsCount}</Badge>
      </TableCell>
      <TableCell>
        {!employee.isActive ? (
          <Badge variant="danger">Уволен</Badge>
        ) : (
          <div className="flex flex-wrap gap-1">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="secondary">
                  Изменить
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Редактирование</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <input type="hidden" {...register("id")} />
                  <div className="space-y-2">
                    <Label>ФИО</Label>
                    <Input {...register("name")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" {...register("email")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Новый пароль</Label>
                    <Input type="password" placeholder="Пусто — не менять" {...register("password")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Статус</Label>
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
                  <div className="space-y-2">
                    <Label>Телефон</Label>
                    <Input {...register("phone")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Должность</Label>
                    <Input {...register("position")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Ставка</Label>
                    <Input type="number" {...register("hourlyRate")} />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full">
                    Сохранить
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            <Button size="sm" variant="destructive" disabled={loading} onClick={onFire}>
              Уволить
            </Button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}
