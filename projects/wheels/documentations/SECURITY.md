# Безопасность Wheels

Документ описывает модель угроз, встроенные меры и рекомендации для production.

## Сводка мер (реализовано в коде)

| Область | Мера |
|---------|------|
| Доступ | Middleware + layout по роли (`/admin`, `/employee`) |
| Server Actions | `requireAdmin` / `requireEmployee` + проверка роли в БД |
| Сессия | JWT 8 ч, `httpOnly`, `secure` в production |
| Роль | Перечитывается из БД при каждом `session()` callback |
| Вход | Rate limit 15 попыток/мин, bcrypt 12, timing-safe compare |
| Регистрация | Только `EMPLOYEE`, rate limit, `ALLOW_REGISTRATION=false` в prod |
| Redirect | `sanitizeCallbackUrl` — только `/admin`, `/employee`, `/` |
| Ввод | Zod: длины, суммы, CUID, время смены |
| HTTP | Заголовки X-Frame-Options, nosniff, Referrer-Policy |
| Перечисление email | Общее сообщение при регистрации |

---

## Модель доступа

### Слои защиты (defense in depth)

```
Запрос → Middleware (JWT + role + user.id)
       → Layout admin|employee (повторная проверка роли)
       → Server Action (requireAdmin + assertRoleInDb)
       → Prisma (фильтр по employeeProfileId для сотрудника)
```

### Роли

| Роль | Маршруты | Server Actions |
|------|----------|----------------|
| `ADMIN` | `/admin/*` | Финансы, смены, подтверждение заявок |
| `EMPLOYEE` | `/employee/*` | Только свои заявки (`employeeProfileId` из сессии) |

**Нельзя** повысить роль через регистрацию — `role` жёстко `EMPLOYEE`.

**Нельзя** подделать JWT без `AUTH_SECRET` (подпись Auth.js).

После смены роли в БД пользователь получает новую роль при следующем запросе (session callback).

---

## Устранённые уязвимости (QA audit)

### 1. Open Redirect после логина

**Было:** `router.push(callbackUrl)` с query без проверки → фишинг на внешний URL.  
**Стало:** `sanitizeCallbackUrl()` в `src/shared/lib/utils.ts`.

### 2. Устаревшая роль в JWT

**Было:** роль только в токене до истечения сессии.  
**Стало:** `session` callback загружает `User` из БД каждый раз.

### 3. Server Actions без проверки роли в БД

**Было:** только `session.user.role` из JWT.  
**Стало:** `assertRoleInDb()` на финансах и критичных сменах.

### 4. Сотрудник и admin actions

**Было:** `createShiftRequest` при наличии любого `profileId`.  
**Стало:** `requireEmployee()` — только роль EMPLOYEE.

### 5. Подтверждение заявок с произвольным status

**Было:** любой `ShiftStatus` с клиента.  
**Стало:** только `CONFIRMED` | `REJECTED` через `shiftStatusActionSchema`.

### 6. IDOR в зарплатах / сменах

**Было:** `employeeId` из формы без проверки существования.  
**Стало:** проверка `employeeProfile` в БД перед записью.

### 7. Brute force логина / регистрации

**Стало:** in-memory rate limit по IP (`src/shared/lib/rate-limit.ts`).  
**Ограничение:** на нескольких инстансах нужен Redis — см. production.

### 8. Перечисление email при регистрации

**Было:** «Email уже занят».  
**Стало:** «Не удалось завершить регистрацию».

### 9. Слабые пароли и поля

**Стало:** пароль min 8, max длины комментариев/имён, max сумма.

### 10. Публичная регистрация в production

**Стало:** `ALLOW_REGISTRATION=false` отключает `/register` и action.

---

## Переменные окружения (security)

| Переменная | Production |
|------------|------------|
| `AUTH_SECRET` | Уникальный, ≥ 32 байт, не в git |
| `AUTH_URL` | Точный HTTPS-домен |
| `DATABASE_URL` | Не в git, сильный пароль |
| `ALLOW_REGISTRATION` | `false` |
| `NODE_ENV` | `production` (secure cookies) |

---

## Production checklist

- [ ] `ALLOW_REGISTRATION=false`
- [ ] Сменить пароли seed-аккаунтов или удалить их
- [ ] Сильный `POSTGRES_PASSWORD`, БД не в публичной сети
- [ ] HTTPS + Nginx (см. [DEPLOYMENT.md](./DEPLOYMENT.md))
- [ ] Rate limit на уровне Nginx/Cloudflare (рекомендуется)
- [ ] Регулярные обновления зависимостей: `npm audit`
- [ ] Бэкапы PostgreSQL

---

## Ограничения (известные)

1. **Rate limit in-memory** — сбрасывается при рестарте, не работает в кластере без Redis.
2. **Нет 2FA** — только email/пароль.
3. **Нет audit log** — действия админа не пишутся отдельно.
4. **CSRF** — Next.js Server Actions проверяют Origin; не отключайте без необходимости.

---

## Файлы безопасности

| Файл | Назначение |
|------|------------|
| `src/middleware.ts` | Маршруты, роли, регистрация |
| `src/auth.ts` | Auth.js, cookies, session refresh |
| `src/shared/lib/auth-server.ts` | requireAdmin/Employee, rate limit |
| `src/shared/lib/security.ts` | Лимиты, timing-safe password |
| `src/shared/lib/validators.ts` | Zod-схемы |
| `next.config.ts` | Security headers |

---

## Сообщение о уязвимости

При обнаружении проблемы опишите шаги воспроизведения и отправьте владельцу репозитория (не публикуйте `AUTH_SECRET` и дампы БД).
