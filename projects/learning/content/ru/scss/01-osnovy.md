---
title: SCSS Modules
description: Стили CRM без Tailwind — переменные, BEM, модули
---

# SCSS Modules с нуля

## Кому этот урок

HTML/CSS базово знаете. CRM **не использует Tailwind** — только **SCSS Modules**. Урок — как не сломать вёрстку и повторить стиль service.

## Что вы узнаете

- Обычный CSS vs SCSS
- Вложенность, переменные
- `.module.scss` и уникальные классы
- BEM-подобные имена
- Импорт в React

---

## 1. Зачем модули

Глобальный `.button { }` — конфликт везде.  
`Button.module.scss` → классы вида `Button_button_x7f2a` — **изоляция**.

```tsx
import styles from "./Button.module.scss";

<button className={styles.root}>Сохранить</button>
```

---

## 2. Переменные

```scss
// _variables.scss
$color-primary: #2563eb;
$radius: 8px;
```

```scss
@use "../styles/variables" as v;

.card {
  border-radius: v.$radius;
}
```

---

## 3. Вложенность (аккуратно)

```scss
.table {
  width: 100%;

  th {
    text-align: left;
  }

  tr:hover {
    background: #f8fafc;
  }
}
```

Не увлекайтесь — 2–3 уровня максимум.

---

## 4. BEM в модулях

```scss
.sidebar {
  &__link { padding: 8px; }
  &__link_active { font-weight: 600; }
}
```

```tsx
className={`${styles.sidebar__link} ${active ? styles.sidebar__link_active : ""}`}
```

Или `clsx` / утилита `cn` из CRM.

---

## 5. CRM globals

`globals.scss` — reset, body, CSS-переменные для темы.

---

## Задания

### 1. Card.module.scss (20 мин)

`.root`, `.title`, `.value` — отступы, тень, скругление.

### 2. Состояние hover (10 мин)

Кнопка `.root:hover` темнее.

### 3. ⭐ Скопируйте структуру классов из `shared/ui/card` в service.

### 4. Почему не Tailwind (5 мин)

Одно предложение: изоляция и дизайн-токены проекта.

---

## Дальше

→ [Zod](../zod/01-shemy.md)
