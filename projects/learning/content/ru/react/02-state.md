---
title: Состояние в React
description: useState, controlled inputs, подъём состояния — формы CRM
---

# Состояние (state)

## Кому этот урок

Компоненты без памяти не интерактивны. **useState** — как форма запоминает ввод, фильтр — строку поиска.

## Что вы узнаете

- `useState` по шагам
- Controlled inputs
- Иммутабельные обновления
- Подъём state к родителю
- Когда state не нужен (данные с сервера)

---

## 1. useState

```tsx
"use client"; // в Next.js для клиентских компонентов

import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      Счёт: {count}
    </button>
  );
}
```

- `count` — текущее значение
- `setCount` — **единственный** способ изменить (React перерисует)

---

## 2. Controlled input

```tsx
function SearchBox() {
  const [query, setQuery] = useState("");

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Поиск по VIN"
    />
  );
}
```

Значение input **всегда** из state — вы контролируете поле.

---

## 3. Объект в state

```tsx
const [form, setForm] = useState({ lastName: "", phone: "" });

function update(field: keyof typeof form, value: string) {
  setForm((prev) => ({ ...prev, [field]: value }));
}
```

Spread `...prev` — не терять другие поля.

---

## 4. Иммутабельность

```tsx
// плохо — мутируем массив
items.push(newItem);
setItems(items);

// хорошо
setItems([...items, newItem]);
```

---

## 5. Подъём состояния

Фильтр в шапке, таблица внизу — state в **общем родителе**, оба получают props.

```
Page
 ├── Filter query={q} setQuery={setQ}
 └── Table orders={filtered}
```

---

## 6. Когда state не нужен

Данные пришли с сервера в Server Component — **просто props**, без useState.

State — то, что **меняется на клиенте** без полной перезагрузки (или до ответа Server Action).

---

## Задания

### 1. Счётчик + шаг (15 мин)

Кнопки +1, -1, сброс. State `count`.

### 2. Поиск по списку (25 мин)

Заготовка `const all = ["Toyota", "Lada", "BMW"]`. State `query`. Показать отфильтрованный список (includes, toLowerCase).

### 3. Форма владельца (25 мин)

Поля фамилия, телефон. Кнопка «Показать» выводит JSON в `<pre>` (не отправка на сервер).

### 4. Чекбокс «только выполненные» (20 мин)

State `onlyCompleted`. Фильтруйте массив заказов.

### 5. ⭐ Найдите `"use client"` в CRM — один компонент с useState. Что хранит?

---

## Дальше

→ [Эффекты](./03-effects.md)
