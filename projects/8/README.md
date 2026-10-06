# Morpho-style hero animation (vanilla)

Демо анимации главной страницы [morpho.org](https://morpho.org) на чистом HTML/CSS/JS.

## Запуск

```bash
# из корня репозитория
npx --yes serve projects/8 -l 3456
```

Откройте http://localhost:3456

## Что воспроизведено

| Секция | Эффект | Реализация |
|--------|--------|------------|
| Hero | Вращающаяся 3D-сфера из частиц (cyan → blue), **растёт при скролле** | **Three.js** — `ShaderMaterial`, равномерная оболочка сферы, sticky hero 220vh |
| Hero | Логотип в центре, счётчики Deposits/Loans | HTML + **vanilla JS** (easing) |
| «Powered by» | Звёздное поле + орбита бейджей, parallax от мыши | **Canvas 2D** + DOM + `requestAnimationFrame` |

## Библиотеки (как на morpho.org)

На продакшене Morpho (Next.js) типично используют:

- **Three.js** / WebGL — сфера из частиц, 3D-сцена
- **GSAP + ScrollTrigger** — привязка анимаций к скроллу
- **Lenis** (опционально) — плавный скролл

В этом демо **без npm**: Three.js подключается через CDN (`importmap` → unpkg). GSAP/Lenis не обязательны для базового эффекта.

## Файлы

- `js/particle-sphere.js` — hero-сфера
- `js/orbit-sphere.js` — секция с орбитой логотипов
- `js/counters.js` — анимация чисел
- `js/main.js` — инициализация

## Улучшения (если нужно ближе к оригиналу)

- Кастомный **shader** для частиц (мерцание, «экваториальное» свечение)
- **GSAP ScrollTrigger** — морфинг hero → orbit при скролле
- Загрузка реальных PNG логотипов вместо цветных бейджей
