# Решение проблем Wheels

Пошаговый разбор типичных ошибок при локальном запуске.

## Быстрая диагностика (выполните по порядку)

```bash
cd projects/wheels

# 1. Зависимости
npm install

# 2. Docker Desktop должен быть ЗАПУЩЕН, затем:
docker compose up db -d

# 3. Подождите 5–10 сек, проверьте БД:
npm run db:check

# 4. Схема + данные (включая админа):
npm run setup

# 5. Один dev-сервер (не два):
# если порт занят — kill 82117  (PID из сообщения Next)
npm run dev
```

Откройте **http://localhost:3000/login**  
Логин: `admin@wheels.local` / `password123`

---

## Ошибка: `P1010: User was denied access on the database`

**Что значит:** на `localhost:5432` отвечает **ваш локальный Postgres** (часто Homebrew), а в `.env` указаны логин/пароль `wheels:wheels`, которых в этой БД **нет**.  
Сообщение `Cannot connect to the Docker daemon` — Docker **не запущен**, контейнер с БД не поднялся.

### Быстрая диагностика

```bash
lsof -i :5432          # кто слушает порт
npm run db:check       # есть ли подключение
```

---

### Решение A — локальный Postgres (без Docker) ← чаще всего на Mac

1. Убедитесь, что Postgres работает: `pg_isready -h localhost -p 5432`
2. Создайте пользователя и базу:

```bash
cd projects/wheels
chmod +x scripts/setup-local-postgres.sh
./scripts/setup-local-postgres.sh
```

3. В `.env`:

```
DATABASE_URL="postgresql://wheels:wheels@localhost:5432/wheels?schema=public"
```

4. `npm run setup` → `npm run dev`

---

### Решение B — Docker

1. Запустите **Docker Desktop**.
2. `docker compose up db -d` (в проекте порт **5433**, чтобы не мешать локальному Postgres на 5432).
3. В `.env`:

```
DATABASE_URL="postgresql://wheels:wheels@localhost:5433/wheels?schema=public"
```

4. `npm run setup`

---

### Решение C — остановить локальный Postgres и использовать только Docker на 5432

```bash
brew services stop postgresql@15   # версия может отличаться
# в docker-compose.yml верните "5432:5432" и DATABASE_URL на порт 5432
docker compose up db -d
npm run setup
```

---

## Не могу войти под админом

| Проверка | Команда / действие |
|----------|-------------------|
| Есть ли пользователи? | `npm run db:check` → должно быть ≥ 1 |
| Seed выполнен? | `npm run db:seed` |
| Точный email | `admin@wheels.local` (не `admin@wheels.com`) |
| Пароль | `password123` |
| Роль в БД | `npm run db:studio` → User → role = ADMIN |

Сообщение toast «Неверный email или пароль» при пустой БД — **нормально** до seed.

Ошибка **500** на `/login` — почти всегда **нет связи с БД**. Сначала исправьте P1010.

---

## `Another next dev server is already running`

Запущено **два** `npm run dev` в `wheels`:

```bash
kill 82117   # подставьте PID из вывода Next
# или
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
npm run dev
```

Используйте **один** URL из вывода терминала (3000 или 3001) и тот же порт в `AUTH_URL`.

---

## Docker: `Cannot connect to the Docker daemon`

Docker Desktop не запущен. Откройте приложение Docker и повторите `docker compose up db -d`.

---

## Страница логина грузится, но админ-панель с ошибкой Prisma

БД недоступна во время запроса страницы. Повторите `npm run db:check` при работающем `docker compose`.

---

## Production: вход работает локально, на сервере — нет

1. `AUTH_URL=https://ваш-домен` (без `/` в конце)
2. `AUTH_SECRET` задан и не меняется между рестартами
3. За Nginx: `trustHost: true` уже в `auth.ts`
4. Cookies: сайт открыт по HTTPS, если в production включён secure cookie

---

## Полезные команды

| Команда | Когда |
|---------|-------|
| `npm run db:check` | Проверить подключение |
| `npm run setup` | push + seed одной командой |
| `npm run db:studio` | Просмотр таблиц в браузере |
| `docker compose logs db` | Логи PostgreSQL |
| `npx prisma migrate dev` | Вместо push, если нужны миграции |

---

## Смена попадает на предыдущий день

Исправлено в коде: даты хранятся как **UTC calendar date** (`parseDateOnly` / `formatDateOnly`).

Если старые смены уже сдвинуты в БД, пересоздайте тестовые данные:

```bash
npm run db:seed
```

или вручную сдвиньте дату в Prisma Studio.

---

## Контрольный чеклист «всё работает»

- [ ] `docker compose ps` → db healthy
- [ ] `npm run db:check` → OK, пользователей ≥ 3
- [ ] `npm run dev` → один процесс, Ready
- [ ] http://localhost:3000/login → форма без 500
- [ ] Вход admin → редирект на `/admin`
- [ ] Dashboard показывает цифры, не Prisma error
