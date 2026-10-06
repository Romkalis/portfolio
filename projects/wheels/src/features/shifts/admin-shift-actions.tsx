"use client";

import { toast } from "sonner";
import { updateShiftRequestStatus } from "./actions";
import { Button } from "@/shared/ui/button";
import type { ShiftStatus } from "@prisma/client";

export function AdminShiftRequestActions({ id }: { id: string }) {
  const act = async (status: ShiftStatus) => {
    const res = await updateShiftRequestStatus(id, status);
    if (res.error) toast.error(res.error);
    else toast.success(status === "CONFIRMED" ? "Смена подтверждена" : "Заявка отклонена");
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" onClick={() => act("CONFIRMED")}>
        Подтвердить
      </Button>
      <Button size="sm" variant="destructive" onClick={() => act("REJECTED")}>
        Отклонить
      </Button>
    </div>
  );
}
