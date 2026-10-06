"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { createCarAction } from "@/features/cars/actions";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { Label } from "@/shared/ui/Label/Label";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Select } from "@/shared/ui/Select/Select";
import { Table } from "@/shared/ui/Table/Table";
import { carLabel, formatDate, fullName } from "@/shared/lib/utils";
import { notifyActionError } from "@/shared/lib/action-result";
import { toast } from "sonner";
import styles from "./CarsList.module.scss";

type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  vin: string;
  mileage: number;
  owner: { id: string; lastName: string; firstName: string; middleName: string | null };
  repairs: {
    repairDate: Date;
    nextServiceDate: Date | null;
  }[];
};

type OwnerOption = {
  id: string;
  lastName: string;
  firstName: string;
};

export function CarsList({ cars, owners }: { cars: Car[]; owners: OwnerOption[] }) {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const filtered = cars.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.vin.toLowerCase().includes(q) ||
      c.brand.toLowerCase().includes(q) ||
      c.model.toLowerCase().includes(q) ||
      fullName(c.owner.lastName, c.owner.firstName, c.owner.middleName)
        .toLowerCase()
        .includes(q)
    );
  });

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <h1>Машины</h1>
        <div className={styles.actions}>
          <Input
            placeholder="Поиск VIN, марка, владелец..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.search}
          />
          <Button onClick={() => setModalOpen(true)}>Добавить</Button>
        </div>
      </div>

      <Table>
        <thead>
          <tr>
            <th>VIN</th>
            <th>Владелец</th>
            <th>Марка / модель</th>
            <th>Пробег</th>
            <th>Последнее ТО</th>
            <th>След. ТО</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => {
            const last = c.repairs[0];
            return (
              <tr key={c.id}>
                <td>
                  <Link href={`/cars/${c.id}`}>{c.vin}</Link>
                </td>
                <td>
                  <Link href={`/owners/${c.owner.id}`}>
                    {fullName(c.owner.lastName, c.owner.firstName, c.owner.middleName)}
                  </Link>
                </td>
                <td>{carLabel(c.brand, c.model, c.year)}</td>
                <td>{c.mileage.toLocaleString("ru-RU")} км</td>
                <td>{last ? formatDate(last.repairDate) : "—"}</td>
                <td>{last?.nextServiceDate ? formatDate(last.nextServiceDate) : "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Новый автомобиль">
        <form
          className={styles.form}
          action={(fd) =>
            startTransition(async () => {
              const r = await createCarAction(fd);
              if (notifyActionError(r)) return;
              if (r && "success" in r && r.success) {
                toast.success("Автомобиль добавлен");
                setModalOpen(false);
              }
            })
          }
        >
          <div>
            <Label>Владелец</Label>
            <Select name="ownerId" required>
              <option value="">Выберите</option>
              {owners.map((o) => (
                <option key={o.id} value={o.id}>
                  {fullName(o.lastName, o.firstName)}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Марка</Label>
            <Input name="brand" required />
          </div>
          <div>
            <Label>Модель</Label>
            <Input name="model" required />
          </div>
          <div>
            <Label>Год</Label>
            <Input name="year" type="number" required />
          </div>
          <div>
            <Label>VIN</Label>
            <Input name="vin" required />
          </div>
          <div>
            <Label>Пробег</Label>
            <Input name="mileage" type="number" required />
          </div>
          <Button type="submit" disabled={pending}>
            Сохранить
          </Button>
        </form>
      </Modal>
    </div>
  );
}
