---
title: useEffect и жизненный цикл
description: Когда эффекты нужны, а когда нет — и как в CRM данные с сервера
---

# useEffect

## Кому этот урок

Новички **переиспользуют** `useEffect` для всего. В App Router CRM большинство данных грузят **на сервере**. Урок: когда эффект уместен, когда — антипаттерн.

## Что вы узнаете

- Синтаксис `useEffect`
- Зависимости `[deps]`
- Подписки и cleanup
- Почему в CRM реже fetch в useEffect
- document.title, localStorage

---

## 1. Базовый useEffect

```tsx
useEffect(() => {
  console.log("Компонент смонтирован или deps изменились");
}, []);
```

Второй аргумент — **массив зависимостей**:

| deps | Когда запуск |
|------|----------------|
| `[]` | один раз после монтирования |
| `[a, b]` | при изменении a или b |
| нет массива | каждый рендер (почти никогда) |

---

## 2. Cleanup

```tsx
useEffect(() => {
  const timer = setInterval(() => setTick((t) => t + 1), 1000);
  return () => clearInterval(timer);
}, []);
```

`return () => ...` — очистка при размонтировании.

---

## 3. Не для начальной загрузки данных в Next.js

**Старый подход:**

```tsx
useEffect(() => {
  fetch("/api/orders").then(...);
}, []);
```

**В CRM (App Router):**

```tsx
// page.tsx — Server Component
const orders = await orderService.listOrders();
return <OrdersTable orders={orders} />;
```

Меньше мигания, SEO, проще безопасность.

useEffect оставьте для: **браузерных API**, подписок, синхронизации с `window`, сторонних виджетов.

---

## 4. Пример уместного эффекта

```tsx
useEffect(() => {
  document.title = `Заказов: ${count}`;
}, [count]);
```

---

## 5. Ловушка бесконечного цикла

```tsx
useEffect(() => {
  setCount(count + 1); // без deps — бесконечность
}, [count]);
```

---

## Задания

### 1. document.title (10 мин)

При изменении `query` в поиске — title `Поиск: ${query}`.

### 2. Таймер (15 мин)

Секунды с `setInterval` + cleanup.

### 3. localStorage тема (20 мин)

При монтировании прочитать `theme` из localStorage в state (осторожно с SSR — только client component).

### 4. Рефлексия (10 мин)

Откройте 3 страницы CRM. Запишите: данные из `await` на сервере или из `useEffect`?

### 5. ⭐ Перепишите псевдокод: «загрузить заказы в useEffect» → «загрузить в Server Component». Список плюсов.

---

## Дальше

→ [Client и Server](./04-client-server.md)
