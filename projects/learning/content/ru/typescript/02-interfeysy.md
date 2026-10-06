---
title: Интерфейсы и утилиты TypeScript
description: optional, readonly, Pick, Omit, Partial — типы форм CRM
---

# Интерфейсы и утилиты TS

## Кому этот урок

Умеете `type` и примитивы. Сейчас — **как описывать формы, DTO и ответы API** так, как в `validators.ts` и сервисах CRM.

## Что вы узнаете

- Optional `?`, `readonly`
- `Pick`, `Omit`, `Partial`, `Required`
- Расширение типов
- `as const`, keyof
- Типы функций и Server Action results

---

## 1. Optional — поле может отсутствовать

```typescript
type OwnerForm = {
  lastName: string;
  firstName: string;
  middleName?: string;  // необязательно
  phone: string;
};
```

Отличие от `string | undefined`: optional — ключ можно **не передавать** в объекте.

---

## 2. readonly

```typescript
type Config = {
  readonly appName: string;
};
```

Нельзя переприсвоить поле (защита констант).

---

## 3. Pick — взять часть полей

```typescript
type Order = {
  id: number;
  title: string;
  status: string;
  totalAmount: number;
  createdAt: Date;
};

type OrderListItem = Pick<Order, "id" | "title" | "status">;
```

Для таблицы заказов не нужны все поля.

---

## 4. Omit — убрать поля

```typescript
type OrderCreateInput = Omit<Order, "id" | "createdAt">;
```

Создание заказа — без id (даёт БД).

---

## 5. Partial — все поля optional

```typescript
type OrderUpdateInput = Partial<Pick<Order, "title" | "status">>;
```

Патч: меняем только переданные поля.

---

## 6. Required — обратно сделать обязательными

```typescript
type StrictOwner = Required<OwnerForm>;
```

Редко; чаще Partial для update.

---

## 7. Расширение interface

```typescript
interface Person {
  id: string;
  name: string;
}

interface Employee extends Person {
  role: "ADMIN" | "MECHANIC";
}
```

---

## 8. Тип функции

```typescript
type ListOrdersFn = () => Promise<Order[]>;

const listOrders: ListOrdersFn = async () => {
  return [];
};
```

Server Action:

```typescript
type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
```

Так в CRM унифицируют ответы форм.

---

## 9. keyof

```typescript
type Order = { id: number; status: string };
type OrderKey = keyof Order; // "id" | "status"

function getField(o: Order, key: OrderKey) {
  return o[key];
}
```

---

## 10. as const

```typescript
const STATUSES = ["PENDING", "COMPLETED"] as const;
type Status = (typeof STATUSES)[number];
```

Массив становится кортежем литералов — удобно для select в UI.

---

## Связь с CRM

`orderCreateSchema` → `z.infer` ≈ тип «что пришло с формы».  
`Pick`/`Omit` — когда отдаёте в клиент не всю модель Prisma (без лишних полей).

---

## Задания

### 1. OwnerCreate / OwnerUpdate (15 мин)

`Owner` с 5 полями. `OwnerCreate = Omit<..., "id">`. `OwnerUpdate = Partial<OwnerCreate>`.

### 2. OrderListItem (10 мин)

`Pick` трёх полей для таблицы.

### 3. ActionResult (15 мин)

Опишите generic `ActionResult<T>` и функцию-заглушку `ok(data: T)` и `fail(msg: string)`.

### 4. getField (10 мин)

Типобезопасный `getField` для `Car`.

### 5. ⭐ Найдите в `service` тип ответа Server Action (success/error). Сравните с вашим `ActionResult`.

---

## Дальше

→ [Generics](./03-generics.md)
