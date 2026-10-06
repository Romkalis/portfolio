---
title: Функции и массивы
description: map, filter, reduce, стрелочные функции — как обрабатывают списки в CRM
---

# Урок 3. Функции и методы массивов

## Кому этот урок

Вы умеете циклы и `if`. Сейчас — **главный инструмент фронтенда и сервера**: преобразование списков без ручных циклов. Так в CRM строят таблицы, фильтры и суммы.

## Что вы узнаете

- Стрелочные функции и когда их использовать
- `map`, `filter`, `find`, `some`, `every`
- `reduce` для сумм и группировок
- Деструктуризация и spread
- Чистые функции

---

## 1. Три способа объявить функцию

```javascript
// 1. Обычная
function add(a, b) {
  return a + b;
}

// 2. Function expression
const add2 = function (a, b) {
  return a + b;
};

// 3. Стрелочная
const add3 = (a, b) => a + b;
```

**Стрелочная с телом:**

```javascript
const formatPrice = (n) => {
  return n.toLocaleString("ru-RU") + " ₽";
};
```

**Одно выражение — можно без return:**

```javascript
const double = (x) => x * 2;
```

В React-компонентах и колбэках массивов стрелочные — норма.

---

## 2. map — преобразовать каждый элемент

«Взять массив заказов → массив подписей для таблицы».

```javascript
const orders = [
  { id: 1, brand: "Toyota", model: "Camry" },
  { id: 2, brand: "Lada", model: "Vesta" },
];

const labels = orders.map((o) => `${o.brand} ${o.model}`);
// ["Toyota Camry", "Lada Vesta"]
```

**Не мутируйте исходный массив** — `map` возвращает **новый**.

В JSX (позже):

```jsx
{orders.map((order) => (
  <tr key={order.id}>
    <td>{order.brand}</td>
  </tr>
))}
```

`key={order.id}` — уникальный id для React (не путать с ключами объекта).

---

## 3. filter — оставить подходящие

```javascript
const completed = orders.filter((o) => o.status === "COMPLETED");
```

Условие возвращает `true` → элемент остаётся.

**Цепочка:**

```javascript
const bigCompleted = orders
  .filter((o) => o.status === "COMPLETED")
  .filter((o) => o.price > 5000);
```

Читается сверху вниз: сначала выполненные, потом дорогие.

---

## 4. find и findIndex — один элемент

```javascript
const order = orders.find((o) => o.id === 5);
// объект или undefined

const idx = orders.findIndex((o) => o.id === 5);
// индекс или -1
```

---

## 5. some / every — есть ли / все ли

```javascript
const hasPending = orders.some((o) => o.status === "PENDING");
const allPaid = orders.every((o) => o.paid === true);
```

В CRM: «есть ли просроченные записи в расписании».

---

## 6. reduce — свернуть в одно значение

**Сумма:**

```javascript
const total = orders.reduce((sum, o) => sum + o.price, 0);
```

Как читать: `sum` — накопитель, начинаем с `0`, на каждом шаге прибавляем `o.price`.

**Группировка (продвинуто):**

```javascript
const byStatus = orders.reduce((acc, o) => {
  acc[o.status] = (acc[o.status] ?? 0) + 1;
  return acc;
}, {});
// { PENDING: 2, COMPLETED: 5 }
```

---

## 7. sort — сортировка (осторожно!)

```javascript
const sorted = [...orders].sort((a, b) => a.price - b.price);
```

`[...orders]` — копия, чтобы не испортить исходный массив.

Сортировка дат — отдельная тема; в CRM часто сортируют на сервере (`orderBy` в Prisma).

---

## 8. Деструктуризация

```javascript
const order = { id: 1, status: "PENDING", price: 3000 };

const { status, price } = order;
// status === "PENDING"

const [first, second] = ["a", "b"];
```

**В параметрах функции:**

```javascript
function printOwner({ lastName, firstName }) {
  console.log(lastName, firstName);
}
```

Так в Server Actions приходят поля формы.

---

## 9. Spread и rest

**Копия массива / объекта:**

```javascript
const copy = [...orders];
const updated = { ...order, status: "COMPLETED" };
```

**Rest — собрать остаток:**

```javascript
function sum(first, ...rest) {
  return rest.reduce((s, n) => s + n, first);
}
sum(10, 5, 3); // 18
```

---

## 10. Чистая функция

Функция **чистая**, если:

- при тех же аргументах — тот же результат;
- не меняет внешние переменные и не ходит в сеть.

```javascript
// чистая
function orderTotal(items) {
  return items.reduce((s, i) => s + i.price, 0);
}

// не чистая — зависит от глобальной переменной
let rate = 1.1;
function withRate(x) {
  return x * rate;
}
```

В CRM сервисы стараются держать **чистую бизнес-логику** (суммы, подписи), а запросы к БД — отдельно.

---

## 11. Связь с CRM

| Метод | Где в service |
|-------|----------------|
| `map` | Строки таблицы, опции в `<select>` |
| `filter` | Клиентский поиск (если есть) |
| `reduce` | Сумма заработка за период |
| деструктуризация | `const { id } = await params` в Next.js |

Пример из духа earnings:

```javascript
const completed = orders.filter((o) => o.status === "COMPLETED");
const revenue = completed.reduce((s, o) => s + Number(o.totalAmount), 0);
```

---

## Частые ошибки

| Ошибка | Что происходит |
|--------|----------------|
| Забыли `return` в `map` | Массив из `undefined` |
| `map` вместо `filter` | Лишние `undefined` в массиве |
| Мутируют в `map` | Баги в UI |
| `reduce` без начального `0` | NaN на пустом массиве |

---

## Шпаргалка

```
.map(fn)     → новый массив той же длины
.filter(fn)  → короче, по условию
.find(fn)    → один элемент
.reduce(fn, init) → одно значение
[...arr]     копия
{ ...obj, x: 1 }  копия с полем
```

---

## Задания

### Задание 1 — labels (10 мин)

Дан массив машин `{ brand, model, year }`. Верните массив строк `"Brand Model (year)"` через **только** `map`.

---

### Задание 2 — только PENDING (10 мин)

`filter` → массив заказов со статусом `PENDING`.

---

### Задание 3 — выручка (15 мин)

Функция `revenue(orders)`:

1. `filter` → `COMPLETED`
2. `reduce` → сумма `price`

Проверка: три COMPLETED по 1000 → `3000`.

---

### Задание 4 — есть ли срочные (10 мин)

`hasUrgent(orders)` — `some`, где `priority === "HIGH"`.

---

### Задание 5 — ⭐ таблица для UI

```javascript
function toTableRows(orders) {
  return orders.map((o) => ({
    id: o.id,
    label: `${o.brand} ${o.model}`,
    statusText: o.status === "COMPLETED" ? "Готово" : "В работе",
    priceFormatted: o.price + " ₽",
  }));
}
```

Выведите `console.table(toTableRows(data))` — красивая таблица в консоли.

---

### Задание 6 — ⭐⭐ в CRM-репозитории

Откройте `projects/service/src/shared/lib/utils.ts`. Найдите функции форматирования. Опишите в комментарии (в своём файле `notes.js`): какие из них похожи на `map`/`reduce` по смыслу.

---

## Дальше

→ [Урок 4: Асинхронность](./04-async.md)
