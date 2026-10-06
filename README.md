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
| `npm run pack` | Упаковывает содержимое `dist/` (вместе с `.htaccess`) в `site.zip` для загрузки на хостинг. |
| `npm run resume:en` | Генерирует английское резюме из русского шаблона (нужен Python-venv `.venv-resume` с `python-docx`). |

`dist/` — готовый к деплою статический сайт. Сервер Node.js для него не нужен: это обычные файлы, а демо лежат в `dist/demos/` и открываются с того же домена. Порт 3001 из `npm run dev` нужен только при разработке.

## Деплой на Timeweb

Виртуальный хостинг Timeweb — это Apache с nginx перед ним. Сборка уже содержит `.htaccess` (исходник — `scripts/hosting/.htaccess`): своя страница 404, UTF-8, запрет листинга папок, gzip, кэширование (хешированные `_next/static` — на год, HTML и резюме — `no-cache`).

1. Соберите сайт и упакуйте его:
   ```bash
   npm run build:all
   npm run pack          # → site.zip
   ```
2. В панели Timeweb откройте «Файловый менеджер» и перейдите в корневую папку сайта (обычно `public_html` нужного домена). Удалите старые файлы.
3. Загрузите `site.zip` и распакуйте его прямо в эту папку. Должно получиться `public_html/index.html`, `public_html/demos/...`, `public_html/.htaccess`, а не `public_html/dist/...`.

   Архив весит около 200 МБ — почти всё это картинки и видео демо-проектов (само портфолио ~1,5 МБ). Если загрузка через файловый менеджер не проходит, используйте FTP/SFTP.

   При загрузке по FTP/SFTP передавайте содержимое папки `dist/`, а не саму папку. Включите показ скрытых файлов, чтобы не потерять `.htaccess`.
4. HTTPS: выпустите бесплатный сертификат Let's Encrypt в разделе SSL панели. Затем раскомментируйте блок «Force HTTPS» в `scripts/hosting/.htaccess`, пересоберите и перезалейте сайт (или отредактируйте `.htaccess` прямо на сервере).
5. Проверьте: главную, переключение языка и темы, скачивание резюме, любой проект из списка и несуществующий адрес (должна открыться страница 404).

Сайт должен лежать в корне домена (`site.ru/`), а не в подпапке (`site.ru/portfolio/`): пути в сборке абсолютные (`/_next/...`, `/demos/...`).

Демо-проекты со своим `.htaccess` (design-ceh — «красивые» адреса без `.html`) сохраняют свои правила. Редирект на HTTPS из них убирается при сборке: он задаётся один раз в корневом `.htaccess`.

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
