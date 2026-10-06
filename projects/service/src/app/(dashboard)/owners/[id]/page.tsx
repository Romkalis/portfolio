import Link from "next/link";
import { notFound } from "next/navigation";
import * as ownerService from "@/services/owner.service";
import { Badge } from "@/shared/ui/Badge/Badge";
import { Card } from "@/shared/ui/Card/Card";
import { Table } from "@/shared/ui/Table/Table";
import { carLabel, formatDate, formatMoney, fullName } from "@/shared/lib/utils";
import styles from "./owner-detail.module.scss";

export default async function OwnerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const owner = await ownerService.getOwner(id);
  if (!owner) notFound();

  return (
    <div className={styles.wrap}>
      <Link href="/owners" className={styles.back}>
        ← К списку
      </Link>
      <Card title={fullName(owner.lastName, owner.firstName, owner.middleName)}>
        <dl className={styles.meta}>
          <div>
            <dt>Телефон</dt>
            <dd>
              <a href={`tel:${owner.phone}`}>{owner.phone}</a>
            </dd>
          </div>
          {owner.notes && (
            <div>
              <dt>Примечания</dt>
              <dd>{owner.notes}</dd>
            </div>
          )}
        </dl>
      </Card>

      <Card title="Автомобили">
        {owner.cars.length === 0 ? (
          <p className={styles.muted}>Нет автомобилей</p>
        ) : (
          <ul className={styles.list}>
            {owner.cars.map((car) => (
              <li key={car.id}>
                <Link href={`/cars/${car.id}`}>
                  {carLabel(car.brand, car.model, car.year)} — VIN {car.vin}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card title="История обращений (заказы)">
        <Table>
          <thead>
            <tr>
              <th>№</th>
              <th>Дата</th>
              <th>Авто</th>
              <th>Статус</th>
              <th>Сумма</th>
            </tr>
          </thead>
          <tbody>
            {owner.orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link href={`/orders?highlight=${order.id}`}>{order.orderNumber}</Link>
                </td>
                <td>
                  {formatDate(order.date)} {order.time}
                </td>
                <td>{carLabel(order.car.brand, order.car.model, order.car.year)}</td>
                <td>
                  <Badge status={order.status} />
                </td>
                <td>{order.totalAmount ? formatMoney(order.totalAmount) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
