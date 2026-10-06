export type Lesson = {
  slug: string;
  title: string;
  description: string;
  duration: string;
  file: string;
};

export type Track = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  order: number;
  officialDocs?: string;
  lessons: Lesson[];
};

export const curriculum: Track[] = [
  {
    id: "javascript",
    title: "JavaScript",
    subtitle: "Основа веб-разработки",
    icon: "JS",
    order: 1,
    officialDocs: "https://developer.mozilla.org/ru/docs/Web/JavaScript",
    lessons: [
      {
        slug: "01-vvedenie",
        title: "Введение и среда",
        description: "С нуля: консоль, переменные, объекты + задания",
        duration: "60 мин чтение + 45 мин практика",
        file: "javascript/01-vvedenie.md",
      },
      {
        slug: "02-tipy-i-operatory",
        title: "Типы и операторы",
        description: "Массивы, if/else, операторы + задания",
        duration: "55 мин + 40 мин практика",
        file: "javascript/02-tipy-i-operatory.md",
      },
      {
        slug: "03-funkcii-i-massivy",
        title: "Функции и массивы",
        description: "map, filter, reduce, деструктуризация + задания",
        duration: "60 мин + 50 мин практика",
        file: "javascript/03-funkcii-i-massivy.md",
      },
      {
        slug: "04-async",
        title: "Асинхронность",
        description: "Promise, async/await, Promise.all + задания",
        duration: "55 мин + 45 мин практика",
        file: "javascript/04-async.md",
      },
    ],
  },
  {
    id: "typescript",
    title: "TypeScript",
    subtitle: "Типы для надёжного кода",
    icon: "TS",
    order: 2,
    officialDocs: "https://www.typescriptlang.org/docs/",
    lessons: [
      {
        slug: "01-vvedenie",
        title: "Зачем TypeScript",
        description: "Типы с нуля, type/interface + задания",
        duration: "50 мин + 35 мин практика",
        file: "typescript/01-vvedenie.md",
      },
      {
        slug: "02-interfeysy",
        title: "Интерфейсы и типы",
        description: "Pick, Omit, Partial, ActionResult + задания",
        duration: "55 мин + 40 мин практика",
        file: "typescript/02-interfeysy.md",
      },
      {
        slug: "03-generics",
        title: "Generics и утилиты",
        description: "Generics для списков и ответов API + задания",
        duration: "45 мин + 30 мин практика",
        file: "typescript/03-generics.md",
      },
    ],
  },
  {
    id: "react",
    title: "React",
    subtitle: "UI из компонентов",
    icon: "⚛",
    order: 3,
    officialDocs: "https://react.dev/learn",
    lessons: [
      {
        slug: "01-komponenty",
        title: "Компоненты и JSX",
        description: "JSX, props, списки, события + задания",
        duration: "55 мин + 45 мин практика",
        file: "react/01-komponenty.md",
      },
      {
        slug: "02-state",
        title: "Состояние и события",
        description: "useState, controlled inputs + задания",
        duration: "60 мин + 50 мин практика",
        file: "react/02-state.md",
      },
      {
        slug: "03-effects",
        title: "Эффекты и хуки",
        description: "Когда нужен useEffect (и когда нет) + задания",
        duration: "50 мин + 35 мин практика",
        file: "react/03-effects.md",
      },
      {
        slug: "04-client-server",
        title: "Client vs Server в React 19",
        description: "use client, границы Server/Client + задания",
        duration: "50 мин + 30 мин практика",
        file: "react/04-client-server.md",
      },
    ],
  },
  {
    id: "nextjs",
    title: "Next.js",
    subtitle: "Fullstack React-фреймворк",
    icon: "▲",
    order: 4,
    officialDocs: "https://nextjs.org/docs",
    lessons: [
      {
        slug: "01-app-router",
        title: "App Router и маршруты",
        description: "app/, layout, page, вложенность",
        duration: "55 мин + 40 мин практика",
        file: "nextjs/01-app-router.md",
      },
      {
        slug: "02-server-components",
        title: "Server Components",
        description: "async page, services, force-dynamic + задания",
        duration: "50 мин + 35 мин практика",
        file: "nextjs/02-server-components.md",
      },
      {
        slug: "03-server-actions",
        title: "Server Actions",
        description: "use server, формы, revalidatePath",
        duration: "60 мин + 45 мин практика",
        file: "nextjs/03-server-actions.md",
      },
      {
        slug: "04-middleware",
        title: "Middleware и защита",
        description: "matcher, редиректы, связь с NextAuth + задания",
        duration: "45 мин + 25 мин практика",
        file: "nextjs/04-middleware.md",
      },
      {
        slug: "05-best-practices",
        title: "Best practices",
        description: "Структура как в CRM-проекте",
        duration: "50 мин + 30 мин практика",
        file: "nextjs/05-best-practices.md",
      },
    ],
  },
  {
    id: "scss",
    title: "SCSS Modules",
    subtitle: "Изолированные стили",
    icon: "🎨",
    order: 5,
    officialDocs: "https://sass-lang.com/documentation/",
    lessons: [
      {
        slug: "01-osnovy",
        title: "CSS Modules и SCSS",
        description: "Переменные, вложенность, BEM без хаоса",
        duration: "45 мин + 35 мин практика",
        file: "scss/01-osnovy.md",
      },
    ],
  },
  {
    id: "zod",
    title: "Zod",
    subtitle: "Валидация данных",
    icon: "Z",
    order: 6,
    officialDocs: "https://zod.dev/",
    lessons: [
      {
        slug: "01-shemy",
        title: "Схемы и safeParse",
        description: "Формы, API, Server Actions",
        duration: "50 мин + 40 мин практика",
        file: "zod/01-shemy.md",
      },
    ],
  },
  {
    id: "postgresql",
    title: "PostgreSQL",
    subtitle: "Реляционная БД",
    icon: "🐘",
    order: 7,
    officialDocs: "https://www.postgresql.org/docs/",
    lessons: [
      {
        slug: "01-osnovy-sql",
        title: "SQL и модель данных",
        description: "Таблицы, FK, индексы",
        duration: "55 мин + 40 мин практика",
        file: "postgresql/01-osnovy-sql.md",
      },
    ],
  },
  {
    id: "prisma",
    title: "Prisma ORM",
    subtitle: "TypeScript + БД",
    icon: "◆",
    order: 8,
    officialDocs: "https://www.prisma.io/docs",
    lessons: [
      {
        slug: "01-schema",
        title: "Схема и миграции",
        description: "schema.prisma, db push, seed",
        duration: "60 мин + 40 мин практика",
        file: "prisma/01-schema.md",
      },
      {
        slug: "02-queries",
        title: "Запросы и связи",
        description: "findMany, include, транзакции + задания",
        duration: "55 мин + 40 мин практика",
        file: "prisma/02-queries.md",
      },
    ],
  },
  {
    id: "nextauth",
    title: "NextAuth.js",
    subtitle: "Авторизация",
    icon: "🔐",
    order: 9,
    officialDocs: "https://authjs.dev/",
    lessons: [
      {
        slug: "01-jwt-session",
        title: "JWT и Credentials",
        description: "auth.ts, middleware, сессия",
        duration: "55 мин + 35 мин практика",
        file: "nextauth/01-jwt-session.md",
      },
    ],
  },
  {
    id: "docker",
    title: "Docker",
    subtitle: "Контейнеры и деплой",
    icon: "🐳",
    order: 10,
    officialDocs: "https://docs.docker.com/",
    lessons: [
      {
        slug: "01-compose",
        title: "Docker Compose",
        description: "Postgres + app, volumes, .env",
        duration: "50 мин + 45 мин практика",
        file: "docker/01-compose.md",
      },
    ],
  },
  {
    id: "tooling",
    title: "Инструменты",
    subtitle: "ESLint, Prettier, Git",
    icon: "🛠",
    order: 11,
    lessons: [
      {
        slug: "01-kachestvo-koda",
        title: "Качество кода",
        description: "Линтинг, форматирование, скрипты npm",
        duration: "40 мин + 30 мин практика",
        file: "tooling/01-kachestvo-koda.md",
      },
    ],
  },
  {
    id: "capstone",
    title: "Сборка CRM",
    subtitle: "Проект autoservice",
    icon: "🎯",
    order: 12,
    lessons: [
      {
        slug: "01-obzor-arhitektury",
        title: "Обзор CRM-проекта",
        description: "Как всё соединено в projects/service",
        duration: "70 мин + 60 мин практика (запуск CRM)",
        file: "capstone/01-obzor-arhitektury.md",
      },
      {
        slug: "02-plan-obucheniya",
        title: "План практики",
        description: "Дорожная карта 4–8 недель и финальный проект",
        duration: "45 мин + план на недели",
        file: "capstone/02-plan-obucheniya.md",
      },
    ],
  },
];

export function getTrack(id: string): Track | undefined {
  return curriculum.find((t) => t.id === id);
}

export function getLesson(trackId: string, lessonSlug: string): { track: Track; lesson: Lesson } | null {
  const track = getTrack(trackId);
  if (!track) return null;
  const lesson = track.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return null;
  return { track, lesson };
}

export function getAllLessonPaths(): { track: string; lesson: string }[] {
  return curriculum.flatMap((t) =>
    t.lessons.map((l) => ({ track: t.id, lesson: l.slug })),
  );
}

export const totalLessons = curriculum.reduce((n, t) => n + t.lessons.length, 0);
