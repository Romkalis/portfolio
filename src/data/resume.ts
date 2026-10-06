export type Locale = "ru" | "en";

export const demos = [
  {
    slug: "enjoygamesnow",
    siteName: "EnjoyGamesNow",
    tag: "Next.js",
    stack: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    slug: "meilleurs-jeuxx",
    siteName: "Meilleurs-Jeuxx",
    tag: "Next.js",
    stack: ["Next.js", "React", "Swiper", "Keen Slider"],
  },
  {
    slug: "astrareels",
    siteName: "AstraReels",
    tag: "Next.js",
    stack: ["Next.js", "React", "TypeScript"],
  },
  {
    slug: "pixelspowershop",
    siteName: "PixelPowerShop",
    tag: "Next.js",
    stack: ["Next.js", "React", "Swiper"],
  },
  {
    slug: "dreamfin",
    siteName: "Dreamfin",
    tag: "Vanilla JS",
    stack: ["HTML", "SCSS", "Gulp", "JavaScript"],
  },
  {
    slug: "design-ceh",
    siteName: "Дизайн-Цех",
    tag: "Vanilla JS",
    stack: ["HTML", "SCSS", "Gulp", "JavaScript"],
  },
  {
    slug: "uralruin",
    siteName: "UralRuin",
    tag: "Vanilla JS",
    stack: ["HTML", "CSS", "JavaScript"],
  },
] as const;

