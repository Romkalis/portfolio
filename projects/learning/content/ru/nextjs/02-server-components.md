---
title: Server Components в Next.js
description: async page, сервисы, кэш, force-dynamic в CRM
---

# Server Components на практике

## Кому этот урок

Умеете App Router. Углубляем **загрузку данных на сервере** — как устроены страницы CRM.

## Что вы узнаете

- async `page.tsx`
- Слой services
- Почему не fetch в клиенте
- `dynamic`, `revalidate`
- Ошибки и Suspense

---

## 1. Страница как async функция

```tsx
export default async function CarsPage() {
  const cars = await carService.listCars();
  return <CarsView cars={cars} />;
}
```

Один `await` — один round-trip к БД на запрос страницы.

---

## 2. Слой service

```
page.tsx  →  car.service.ts  →  prisma
```

**Зачем:** page тонкая, SQL/Prisma в одном месте, проще тестировать и менять запросы.

---

## 3. Параллельная загрузка

```tsx
const [owners, cars] = await Promise.all([
  ownerService.list(),
  carService.list(),
]);
```

---

## 4. force-dynamic в CRM

```tsx
export const dynamic = "force-dynamic";
```

В `layout.tsx` dashboard — страницы **всегда** свежие (заказы, расписание). Без этого build без БД мог бы кэшировать пустое.

---

## 5. Не смешивать секреты

`process.env.DATABASE_URL` — только server.  
`NEXT_PUBLIC_*` — видно клиенту.

---

## Задания

### 1. Три слоя (10 мин)

Для «список владельцев» напишите цепочку: UI → функция service → prisma model.

### 2. Promise.all (15 мин)

Страница расписания: appointments + owners + cars — псевдокод.

### 3. ⭐ `schedule/page.tsx` — выпишите все `await`.

### 4. Почему dynamic (10 мин)

Объясните своими словами, зачем CRM `force-dynamic`.

---

## Дальше

→ [Server Actions](./03-server-actions.md)
