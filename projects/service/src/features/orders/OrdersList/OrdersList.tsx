"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import {
  completeOrderAction,
  createOrderAction,
  updateOrderStatusAction,
} from "@/features/orders/actions";
import { Badge } from "@/shared/ui/Badge/Badge";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { Label } from "@/shared/ui/Label/Label";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Select } from "@/shared/ui/Select/Select";
import { Table } from "@/shared/ui/Table/Table";
import { carLabel, formatDate, formatMoney, fullName } from "@/shared/lib/utils";
import { notifyActionError } from "@/shared/lib/action-result";
import { toast } from "sonner";
import styles from "./OrdersList.module.scss";

type Order = {
  id: string;
  orderNumber: string;
  date: Date;
  time: string;
  problem: string;
  status: string;
  totalAmount: { toString(): string } | null;
  earnings: { toString(): string } | null;
  client: { id: string; lastName: string; firstName: string; middleName: string | null };
  car: { id: string; brand: string; model: string; year: number };
};

type OwnerOption = { id: string; lastName: string; firstName: string };
type CarOption = { id: string; brand: string; model: string; year: number; ownerId: string };

export function OrdersList({
  orders,
  owners,
  cars,
  filters,
}: {
  orders: Order[];
  owners: OwnerOption[];
  cars: CarOption[];
  filters: { status?: string; from?: string; to?: string; clientId?: string; carId?: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [createOpen, setCreateOpen] = useState(false);
  const [completeOpen, setCompleteOpen] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const applyFilter = (key: string, value: string) => {
    const p = new URLSearchParams(searchParams.toString());
    if (value) p.set(key, value);
    else p.delete(key);
    router.push(`/orders?${p.toString()}`);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <h1>Заказы</h1>
        <Button onClick={() => setCreateOpen(true)}>Новый заказ</Button>
      </div>

      <div className={styles.filters}>
        <Select
          value={filters.status ?? ""}
          onChange={(e) => applyFilter("status", e.target.value)}
        >
          <option value="">Все статусы</option>
          <option value="PENDING">Ожидает</option>
          <option value="IN_PROGRESS">В работе</option>
          <option value="COMPLETED">Завершён</option>
        </Select>
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
        <Input
          type="date"
          value={filters.from ?? ""}
          onChange={(e) => applyFilter("from", e.target.value)}
          title="С даты"
        />
        <Input
          type="date"
          value={filters.to ?? ""}
          onChange={(e) => applyFilter("to", e.target.value)}
          title="По дату"
        />
      </div>

      <Table>
        <thead>
          <tr>
            <th>№</th>
            <th>Клиент</th>
            <th>Машина</th>
            <th>Дата</th>
            <th>Статус</th>
            <th>Сумма</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.orderNumber}</td>
              <td>
                <Link href={`/owners/${o.client.id}`}>
                  {fullName(o.client.lastName, o.client.firstName, o.client.middleName)}
                </Link>
              </td>
              <td>
                <Link href={`/cars/${o.car.id}`}>
                  {carLabel(o.car.brand, o.car.model, o.car.year)}
                </Link>
              </td>
              <td>
                {formatDate(o.date)} {o.time}
              </td>
              <td>
                <Badge status={o.status} />
              </td>
              <td>{o.totalAmount ? formatMoney(o.totalAmount.toString()) : "—"}</td>
              <td className={styles.actions}>
                {o.status !== "COMPLETED" && (
                  <>
                    <Select
                      value={o.status}
                      onChange={(e) =>
                        startTransition(async () => {
                          const r = await updateOrderStatusAction(o.id, e.target.value);
                          if (notifyActionError(r)) return;
                          if (r && "success" in r) toast.success("Статус обновлён");
                        })
                      }
                    >
                      <option value="PENDING">Ожидает</option>
                      <option value="IN_PROGRESS">В работе</option>
                    </Select>
                    <Button size="sm" onClick={() => setCompleteOpen(o.id)}>
                      Закрыть
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Новый заказ">
        <form
          className={styles.form}
          action={(fd) =>
            startTransition(async () => {
              const r = await createOrderAction(fd);
              if (notifyActionError(r)) return;
              if (r && "success" in r && r.success) {
                toast.success("Заказ создан");
                setCreateOpen(false);
              }
            })
          }
        >
          <div>
            <Label>Клиент</Label>
            <Select name="clientId" required>
              <option value="">Выберите</option>
              {owners.map((o) => (
                <option key={o.id} value={o.id}>
                  {fullName(o.lastName, o.firstName)}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Автомобиль</Label>
            <Select name="carId" required>
              <option value="">Выберите</option>
              {cars.map((c) => (
                <option key={c.id} value={c.id}>
                  {carLabel(c.brand, c.model, c.year)}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Дата</Label>
            <Input name="date" type="date" required />
          </div>
          <div>
            <Label>Время</Label>
            <Input name="time" type="time" required />
          </div>
          <div>
            <Label>Проблема</Label>
            <Input name="problem" required />
          </div>
          <div>
            <Label>Комментарий</Label>
            <Input name="comment" />
          </div>
          <Button type="submit" disabled={pending}>
            Создать
          </Button>
        </form>
      </Modal>

      <Modal
        open={!!completeOpen}
        onClose={() => setCompleteOpen(null)}
        title="Закрыть заказ"
      >
        {completeOpen && (
          <form
            className={styles.form}
            action={(fd) => {
              fd.set("orderId", completeOpen);
              startTransition(async () => {
                const r = await completeOrderAction(fd);
                if (notifyActionError(r)) return;
                if (r && "success" in r && r.success) {
                  toast.success("Заказ закрыт");
                  setCompleteOpen(null);
                }
              });
            }}
          >
            <input type="hidden" name="orderId" value={completeOpen} />
            <div>
              <Label>Итоговая сумма</Label>
              <Input name="totalAmount" type="number" step="0.01" required />
            </div>
            <div>
              <Label>Заработок</Label>
              <Input name="earnings" type="number" step="0.01" required />
            </div>
            <Button type="submit" disabled={pending}>
              Закрыть заказ
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
}
