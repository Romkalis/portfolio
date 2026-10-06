"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { toDateInputValue } from "@/shared/lib/utils";

export function PeriodFilter({ from, to }: { from: string; to: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const apply = (f: string, t: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("from", f);
    params.set("to", t);
    router.push(`?${params.toString()}`);
  };

  const presets = [
    {
      label: "День",
      fn: () => {
        const d = toDateInputValue(new Date());
        apply(d, d);
      },
    },
    {
      label: "Неделя",
      fn: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 6);
        apply(toDateInputValue(start), toDateInputValue(end));
      },
    },
    {
      label: "Месяц",
      fn: () => {
        const end = new Date();
        const start = new Date(end.getFullYear(), end.getMonth(), 1);
        apply(toDateInputValue(start), toDateInputValue(end));
      },
    },
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:flex-wrap">
      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <Button key={p.label} type="button" variant="secondary" size="sm" onClick={p.fn}>
            {p.label}
          </Button>
        ))}
      </div>
      <form
        className="flex flex-wrap items-end gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          apply(fd.get("from") as string, fd.get("to") as string);
        }}
      >
        <div className="space-y-1">
          <Label>С</Label>
          <Input name="from" type="date" defaultValue={from} />
        </div>
        <div className="space-y-1">
          <Label>По</Label>
          <Input name="to" type="date" defaultValue={to} />
        </div>
        <Button type="submit" size="sm">
          Применить
        </Button>
      </form>
    </div>
  );
}
