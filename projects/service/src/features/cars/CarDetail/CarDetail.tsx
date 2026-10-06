"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { createRepairAction } from "@/features/cars/actions";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { Label } from "@/shared/ui/Label/Label";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Badge } from "@/shared/ui/Badge/Badge";
import { Card } from "@/shared/ui/Card/Card";
import { Table } from "@/shared/ui/Table/Table";
import { carLabel, formatDate, formatMoney, fullName } from "@/shared/lib/utils";
import { notifyActionError } from "@/shared/lib/action-result";
import { toast } from "sonner";
import styles from "./CarDetail.module.scss";

type CarData = {
  id: string;
  brand: string;
  model: string;
  year: number;
  vin: string;
  mileage: number;
  oil: string | null;
  oilFilter: string | null;
  airFilter: string | null;
  fuelFilter: string | null;
  cabinFilter: string | null;
  owner: { id: string; lastName: string; firstName: string; middleName: string | null; phone: string };
  repairs: {
    id: string;
    repairDate: Date;
    mileage: number;
    workDone: string;
    partsList: string;
    recommendations: string | null;
    nextServiceDate: Date | null;
  }[];
  orders: {
    id: string;
    orderNumber: string;
    date: Date;
    time: string;
    problem: string;
    status: string;
    totalAmount: { toString(): string } | null;
  }[];
};

export function CarDetail({ car }: { car: CarData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <div className={styles.wrap}>
      <Link href="/cars" className={styles.back}>
        ← К списку
      </Link>

      <Card title={carLabel(car.brand, car.model, car.year)}>
        <dl className={styles.meta}>
          <div>
            <dt>VIN</dt>
            <dd>{car.vin}</dd>
          </div>
          <div>
            <dt>Владелец</dt>
            <dd>
              <Link href={`/owners/${car.owner.id}`}>
                {fullName(car.owner.lastName, car.owner.firstName, car.owner.middleName)}
              </Link>{" "}
              — <a href={`tel:${car.owner.phone}`}>{car.owner.phone}</a>
            </dd>
          </div>
          <div>
            <dt>Пробег</dt>
            <dd>{car.mileage.toLocaleString("ru-RU")} км</dd>
          </div>
        </dl>
        {(car.oil || car.oilFilter) && (
          <div className={styles.filters}>
            <strong>Расходники:</strong>
            {car.oil && <span>Масло: {car.oil}</span>}
            {car.oilFilter && <span>Масл. фильтр: {car.oilFilter}</span>}
            {car.airFilter && <span>Возд. фильтр: {car.airFilter}</span>}
            {car.fuelFilter && <span>Топл. фильтр: {car.fuelFilter}</span>}
            {car.cabinFilter && <span>Салон. фильтр: {car.cabinFilter}</span>}
          </div>
        )}
      </Card>

      <div className={styles.sectionHead}>
        <h2>История ремонтов</h2>
        <Button size="sm" onClick={() => setModalOpen(true)}>
          Добавить ремонт
        </Button>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Пробег</th>
            <th>Работы</th>
            <th>Запчасти</th>
            <th>След. ТО</th>
          </tr>
        </thead>
        <tbody>
          {car.repairs.map((r) => (
            <tr key={r.id}>
              <td>{formatDate(r.repairDate)}</td>
              <td>{r.mileage.toLocaleString("ru-RU")} км</td>
              <td>{r.workDone}</td>
              <td>{r.partsList}</td>
              <td>{r.nextServiceDate ? formatDate(r.nextServiceDate) : "—"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Card title="Заказы по автомобилю">
        <Table>
          <thead>
            <tr>
              <th>№</th>
              <th>Дата</th>
              <th>Проблема</th>
              <th>Статус</th>
              <th>Сумма</th>
            </tr>
          </thead>
          <tbody>
            {car.orders.map((o) => (
              <tr key={o.id}>
                <td>{o.orderNumber}</td>
                <td>
                  {formatDate(o.date)} {o.time}
                </td>
                <td>{o.problem}</td>
                <td>
                  <Badge status={o.status} />
                </td>
                <td>{o.totalAmount ? formatMoney(o.totalAmount.toString()) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Запись ремонта">
        <form
          className={styles.form}
          action={(fd) => {
            fd.set("carId", car.id);
            startTransition(async () => {
              const r = await createRepairAction(fd);
              if (notifyActionError(r)) return;
              if (r && "success" in r && r.success) {
                toast.success("Ремонт добавлен");
                setModalOpen(false);
              }
            });
          }}
        >
          <input type="hidden" name="carId" value={car.id} />
          <div>
            <Label>Дата ремонта</Label>
            <Input name="repairDate" type="date" required />
          </div>
          <div>
            <Label>Пробег</Label>
            <Input name="mileage" type="number" defaultValue={car.mileage} required />
          </div>
          <div>
            <Label>Что меняли / работы</Label>
            <Input name="workDone" required />
          </div>
          <div>
            <Label>Запчасти</Label>
            <Input name="partsList" required />
          </div>
          <div>
            <Label>Рекомендации</Label>
            <Input name="recommendations" />
          </div>
          <div>
            <Label>Дата следующего ТО</Label>
            <Input name="nextServiceDate" type="date" />
          </div>
          <Button type="submit" disabled={pending}>
            Сохранить
          </Button>
        </form>
      </Modal>
    </div>
  );
}
