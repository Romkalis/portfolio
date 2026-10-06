# Wheels — управление шиномонтажом

Fullstack-приложение: расписание сотрудников, финансы, аналитика.  
Next.js 16 · Prisma · PostgreSQL · Auth.js · Recharts.

---

## Документация (читать при проблемах с запуском или входом)

| Документ | Содержание |
|----------|------------|
| **[documentations/TROUBLESHOOTING.md](./documentations/TROUBLESHOOTING.md)** | Ошибки БД, вход админа, Docker |
| **[documentations/DATABASE.md](./documentations/DATABASE.md)** | Таблицы, связи, seed |
| **[documentations/AUTH.md](./documentations/AUTH.md)** | Вход, роли, JWT |
| **[documentations/SECURITY.md](./documentations/SECURITY.md)** | **QA: уязвимости, доступ, production** |
| **[documentations/DEPLOYMENT.md](./documentations/DEPLOYMENT.md)** | VPS, Docker, Nginx, HTTPS |
| **[documentations/COMPONENTS.md](./documentations/COMPONENTS.md)** | Маршруты и компоненты |
| **[documentations/ARCHITECTURE.md](./documentations/ARCHITECTURE.md)** | Стек и слои |
| **[documentations/API.md](./documentations/API.md)** | Server Actions |

---

## Почему не работает вход админа (кратко)

Вход **не сработает**, пока:

1. **Не запущен PostgreSQL** (через Docker или локально).
2. **Не выполнены** `npm run db:push` и `npm run db:seed` — без seed пользователя `admin@wheels.local` в БД нет.
3. В `.env` указаны `DATABASE_URL` и `AUTH_SECRET`.

Типичная ошибка в терминале: `P1010: User was denied access` — Docker не запущен или неверный `DATABASE_URL`.  
→ Полная инструкция: **[documentations/TROUBLESHOOTING.md](./documentations/TROUBLESHOOTING.md)**

**Production:** отключите открытую регистрацию: `ALLOW_REGISTRATION=false` — см. **[documentations/SECURITY.md](./documentations/SECURITY.md)**

---

## Запуск с нуля (локально)

### Шаг 0. Предусловия

- Node.js 20+
- **Docker Desktop запущен** (для БД из `docker-compose.yml`)

### Шаг 1. Зависимости и env

```bash
cd projects/wheels
npm install
cp .env.example .env
```

В `.env` обязательно:

```bash
# Сгенерировать секрет:
openssl rand -base64 32
# Вставить в AUTH_SECRET=

# AUTH_URL — тот порт, на котором откроете сайт (обычно 3000)
AUTH_URL="http://localhost:3000"
```

### Шаг 2. База данных

**Вариант A — без Docker** (если на Mac уже стоит Postgres на 5432):

```bash
./scripts/setup-local-postgres.sh
# в .env: DATABASE_URL="postgresql://wheels:wheels@localhost:5432/wheels?schema=public"
npm run setup
```

**Вариант B — Docker** (сначала запустите Docker Desktop):

```bash
docker compose up db -d
# в .env: DATABASE_URL="postgresql://wheels:wheels@localhost:5433/wheels?schema=public"
npm run setup
```

Проверка: `npm run db:check` → OK, пользователей: 3

### Шаг 3. Приложение

```bash
# убедитесь, что нет второго next dev (см. TROUBLESHOOTING)
npm run dev
```

Откройте: **http://localhost:3000/login**

### Тестовые аккаунты (после seed)

| Роль | Email | Пароль |
|------|-------|--------|
| **Admin** | `admin@wheels.local` | `password123` |
| Сотрудник | `alex@wheels.local` | `password123` |
| Сотрудник | `dmitry@wheels.local` | `password123` |

---

## Скрипты npm

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер |
| `npm run build` | Production-сборка |
| `npm run start` | Запуск после build |
| `npm run db:check` | Проверка подключения к БД |
| `npm run setup` | `db:push` + `db:seed` |
| `npm run db:push` | Применить схему Prisma |
| `npm run db:seed` | Тестовые данные + админ |
| `npm run db:studio` | Редактор БД в браузере |
| `npm run db:migrate` | Миграции (для production) |

---

## Docker (приложение + БД)

```bash
export AUTH_SECRET=$(openssl rand -base64 32)
export AUTH_URL=http://localhost:3000
docker compose up --build -d
docker compose exec app npm run setup
```

---

## Структура репозитория

```
prisma/          # схема БД, seed
src/app/         # страницы (маршруты)
src/features/    # формы и server actions
src/widgets/     # layout, графики, календарь
src/services/    # агрегация финансов
src/shared/      # UI, utils, store
docs/            # полная документация
scripts/         # check-db.mjs
```

---

## Роли в приложении

- **ADMIN** → `/admin` — сотрудники, смены, финансы, аналитика
- **EMPLOYEE** → `/employee` — расписание, заявки, заработок

Подробнее: [documentations/AUTH.md](./documentations/AUTH.md)

---

## Production

См. **[documentations/DEPLOYMENT.md](./documentations/DEPLOYMENT.md)** и **[documentations/SECURITY.md](./documentations/SECURITY.md)**.
