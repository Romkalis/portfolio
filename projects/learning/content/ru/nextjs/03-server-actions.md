---
title: Server Actions
description: use server, формы, Zod, revalidate — мутации CRM
---

# Server Actions

## Кому этот урок

Чтение данных — Server Components. **Запись** (создать заказ, сменить статус) — **Server Actions** в CRM.

## Что вы узнаете

- `"use server"`
- Form `action={fn}`
- Валидация Zod
- `revalidatePath`
- `guardAdminAction`
- Ответ `{ error }` / `{ success }`

---

## 1. Объявление

```typescript
"use server";

import { guardAdminAction } from "@/shared/lib/require-auth";

export async function createOrderAction(formData: FormData) {
  await guardAdminAction();
  // parse, validate, prisma, revalidate
}
```

Директива `"use server"` — код выполняется **только на сервере**.

---

## 2. Форма без API route

```tsx
import { createOrderAction } from "@/features/orders/actions";

<form action={createOrderAction}>
  <input name="title" />
  <button type="submit">Создать</button>
</form>
```

Next сериализует `FormData` на сервер.

---

## 3. Zod в action

```typescript
const parsed = orderCreateSchema.safeParse(raw);
if (!parsed.success) {
  return { error: "Проверьте поля" };
}
await orderService.create(parsed.data);
```

---

## 4. Обновить UI после записи

```typescript
import { revalidatePath } from "next/cache";

revalidatePath("/orders");
```

Следующий заход на `/orders` подтянет свежие данные.

---

## 5. Безопасность CRM

- `guardAdminAction()` в начале
- Не доверять `status` с клиента без схемы
- ID из формы — `parseEntityId`

---

## Задания

### 1. Схема псевдо-action (20 мин)

Шаги: auth → parse FormData → zod → prisma → revalidate → return.

### 2. FormData (15 мин)

Какие `name` у полей для `ownerId`, `carId`, `title`?

### 3. ⭐ Откройте `features/orders/actions.ts` — одна мутация, выпишите return-типы.

### 4. Ошибка UX (10 мин)

Зачем `notifyActionError` на клиенте вместо throw?

---

## Дальше

→ [Middleware](./04-middleware.md)