export const translations = {
  ru: {
    metaTitle: "Роман Бондарчук — Front-end Developer",
    metaDescription:
      "Портфолио frontend-разработчика: React, Next.js, TypeScript, адаптивная вёрстка и примеры проектов.",
    navAbout: "Обо мне",
    navSkills: "Навыки",
    navExperience: "Опыт",
    navProjects: "Проекты",
    navContact: "Контакты",
    heroBadge: "Роман Бондарчук · Front-end Developer",
    heroTitle: "Роман Бондарчук",
    heroRole: "Front-end Developer",
    heroHeadline: ["Не просто ", "фронтенд", "-разработчик"],
    heroTaglineStart: "Превращаю ваши идеи в",
    heroWords: ["быстрые сайты", "живые интерфейсы", "реальность"],
    heroText:
      "Эта страница — моё портфолио. Здесь собраны контакты, опыт, навыки и примеры сайтов, которые можно открыть и посмотреть вживую.",
    heroScroll: "Листайте",
    heroCtaProjects: "Смотреть проекты",
    heroCtaContact: "Связаться",
    aboutTitle: "Обо мне",
    aboutText:
      "Frontend-разработчик, ориентированный на создание качественных и масштабируемых web-сервисов. Владею современными технологиями (HTML5, CSS3, JavaScript ES6+, React, Redux Toolkit, TypeScript, Next.js). Опыт разработки адаптивных, user-friendly интерфейсов с высокой производительностью (PageSpeed / Lighthouse ≥ 95).",
    skillsTitle: "Навыки",
    skillsGroups: [
      {
        title: "Frontend",
        items: [
          "HTML5",
          "CSS3",
          "JavaScript (ES6+)",
          "TypeScript",
          "React",
          "Next.js",
          "Redux Toolkit",
          "MobX",
          "Vue (в процессе изучения)",
        ],
      },
      {
        title: "Инструменты",
        items: ["Gulp", "LESS", "SCSS", "Jest", "Storybook", "Git"],
      },
      {
        title: "API и прочее",
        items: [
          "REST API",
          "Оптимизация производительности",
          "Адаптивная вёрстка",
          "Семантический код",
          "Компонентная архитектура",
        ],
      },
    ],
    experienceTitle: "Опыт работы",
    experience: [
      {
        company: "Boomerang Media",
        period: "март 2025 — май 2026",
        points: [
          "Реализовано более 150 адаптивных сайтов (от 1 до 8 страниц), из них >110 на React/Next.js.",
          "Все проекты проходят валидацию W3C без ошибок.",
          "Средние показатели PageSpeed/Lighthouse — 95+.",
          "Разработка воронок продаж и интеграция с CRM CheckoutChamp.",
          "Подключение PayPal, Klarna → рост продаж на 30%.",
          "Локализация сайтов → привлечение 70% новых пользователей.",
        ],
        stack: "Next.js, React, HTML, CSS, JS, Gulp, PHP, REST API",
      },
      {
        company: "Dreamfin",
        period: "июль 2024 — март 2025",
        link: "#",
        points: [
          "Разработка проекта с нуля (12-страничный сайт).",
          "Сложные анимации для удержания внимания пользователей.",
          "Подключение 6 сторонних библиотек, адаптивные слайдеры.",
        ],
        stack: "HTML, CSS, JS, SCSS, Gulp",
      },
      {
        company: "Agroforsunka",
        period: "сентябрь 2024 — январь 2025",
        link: "https://agroforsunka.ru",
        points: [
          "Адаптивный интернет-магазин с многосеточной структурой.",
          "Оптимизация под мобильные устройства (слайдеры вместо блоков).",
        ],
        stack: "HTML, CSS, vanilla JS, SCSS, Gulp",
      },
      {
        company: "Instalook / Daki.market",
        period: "май 2023 — март 2025",
        link: "https://instalook.ru",
        points: [
          "Разработка новых страниц и анимаций для улучшения UX.",
          "Оптимизация отображения >50 макетов товаров.",
          "Глубокий рефакторинг legacy-кода (>40 000 строк).",
          "Полная адаптация сайта под устройства от 320 до 1600px.",
        ],
        stack: "HTML, CSS, JS, LESS, Grunt, PHP, Git",
      },
    ],
    educationTitle: "Образование и курсы",
    education: [
      "2024 — Hexlet, TypeScript-разработчик",
      "2023 — HTML Academy, Frontend-разработка, React-разработчик",
    ],
    achievementTitle: "Достижения",
    achievement:
      "Победитель хакатона «Наташин чат для Джунов» (2023), направление Frontend (React).",
    languagesTitle: "Языки",
    languages: ["Русский — родной", "Английский — B1"],
    projectsTitle: "Примеры проектов",
    projectsHint:
      "Ниже — собранные статические версии сайтов. Откройте любой, чтобы пройтись по страницам и интерактиву.",
    openDemo: "Открыть сайт",
    contactTitle: "Контакты",
    telegram: "Telegram",
    email: "Email",
    downloadResume: "Скачать резюме (DOCX)",
    footer: "© {year} Роман Бондарчук. Портфолио frontend-разработчика.",
    demoDescriptions: {
      enjoygamesnow:
        "Многостраничный игровой лендинг на Next.js: слайдеры, карточки, формы и адаптивная вёрстка.",
      "meilleurs-jeuxx":
        "Франкоязычный обзорный сайт с аккордеонами, счётчиками, подпиской и блоком новостей.",
      astrareels:
        "Каталог игр с отзывами, опросом и демо-блоками — акцент на UX и контент.",
      pixelspowershop:
        "Витрина игровых скинов и валюты: каталог, FAQ, условия продажи и отзывы.",
      dreamfin:
        "Сайт финансового консалтинга: 12+ страниц, выразительные CSS-анимации и интерактив на чистом JavaScript.",
      "design-ceh":
        "Студия дизайна интерьеров: многостраничный сайт с галереей проектов, адаптивная вёрстка и Gulp-сборка.",
      uralruin:
        "Некоммерческий проект сохранения культурного архитектурного наследия: атмосферный многостраничный сайт, слайдеры и навигация на ванильном JS.",
    },
  },
  en: {
    metaTitle: "Roman Bondarchuk — Front-end Developer",
    metaDescription:
      "Portfolio of a frontend developer: React, Next.js, TypeScript, responsive UI, and live project demos.",
    navAbout: "About",
    navSkills: "Skills",
    navExperience: "Experience",
    navProjects: "Projects",
    navContact: "Contact",
    heroBadge: "Roman Bondarchuk · Front-end Developer",
    heroTitle: "Roman Bondarchuk",
    heroRole: "Front-end Developer",
    heroHeadline: ["Not your average ", "front-end", " developer"],
    heroTaglineStart: "Turning your ideas into",
    heroWords: ["fast websites", "living interfaces", "reality"],
    heroText:
      "This page is my portfolio. Here you will find contacts, experience, skills, and sample websites you can open and explore live.",
    heroScroll: "Scroll",
    heroCtaProjects: "View projects",
    heroCtaContact: "Get in touch",
    aboutTitle: "About me",
    aboutText:
      "Frontend developer focused on building high-quality, scalable web services. Proficient in modern technologies (HTML5, CSS3, JavaScript ES6+, React, Redux Toolkit, TypeScript, Next.js). Experienced in responsive, user-friendly interfaces with strong performance (PageSpeed / Lighthouse ≥ 95).",
    skillsTitle: "Skills",
    skillsGroups: [
      {
        title: "Frontend",
        items: [
          "HTML5",
          "CSS3",
          "JavaScript (ES6+)",
          "TypeScript",
          "React",
          "Next.js",
          "Redux Toolkit",
          "MobX",
          "Vue (learning)",
        ],
      },
      {
        title: "Tools",
        items: ["Gulp", "LESS", "SCSS", "Jest", "Storybook", "Git"],
      },
      {
        title: "API & more",
        items: [
          "REST API",
          "Performance optimization",
          "Responsive layout",
          "Semantic markup",
          "Component architecture",
        ],
      },
    ],
    experienceTitle: "Work experience",
    experience: [
      {
        company: "Boomerang Media",
        period: "Mar 2025 — May 2026",
        points: [
          "Built 150+ responsive sites (1–8 pages each), 110+ with React/Next.js.",
          "All projects pass W3C validation without errors.",
          "Average PageSpeed/Lighthouse scores — 95+.",
          "Sales funnels and CheckoutChamp CRM integration.",
          "PayPal & Klarna integration → 30% sales growth.",
          "Multi-language localization → 70% new users acquired.",
        ],
        stack: "Next.js, React, HTML, CSS, JS, Gulp, PHP, REST API",
      },
      {
        company: "Dreamfin",
        period: "Jul 2024 — Mar 2025",
        link: "#",
        points: [
          "Built a 12-page site from scratch.",
          "Complex animations to improve user engagement.",
          "Integrated 6 third-party libraries and responsive sliders.",
        ],
        stack: "HTML, CSS, JS, SCSS, Gulp",
      },
      {
        company: "Agroforsunka",
        period: "Sep 2024 — Jan 2025",
        link: "https://agroforsunka.ru",
        points: [
          "Responsive e-commerce with a multi-grid layout.",
          "Mobile optimization (sliders instead of static blocks).",
        ],
        stack: "HTML, CSS, vanilla JS, SCSS, Gulp",
      },
      {
        company: "Instalook / Daki.market",
        period: "May 2023 — Mar 2025",
        link: "https://instalook.ru",
        points: [
          "New pages and animations to improve UX.",
          "Optimized rendering for 50+ product layouts.",
          "Deep legacy refactor (>40,000 lines of code).",
          "Full responsive support from 320px to 1600px.",
        ],
        stack: "HTML, CSS, JS, LESS, Grunt, PHP, Git",
      },
    ],
    educationTitle: "Education & courses",
    education: [
      "2024 — Hexlet, TypeScript Developer",
      "2023 — HTML Academy, Frontend Development, React Developer",
    ],
    achievementTitle: "Achievements",
    achievement:
      "Winner of the “Natashin Chat for Juniors” hackathon (2023), Frontend track (React).",
    languagesTitle: "Languages",
    languages: ["Russian — native", "English — B1"],
    projectsTitle: "Project samples",
    projectsHint:
      "Static builds of sample sites below. Open any demo to browse pages and interactions.",
    openDemo: "Open site",
    contactTitle: "Contact",
    telegram: "Telegram",
    email: "Email",
    downloadResume: "Download résumé (DOCX)",
    footer: "© {year} Roman Bondarchuk. Frontend developer portfolio.",
    demoDescriptions: {
      enjoygamesnow:
        "Multi-page gaming landing on Next.js: sliders, cards, forms, and responsive layout.",
      "meilleurs-jeuxx":
        "French review site with accordions, counters, subscription, and news block.",
      astrareels:
        "Game catalog with reviews, survey, and demo sections — UX-focused layout.",
      pixelspowershop:
        "Gaming skins & currency storefront: catalog, FAQ, sales terms, and reviews.",
      dreamfin:
        "Financial consulting site: 12+ pages with rich CSS animations and interactions in vanilla JavaScript.",
      "design-ceh":
        "Interior design studio: multi-page site with project gallery, responsive layout, and Gulp build.",
      uralruin:
        "Non-commercial project preserving cultural architectural heritage: atmospheric multi-page site, sliders, and navigation built with vanilla JS.",
    },
  },
} as const;

export const contacts = {
  telegram: "https://t.me/rkliss",
  telegramHandle: "@rkliss",
  email: "mailto:yukkilumen@gmail.com",
  emailAddress: "yukkilumen@gmail.com",
};

export const resumeDownloads = {
  ru: {
    href: "/resume/Roman-Bondarchuk-CV-2026-RU.docx",
    fileName: "Roman-Bondarchuk-CV-2026-RU.docx",
  },
  en: {
    href: "/resume/Roman-Bondarchuk-CV-2026-EN.docx",
    fileName: "Roman-Bondarchuk-CV-2026-EN.docx",
  },
} as const;
