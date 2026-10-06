---
title: Middleware Next.js
description: Защита маршрутов, редиректы, matcher — вход в CRM
---

# Middleware

## Кому этот урок

**Middleware** — код **до** страницы: проверить cookie сессии, редирект на `/login`. В CRM защищает `(dashboard)`.

## Что вы узнаете

- `middleware.ts` в корне `src`
- `NextRequest`, `NextResponse`
- `matcher`
- Связь с NextAuth `auth()`

---

## 1. Где файл

`src/middleware.ts` — один на приложение.

---

## 2. Логика CRM (упрощённо)

```
Запрос /orders
  → middleware: есть сессия?
    нет → redirect /login
    да → продолжить
```

---

## 3. matcher

```typescript
export const config = {
  matcher: ["/((?!api|_next/static|login).*)"],
};
```

Исключаем статику и страницу логина.

---

## 4. Не дублировать всё

Middleware — **грубая** защита URL.  
`guardAdminAction` — **точная** проверка на мутациях.

Оба нужны.

---

## Задания

### 1. Таблица (10 мин)

Что проверяет middleware vs layout vs Server Action?

### 2. matcher (15 мин)

Как исключить `/login` и `favicon.ico`?

### 3. ⭐ Прочитайте `src/middleware.ts` в service — опишите в 5 предложениях.

### 4. Сценарий (10 мин)

Пользователь без cookie открывает `/cars` — что происходит?

---

## Дальше

→ [Best practices](./05-best-practices.md)
