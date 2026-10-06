"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { formatDate } from "@/shared/lib/utils";
import { percentInRange, minutesToTime, timeToMinutes } from "@/shared/lib/schedule-time";
import type { CalendarDayData } from "@/services/work-calendar.service";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import type { ShiftStatus } from "@prisma/client";

const statusBadge: Record<ShiftStatus, { label: string; variant: "success" | "warning" | "danger" }> = {
  CONFIRMED: { label: "Подтверждена", variant: "success" },
  PENDING: { label: "Ожидает", variant: "warning" },
  REJECTED: { label: "Отклонена", variant: "danger" },
};

export function DayTimelineDialog({
  day,
  open,
  onOpenChange,
}: {
  day: CalendarDayData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!day) return null;

  const shopStart = day.shopStart;
  const shopEnd = day.shopEnd;
  const uncovered = day.uncoveredMinutes;

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
                Нет назначенных смен и заявок
              </p>
            ) : (
              <div className="space-y-3">
                {day.blocks.map((block) => {
                  const pos = percentInRange(
                    block.startTime,
                    block.endTime,
                    shopStart,
                    shopEnd,
                  );
                  return (
                    <div key={`${block.source}-${block.id}`} className="space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                        <span className="font-medium">{block.employeeName}</span>
                        <span className="text-[var(--muted-foreground)]">
                          {block.startTime}–{block.endTime}
                        </span>
                        <Badge variant={statusBadge[block.status].variant}>
                          {statusBadge[block.status].label}
                        </Badge>
                      </div>
                      <div className="relative h-8 rounded-md bg-[var(--background)]">
                        <div
                          className={cn(
                            "absolute top-1 bottom-1 rounded-md",
                            block.status === "CONFIRMED"
                              ? "bg-emerald-500/70"
                              : "bg-amber-400/70",
                          )}
                          style={{ left: `${pos.left}%`, width: `${pos.width}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {uncovered > 0 && day.blocks.length > 0 && (
              <UncoveredGaps
                shopStart={shopStart}
                shopEnd={shopEnd}
                blocks={day.blocks}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
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
