# API Wheels

Приложение использует **Server Actions** и **Route Handlers**. Ниже — основные точки входа.

> Общая документация: [README](../README.md) · [AUTH](./AUTH.md) · [DATABASE](./DATABASE.md) · [COMPONENTS](./COMPONENTS.md)

## Auth

| Метод | Путь | Описание |
|-------|------|----------|
| GET/POST | `/api/auth/[...nextauth]` | Auth.js (вход, сессия, выход) |

### Пример входа (клиент)

```ts
import { signIn } from "next-auth/react";

await signIn("credentials", {
  email: "admin@wheels.local",
  password: "password123",
  redirect: false,
});
```

## Server Actions

### Auth

- `registerUser(formData)` — регистрация сотрудника

### Shifts

- `createShiftRequest(formData)` — заявка сотрудника на смену
- `updateShiftRequestStatus(id, status)` — подтверждение/отклонение (ADMIN)
- `upsertShift(formData)` — создание/редактирование смены (ADMIN)
- `deleteShift(id)` — удаление смены (ADMIN)

### Finance

- `createRevenue(formData)` — выручка за день
- `createExpense(formData)` — расход
- `createSalary(formData)` — зарплата сотруднику

### Пример вызова (клиент)

```tsx
"use client";
import { createShiftRequest } from "@/features/shifts/actions";

const fd = new FormData();
fd.set("date", "2026-05-21");
fd.set("startTime", "09:00");
fd.set("endTime", "18:00");
const result = await createShiftRequest(fd);
```

## Сервисы (сервер)

- `getFinanceDataInPeriod(from, to)` — сводка и данные для графиков
- `getAnalyticsBundle(fromStr, toStr)` — аналитика + зимний/летний сезон

## Роли

- `EMPLOYEE` — `/employee/*`
- `ADMIN` — `/admin/*`

Middleware защищает маршруты и перенаправляет по роли.
