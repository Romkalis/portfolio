---
title: PostgreSQL и SQL
description: Таблицы, SELECT, JOIN — модель автосервиса
---

# PostgreSQL с нуля

## Кому этот урок

База CRM — **PostgreSQL**. Поймёте таблицы Owner, Car, Order без Prisma (сначала язык SQL).

## Что вы узнаете

- Таблица, строка, столбец, PK, FK
- SELECT, WHERE, ORDER BY
- JOIN
- INSERT, UPDATE
- Как это отражено в Prisma schema

---

## 1. Таблица

| id | last_name | phone |
|----|-----------|-------|
| 1 | Иванов | +7903... |

**PRIMARY KEY (id)** — уникальный идентификатор.

**FOREIGN KEY** — ссылка: `car.owner_id` → `owner.id`.

---

## 2. SELECT

```sql
SELECT id, last_name, phone
FROM owners
WHERE last_name ILIKE 'Ив%'
ORDER BY last_name ASC
LIMIT 10;
```

---

## 3. JOIN

```sql
SELECT o.id, o.title, c.brand, c.model
FROM orders o
JOIN cars c ON c.id = o.car_id
WHERE o.status = 'COMPLETED';
```

---

## 4. INSERT / UPDATE

```sql
INSERT INTO owners (last_name, first_name, phone)
VALUES ('Петров', 'Иван', '+79030000000');

UPDATE orders SET status = 'COMPLETED' WHERE id = 5;
```

---

## 5. Схема CRM (логика)

```
Owner 1 — * Car
Car 1 — * Order
Owner 1 — * ScheduleAppointment
```

---

## Задания

### 1. SELECT (10 мин)

Все машины марки Toyota (`WHERE brand = 'Toyota'`).

### 2. JOIN (15 мин)

Список заказов с фамилией владельца (orders + owners через car или owner_id — по вашей схеме на бумаге).

### 3. Агрегат (15 мин)

`COUNT(*)` заказов со статусом COMPLETED.

### 4. ⭐ Откройте `prisma/schema.prisma` — нарисуйте связи 1-N.

### 5. Docker (теория)

Зачем CRM поднимает Postgres в docker-compose на порту 5433?

---

## Дальше

→ [Prisma: схема](../prisma/01-schema.md)
