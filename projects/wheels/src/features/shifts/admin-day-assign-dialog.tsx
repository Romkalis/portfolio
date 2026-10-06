"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { toast } from "sonner";
import { assignEmployeeToDay, deleteShift } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import type { ShiftCalendarItem } from "@/widgets/calendar/shift-calendar";
import type { EmployeeOption } from "@/widgets/calendar/shift-calendar";

type Props = {
  day: Date | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shiftsOnDay: ShiftCalendarItem[];
  employees: EmployeeOption[];
  defaultStartTime: string;
  defaultEndTime: string;
};

export function AdminDayAssignDialog({
  day,
  open,
  onOpenChange,
  shiftsOnDay,
  employees,
  defaultStartTime,
  defaultEndTime,
}: Props) {
  const router = useRouter();
  const [selectKey, setSelectKey] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!day) return null;

  const dateStr = format(day, "yyyy-MM-dd");
  const assignedIds = new Set(
    shiftsOnDay.map((s) => s.employeeId).filter(Boolean) as string[],
  );
  const available = employees.filter((e) => !assignedIds.has(e.id));

  const onAssign = async (employeeId: string) => {
    if (!employeeId) return;
    setLoading(true);
    const res = await assignEmployeeToDay(employeeId, dateStr);
    setLoading(false);
    if (res.error) {
      toast.error(typeof res.error === "string" ? res.error : "Не удалось назначить");
      return;
    }
    toast.success("Сотрудник добавлен на смену");
    setSelectKey((k) => k + 1);
    router.refresh();
  };

  const onRemove = async (shiftId: string) => {
    setLoading(true);
    const res = await deleteShift(shiftId);
    setLoading(false);
    if (res.error) {
      toast.error(typeof res.error === "string" ? res.error : "Не удалось удалить");
      return;
    }
    toast.success("Смена снята");
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Смена на {format(day, "d MMMM yyyy", { locale: ru })}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium">Назначены</p>
            {shiftsOnDay.length === 0 ? (
              <p className="text-sm text-[var(--muted-foreground)]">Никого нет — добавьте ниже</p>
            ) : (
              <ul className="space-y-2">
                {shiftsOnDay.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center justify-between gap-2 rounded-lg border border-[var(--border)] px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-medium">{s.employeeName}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {s.startTime}–{s.endTime}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="success">На смене</Badge>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        disabled={loading}
                        onClick={() => onRemove(s.id)}
                      >
                        Снять
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">Добавить сотрудника</p>
            <p className="mb-2 text-xs text-[var(--muted-foreground)]">
              Время смены по базовому графику: {defaultStartTime}–{defaultEndTime}
            </p>
            {available.length === 0 ? (
              <p className="text-sm text-[var(--muted-foreground)]">
                Все сотрудники уже назначены на этот день
              </p>
            ) : (
              <Select
                key={selectKey}
                disabled={loading}
                onValueChange={(id) => onAssign(id)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите сотрудника" />
                </SelectTrigger>
                <SelectContent>
                  {available.map((e) => (
                    <SelectItem key={e.id} value={e.id}>
                      {e.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
