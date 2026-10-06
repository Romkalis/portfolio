You are a senior enterprise software architect and staff-level fullstack engineer.

Your task is to design and generate a production-ready ERP/CRM microservice platform for a car rental business.

The platform must be scalable, maintainable, modular, event-driven, and suitable for real-world commercial usage.

====================================================
CORE STACK
====================================================

Frontend:
- Next.js
- React
- TypeScript
- Zustand
- Module Css
- TanStack Query
- shadcn/ui
- React Hook Form
- Zod
- FullCalendar

Backend:
- Node.js
- NestJS
- Prisma ORM
- PostgreSQL

Infrastructure:
- Docker
- Docker Compose
- Nginx
- MinIO or S3-compatible storage
- GitHub Actions CI/CD

====================================================
ARCHITECTURE REQUIREMENTS
====================================================

Architecture style:
- Microservices
- DDD (Domain Driven Design)
- Feature-sliced modules
- Clean architecture
- CQRS-ready structure
- SOLID principles
- Repository pattern
- Event-driven communication
- Shared packages
- Strict typing everywhere
- Reusable DTOs
- Centralized validation
- UTC-only date storage
- Soft delete support
- Full audit logging

Project must be organized as a monorepo.

====================================================
MONOREPO STRUCTURE
====================================================

Generate full monorepo structure:

apps/
  admin-web
  client-web
  api-gateway

services/
  auth-service
  car-service
  booking-service
  pricing-service
  customer-service
  finance-service
  maintenance-service
  notification-service
  payment-service
  search-service
  settings-service

packages/
  ui
  shared-types
  shared-utils
  prisma
  eslint-config
  tsconfig

infra/
  docker
  nginx
  monitoring

docs/
  architecture
  entities
  api
  business-rules
  event-system

====================================================
AUTH SERVICE
====================================================

Responsibilities:
- registration
- login
- JWT
- refresh tokens
- Google OAuth
- Apple OAuth
- RBAC
- permissions
- session management

Roles:
- SUPER_ADMIN
- ADMIN
- MANAGER
- MECHANIC
- CLIENT

Implement granular permissions system:
- can_manage_bookings
- can_manage_finance
- can_manage_cars
- can_manage_users
- can_manage_maintenance
- can_manage_pricing

Generate:
- Prisma schema
- DTOs
- controllers
- services
- guards
- interceptors
- RBAC middleware

====================================================
CAR SERVICE
====================================================

The car service manages all vehicle data.

Public fields:
- brand
- model
- class
- year
- transmission
- seats
- horsepower
- engine_volume
- fuel_type
- color
- trunk_volume
- photos

Vehicle classes:
- economy
- standard
- business
- premium
- suv
- cabriolet
- minivan

Private fields:
- vin
- mileage
- expenses
- purchase_price
- service_intervals
- deletedAt
- isArchived

Car statuses:
- available
- booked
- in_service
- cleaning
- damaged
- inactive

Generate:
- Prisma models
- DTOs
- validation
- repository layer
- services
- endpoints
- admin CRUD
- search integration

====================================================
MULTI-LOCATION SUPPORT
====================================================

System must support multiple rental locations.

Create entities:
- locations
- pickup_location_id
- return_location_id

Location fields:
- name
- city
- country
- address
- timezone
- coordinates

Cars belong to locations.

Bookings must support:
- pickup location
- return location

====================================================
BOOKING SERVICE
====================================================

This is the most important service.

Responsibilities:
- booking creation
- availability validation
- overlap detection
- pricing calculation
- reservation lifecycle
- calendar management
- drag-and-drop admin bookings

Booking statuses:
- pending
- confirmed
- active
- completed
- cancelled
- overdue

====================================================
BOOKING OVERLAP ENGINE
====================================================

Implement advanced booking validation.

System MUST validate:
- overlapping bookings
- cleaning buffer
- service blocking
- manual blocking
- maintenance blocking

Generate reusable overlap detection module.

====================================================
CLEANING BUFFER
====================================================

Cars cannot become immediately available after booking end.

Add:
- cleaningBufferHours

The system must automatically block the car for configured hours after booking completion.

====================================================
UTC DATE STORAGE
====================================================

CRITICAL REQUIREMENT:

ALL dates in database must be stored in UTC.

Frontend must convert dates using user timezone.

Generate:
- timezone-safe date utilities
- UTC conversion helpers
- Prisma date handling examples

====================================================
PRICING SERVICE
====================================================

Dynamic pricing system.

Base pricing:
- pricePerDay
- pricePerWeek
- pricePerMonth

Global coefficients:
- weekendMultiplier
- holidayMultiplier
- summerMultiplier
- winterMultiplier
- highDemandMultiplier

Car-specific overrides:
- customSummerMultiplier
- customWinterMultiplier
- customDemandMultiplier

====================================================
LOYALTY SYSTEM
====================================================

Implement customer loyalty system.

Automatic discounts:
- more than 10 bookings => 5%
- more than 30 bookings => 10%

Admin configurable:
- custom discount percent
- enable/disable loyalty
- show/hide discount for customer

====================================================
OPTIONS SYSTEM
====================================================

