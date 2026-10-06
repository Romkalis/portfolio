📌 Общая концепция проекта

Проект: Fullstack ERP/CRM система аренды автомобилей с микросервисной архитектурой.

Тип проекта:

production-ready SaaS
fleet management system
rental management platform
admin CRM + client booking system
📌 Основной стек
Frontend
Next.js
TypeScript
Zustand
TanStack Query
TailwindCSS
shadcn/ui
FullCalendar
React Hook Form
Zod
Backend
Node.js
NestJS
Prisma ORM
PostgreSQL
Redis
RabbitMQ
Infrastructure
Docker
Docker Compose
GitHub Actions
Nginx
MinIO/S3
Traefik (optional)
📌 Monorepo структура
apps/
  admin-web/
  client-web/
  api-gateway/

services/
  auth-service/
  car-service/
  booking-service/
  pricing-service/
  customer-service/
  finance-service/
  maintenance-service/
  notification-service/

packages/
  ui/
  eslint-config/
  tsconfig/
  shared-types/
  shared-utils/
  prisma/

infra/
  docker/
  nginx/
  monitoring/

docs/
  er-diagrams/
  api/
  business-rules/
📌 Архитектура микросервисов
1. Auth Service
Ответственность
регистрация
login
JWT
refresh token
OAuth
роли
permissions
Авторизация
Методы:
email/password
Google OAuth
Apple OAuth
Роли:
SUPER_ADMIN
ADMIN
MANAGER
MECHANIC
CLIENT
Сущности:
users
roles
sessions
refresh_tokens
2. Car Service
Отвечает:
хранение автомобилей
характеристики
статусы
фотографии
availability metadata
📌 Статусы автомобилей
enum CarStatus {
  available
  booked
  in_service
  cleaning
  damaged
  inactive
}
📌 Public fields
brand
model
class
year
transmission
seats
horsepower
engineVolume
fuelType
color
trunkVolume
photos
pricePerDay
📌 Private fields
vin
mileage
purchasePrice
expenses
serviceIntervals
deletedAt
isArchived
📌 Service intervals

Базовые интервалы:

oilChangeInterval
airFilterInterval
fuelFilterInterval
cabinFilterInterval
sparkPlugInterval
Override per vehicle

Для каждого автомобиля интервалы можно переопределять отдельно.

3. Booking Service

Самый сложный сервис.

📌 Ответственность
создание брони
проверка пересечений
блокировка дат
availability
расчет стоимости
календарь
drag-and-drop броней
📌 Статусы бронирований
pending
confirmed
active
completed
cancelled
overdue
📌 Возможности
Администратор:
вручную создавать бронь
выбирать даты
видеть свободные машины
drag-and-drop бронирований
Клиент:
бронирование
выбор дат
опции
расчет цены
📌 Dynamic pricing
Базовые параметры
pricePerDay
pricePerWeek
pricePerMonth
📌 Глобальные коэффициенты

Отдельная админка:

weekendMultiplier
holidayMultiplier
summerMultiplier
winterMultiplier
highDemandMultiplier
📌 Коэффициенты автомобиля

Каждый автомобиль может переопределять:

customSummerMultiplier
customWinterMultiplier
customDemandMultiplier
📌 Loyalty system
Автоматические скидки
> 10 bookings -> 5%
> 30 bookings -> 10%
Настройки:
isDiscountEnabled
isDiscountVisible
manualDiscountPercent
📌 Дополнительные услуги
Таблица options
child_seat
second_driver
full_insurance
wifi
ski_rack
Связь
booking_options
4. Customer Service
Отвечает:
клиенты
история
рейтинг
скидки
blacklist
📌 Данные клиента
firstName
lastName
phone
telegram
whatsapp
viber
email
notes
discountPercent
📌 Метрики клиента
totalBookings
successfulBookings
cancelledBookings
totalSpent
5. Finance Service
📌 Ответственность
доходы
расходы
прибыль
аналитика
📌 Категории расходов
maintenance
repair
fuel
insurance
tax
washing
fines
other
📌 Аналитика
прибыль за период
ROI автомобиля
расход/доход
самые прибыльные автомобили
heatmap загрузки
6. Maintenance Service
📌 Ответственность
ТО
рекомендации
история обслуживания
upcoming maintenance
📌 ТО
Каждое ТО содержит:
mileage
date
works
cost
recommendations
attachments
📌 Upcoming maintenance

