import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { WorkCalendar } from "@/widgets/calendar/work-calendar";
import { loadScheduleCalendarMonth } from "@/shared/lib/schedule-calendar-page";

type SearchParams = Promise<{ month?: string }>;

export default async function EmployeeSchedulePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await auth();
  if (!session?.user?.employeeProfileId) redirect("/login");

  const params = await searchParams;
  const data = await loadScheduleCalendarMonth(params.month);

  return (
    <div className="space-y-6">
      <div>
        <h1>График работы</h1>
        <p className="text-[var(--muted-foreground)] mt-1">
          Смены всех сотрудников. Неделя, месяц или таблица — нажмите на день для подробностей.
        </p>
      </div>
      <WorkCalendar
        monthLabel={data.monthLabel}
        shopStart={data.shopStart}
        shopEnd={data.shopEnd}
        gridDays={data.gridDays}
        days={data.days}
        monthAnchorYmd={data.monthAnchorYmd}
        prevMonthYmd={data.prevMonthYmd}
        nextMonthYmd={data.nextMonthYmd}
        monthBasePath="/employee/schedule"
      />
    </div>
  );
}
