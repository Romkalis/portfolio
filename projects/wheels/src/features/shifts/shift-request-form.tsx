"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { shiftRequestSchema } from "@/shared/lib/validators";
import type { z } from "zod";
import { createShiftRequest } from "./actions";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { toDateInputValue } from "@/shared/lib/utils";

type FormData = z.infer<typeof shiftRequestSchema>;

export function ShiftRequestForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(shiftRequestSchema),
    defaultValues: {
      date: toDateInputValue(new Date()),
      startTime: "09:00",
      endTime: "18:00",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => v != null && fd.append(k, String(v)));
    const res = await createShiftRequest(fd);
    setLoading(false);
    if (res.error) {
      toast.error(typeof res.error === "string" ? res.error : "Проверьте форму");
      return;
    }
    toast.success("Заявка отправлена");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="date">Дата</Label>
        <Input id="date" type="date" {...register("date")} />
        {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="startTime">Начало</Label>
        <Input id="startTime" type="time" {...register("startTime")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="endTime">Конец</Label>
        <Input id="endTime" type="time" {...register("endTime")} />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="comment">Комментарий</Label>
        <Input id="comment" placeholder="Необязательно" {...register("comment")} />
      </div>
      <Button type="submit" disabled={loading} className="sm:col-span-2">
        {loading ? "Отправка..." : "Отправить заявку"}
      </Button>
    </form>
  );
}
