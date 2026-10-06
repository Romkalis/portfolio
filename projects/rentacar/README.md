# RentACar ERP/CRM Platform

Production-ready microservice platform for car rental businesses.

## Stack

- **Frontend:** Next.js, TypeScript, CSS Modules, TanStack Query
- **Backend:** NestJS, Prisma, PostgreSQL
- **Infra:** Docker, Nginx, Redis, RabbitMQ, MinIO

## Documentation

| Language | Index |
|----------|--------|
| English | [docs/en/README.md](docs/en/README.md) |
| Русский | [docs/ru/README.md](docs/ru/README.md) |

Includes per-service API reference, data models, Mermaid architecture diagrams, local setup, deployment, and security.

## Quick start

```bash
cp .env.example .env
docker compose -f infra/docker/docker-compose.yml up -d postgres redis rabbitmq minio
npm install
npm run db:setup
npm run dev
```

Default admin: `admin@admin.admin` / `admin`

Full guide: [Local setup (EN)](docs/en/getting-started/local.md) · [Локальный запуск (RU)](docs/ru/getting-started/local.md)

## Ports

| Component | Port |
|-----------|------|
| api-gateway | 3000 |
| admin-web | 3100 |
| client-web | 3200 |
| PostgreSQL (host) | 5434 |

See [system interaction](docs/en/architecture/system-interaction.md) for all services.
