import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { formatMoney } from "@/shared/lib/utils";
import type { LucideIcon } from "lucide-react";

export function StatsCard({
  title,
  value,
  hint,
  icon: Icon,
  format = "money",
}: {
  title: string;
  value: number;
  hint?: string;
  icon?: LucideIcon;
  format?: "money" | "number";
}) {
  const display = format === "money" ? formatMoney(value) : value.toLocaleString("ru-RU");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-[var(--primary)]" />}
      </CardHeader>
      <CardContent>
        <p className="text-[length:var(--text-2xl)] font-bold tracking-tight">{display}</p>
        {hint && <p className="mt-1 text-xs text-[var(--muted-foreground)]">{hint}</p>}
      </CardContent>
    </Card>
  );
}
