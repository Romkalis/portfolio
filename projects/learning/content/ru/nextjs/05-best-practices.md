---
title: Best practices Next.js в CRM
description: Структура папок, ошибки, env, production checklist
---

# Best practices (CRM)

## Кому этот урок

Собираем **как держать проект**, как `projects/service`: feature-папки, без Tailwind, типобезопасность.

## Что вы узнаете

- `features/`, `services/`, `shared/`
- SCSS modules, не глобальный хаос
- Env и секреты
- Обработка ошибок
- Чеклист перед деплоем

---

## 1. Структура

```
src/
  app/           маршруты
  features/      формы + actions по домену
  services/      Prisma-запросы
  shared/
    ui/          кнопки, таблицы
    lib/         utils, prisma, validators
```

Новый раздел «Склад» → `features/warehouse`, `services/warehouse.service.ts`, `app/.../warehouse/page.tsx`.

---

## 2. Тонкие страницы

`page.tsx` — compose + await.  
Логика — service.  
Валидация — Zod в actions.

---

## 3. Стили

Один компонент — один `Component.module.scss`.  
Глобально — `globals.scss`, переменные, reset.

---

## 4. Env

```
DATABASE_URL=          # только сервер
NEXTAUTH_SECRET=
NEXTAUTH_URL=
ADMIN_USERNAME=        # не NEXT_PUBLIC_
```

`.env` в `.gitignore`. Пример — `.env.example`.

---

## 5. Production

- `npm run build` без ошибок
- миграции Prisma
- сильные пароли admin
- HTTPS, `NEXTAUTH_URL` правильный

---

## Задания

### 1. Новая фича (20 мин)

План папок/файлов для «Уведомления» (без кода).

### 2. Code review (15 мин)

Чеклист из 8 пунктов для чужого PR в стиле CRM.

### 3. ⭐ `docs/ARCHITECTURE` или README service — 3 правила, которых вы придержались бы.

### 4. Антипаттерны (10 мин)

Список из 5 «так в CRM не делаем» (например, Prisma в client component).

---

## Дальше

→ [SCSS](../scss/01-osnovy.md)
