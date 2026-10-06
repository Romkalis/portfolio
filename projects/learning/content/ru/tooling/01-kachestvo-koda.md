---
title: Качество кода
description: ESLint, Prettier, TypeScript, скрипты npm — дисциплина как в CRM
---

# Инструменты качества

## Кому этот урок

Проект живёт годами. **ESLint + Prettier + tsc** ловят ошибки до коммита — как в service и learning.

## Что вы узнаете

- `npm run lint`, `build`, `typecheck`
- ESLint правила (идея)
- Prettier
- Husky (если есть)
- Рабочий цикл разработчика

---

## 1. Скрипты package.json

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  }
}
```

Перед PR: `lint` + `build`.

---

## 2. ESLint

Ловит: неиспользуемые импорты, `any`, хуки React с неправильными deps.

---

## 3. Prettier

Единый стиль кавычек, отступов. Не спорить в review — форматтер решает.

---

## 4. TypeScript в CI

` tsc --noEmit` — типы без сборки.

---

## 5. Цикл дня

```
git pull → docker up → npm run dev
правки → сохранить → смотреть терминал/браузер
перед коммитом → lint + build
```

---

## Задания

### 1. Запуск (10 мин)

В `learning` или `service`: `npm run lint` — что вывело?

### 2. Исправление (15 мин)

Внесите мелкую ошибку (неиспользуемый import), убедитесь что lint ругается, исправьте.

### 3. build (15 мин)

`npm run build` — запишите 3 последние строки успеха.

### 4. Чеклист коммита (10 мин)

Свой чеклист из 6 пунктов перед push.

---

## Дальше

→ [Capstone: архитектура](../capstone/01-obzor-arhitektury.md)
