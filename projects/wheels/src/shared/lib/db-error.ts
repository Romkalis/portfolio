import { Prisma } from "@prisma/client";

const DB_SETUP_HINT =
  "База данных недоступна. Запустите Docker Desktop (docker compose up db -d) или выполните ./scripts/setup-local-postgres.sh — см. documentations/TROUBLESHOOTING.md";

export function handleDbError(error: unknown): { error: { _form: string[] } } {
  if (
    error instanceof Prisma.PrismaClientInitializationError ||
    (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P1010")
  ) {
    return { error: { _form: [DB_SETUP_HINT] } };
  }
  console.error(error);
  return { error: { _form: ["Внутренняя ошибка сервера"] } };
}
