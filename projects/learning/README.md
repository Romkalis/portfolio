# RKLiss Learning

Учебный лендинг и **конспект на русском** по технологиям стека CRM (`projects/service`).

Каждый урок — **выдержка важного** из официальной документации (переведённая и адаптированная под CRM): синтаксис, таблицы, примеры кода, ошибки, шпаргалки. Ссылка на оф. docs — в конце урока, не вместо содержания.

## Запуск

```bash
cd projects/learning
npm install
npm run dev
```

Откройте **http://localhost:3100**

Порт **3100** — чтобы не конфликтовать с CRM (3000) и wheels.

## Содержание

- **Лендинг** — `/`
- **Каталог** — `/learn`
- **Roadmap** — `/roadmap`
- **26 уроков** — `/learn/[технология]/[урок]`

## Программа

1. JavaScript → TypeScript → React → Next.js  
2. SCSS Modules, Zod  
3. PostgreSQL, Prisma, NextAuth  
4. Docker, инструменты  
5. Capstone: разбор CRM  

## Структура

```
learning/
  content/ru/          # уроки в Markdown
  src/
    app/               # Next.js страницы
    components/        # Markdown renderer, header
    lib/               # curriculum, загрузка контента
```

## Сборка

```bash
npm run build
npm start
```

Уроки генерируются статически (`generateStaticParams`).

## Связанные проекты

| Проект | Путь |
|--------|------|
| CRM автосервис | `projects/service` |
| Wheels | `projects/wheels` |
