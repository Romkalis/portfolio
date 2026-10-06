"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
import { formatDate } from "@/shared/lib/utils";
import { percentInRange, minutesToTime, timeToMinutes } from "@/shared/lib/schedule-time";
import type { CalendarDayData, CalendarTimeBlock } from "@/services/work-calendar.service";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  assignEmployeeToDay,
  deleteShift,
  updateScheduleBlockTimes,
  updateShiftRequestStatus,
} from "@/features/shifts/actions";
import type { ShiftStatus } from "@prisma/client";

export type EmployeeOption = { id: string; name: string };

const statusBadge: Record<
  ShiftStatus,
  { label: string; variant: "success" | "warning" | "danger" }
> = {
  CONFIRMED: { label: "На смене", variant: "success" },
  PENDING: { label: "Ожидает", variant: "warning" },
  REJECTED: { label: "Отклонена", variant: "danger" },
};

export function DayDetailDialog({
  day,
  open,
  onOpenChange,
  adminEmployees,
  defaultStartTime,
  defaultEndTime,
}: {
  day: CalendarDayData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  adminEmployees?: EmployeeOption[];
  defaultStartTime?: string;
  defaultEndTime?: string;
}) {
  const router = useRouter();
  const [selectKey, setSelectKey] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!day) return null;

  const shopStart = day.shopStart;
  const shopEnd = day.shopEnd;
  const isAdmin = !!adminEmployees?.length;
  const shopMin = defaultStartTime ?? shopStart;
  const shopMax = defaultEndTime ?? shopEnd;

  const busyEmployeeIds = new Set(day.blocks.map((b) => b.employeeId));
  const availableEmployees =
    adminEmployees?.filter((e) => !busyEmployeeIds.has(e.id)) ?? [];

  const onAssign = async (employeeId: string) => {
    if (!employeeId) return;
    setLoading(true);
    const res = await assignEmployeeToDay(employeeId, day.date);
    setLoading(false);
    if (res.error) {
      toast.error(typeof res.error === "string" ? res.error : "Не удалось назначить");
      return;
    }
    toast.success("Сотрудник добавлен на смену");
    setSelectKey((k) => k + 1);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {formatDate(day.date, "long")} · {day.weekdayLabel}
          </DialogTitle>
          <p className="text-sm text-[var(--muted-foreground)]">
            Режим точки: {shopStart}–{shopEnd}
            {!day.hasCoverage && (
              <span className="ml-2 text-red-600 dark:text-red-400">
                · график не закрыт
              </span>
            )}
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative rounded-lg border border-[var(--border)] bg-[var(--muted)]/40 p-3 pt-8">
            <div className="mb-2 flex justify-between text-[10px] text-[var(--muted-foreground)]">
              <span>{shopStart}</span>
              <span>{shopEnd}</span>
            </div>
            {day.blocks.length === 0 ? (
              <p className="py-6 text-center text-sm text-[var(--muted-foreground)]">
                Нет смен и заявок на этот день
              </p>
            ) : (
              <div className="space-y-4">
                {day.blocks.map((block) => (
                  <BlockRow
                    key={`${block.source}-${block.id}`}
                    block={block}
                    shopStart={shopStart}
                    shopEnd={shopEnd}
                    shopMin={shopMin}
                    shopMax={shopMax}
                    isAdmin={isAdmin}
                    loading={loading}
                    setLoading={setLoading}
                    onDone={() => router.refresh()}
                  />
                ))}
              </div>
            )}
            {day.uncoveredMinutes > 0 && day.blocks.length > 0 && (
              <UncoveredGaps shopStart={shopStart} shopEnd={shopEnd} blocks={day.blocks} />
            )}
          </div>

          {isAdmin && (
            <div>
              <p className="mb-2 text-sm font-medium">Добавить на смену</p>
              <p className="mb-2 text-xs text-[var(--muted-foreground)]">
                По базовому графику: {shopMin}–{shopMax}
              </p>
              {availableEmployees.length === 0 ? (
                <p className="text-sm text-[var(--muted-foreground)]">
                  Все сотрудники уже в графике на этот день
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
                    {availableEmployees.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function BlockRow({
  block,
  shopStart,
  shopEnd,
  shopMin,
  shopMax,
  isAdmin,
  loading,
  setLoading,
  onDone,
}: {
  block: CalendarTimeBlock;
  shopStart: string;
  shopEnd: string;
  shopMin: string;
  shopMax: string;
  isAdmin: boolean;
  loading: boolean;
  setLoading: (v: boolean) => void;
  onDone: () => void;
}) {
  const [startTime, setStartTime] = useState(block.startTime);
  const [endTime, setEndTime] = useState(block.endTime);

  useEffect(() => {
    setStartTime(block.startTime);
    setEndTime(block.endTime);
  }, [block.startTime, block.endTime, block.id]);

  const pos = percentInRange(block.startTime, block.endTime, shopStart, shopEnd);
  const isShift = block.source === "shift";
  const isPendingRequest = !isShift && block.status === "PENDING";
  const canEditTime = isAdmin && (isShift || isPendingRequest);
  const dirty = startTime !== block.startTime || endTime !== block.endTime;

  const onSaveTime = async () => {
    setLoading(true);
    const res = await updateScheduleBlockTimes(
      block.source,
      block.id,
      startTime,
      endTime,
    );
    setLoading(false);
    if (res.error) {
      toast.error(typeof res.error === "string" ? res.error : "Проверьте время");
      return;
    }
    toast.success("Время обновлено");
    onDone();
  };

  const onRemoveShift = async () => {
    setLoading(true);
    const res = await deleteShift(block.id);
    setLoading(false);
    if (res.error) toast.error(typeof res.error === "string" ? res.error : "Ошибка");
    else {
      toast.success("Смена снята");
      onDone();
    }
  };

  const onRequestStatus = async (status: ShiftStatus) => {
    setLoading(true);
    const res = await updateShiftRequestStatus(block.id, status);
    setLoading(false);
    if (res.error) toast.error(res.error);
    else {
      toast.success(status === "CONFIRMED" ? "Заявка принята" : "Заявка отклонена");
      onDone();
    }
  };

  return (
    <div className="space-y-2 rounded-lg border border-[var(--border)]/60 bg-[var(--card)]/50 p-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-medium">{block.employeeName}</span>
        <Badge variant={statusBadge[block.status].variant}>
          {isShift ? statusBadge[block.status].label : "Заявка"}
        </Badge>
      </div>

      {canEditTime ? (
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-xs">С</Label>
            <Input
              type="time"
              className="h-8"
              min={shopMin}
              max={shopMax}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">До</Label>
            <Input
              type="time"
              className="h-8"
              min={shopMin}
              max={shopMax}
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>
      ) : (
        <p className="text-sm text-[var(--muted-foreground)]">
          {block.startTime}–{block.endTime}
        </p>
      )}

      <div className="relative h-8 rounded-md bg-[var(--background)]">
        <div
          className={cn(
            "absolute top-1 bottom-1 rounded-md",
            block.status === "CONFIRMED" ? "bg-emerald-500/70" : "bg-amber-400/70",
          )}
          style={{ left: `${pos.left}%`, width: `${Math.max(pos.width, 4)}%` }}
        />
      </div>

      {isAdmin && (
        <div className="flex flex-wrap gap-2">
          {canEditTime && dirty && (
            <Button type="button" size="sm" disabled={loading} onClick={onSaveTime}>
              Сохранить время
            </Button>
          )}
          {isShift && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              disabled={loading}
              onClick={onRemoveShift}
            >
              Снять
            </Button>
          )}
          {isPendingRequest && (
            <>
              <Button
                type="button"
                size="sm"
                disabled={loading}
                onClick={() => onRequestStatus("CONFIRMED")}
              >
                Принять
              </Button>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                disabled={loading}
                onClick={() => onRequestStatus("REJECTED")}
              >
                Отклонить
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function UncoveredGaps({
  shopStart,
  shopEnd,
  blocks,
}: {
  shopStart: string;
  shopEnd: string;
  blocks: { startTime: string; endTime: string }[];
}) {
  const shopS = timeToMinutes(shopStart);
  const shopE = timeToMinutes(shopEnd);
  const merged = blocks
    .map((b) => ({
      start: Math.max(shopS, timeToMinutes(b.startTime)),
      end: Math.min(shopE, timeToMinutes(b.endTime)),
    }))
    .filter((i) => i.end > i.start)
    .sort((a, b) => a.start - b.start);

  const gaps: { start: number; end: number }[] = [];
  let cursor = shopS;
  for (const m of merged) {
    if (m.start > cursor) gaps.push({ start: cursor, end: m.start });
    cursor = Math.max(cursor, m.end);
  }
  if (cursor < shopE) gaps.push({ start: cursor, end: shopE });

  if (gaps.length === 0) return null;

  return (
    <p className="mt-3 text-xs text-red-600 dark:text-red-400">
      Незакрытые часы:{" "}
      {gaps.map((g) => `${minutesToTime(g.start)}–${minutesToTime(g.end)}`).join(", ")}
    </p>
  );
}
