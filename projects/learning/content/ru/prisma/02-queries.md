---
title: Prisma — запросы
description: findMany, create, include, транзакции в сервисах CRM
---

# Prisma: запросы

## Кому этот урок

Схема есть. Учимся **читать и писать** как в `*.service.ts`.

## Что вы узнаете

- findMany, findUnique, create, update, delete
- where, orderBy, include, select
- Транзакции
- Decimal и даты

---

## 1. Список

```typescript
const orders = await prisma.order.findMany({
  where: { status: "PENDING" },
  orderBy: { createdAt: "desc" },
  include: { car: { include: { owner: true } } },
});
```

---

## 2. Одна запись

```typescript
const car = await prisma.car.findUnique({
  where: { id: carId },
});
```

---

## 3. Создание

```typescript
await prisma.order.create({
  data: {
    title: parsed.title,
    carId: parsed.carId,
    status: "PENDING",
  },
});
```

---

## 4. Обновление

```typescript
await prisma.order.update({
  where: { id },
  data: { status: "COMPLETED", completedAt: new Date() },
});
```

---

## 5. Транзакция

```typescript
await prisma.$transaction([
  prisma.order.update({ ... }),
  prisma.repairHistory.create({ ... }),
]);
```

---

## Задания

### 1. findMany (15 мин)

Псевдокод: все COMPLETED за последние 30 дней (`createdAt gte`).

### 2. include (15 мин)

Заказ с машиной и владельцем — дерево объекта на бумаге.

### 3. ⭐ `order.service.ts` — один сложный запрос, разберите include.

### 4. create (10 мин)

Создать Owner + Car в транзакции (порядок шагов).

---

## Дальше

→ [NextAuth](../nextauth/01-jwt-session.md)
