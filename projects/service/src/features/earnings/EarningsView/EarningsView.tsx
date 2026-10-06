"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/shared/ui/Card/Card";
import { Input } from "@/shared/ui/Input/Input";
import { Select } from "@/shared/ui/Select/Select";
import { Table } from "@/shared/ui/Table/Table";
import { carLabel, formatDate, formatMoney, fullName } from "@/shared/lib/utils";
import styles from "./EarningsView.module.scss";

type EarningRow = {
  id: string;
  orderNumber: string;
  date: Date;
  problem: string;
  earnings: number | string | { toString(): string } | null;
  client: { id: string; lastName: string; firstName: string; middleName: string | null };
  car: { brand: string; model: string; year: number };
};

export function EarningsView({
  summary,
  orders,
  chartData,
  owners,
  cars,
  filters,
  periodTotal,
}: {
  summary: { day: number; week: number; month: number };
  orders: EarningRow[];
  chartData: { date: string; amount: number }[];
  owners: { id: string; lastName: string; firstName: string }[];
  cars: { id: string; brand: string; model: string; year: number }[];
  filters: { from?: string; to?: string; clientId?: string; carId?: string };
  periodTotal: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const applyFilter = (key: string, value: string) => {
    const p = new URLSearchParams(searchParams.toString());
    if (value) p.set(key, value);
    else p.delete(key);
    router.push(`/earnings?${p.toString()}`);
  };

  return (
    <div className={styles.wrap}>
      <h1>Заработок</h1>

      <div className={styles.stats}>
        <Card>
          <span className={styles.statLabel}>Сегодня</span>
          <span className={styles.statValue}>{formatMoney(summary.day)}</span>
        </Card>
        <Card>
          <span className={styles.statLabel}>Неделя</span>
          <span className={styles.statValue}>{formatMoney(summary.week)}</span>
        </Card>
        <Card>
          <span className={styles.statLabel}>Месяц</span>
          <span className={styles.statValue}>{formatMoney(summary.month)}</span>
        </Card>
        <Card>
          <span className={styles.statLabel}>За период</span>
          <span className={styles.statValue}>{formatMoney(periodTotal)}</span>
        </Card>
      </div>

      <div className={styles.filters}>
        <Input
          type="date"
          value={filters.from ?? ""}
          onChange={(e) => applyFilter("from", e.target.value)}
          placeholder="С"
        />
        <Input
          type="date"
          value={filters.to ?? ""}
          onChange={(e) => applyFilter("to", e.target.value)}
          placeholder="По"
        />
        <Select
          value={filters.clientId ?? ""}
          onChange={(e) => applyFilter("clientId", e.target.value)}
        >
          <option value="">Все клиенты</option>
          {owners.map((o) => (
            <option key={o.id} value={o.id}>
              {fullName(o.lastName, o.firstName)}
            </option>
          ))}
        </Select>
        <Select
          value={filters.carId ?? ""}
          onChange={(e) => applyFilter("carId", e.target.value)}
        >
          <option value="">Все машины</option>
          {cars.map((c) => (
            <option key={c.id} value={c.id}>
              {carLabel(c.brand, c.model, c.year)}
            </option>
          ))}
        </Select>
      </div>

      {chartData.length > 0 && (
        <Card title="График доходов">
          <div className={styles.chart}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3f54" />
                <XAxis dataKey="date" stroke="#8fa3b8" fontSize={12} />
                <YAxis stroke="#8fa3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "#1e2a3a",
                    border: "1px solid #2d3f54",
                    borderRadius: 8,
                  }}
                  formatter={(v) => formatMoney(Number(v))}
                />
                <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      <Card title="Детализация">
        <Table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Заказ</th>
              <th>Клиент</th>
              <th>Авто</th>
              <th>Работы</th>
              <th>Сумма</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{formatDate(o.date)}</td>
                <td>{o.orderNumber}</td>
                <td>{fullName(o.client.lastName, o.client.firstName, o.client.middleName)}</td>
                <td>{carLabel(o.car.brand, o.car.model, o.car.year)}</td>
                <td>{o.problem}</td>
                <td>{formatMoney(o.earnings)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
