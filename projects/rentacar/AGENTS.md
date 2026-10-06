# AGENTS.md — RentACar Platform

Project path: `projects/rentacar/`

## Docs first

- [Architecture](docs/architecture/overview.md)
- [Entities](docs/entities/)
- [API](docs/api/README.md)
- [Events](docs/event-system/events.md)

## Conventions

- Monorepo: npm workspaces + Turborepo
- Backend: NestJS, DDD folders (`domain`, `application`, `infrastructure`, `presentation`)
- DB: Prisma per service, UTC `timestamptz`, soft delete
- Frontend: Next.js, CSS Modules (no Tailwind in admin/client per prompt)
- Shared types: `@rentacar/shared-types`

## Phases (backend services)

All Nest microservices build in CI: auth, car, booking, pricing, customer, payment, finance, maintenance, notification, search, settings, plus api-gateway.

Service docs: [docs/services/README.md](docs/services/README.md)

## Commands

```bash
cd projects/rentacar
cp .env.example .env
docker compose -f infra/docker/docker-compose.yml up -d postgres redis rabbitmq
npm install
npm run db:setup
npm run dev
```
