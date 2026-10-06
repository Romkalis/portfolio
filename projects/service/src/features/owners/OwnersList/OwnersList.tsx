"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { createOwnerAction } from "@/features/owners/actions";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { Label } from "@/shared/ui/Label/Label";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Table } from "@/shared/ui/Table/Table";
import { fullName } from "@/shared/lib/utils";
import { notifyActionError } from "@/shared/lib/action-result";
import { toast } from "sonner";
import styles from "./OwnersList.module.scss";

type Owner = {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string | null;
  phone: string;
  _count: { cars: number; orders: number };
};

export function OwnersList({ owners }: { owners: Owner[] }) {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const filtered = owners.filter((o) => {
    const q = search.toLowerCase();
    const name = fullName(o.lastName, o.firstName, o.middleName).toLowerCase();
    return name.includes(q) || o.phone.includes(q);
  });

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <h1>Владельцы</h1>
        <div className={styles.actions}>
          <Input
            placeholder="Поиск по ФИО или телефону..."
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
            <th>ФИО</th>
            <th>Телефон</th>
            <th>Авто</th>
            <th>Заказы</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((o) => (
            <tr key={o.id}>
              <td>
                <Link href={`/owners/${o.id}`}>
                  {fullName(o.lastName, o.firstName, o.middleName)}
                </Link>
              </td>
              <td>
                <a href={`tel:${o.phone}`}>{o.phone}</a>
              </td>
              <td>{o._count.cars}</td>
              <td>{o._count.orders}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Новый клиент">
        <form
          className={styles.form}
          action={(fd) =>
            startTransition(async () => {
              const r = await createOwnerAction(fd);
              if (notifyActionError(r)) return;
              if (r && "success" in r && r.success) {
                toast.success("Клиент добавлен");
                setModalOpen(false);
              }
            })
          }
        >
          <div>
            <Label>Фамилия</Label>
            <Input name="lastName" required />
          </div>
          <div>
            <Label>Имя</Label>
            <Input name="firstName" required />
          </div>
          <div>
            <Label>Отчество</Label>
            <Input name="middleName" />
          </div>
          <div>
            <Label>Телефон</Label>
            <Input name="phone" required />
          </div>
          <div>
            <Label>Примечания</Label>
            <Input name="notes" />
          </div>
          <Button type="submit" disabled={pending}>
            Сохранить
          </Button>
        </form>
      </Modal>
    </div>
  );
}
