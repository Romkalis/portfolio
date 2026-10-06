---
title: Client и Server Components
description: use client, границы Server и Client в Next.js CRM
---

# Client vs Server Components

## Кому этот урок

В Next.js 13+ **по умолчанию** компонент — серверный. Это главное отличие CRM от «чистого React». Разберём за один проход.

## Что вы узнаете

- Server Component (RSC)
- Client Component и `"use client"`
- Что нельзя на сервере / клиенте
- Как собирать страницу из обоих
- Типичные ошибки

---

## 1. Server Component (по умолчанию)

```tsx
// app/orders/page.tsx — без "use client"
export default async function OrdersPage() {
  const orders = await orderService.listOrders();
  return <OrdersTable orders={orders} />;
}
```

**Можно:** `await`, прямой доступ к БД, секреты в env.  
**Нельзя:** `useState`, `useEffect`, `onClick`, `window`.

Код **не попадает** в бандл браузера (меньше JS).

---

## 2. Client Component

```tsx
"use client";

import { useState } from "react";

export function OrderFilters() {
  const [q, setQ] = useState("");
  // ...
}
```

**Можно:** интерактив, хуки, браузерные API.  
**Нельзя:** напрямую `await prisma` (секреты утекут в клиентский код, если попытаться импортировать).

---

## 3. Композиция

```
OrdersPage (Server)
  ├── заголовок, данные await
  └── <OrderFilters /> (Client)
  └── <OrdersTable orders={orders} /> (Server или Client без state)
```

Импортируйте Client **внутрь** Server, не наоборот в том же файле без разделения.

---

## 4. Передача данных

Server → Client: только **сериализуемое** (JSON-safe): строки, числа, plain objects, массивы.  
Не передавайте функции, классы Date иногда — осторожно (лучше ISO-строки).

---

## 5. CRM карта

| Место | Тип |
|-------|-----|
| `app/(dashboard)/**/page.tsx` | Server, async |
| `shared/ui/button` с onClick | Client если нужен click state |
| Формы с `useFormState` | Client обёртка + Server Action |

---

## Задания

### 1. Классификация (15 мин)

Таблица из 6 вещей: `useState`, `prisma.order.findMany`, `onClick`, `await`, `document`, `formatMoney` — Server / Client / оба контекста.

### 2. Разделите файл (20 мин)

Псевдокод страницы: заголовок + await orders + кнопка «Обновить фильтр» с state. Нарисуйте два файла: `page.tsx` и `OrdersToolbar.tsx` с `"use client"`.

### 3. ⭐ В service откройте `orders/page.tsx` и список импортов. Отметьте client-дочерние компоненты.

### 4. Ошибка нарочно (теория)

Почему `import { prisma } from "..."` в `"use client"` — плохая идея?

---

## Дальше

→ [Next.js App Router](../nextjs/01-app-router.md)
