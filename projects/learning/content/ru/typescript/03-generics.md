---
title: Generics в TypeScript
description: Обобщённые типы для списков, форм и Prisma
---

# Generics (обобщения)

## Кому этот урок

Нужны **одни и те же паттерны** для разных сущностей: список заказов, список машин, обёртка `{ data: T }`. Generics — «тип-параметр».

## Что вы узнаете

- Синтаксис `<T>`
- Generic функции и интерфейсы
- Ограничения `extends`
- Связь с React `useState<T>` и Prisma

---

## 1. Проблема без generics

```typescript
function first(arr: any[]): any {
  return arr[0];
}
```

Теряем тип элемента. Generics сохраняют его.

---

## 2. Generic функция

```typescript
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

const n = first([1, 2, 3]);     // number | undefined
const s = first(["a", "b"]);    // string | undefined
```

---

## 3. Generic type

```typescript
type ApiResponse<T> = {
  data: T;
  error?: string;
};

type OrdersResponse = ApiResponse<Order[]>;
```

Как `ActionResult<T>` из прошлого урока.

---

## 4. Ограничение extends

```typescript
function byId<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}
```

`T` обязан иметь поле `id`.

---

## 5. Несколько параметров

```typescript
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}
```

---

## 6. React useState

```typescript
const [query, setQuery] = useState<string>("");
const [order, setOrder] = useState<Order | null>(null);
```

`useState` — generic hook.

---

## 7. Prisma (идея)

`prisma.order.findMany()` возвращает `Promise<Order[]>` — типы сгенерированы. Вы пишете generic обёртки реже, но читаете их в библиотеках.

---

## Задания

### 1. wrapSuccess (10 мин)

`function wrapSuccess<T>(data: T): { success: true; data: T }`.

### 2. byId (15 мин)

Реализуйте `byId` для массива `Car` и `Owner` (с `id: string` — два overload или union id).

### 3. Paginated (15 мин)

`type Paginated<T> = { items: T[]; total: number; page: number }`.

### 4. ⭐ В `react` найдите `useState<Order[]>([])` или похожее в CRM — зачем generic?

---

## Дальше

→ [React: компоненты](../react/01-komponenty.md)
