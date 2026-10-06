---
title: Обзор архитектуры CRM
description: Сквозной путь запроса — от браузера до PostgreSQL
---

# Capstone 1: архитектура CRM

## Кому этот урок

Прошли стек. Собираем **целую картину** `projects/service` — чтобы открыть любой файл и понимать роль.

## Что вы узнаете

- Слои и поток данных
- Где auth, где Prisma
- Документация `docs/`
- Карта разделов Schedule → Earnings

---

## 1. Стек одной строкой

**Next.js App Router + React Server Components + Server Actions + Prisma + PostgreSQL + NextAuth + SCSS Modules + Docker.**

---

## 2. Сквозной сценарий «Создать заказ»

```
1. Пользователь на /orders, форма (Client или Server + form)
2. submit → createOrderAction (Server Action)
3. guardAdminAction()
4. orderCreateSchema.safeParse
5. orderService.create → prisma.order.create
6. revalidatePath("/orders")
7. Страница при следующем рендере — await listOrders()
```

---

## 3. Слои

| Слой | Папка | Нельзя |
|------|-------|--------|
| UI route | `app/` | тяжёлый SQL |
| Фича | `features/` | прямой prisma (лучше через service) |
| Данные | `services/` | JSX |
| Общее | `shared/` | бизнес-правила домена |

---

## 4. Документация

`projects/service/docs/INDEX.md` — вход.  
`DATABASE.md`, `AUTH.md`, `DATA-FLOW.md`, разделы Schedule…

---

## 5. Модель данных (кратко)

- **Owner** — клиент
- **Car** — автомобиль клиента
- **Order** — заказ-наряд
- **ScheduleAppointment** — запись в расписание
- **RepairHistory** — история работ

---

## Задания

### 1. Диаграмма (25 мин)

Нарисуйте блок-схему capstone-сценария (бумага или Mermaid).

### 2. Тур по docs (20 мин)

Прочитайте INDEX + один раздел (Orders). 5 терминов своими словами.

### 3. Файловая охота (30 мин)

Найдите: middleware, auth.ts, prisma schema, один action, один service. Запишите пути.

### 4. Вопросы (10 мин)

3 вопроса, которые остались неясны — задайте себе и найдите ответ в docs.

### 5. ⭐ Запустите CRM локально (45 мин)

docker up → migrate → seed → dev → login. Откройте 5 разделов.

---

## Дальше

→ [План обучения](./02-plan-obucheniya.md)
