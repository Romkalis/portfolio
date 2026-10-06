# Автосервис CRM

Fullstack CRM для автосервиса: клиенты, автомобили, история ремонтов, график записи, заказы и учёт заработка.

## Полная документация

**[docs/INDEX.md](docs/INDEX.md)** — главный указатель.

| Тема | Документ |
|------|----------|
| Архитектура | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| **Сервер Next.js (компонент → БД)** | [docs/SERVER-INTERACTION.md](docs/SERVER-INTERACTION.md) |
| **База данных** | [docs/DATABASE.md](docs/DATABASE.md) |
| **Безопасность** | [docs/SECURITY.md](docs/SECURITY.md) |
| Решение проблем | [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) |
| **Авторизация** | [docs/AUTH.md](docs/AUTH.md) |
| **Деплой на сервер** | [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) |
| API / Server Actions | [docs/API.md](docs/API.md) |
| **UI-компоненты** | [docs/COMPONENTS.md](docs/COMPONENTS.md) |
| **Справочник всех файлов** | [docs/FILE-REFERENCE.md](docs/FILE-REFERENCE.md) |

### Документация по разделам

| Раздел | URL | Документ |
|--------|-----|----------|
| График | `/schedule` | [docs/SCHEDULE.md](docs/SCHEDULE.md) |
| Владельцы | `/owners` | [docs/OWNERS.md](docs/OWNERS.md) |
| Машины | `/cars` | [docs/CARS.md](docs/CARS.md) |
| Заказы | `/orders` | [docs/ORDERS.md](docs/ORDERS.md) |
| Заработок | `/earnings` | [docs/EARNINGS.md](docs/EARNINGS.md) |

## Стек

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, SCSS Modules
- **Backend:** Next.js Server Actions, Route Handlers
- **БД:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js (JWT, credentials)
- **UI:** собственные компоненты на SCSS (без Tailwind/Bootstrap)
- **Графики:** Recharts
- **Уведомления:** Sonner

## Быстрый старт

### 1. Переменные окружения

```bash
cp .env.example .env
```

| Переменная | Значение по умолчанию |
|------------|------------------------|
| `DATABASE_URL` | `postgresql://autoservice:autoservice@localhost:5433/autoservice` |
| `ADMIN_LOGIN` | `admin` |
| `ADMIN_PASSWORD` | `admin123` |
| `AUTH_SECRET` | случайная строка ≥ 32 символов |

Подробнее: [docs/AUTH.md](docs/AUTH.md), [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

### 2. База данных (Docker)

```bash
docker compose up -d db
npm run db:push
npm run db:seed
```

Порт PostgreSQL: **5433**.

### 3. Разработка

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) → `/login` → `/schedule`.

### 4. Production-сборка

```bash
npm run build
npm start
```

### 5. Docker (БД + приложение)

```bash
docker compose up -d --build
npm run db:push
npm run db:seed
```

## Структура каталогов

```
projects/service/
├── prisma/              # schema.prisma, seed.ts
├── src/
│   ├── app/             # страницы и API routes
│   ├── auth.ts          # NextAuth config
│   ├── middleware.ts    # защита маршрутов
│   ├── features/        # разделы + actions
│   ├── services/        # Prisma-запросы
│   ├── shared/          # ui, lib, providers
│   ├── widgets/         # Header, AppShell
│   └── styles/          # globals.scss
├── docs/                # полная документация
├── Dockerfile
├── docker-compose.yml
└── instructions.md      # ТЗ
```

Детали по каждому файлу: [docs/FILE-REFERENCE.md](docs/FILE-REFERENCE.md).

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | dev-сервер |
| `npm run build` | production-сборка |
| `npm run db:push` | применить схему Prisma |
| `npm run db:seed` | тестовые данные |
| `npm run db:studio` | Prisma Studio |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Требования ТЗ

Соответствует [instructions.md](instructions.md).
