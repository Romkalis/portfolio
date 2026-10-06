"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { closeDayByAdmin } from "./actions";
import { ShiftClosureForm, type ShiftClosureFormValues } from "./shift-closure-form";

export function AdminCloseDayCard() {
  const router = useRouter();

  const submit = async (data: ShiftClosureFormValues) => {
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (v !== undefined && v !== null) fd.append(k, String(v));
    });
    const res = await closeDayByAdmin(fd);
    if (res.error) {
      const msg =
        typeof res.error === "string"
          ? res.error
          : Object.values(res.error as Record<string, string[]>).flat().join(", ");
      toast.error(msg || "Ошибка");
      return res;
    }
    toast.success("Смена закрыта, данные в статистике");
    router.refresh();
    return res;
  };

  return (
    <ShiftClosureForm
      submitLabel="Закрыть смену за день"
      onSubmit={submit}
    />
  );
}