Система автоматически считает:

через сколько км ТО
через сколько дней ТО
7. Notification Service

Пока как задел.

📌 Типы уведомлений
booking_ending
maintenance_due
car_overdue
fine_unpaid
📌 Event Driven Architecture

Через RabbitMQ.

📌 Events
BOOKING_CREATED
BOOKING_CANCELLED
BOOKING_COMPLETED
CAR_STATUS_CHANGED
MAINTENANCE_CREATED
PAYMENT_COMPLETED
📌 PostgreSQL структура
Таблицы
users
roles
cars
car_photos
bookings
booking_options
customers
maintenance_records
expenses
income
pricing_rules
notifications
discount_rules
audit_logs
📌 Prisma пример
Car
model Car {
  id            String   @id @default(cuid())
  brand         String
  model         String
  year          Int
  status        CarStatus
  mileage       Int
  vin           String
  deletedAt     DateTime?
  isArchived    Boolean @default(false)

  bookings      Booking[]
}
📌 API Structure
Auth
POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/google
POST /auth/apple
Cars
GET /cars
GET /cars/:id
POST /cars
PATCH /cars/:id
DELETE /cars/:id
Bookings
POST /bookings
GET /bookings/calendar
PATCH /bookings/:id
Maintenance
GET /maintenance/upcoming
POST /maintenance
PATCH /maintenance/:id
📌 Calendar UI
Admin calendar
Возможности:
drag-and-drop
resize booking
фильтр по статусам
фильтр по классам
timeline view
day/week/month view
📌 Heatmap

Показывает:

загруженность автомобилей
самые популярные даты
простаивающие машины
📌 Soft Delete

Никогда не удаляем реальные данные.

deletedAt
isArchived
📌 Audit Log

Логируем:

изменение цены
изменение статуса
изменение брони
удаление
📌 Docker infrastructure
Сервисы
postgres
redis
rabbitmq
nginx
auth-service
booking-service
car-service
finance-service
maintenance-service
admin-web
client-web
📌 CI/CD
GitHub Actions
Pipeline:
lint
test
build
docker build
deploy
📌 Этапы разработки
Phase 1
monorepo
auth
database
docker
Phase 2
car service
booking service
calendar
Phase 3
pricing engine
loyalty system
options
Phase 4
maintenance
finance
analytics
Phase 5
notifications
queues
optimization
📌 Очень важно
Каждая сущность = отдельный markdown-файл

Например:

docs/entities/car.md
docs/entities/booking.md
docs/entities/customer.md
📌 Что должно быть внутри каждого файла
Пример car.md
# Car Entity

## Responsibility
Описание ответственности сущности.

## Fields
Описание каждого поля.

## Relations
Связи с другими таблицами.

## Validation
Правила валидации.

## Business logic
Какие сервисы используют.

## Events
Какие события генерирует.

## API
Какие endpoint работают.

## Prisma model
Модель Prisma.

## DTO
CreateCarDto
UpdateCarDto

## UI
Какие компоненты используют.

## Permissions
Кто имеет доступ.
📌 Prompt для Cursor
You are a senior fullstack architect and NestJS/Next.js engineer.

Build a production-ready microservice-based car rental ERP/CRM platform.

Stack:
- Next.js
- TypeScript
- NestJS
- Prisma
- PostgreSQL
- Redis
- RabbitMQ
- Docker

Architecture requirements:
- DDD
- clean architecture
- CQRS-ready structure
- scalable modules
- reusable shared packages
- strict typing
- feature-based folders

Generate:
- complete monorepo structure
- Prisma schemas
- DTOs
- API routes
- services
- repositories
- event system
- docker infrastructure
- RBAC
- calendar booking logic
- pricing engine
- maintenance system
- finance analytics

Important:
Every entity must be documented in a separate markdown file with:
- business logic
- validation
- relationships
- events
- permissions
- DTOs
- UI usage
- backend modules
- API routes
- prisma schema