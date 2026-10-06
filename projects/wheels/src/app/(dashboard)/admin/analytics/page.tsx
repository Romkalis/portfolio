import { Suspense } from "react";
import { getAnalyticsBundle } from "@/services/finance.service";
import { PeriodFilter } from "@/features/analytics/period-filter";
import {
  ExpensesByCategoryChart,
  PeriodCompareChart,
  ProfitByWeekChart,
  RevenueByDayChart,
  SalariesChart,
} from "@/widgets/charts/finance-charts";
import { StatsCard } from "@/entities/stats-card";
import { toDateInputValue } from "@/shared/lib/utils";
import { subDays } from "date-fns";

type Props = { searchParams: Promise<{ from?: string; to?: string }> };

export default async function AdminAnalyticsPage({ searchParams }: Props) {
  const params = await searchParams;
  const to = params.to ?? toDateInputValue(new Date());
  const from = params.from ?? toDateInputValue(subDays(new Date(to), 30));

  const { current, winter, summer, periodCompare } = await getAnalyticsBundle(from, to);

  return (
    <div className="space-y-6">
      <div>
        <h1>Аналитика</h1>
        <p className="text-[var(--muted-foreground)] mt-1">
          Графики выручки, прибыли, сезонов и сравнение периодов
        </p>
      </div>
      <Suspense fallback={null}>
        <PeriodFilter from={from} to={to} />
      </Suspense>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Выручка" value={current.summary.revenue} />
        <StatsCard title="Расходы" value={current.summary.expenses} />
        <StatsCard title="Зарплаты" value={current.summary.salaries} />
        <StatsCard title="Чистая прибыль" value={current.summary.netProfit} />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <RevenueByDayChart data={current.revenueByDay} title="Выручка по дням" />
        <ProfitByWeekChart data={current.profitByWeek} title="Прибыль по неделям" />
        <ExpensesByCategoryChart data={current.expensesByCategory} title="Расходы по категориям" />
        <SalariesChart data={current.salariesByEmployee} title="Зарплаты сотрудников" />
        <PeriodCompareChart data={periodCompare} title="Сравнение периодов" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <StatsCard title="Зимний сезон (01.07–31.12)" value={winter.summary.netProfit} hint={`Выручка: ${winter.summary.revenue.toLocaleString("ru-RU")} ₽`} />
        <StatsCard title="Летний сезон (01.01–01.07)" value={summer.summary.netProfit} hint={`Выручка: ${summer.summary.revenue.toLocaleString("ru-RU")} ₽`} />
      </div>
    </div>
  );
}
