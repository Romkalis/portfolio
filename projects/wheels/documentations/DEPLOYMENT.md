# Развёртывание Wheels на сервере

Инструкция для VPS (Ubuntu/Debian) с Docker. Аналогично можно использовать Railway, Render, Fly.io — принцип тот же: PostgreSQL + Node + env.

## Требования

- Node.js 20+ (или только Docker)
- PostgreSQL 16+
- Домен с HTTPS (Let's Encrypt)
- Минимум 1 GB RAM

## Архитектура production

```mermaid
flowchart LR
    User[Браузер] --> Nginx[Nginx :443]
    Nginx --> App[Next.js :3000]
    App --> DB[(PostgreSQL)]
```

## 1. Подготовка сервера

```bash
sudo apt update && sudo apt install -y git docker.io docker-compose-plugin nginx certbot python3-certbot-nginx
sudo usermod -aG docker $USER
# перелогиниться
```

## 2. Клонирование и env

```bash
git clone <your-repo-url> /opt/wheels
cd /opt/wheels/projects/wheels   # путь к проекту в репозитории
cp .env.example .env
nano .env
```

**Production `.env`:**

```env
DATABASE_URL="postgresql://wheels:STRONG_PASSWORD@db:5432/wheels?schema=public"
AUTH_SECRET="<openssl rand -base64 32>"
AUTH_URL="https://wheels.example.com"
NEXT_PUBLIC_APP_NAME="Wheels — Шиномонтаж"
```

На сервере с **отдельным** managed PostgreSQL (Supabase, RDS):

```env
DATABASE_URL="postgresql://user:pass@host:5432/wheels?sslmode=require"
```

Тогда сервис `db` в docker-compose можно не поднимать.

## 3. Docker Compose (приложение + БД)

В `docker-compose.yml` для production задайте пароль БД через `.env`:

```yaml
# docker-compose.prod.yml — пример override
services:
  db:
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
  app:
    environment:
      DATABASE_URL: postgresql://wheels:${POSTGRES_PASSWORD}@db:5432/wheels?schema=public
      AUTH_SECRET: ${AUTH_SECRET}
      AUTH_URL: ${AUTH_URL}
```

Запуск:

```bash
export AUTH_SECRET=$(openssl rand -base64 32)
export AUTH_URL=https://wheels.example.com
export POSTGRES_PASSWORD=$(openssl rand -base64 24)

docker compose up -d db
# дождаться healthcheck
docker compose run --rm app npx prisma db push
docker compose run --rm app npm run db:seed   # только первый раз!
docker compose up -d --build app
```

Или без отдельного `run`:

```bash
docker compose up --build -d
docker compose exec app npx prisma db push
docker compose exec app npm run db:seed
```

## 4. Nginx (reverse proxy)

`/etc/nginx/sites-available/wheels`:

```nginx
server {
    listen 80;
    server_name wheels.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name wheels.example.com;

    ssl_certificate     /etc/letsencrypt/live/wheels.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/wheels.example.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/wheels /etc/nginx/sites-enabled/
sudo certbot --nginx -d wheels.example.com
sudo nginx -t && sudo systemctl reload nginx
```

В `src/auth.ts` включено `trustHost: true` — Auth.js доверяет `X-Forwarded-Host` за прокси.

## 5. Деплой без Docker (Node + systemd)

```bash
cd /opt/wheels/projects/wheels
npm ci
cp .env.example .env   # и заполнить
npm run db:push
npm run db:seed
npm run build
```

`/etc/systemd/system/wheels.service`:

```ini
[Unit]
Description=Wheels Next.js
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/wheels/projects/wheels
EnvironmentFile=/opt/wheels/projects/wheels/.env
ExecStart=/usr/bin/node node_modules/.bin/next start -p 3000
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable --now wheels
```

`DATABASE_URL` должен указывать на **localhost** или внешний хост PostgreSQL, не `db` (это имя только в Docker-сети).

## 6. Обновление версии

```bash
git pull
npm ci
npx prisma migrate deploy   # если используете миграции
npm run build
sudo systemctl restart wheels
# или: docker compose up --build -d
```

## 7. Безопасность production

Полный чеклист: **[SECURITY.md](./SECURITY.md)**

- `ALLOW_REGISTRATION=false`
- Смените пароли seed-пользователей или удалите тестовые аккаунты
- `AUTH_SECRET` — уникальный, не из примера
- PostgreSQL не открывайте в интернет без firewall
- Регулярные бэкапы: `pg_dump -U wheels wheels > backup.sql`

## 8. Чеклист после деплоя

- [ ] `https://domain/login` открывается
- [ ] Вход `admin@wheels.local` (или ваш админ)
- [ ] `/admin` — dashboard без ошибок Prisma
- [ ] `AUTH_URL` = ваш HTTPS-домен
