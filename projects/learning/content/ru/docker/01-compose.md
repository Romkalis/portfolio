---
title: Docker Compose
description: Postgres для CRM локально — контейнер, порты, volumes
---

# Docker Compose с нуля

## Кому этот урок

PostgreSQL в CRM поднимается в **контейнере**. Не обязательно ставить Postgres в систему — достаточно Docker.

## Что вы узнаете

- Образ, контейнер, volume
- `docker-compose.yml`
- Порт 5433 vs 5432
- Команды up/down/logs
- Связь с `DATABASE_URL`

---

## 1. Зачем Docker

Одинаковая БД у всех разработчиков.  
`docker compose up -d` — и CRM подключается.

---

## 2. Пример CRM

```yaml
services:
  db:
    image: postgres:16
    ports:
      - "5433:5432"
    environment:
      POSTGRES_USER: crm
      POSTGRES_PASSWORD: crm
      POSTGRES_DB: crm
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

Хост **5433** — чтобы не конфликтовать с локальным Postgres на 5432.

---

## 3. DATABASE_URL

```
postgresql://crm:crm@localhost:5433/crm
```

---

## 4. Команды

```bash
docker compose up -d
docker compose ps
docker compose logs -f db
docker compose down
```

`down -v` — удалить данные (осторожно).

---

## Задания

### 1. Запуск (20 мин)

Поднять db в `projects/service`, проверить `ps`, подключиться (опционально `psql`).

### 2. Порт (5 мин)

Почему 5433 в URL?

### 3. Volume (10 мин)

Что будет с заказами после `down` без `-v` и с `-v`?

### 4. ⭐ Прочитайте `docker-compose.yml` и `DEPLOYMENT.md` — 3 шага деплоя БД.

---

## Дальше

→ [Tooling](../tooling/01-kachestvo-koda.md)
