# Роман Бондарчук — портфолио frontend-разработчика

Одностраничное портфолио на Next.js (статический экспорт) с живыми демо-версиями проектов.

**Стек:** Next.js 15 (App Router, `output: "export"`), React 19, TypeScript, CSS Modules, `next/font` (Manrope, Montserrat, JetBrains Mono).

## Возможности

- Две локали — английская (по умолчанию) и русская, выбор сохраняется в `localStorage`.
- Светлая и тёмная темы: по умолчанию берётся системная, переключатель в шапке; тема применяется до первой отрисовки, без мигания.
- Hero с печатающимся слоганом и анимированным фоном (дрейф точек, вращающееся свечение, параллакс за курсором).
- Навыки в виде интерактивного терминала: команды `help`, `whoami`, `skills`, `ls <frontend|tools|api>`, `contact`, `sudo hire roman`, `clear`, история по ↑/↓.
- Опыт работы — таймлайн; проекты — карточки со скриншотами и фильтром по стеку.
- Скачивание резюме (DOCX) на языке текущей локали.
- Адаптив от 320px.

## Быстрый старт

Требуется Node.js 18.18+ (проверено на 22).

```bash
npm install
npm run dev            # http://localhost:3000
```

Демо-проекты существуют только после полной сборки. Выполните `npm run build:all` хотя бы один раз — тогда `npm run dev` поднимет их на http://localhost:3001/demos/ и карточки проектов будут вести туда.

## Скрипты

| Команда | Что делает |
| --- | --- |
| `npm run dev` | Dev-сервер портфолио (`scripts/dev.sh`); при наличии `dist/demos` параллельно раздаёт демо на порту 3001 (`DEMOS_PORT`). |
| `npm run build` | Статическая сборка только портфолио в `out-portfolio/`. |
| `npm run build:all` | Полная сборка сайта в `dist/`: демо-проекты, очистка контактов в демо, EN-резюме и само портфолио. |
| `npm run serve` | Раздаёт `dist/` на http://localhost:3000 — так сайт выглядит в продакшене. |
| `npm run resume:en` | Генерирует английское резюме из русского шаблона (нужен Python-venv `.venv-resume` с `python-docx`). |

`dist/` — готовый к деплою статический сайт: его содержимое загружается на любой статический хостинг как есть.

## Структура

```
src/
  app/                  layout, глобальные стили, favicon (icon.svg)
  components/
    Header.tsx          навигация, языки, переключатель темы
    PortfolioPage.tsx   собирает секции страницы
    ScrollReveal.tsx    появление блоков при прокрутке ([data-reveal])
    sections/           Hero, Features, About, SkillsTerminal, Experience,
                        Education, Projects, CtaBand, Contact (+ *.module.css)
  context/              LanguageContext, ThemeContext
  data/resume.ts        все тексты (ru/en), список демо, контакты, ссылки на резюме
  hooks/useInView.ts
public/
  projects/             скриншоты демо для карточек (960×600, webp)
  resume/               DOCX-резюме для скачивания
projects/               исходники демо-проектов
scripts/                сборка и обработка демо, dev-скрипт, генерация резюме
```

### Как поменять контент

- Тексты, опыт, навыки, контакты — `src/data/resume.ts`. Ключи в `ru` и `en` должны совпадать: тип перевода выводится из объекта.
- Цвета — CSS-переменные в `src/app/globals.css`; тёмная тема переопределяет их в блоке `[data-theme="dark"]`.
- Новый демо-проект: добавить запись в `demos` и описание в `demoDescriptions` (`resume.ts`), сборку — в `scripts/build-all.sh` (Next.js) или `scripts/copy-vanilla-demo.mjs` (статика), скриншот — в `public/projects/<slug>.webp`.

## Демо-проекты

| Папка | Slug | Тип |
| --- | --- | --- |
| `projects/1` | `enjoygamesnow` | Next.js, собирается с basePath |
| `projects/2` | `meilleurs-jeuxx` | Next.js, собирается с basePath |
| `projects/3` | `astrareels` | Next.js, собирается с basePath |
| `projects/4` | `pixelspowershop` | Next.js, собирается с basePath |
| `projects/5` | `dreamfin` | HTML/SCSS/JS, копируется с переписыванием путей |
| `projects/6` | `design-ceh` | HTML/SCSS/JS |
| `projects/7` | `uralruin` | HTML/CSS/JS |

Next.js-демо получают префикс `/demos/<slug>` через переменную `DEMO_SLUG`. Статические демо копирует `scripts/copy-vanilla-demo.mjs`: он переписывает абсолютные пути (`href`, `src`, `srcset`, `url()`, пути внутри JS) под `/demos/<slug>/`.

### Известные проблемы в исходниках демо

Это недостающий контент, а не ошибки сборки:

- **EnjoyGamesNow:** нет игр `nightcity`, `kingdomelf`, `donuts`, `chinatown`, `wildlove`; блок новостей обращается к PHP-API `/api/news.php`, которого нет в статической версии.
- **Meilleurs-Jeuxx:** тот же запрос к `/api/news.php`.
- **AstraReels:** нет игр `valhalla`, `donuts`, `sea`, `love`.
- **UralRuin:** нет картинки `img/expeditions/exp6.*` и страниц `/subscribe`, `/events`.

## Каталоги сборки

- `out-portfolio/` — результат `npm run build` (статический экспорт портфолио);
- `.next/` — промежуточные файлы `next build`;
- `.next-dev/` — кэш dev-сервера. Он отделён от сборки, чтобы запущенный `npm run dev` не падал (ENOENT / 500), пока идёт `build:all`;
- `dist/` — итоговый сайт.

Все эти каталоги в `.gitignore`.
