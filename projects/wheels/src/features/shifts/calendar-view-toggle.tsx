"use client";

import { Button } from "@/shared/ui/button";
import { useUiStore, type CalendarView } from "@/shared/store/ui-store";

const views: { id: CalendarView; label: string }[] = [
  { id: "table", label: "Таблица" },
  { id: "week", label: "Неделя" },
  { id: "month", label: "Месяц" },
];

export function CalendarViewToggle() {
  const { calendarView, setCalendarView } = useUiStore();

  return (
    <div className="flex flex-wrap gap-2">
      {views.map((v) => (
        <Button
          key={v.id}
          type="button"
          size="sm"
          variant={calendarView === v.id ? "default" : "secondary"}
          onClick={() => setCalendarView(v.id)}
        >
          {v.label}
        </Button>
      ))}
    </div>
  );
}
