"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import {
  createAppointmentAction,
  createOrderFromAppointmentAction,
  deleteAppointmentAction,
  toggleAppointmentCompletedAction,
} from "@/features/schedule/actions";
import { Badge } from "@/shared/ui/Badge/Badge";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { Label } from "@/shared/ui/Label/Label";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Select } from "@/shared/ui/Select/Select";
import { Table } from "@/shared/ui/Table/Table";
import { carLabel, formatDate, fullName } from "@/shared/lib/utils";
import { notifyActionError } from "@/shared/lib/action-result";
import { toast } from "sonner";
import styles from "./ScheduleView.module.scss";

type Appointment = {
  id: string;
  date: Date;
  time: string;
  phone: string;
  problem: string;
  status: string;
  completed: boolean;
  client: { id: string; lastName: string; firstName: string; middleName: string | null };
  car: { id: string; brand: string; model: string; year: number } | null;
  order: { id: string; orderNumber: string } | null;
};

type OwnerOption = { id: string; lastName: string; firstName: string; phone: string };
type CarOption = { id: string; brand: string; model: string; year: number; ownerId: string };

export function ScheduleView({
  appointments,
  owners,
  cars,
  view,
}: {
  appointments: Appointment[];
  owners: OwnerOption[];
  cars: CarOption[];
  view: "week" | "month";
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const grouped = appointments.reduce<Record<string, Appointment[]>>((acc, a) => {
    const key = format(new Date(a.date), "yyyy-MM-dd");
    (acc[key] ??= []).push(a);
    return acc;
  }, {});

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <h1>График записи</h1>
        <div className={styles.actions}>
          <Link
            href="/schedule?view=week"
            className={view === "week" ? styles.viewActive : styles.viewLink}
          >
            Неделя
          </Link>
          <Link
            href="/schedule?view=month"
            className={view === "month" ? styles.viewActive : styles.viewLink}
          >
            Месяц
          </Link>
          <Button onClick={() => setModalOpen(true)}>Новая запись</Button>
        </div>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <p className={styles.empty}>Нет записей на выбранный период</p>
      ) : (
        Object.entries(grouped).map(([dateKey, items]) => (
          <section key={dateKey} className={styles.daySection}>
            <h2>{format(new Date(dateKey), "d MMMM yyyy, EEEE", { locale: ru })}</h2>
            <Table>
              <thead>
                <tr>
                  <th>Время</th>
                  <th>Клиент</th>
                  <th>Телефон</th>
                  <th>Авто</th>
                  <th>Проблема</th>
                  <th>Статус</th>
                  <th>Готово</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {items.map((a) => (
                  <tr key={a.id}>
                    <td>{a.time}</td>
                    <td>
                      <Link href={`/owners/${a.client.id}`}>
                        {fullName(a.client.lastName, a.client.firstName, a.client.middleName)}
                      </Link>
                    </td>
                    <td>
                      <a href={`tel:${a.phone}`}>{a.phone}</a>
                    </td>
                    <td>
                      {a.car ? (
                        <Link href={`/cars/${a.car.id}`}>
                          {carLabel(a.car.brand, a.car.model, a.car.year)}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td>{a.problem}</td>
                    <td>
                      <Badge status={a.status} />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={a.completed}
                        onChange={() =>
                          startTransition(async () => {
                            const r = await toggleAppointmentCompletedAction(
                              a.id,
                              !a.completed,
                            );
                            if (notifyActionError(r)) return;
                            if (r && "success" in r) toast.success("Статус обновлён");
                          })
                        }
                      />
                    </td>
                    <td className={styles.rowActions}>
                      {!a.order && a.car && (
                        <Button
                          size="sm"
                          variant="secondary"
                          disabled={pending}
                          onClick={() =>
                            startTransition(async () => {
                              const r = await createOrderFromAppointmentAction(a.id);
                              if (notifyActionError(r)) return;
                              if (r && "success" in r && r.success) toast.success("Заказ создан");
                            })
                          }
                        >
                          В заказ
                        </Button>
                      )}
                      {a.order && (
                        <Link href={`/orders?highlight=${a.order.id}`}>
                          {a.order.orderNumber}
                        </Link>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          startTransition(async () => {
                            const r = await deleteAppointmentAction(a.id);
                            if (notifyActionError(r)) return;
                            if (r && "success" in r) toast.success("Запись удалена");
                          })
                        }
                      >
                        Удалить
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </section>
        ))
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Новая запись">
        <form
          className={styles.form}
          action={(fd) =>
            startTransition(async () => {
              const r = await createAppointmentAction(fd);
              if (notifyActionError(r)) return;
              if (r && "success" in r && r.success) {
                toast.success("Запись создана");
                setModalOpen(false);
              } else toast.error("Проверьте поля формы");
            })
          }
        >
          <div>
            <Label>Дата</Label>
            <Input name="date" type="date" required />
          </div>
          <div>
            <Label>Время</Label>
            <Input name="time" type="time" required />
          </div>
          <div>
            <Label>Клиент</Label>
            <Select name="clientId" required id="clientSelect">
              <option value="">Выберите клиента</option>
              {owners.map((o) => (
                <option key={o.id} value={o.id} data-phone={o.phone}>
                  {fullName(o.lastName, o.firstName)} — {o.phone}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Телефон</Label>
            <Input name="phone" required placeholder="+7..." />
          </div>
          <div>
            <Label>Автомобиль</Label>
            <Select name="carId">
              <option value="">Не указан</option>
              {cars.map((c) => (
                <option key={c.id} value={c.id}>
                  {carLabel(c.brand, c.model, c.year)}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Проблема</Label>
            <Input name="problem" required />
          </div>
          <Button type="submit" disabled={pending}>
            Сохранить
          </Button>
        </form>
      </Modal>
    </div>
  );
}