Booking options:
- child seat
- second driver
- full insurance
- wifi
- ski rack

Generate:
- options table
- booking_options relation
- dynamic pricing integration

====================================================
CUSTOMER SERVICE
====================================================

Customer database with CRM functionality.

Fields:
- firstName
- lastName
- email
- phone
- telegram
- whatsapp
- viber
- notes
- blacklist
- discountPercent

Statistics:
- totalBookings
- successfulBookings
- cancelledBookings
- totalSpent

Generate:
- customer analytics
- customer profile page
- admin tools
- search integration

====================================================
SEARCH SERVICE
====================================================

Implement advanced search and filtering.

Filters:
- car class
- price range
- availability
- transmission
- seats
- fuel type

Search must support:
- pagination
- sorting
- availability filtering
- dynamic filtering
- query optimization

====================================================
PAYMENT SERVICE
====================================================

Do not fully implement payment providers yet,
but fully prepare architecture.

Entities:
- payments
- refunds
- payment_status
- payment_provider

Statuses:
- pending
- completed
- failed
- refunded

Providers:
- Stripe
- PayPal
- Manual
- Cash

Generate:
- payment abstraction layer
- provider interface
- future extensibility

====================================================
FINANCE SERVICE
====================================================

Track all financial operations.

Income:
- bookings
- additional services

Expenses:
- maintenance
- repairs
- washing
- fuel
- insurance
- taxes
- fines

Generate:
- profitability analytics
- car ROI
- monthly reports
- yearly reports
- charts-ready APIs

====================================================
MAINTENANCE SERVICE
====================================================

Manage technical maintenance.

Each car has:
- oil intervals
- filter intervals
- spark plug intervals
- custom intervals

Maintenance records:
- mileage
- date
- works
- recommendations
- cost
- attachments

Generate:
- upcoming maintenance engine
- maintenance history
- reminders
- analytics

====================================================
NOTIFICATION SERVICE
====================================================

Prepare notification infrastructure.

Notification types:
- booking ending
- overdue return
- maintenance due
- unpaid fine

Generate:
- event consumers
- queue processing
- notification templates

====================================================
EVENT-DRIVEN ARCHITECTURE
====================================================

Use RabbitMQ.

Generate events:
- BOOKING_CREATED
- BOOKING_CANCELLED
- BOOKING_COMPLETED
- PAYMENT_COMPLETED
- MAINTENANCE_CREATED
- CAR_STATUS_CHANGED

Generate:
- event contracts
- producers
- consumers
- retry logic
- dead letter queue support

====================================================
AUDIT LOG SYSTEM
====================================================

Implement full audit logging.

Track:
- entity
- entityId
- oldValue
- newValue
- changedBy
- timestamp

Audit all:
- pricing changes
- booking changes
- status changes
- deletions
- maintenance updates

====================================================
SOFT DELETE
====================================================

Never hard delete records.

All entities must support:
- deletedAt
- isArchived

====================================================
ADMIN PANEL
====================================================

Admin panel must support:
- drag-and-drop booking calendar
- calendar resizing
- heatmap loading
- car availability overview
- analytics dashboard
- financial dashboard
- maintenance dashboard

Calendar views:
- day
- week
- month
- timeline

====================================================
DATABASE REQUIREMENTS
====================================================

Generate:
- full PostgreSQL schema
- normalized tables
- indexes
- constraints
- relations
- enums
- migration strategy

Generate complete Prisma schema.

====================================================
API REQUIREMENTS
====================================================

Generate:
- REST API structure
- DTOs
- validation
- Swagger docs
- pagination
- filtering
- sorting
- error handling
- API versioning

====================================================
DOCUMENTATION REQUIREMENTS
====================================================

VERY IMPORTANT:

Every entity must have its own markdown documentation file.

For every entity generate:
- responsibility
- fields
- validation
- business rules
- relations
- events
- permissions
- API routes
- DTOs
- Prisma schema
- frontend usage
- backend modules
- lifecycle
- examples

Example:
docs/entities/car.md
docs/entities/booking.md
docs/entities/customer.md

====================================================
DOCKER INFRASTRUCTURE
====================================================

Generate:
- Dockerfiles
- docker-compose
- local development setup
- PostgreSQL container
- Redis container
- RabbitMQ container
- Nginx config

====================================================
CI/CD
====================================================

Generate GitHub Actions pipelines.

Pipeline stages:
- lint
- typecheck
- tests
- build
- docker build
- deploy

====================================================
CODE QUALITY
====================================================

Enforce:
- ESLint
- Prettier
- Husky
- Commitlint
- strict TypeScript
- shared types
- centralized env validation

====================================================
IMPORTANT
====================================================

Generate production-level architecture.

DO NOT generate toy examples.

DO NOT generate simplified CRUD-only structure.

Generate scalable enterprise-ready architecture with proper domain separation and maintainability.

Every generated module must include:
- folder structure
- explanations
- DTOs
- interfaces
- services
- repositories
- event integration
- validation
- API examples
- Prisma models
- business rules

The project must be suitable for:
- real commercial deployment
- scaling
- adding mobile applications later
- future SaaS transformation
- multi-region support
- future payment integration