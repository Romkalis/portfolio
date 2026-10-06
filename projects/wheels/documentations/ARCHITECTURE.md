# Архитектура Wheels

## Стек

- **Next.js 16** (App Router), React 19, TypeScript
- **Prisma 6** + PostgreSQL
- **Auth.js** (NextAuth v5) — Credentials + JWT
- **React Hook Form** + **Zod**
- **Recharts**, **Zustand**, **Tailwind CSS 4**

## Слои

```
┌─────────────────────────────────────────┐
│  app/ (routes, Server Components)       │
├─────────────────────────────────────────┤
│  widgets/ (layout, charts, calendar)    │
├─────────────────────────────────────────┤
│  features/ (forms, Server Actions)      │
├─────────────────────────────────────────┤
│  services/ + shared/lib (бизнес-логика)   │
├─────────────────────────────────────────┤
│  Prisma → PostgreSQL                      │
└─────────────────────────────────────────┘
```

## Структура `src/`

| Папка | Назначение |
|-------|------------|
| `app/` | Маршруты, layouts, loading |
| `auth.ts` | Конфигурация Auth.js |
| `middleware.ts` | Защита URL по роли |
| `entities/` | Переиспользуемые блоки (StatsCard) |
| `features/` | Фичи: auth, shifts, finance, analytics |
| `widgets/` | Sidebar, Topbar, графики, календарь |
| `services/` | Серверные агрегаты (finance) |
| `shared/ui` | Примитивы интерфейса |
| `shared/lib` | Prisma, validators, finance math |
| `shared/store` | Zustand (UI state) |
| `shared/providers` | Theme, Session, Toaster |

## Паттерны

- **Server Components** — страницы читают Prisma на сервере
- **Client Components** — `"use client"`: формы, Recharts, тема
- **Server Actions** — мутации + `revalidatePath`
- **JWT session** — Credentials provider не хранит сессию только в cookie БД

## Связанная документация

- [DATABASE.md](./DATABASE.md) — модели и связи
- [AUTH.md](./AUTH.md) — вход и роли
- [COMPONENTS.md](./COMPONENTS.md) — файлы и маршруты
- [DEPLOYMENT.md](./DEPLOYMENT.md) — сервер
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) — ошибки запуска
- [API.md](./API.md) — Server Actions

## Сезоны (аналитика)

В `src/shared/lib/finance.ts`:

- **Зимний:** 01.07 — 31.12
- **Летний:** 01.01 — 01.07
