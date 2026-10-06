---
title: Zod — валидация
description: Схемы форм CRM, safeParse, infer типов
---

# Zod с нуля

## Кому этот урок

Данные с формы — **строки**. Нельзя доверять браузеру. **Zod** проверяет и превращает в нормальные типы до Prisma.

## Что вы узнаете

- `z.object`, `z.string`, `z.coerce`
- `safeParse` vs `parse`
- Сообщения ошибок
- `z.infer`
- Связь с Server Actions

---

## 1. Первая схема

```typescript
import { z } from "zod";

const ownerSchema = z.object({
  lastName: z.string().min(1, "Укажите фамилию"),
  firstName: z.string().min(1),
  phone: z.string().min(10).max(20),
});

type OwnerInput = z.infer<typeof ownerSchema>;
```

---

## 2. safeParse

```typescript
const result = ownerSchema.safeParse(raw);
if (!result.success) {
  return { error: result.error.flatten() };
}
const data = result.data; // тип OwnerInput
```

`parse` бросает — в actions удобнее `safeParse`.

---

## 3. Числа и enum

```typescript
z.coerce.number().positive();
z.enum(["PENDING", "COMPLETED"]);
```

Статус заказа — только из списка (защита от подделки).

---

## 4. CRM validators

`orderCreateSchema`, `orderStatusUpdateSchema` — смотрите `shared/lib/validators.ts`.

---

## Задания

### 1. carSchema (15 мин)

brand, model, year (число 1980–2030), vin optional.

### 2. safeParse (10 мин)

Передайте пустую фамилию — получите ошибку.

### 3. infer (5 мин)

Экспортируйте тип `CarInput` через `z.infer`.

### 4. ⭐ Сравните свою схему с `orderCreateSchema` в service — чего не хватает (max length, id)?

### 5. Статус (15 мин)

Схема обновления статуса: только `PENDING` | `IN_PROGRESS` | `COMPLETED`, без лишних полей.

---

## Дальше

→ [PostgreSQL](../postgresql/01-osnovy-sql.md)
