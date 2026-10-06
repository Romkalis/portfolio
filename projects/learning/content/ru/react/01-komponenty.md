---
title: React — компоненты и JSX
description: С нуля — UI как функции, props, списки, события
---

# React: компоненты

## Кому этот урок

Вы знаете JS/TS. **React** рисует интерфейс CRM: кнопки, таблицы, формы. За урок — ментальная модель «UI = функции от данных».

## Что вы узнаете

- JSX и правила
- Функциональные компоненты
- props
- Рендер списков и `key`
- События onClick, onSubmit
- Client vs Server (ввод)

---

## 1. Компонент — функция, возвращающая разметку

```tsx
function Welcome() {
  return <h1>Автосервис CRM</h1>;
}
```

Расширение `.tsx` = TypeScript + JSX (HTML-подобный синтаксис в JS).

---

## 2. JSX — правила новичка

```tsx
// один корневой элемент (или Fragment <>...</>)
<div className="card">
  <p>Заказов: {orders.length}</p>
</div>

// className, не class
// style={{ color: "red" }} — объект
// true && <Badge /> — условный рендер
```

**Фигурные скобки** — вставить JS-выражение.

---

## 3. props — вход в компонент

```tsx
type StatsCardProps = {
  title: string;
  value: string | number;
};

function StatsCard({ title, value }: StatsCardProps) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <p>{value}</p>
    </article>
  );
}

// использование
<StatsCard title="Заказов" value={12} />
```

Props **только читаются** — не переприсваивайте `props.title = ...`.

---

## 4. Дети children

```tsx
function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}

<Card>
  <p>Внутри любая вёрстка</p>
</Card>
```

---

## 5. Списки и key

```tsx
{orders.map((order) => (
  <tr key={order.id}>
    <td>{order.title}</td>
    <td>{order.status}</td>
  </tr>
))}
```

`key` — уникальный id строки. Без key React путает строки при обновлении.

**Не key={index}** если список сортируется/удаляется.

---

## 6. События

```tsx
<button type="button" onClick={() => console.log("click")}>
  Нажми
</button>

<form onSubmit={(e) => {
  e.preventDefault();
  // отправка
}}>
```

`preventDefault` — не перезагружать страницу при submit.

---

## 7. CRM: shared/ui

`Button`, `Card`, `Table` — переиспользуемые компоненты. Страница собирает их как конструктор.

---

## Задания

### 1. OrderRow (15 мин)

Компонент `OrderRow({ title, status })` — две ячейки `<td>`.

### 2. OrderTable (20 мин)

`OrderTable({ orders })` — `<table>`, thead, tbody с `map` и `key={id}`.

### 3. StatusBadge (15 мин)

`status === "COMPLETED"` → зелёный текст «Готово», иначе «В работе».

### 4. StatsCard (10 мин)

Три карточки с разными title/value в одном родителе.

### 5. ⭐ Откройте `projects/service/src/shared/ui/button.tsx` — какие props принимает?

---

## Дальше

→ [Состояние](./02-state.md)
