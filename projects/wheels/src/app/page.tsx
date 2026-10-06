import { SiteHeader } from "@/widgets/layout/site-header";
import { PublicScheduleCalendar } from "@/widgets/calendar/public-schedule-calendar";
import { loadScheduleCalendarMonth } from "@/shared/lib/schedule-calendar-page";

type SearchParams = Promise<{ month?: string }>;

export default async function HomePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const data = await loadScheduleCalendarMonth(params.month);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        <div className="mb-4 text-center">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            Расписание шиномонтажа
          </h1>
          <p className="mt-1 text-xs text-[var(--muted-foreground)] sm:text-sm">
            Часы работы по дням. Для управления сменами войдите в систему.
          </p>
        </div>
        <PublicScheduleCalendar
          monthLabel={data.monthLabel}
          shopStart={data.shopStart}
          shopEnd={data.shopEnd}
          gridDays={data.gridDays}
          prevMonthYmd={data.prevMonthYmd}
          nextMonthYmd={data.nextMonthYmd}
        />
      </main>
    </div>
  );
}
