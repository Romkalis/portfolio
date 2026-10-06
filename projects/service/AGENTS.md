# AGENTS.md — подсказки для AI-ассистентов

Проект: **Автосервис CRM** в `projects/service/`.

## Документация

Читай **[docs/INDEX.md](docs/INDEX.md)** перед изменениями.

- Сервер Next.js → `docs/SERVER-INTERACTION.md`
- БД → `docs/DATABASE.md`
- Auth → `docs/AUTH.md`
- Security → `docs/SECURITY.md`
- Deploy → `docs/DEPLOYMENT.md`
- Все файлы → `docs/FILE-REFERENCE.md`
- Разделы → `docs/SCHEDULE.md`, `OWNERS.md`, `CARS.md`, `ORDERS.md`, `EARNINGS.md`

## Конвенции

- Стили: **SCSS Modules** только, без Tailwind
- Мутации: **Server Actions** в `features/*/actions.ts`
- Запросы к БД: **`services/*.service.ts`**, не Prisma в компонентах
- Валидация: **Zod** в `shared/lib/validators.ts`
- После мутаций: `revalidatePath`
- Мутации: оборачивать в `guardAdminAction()` из `require-auth.ts`

## Команды

```bash
npm run dev
npm run build
npm run db:push
npm run db:seed
```
