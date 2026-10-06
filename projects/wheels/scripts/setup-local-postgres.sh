#!/usr/bin/env bash
# Настройка PostgreSQL без Docker (Homebrew Postgres на Mac).
# Запуск: ./scripts/setup-local-postgres.sh
# Затем в .env укажите DATABASE_URL из вывода скрипта.

set -e

DB_NAME="${WHEELS_DB_NAME:-wheels}"
DB_USER="${WHEELS_DB_USER:-wheels}"
DB_PASS="${WHEELS_DB_PASS:-wheels}"
PSQL_USER="${PSQL_ADMIN_USER:-$(whoami)}"

echo "→ Подключение как пользователь PostgreSQL: $PSQL_USER"

psql -h localhost -U "$PSQL_USER" -d postgres -v ON_ERROR_STOP=1 <<SQL
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '$DB_USER') THEN
    CREATE ROLE $DB_USER WITH LOGIN PASSWORD '$DB_PASS';
  END IF;
END
\$\$;
SQL

psql -h localhost -U "$PSQL_USER" -d postgres -v ON_ERROR_STOP=1 <<SQL
SELECT 'CREATE DATABASE $DB_NAME OWNER $DB_USER'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$DB_NAME')\gexec
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
SQL

echo ""
echo "✓ База готова. Добавьте в .env:"
echo "DATABASE_URL=\"postgresql://$DB_USER:$DB_PASS@localhost:5432/$DB_NAME?schema=public\""
echo ""
echo "Далее:"
echo "  npm run db:push"
echo "  npm run db:seed"
