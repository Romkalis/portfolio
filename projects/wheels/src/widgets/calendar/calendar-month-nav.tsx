import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/shared/ui/button";

export function CalendarMonthNav({
  monthLabel,
  basePath,
  prevMonthYmd,
  nextMonthYmd,
  compact,
}: {
  monthLabel: string;
  basePath: string;
  prevMonthYmd: string;
  nextMonthYmd: string;
  compact?: boolean;
}) {
  const q = (m: string) => `${basePath}?month=${m}`;

  return (
    <div className="flex items-center justify-between gap-2">
      <Button variant="outline" size="icon" className={compact ? "h-7 w-7" : "h-9 w-9"} asChild>
        <Link href={q(prevMonthYmd)}>
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </Button>
      <h2
        className={
          compact
            ? "text-sm font-semibold capitalize"
            : "text-lg font-semibold capitalize"
        }
      >
        {monthLabel}
      </h2>
      <Button variant="outline" size="icon" className={compact ? "h-7 w-7" : "h-9 w-9"} asChild>
        <Link href={q(nextMonthYmd)}>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
