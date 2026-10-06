---
title: Асинхронность
description: Promise, async/await, параллельная загрузка — как CRM ждёт базу данных
---

# Урок 4. Асинхронность

## Кому этот урок

Вы знаете синхронный JS. Сейчас — **как программа ждёт базу данных и сеть**, не замораживая браузер. Без этого непонятны страницы Next.js и Server Actions в CRM.

## Что вы узнаете

- Синхрон vs асинхрон на пальцах
- Promise: pending, fulfilled, rejected
- `async` / `await` и `try/catch`
- `Promise.all` для параллельной загрузки
- Типичные ошибки и связь с Prisma

---

## 1. Проблема: база отвечает не мгновенно

```javascript
// ЭТО НЕ ТАК РАБОТАЕТ с реальной БД:
const orders = database.getOrders(); // мгновенно — только в учебнике
```

Запрос к PostgreSQL занимает **миллисекунды–секунды**. Если бы JS **блокировал** весь поток, страница «зависала» бы.

**Решение:** запустить операцию, отдать управление, когда данные готовы — продолжить через **Promise**.

---

## 2. Promise — «обещание результата»

Состояния:

| Состояние | Значение |
|-----------|----------|
| pending | ещё ждём |
| fulfilled | успех, есть данные |
| rejected | ошибка |

```javascript
const p = fetch("https://example.com/api");

p.then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Ошибка:", error));
```

- `.then` — что делать при успехе
- `.catch` — при ошибке

---

## 3. async / await — пишем как обычный код

Функция с `async` **всегда** возвращает Promise.

```javascript
async function loadOrders() {
  const response = await fetch("/api/orders");
  const data = await response.json();
  return data;
}
```

`await` можно **только внутри** `async` функции.

**Что происходит:** выполнение функции **приостанавливается** до ответа, но **не блокируется** весь браузер — другие задачи в очереди.

---

## 4. try / catch — ловим ошибки await

```javascript
async function createOrderSafe(payload) {
  try {
    const order = await orderService.create(payload);
    return { ok: true, order };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Не удалось создать заказ" };
  }
}
```

В CRM Server Actions возвращают `{ error: "..." }` вместо падения страницы.

---

## 5. Забыли await — классическая ошибка

```javascript
async function broken() {
  const orders = listOrders(); // забыли await
  console.log(orders[0]);      // undefined или ошибка
}

async function fixed() {
  const orders = await listOrders();
  console.log(orders[0]);
}
```

**Проверка:** если в `console.log` видите `Promise { <pending> }` — забыли `await`.

---

## 6. Последовательно vs параллельно

### Последовательно (медленнее)

```javascript
const owners = await prisma.owner.findMany();
const cars = await prisma.car.findMany();
// ждём owners, потом cars
```

### Параллельно — Promise.all

```javascript
const [owners, cars, orders] = await Promise.all([
  prisma.owner.findMany(),
  prisma.car.findMany(),
  prisma.order.findMany(),
]);
// три запроса одновременно
```

В `schedule/page.tsx` CRM так грузят расписание и справочники.

**Когда НЕ all:** второй запрос зависит от первого (нужен `id` клиента → потом его машины).

---

## 7. Server Component в Next.js

```typescript
export default async function CarsPage() {
  const cars = await carService.listCars();
  return <CarsList cars={cars} />;
}
```

Страница **на сервере** ждёт Prisma, собирает HTML, отправляет клиенту. Клиент не видит строку подключения к БД.

---

## 8. Цепочка в CRM

```
Браузер
  → форма → Server Action (async)
    → service.createOrder (async)
      → prisma.order.create (async)
        → PostgreSQL
```

Каждый шаг — `await` следующего.

---

## 9. Event loop — 30 секунд теории

1. Синхронный код выполняется сразу до конца стека.
2. `await` / `.then` — задача в **очередь микрозадач**.
3. `setTimeout` — **макрозадачи** (позже).

Для CRM достаточно правила: **на сервере — await Prisma; на клиенте — await Server Action, не await Prisma напрямую.**

---

## 10. Имитация задержки (учебная)

```javascript
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function demo() {
  console.log("Старт");
  await delay(1000);
  console.log("Через 1 сек");
}
```

Так можно тренироваться без базы.

---

## Частые ошибки

| Ошибка | Симптом |
|--------|---------|
| Нет `await` | Promise вместо данных |
| `await` вне `async` | SyntaxError |
| Не поймали reject | Unhandled promise rejection в консоли |
| `await` в цикле подряд | Медленно — batch через `Promise.all` |
| async без return | неявный `Promise.resolve(undefined)` |

---

## Шпаргалка

```
async function f() {}
await promise
try { await ... } catch (e) {}
Promise.all([p1, p2])
.then / .catch   — старый стиль, тот же смысл
```

---

## Задания

### Задание 1 — delay (10 мин)

Напишите `async function run()`:

1. `console.log("A")`
2. `await delay(500)`
3. `console.log("B")`

**Проверка:** B через ~0.5 сек после A.

---

### Задание 2 — fake API (15 мин)

```javascript
function fakeFetchOrders() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, status: "COMPLETED", price: 1000 },
        { id: 2, status: "PENDING", price: 500 },
      ]);
    }, 300);
  });
}

async function main() {
  const orders = await fakeFetchOrders();
  // вывести сумму COMPLETED
}
```

Используйте `filter` + `reduce` из урока 3.

---

### Задание 3 — Promise.all (15 мин)

Три функции `fakeOwners()`, `fakeCars()`, `fakeOrders()` с разной задержкой 100–400 мс.

Загрузите через `Promise.all` и выведите длины трёх массивов одним `console.log`.

---

### Задание 4 — обработка ошибки (15 мин)

```javascript
function fakeFail() {
  return Promise.reject(new Error("DB down"));
}

async function safeLoad() {
  try {
    return await fakeFail();
  } catch (e) {
    return { error: e.message };
  }
}
```

**Проверка:** `{ error: "DB down" }`, приложение не падает.

---

### Задание 5 — getCompletedSum (20 мин)

```javascript
async function getCompletedSum(ordersPromise) {
  const orders = await ordersPromise;
  return orders
    .filter((o) => o.status === "COMPLETED")
    .reduce((s, o) => s + o.price, 0);
}
```

Передайте `fakeFetchOrders()` как аргумент.

---

### Задание 6 — ⭐ в репозитории

Откройте любой `projects/service/src/app/**/page.tsx` с `async function` и `await`. Выпишите:

1. Что именно ждут (`prisma`, `service`)?
2. Есть ли `Promise.all`?

Сохраните ответ в `notes-async.md` в своей папке.

---

## Дальше

→ [TypeScript: введение](../typescript/01-vvedenie.md)

**MDN:** [async/await](https://developer.mozilla.org/ru/docs/Learn/JavaScript/Asynchronous/Promises)
