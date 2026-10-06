"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateShopHours } from "./actions";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

export function ShopHoursForm({
  defaultStartTime,
  defaultEndTime,
}: {
  defaultStartTime: string;
  defaultEndTime: string;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="flex flex-wrap items-end gap-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const fd = new FormData(e.currentTarget);
        const res = await updateShopHours(fd);
        setLoading(false);
        if (res.error) toast.error("Проверьте время");
        else toast.success("Базовое время обновлено для всех сотрудников");
      }}
    >
      <div className="space-y-1">
        <Label htmlFor="defaultStartTime" className="text-xs">
          Открытие
        </Label>
        <Input
          id="defaultStartTime"
          name="defaultStartTime"
          type="time"
          className="h-9 w-32"
          defaultValue={defaultStartTime}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="defaultEndTime" className="text-xs">
          Закрытие
        </Label>
        <Input
          id="defaultEndTime"
          name="defaultEndTime"
          type="time"
          className="h-9 w-32"
          defaultValue={defaultEndTime}
        />
      </div>
      <Button type="submit" size="sm" disabled={loading}>
        {loading ? "Сохранение…" : "Сохранить"}
      </Button>
    </form>
  );
}
