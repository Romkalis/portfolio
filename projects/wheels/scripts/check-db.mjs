/**
 * Проверка подключения к PostgreSQL перед db:push / db:seed.
 * Запуск: node scripts/check-db.mjs
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  const count = await prisma.user.count();
  console.log("OK: подключение к БД успешно.");
  console.log(`Пользователей в базе: ${count}`);
  if (count === 0) {
    console.log("\nБаза пустая — выполните: npm run db:seed");
    console.log("После seed админ: admin@wheels.local / password123");
  }
}

main()
  .catch((e) => {
    console.error("\nОШИБКА подключения к БД:\n");
    console.error(e.message);
    console.error(`
Что проверить:
  1. Docker Desktop запущен → docker compose up db -d
  2. В .env верный DATABASE_URL (см. .env.example)
  3. Порт 5432 не занят другим PostgreSQL с другими паролями
  4. После старта БД: npm run db:push && npm run db:seed

Подробнее: documentations/TROUBLESHOOTING.md
`);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
