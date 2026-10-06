---
title: Prisma — схема
description: schema.prisma, модели, миграции, seed CRM
---

# Prisma: схема

## Кому этот урок

SQL понятен. **Prisma** — типобезопасный слой между Next.js и PostgreSQL в CRM.

## Что вы узнаете

- `schema.prisma`
- Типы полей, `@relation`
- `npx prisma migrate dev`
- `generate` и клиент
- seed данные

---

## 1. datasource и generator

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

---

## 2. Модель

```prisma
model Owner {
  id        String   @id @default(cuid())
  lastName  String
  firstName String
  phone     String?
  cars      Car[]
  createdAt DateTime @default(now())
}
```

`?` — optional. `@default(cuid())` — id при создании.

---

## 3. Связи

```prisma
model Car {
  id      String @id @default(cuid())
  ownerId String
  owner   Owner  @relation(fields: [ownerId], references: [id])
  orders  Order[]
}
```

---

## 4. Команды

```bash
npx prisma migrate dev --name init
npx prisma generate
npx prisma db seed
```

---

## Задания

### 1. Поле note (10 мин)

Добавьте `note String?` к Owner (на бумаге в schema).

### 2. Relation (15 мин)

Объясните `onDelete: Cascade` vs `Restrict` для Car при удалении Owner.

### 3. ⭐ Прочитайте модель `Order` в service — все поля и enum статуса.

### 4. migrate (теория)

Чем migrate отличается от ручного SQL в проде?

---

## Дальше

→ [Prisma: запросы](./02-queries.md)
