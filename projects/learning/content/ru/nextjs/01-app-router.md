---
title: Next.js App Router
description: Структура app/, маршруты, layout — карта CRM с нуля
---

# App Router с нуля

## Кому этот урок

Вы понимаете React. **Next.js** добавляет **файловую маршрутизацию** и сервер. После урока вы откроете `projects/service/src/app` и не потеряетесь.

## Что вы узнаете

- Папка `app/` = URL
- `page.tsx`, `layout.tsx`, `loading.tsx`
- Группы `(dashboard)`
- `params` и `searchParams`
- Где лежит CRM

---

## 1. Файл = маршрут

```
app/
  page.tsx              → /
  login/page.tsx        → /login
  (dashboard)/
    orders/page.tsx     → /orders
```

Имя `page.tsx` обязательно для страницы.

---

## 2. layout.tsx — общая оболочка

```tsx
// app/(dashboard)/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <div className="shell">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
```

Все вложенные страницы **оборачиваются** layout. В CRM: сайдбар + топбар один раз.

---

## 3. loading.tsx

Показывается пока страница грузится (Suspense). В CRM есть `loading.tsx` на разделах.

---

## 4. Группы (скобки)

`(dashboard)` — **не** часть URL, только организация файлов.

`(auth)` для login/register — отдельный layout без сайдбара.

---

## 5. Динамические сегменты

```
owners/[id]/page.tsx  → /owners/abc-123
```

```tsx
export default async function OwnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // ...
}
```

В Next 15+ `params` часто **Promise** — нужен `await`.

---

## 6. searchParams — фильтры в URL

```
/orders?status=PENDING
```

```tsx
export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
}
```

Удобно делиться ссылкой «только ожидающие».

---

## 7. metadata

```tsx
export const metadata = { title: "Заказы | CRM" };
```

SEO и заголовок вкладки.

---

## Карта CRM (запомнить)

| URL | Файл |
|-----|------|
| /login | `(auth)/login/page.tsx` |
| /schedule | `(dashboard)/schedule/page.tsx` |
| /owners | `(dashboard)/owners/page.tsx` |
| /cars | `(dashboard)/cars/page.tsx` |
| /orders | `(dashboard)/orders/page.tsx` |
| /earnings | `(dashboard)/earnings/page.tsx` |

---

## Задания

### 1. Нарисуйте дерево (15 мин)

На бумаге дерево `app/` CRM по README или репозиторию. Подпишите URL.

### 2. Новый маршрут (теория) (10 мин)

Какой файл создать для `/reports`? Что внутри экспортировать?

### 3. params (15 мин)

Псевдокод страницы машины `/cars/[id]` с `await params` и заголовком «Машина {id}».

### 4. ⭐ Откройте `(dashboard)/layout.tsx` — что общее для всех разделов?

### 5. searchParams (20 мин)

Опишите, как передать `?month=2025-05` на страницу earnings и прочитать на сервере.

---

## Дальше

→ [Server Components](./02-server-components.md)
