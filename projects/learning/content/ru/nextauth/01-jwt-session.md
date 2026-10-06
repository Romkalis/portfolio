---
title: NextAuth и JWT
description: Вход в CRM, сессия, middleware, credentials
---

# NextAuth с нуля

## Кому этот урок

CRM закрыт **логином**. **NextAuth v5** выдаёт JWT-сессию. Поймёте цепочку от формы до `guardAdminAction`.

## Что вы узнаете

- Сессия и cookie
- Credentials provider
- `auth.ts`, route handler
- JWT vs database session
- Проверка на странице и в action

---

## 1. Зачем auth

Без входа нельзя смотреть заказы и зарплаты.  
Публично — только `/login`. Остальное — middleware + layout.

---

## 2. Credentials (CRM)

Логин/пароль из env (`ADMIN_USERNAME`, `ADMIN_PASSWORD`).  
Не храните пароль в коде — только env.

```typescript
// упрощённо authorize()
if (safeStringEqual(username, expectedUser) && safeStringEqual(password, expectedPass)) {
  return { id: "1", name: "Admin", role: "ADMIN" };
}
return null;
```

---

## 3. JWT session

После входа — cookie с JWT.  
Каждый запрос: middleware/`auth()` расшифровывает → `session.user`.

Стратегия `session: { strategy: "jwt" }` — не нужна отдельная таблица Session в БД для учебного CRM.

---

## 4. Файлы service

| Файл | Роль |
|------|------|
| `src/auth.ts` | конфиг NextAuth |
| `app/api/auth/[...nextauth]/route.ts` | HTTP API |
| `middleware.ts` | редирект |
| `require-auth.ts` | guard в actions |

---

## 5. signIn / signOut

Форма логина → `signIn("credentials", { redirect: false })` или server action.  
Выход — `signOut({ redirectTo: "/login" })`.

---

## 6. Секреты

`NEXTAUTH_SECRET` — подпись JWT. В production `assertProductionSecrets()` в CRM.

---

## Задания

### 1. Цепочка (15 мин)

Нарисуйте: браузер → login → cookie → /orders → middleware → OK.

### 2. Env (10 мин)

Список переменных для auth из `.env.example` service.

### 3. ⭐ `auth.ts` — какие поля в `session.user` после callbacks?

### 4. Двойная защита (10 мин)

Зачем middleware И `guardAdminAction`?

### 5. ⭐ Безопасность

Почему `safeStringEqual` для пароля, а не `===`?

---

## Дальше

→ [Docker](../docker/01-compose.md)
