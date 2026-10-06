import { NotificationChannel, PrismaClient } from '@prisma/notification-client';
import { DomainEventType } from '@rentacar/shared-types';

const prisma = new PrismaClient();

const templates: Array<{
  eventType: DomainEventType;
  locale: string;
  subject: string;
  body: string;
}> = [
  {
    eventType: DomainEventType.BOOKING_CREATED,
    locale: 'en',
    subject: 'Booking confirmed #{{aggregateId}}',
    body: 'Your booking for car {{carId}} from {{startAt}} to {{endAt}} is confirmed.',
  },
  {
    eventType: DomainEventType.BOOKING_CREATED,
    locale: 'ru',
    subject: 'Бронирование #{{aggregateId}} создано',
    body: 'Бронь авто {{carId}} с {{startAt}} по {{endAt}} оформлена.',
  },
  {
    eventType: DomainEventType.BOOKING_CANCELLED,
    locale: 'en',
    subject: 'Booking cancelled #{{aggregateId}}',
    body: 'Booking {{aggregateId}} for car {{carId}} was cancelled.',
  },
  {
    eventType: DomainEventType.BOOKING_CANCELLED,
    locale: 'ru',
    subject: 'Бронирование #{{aggregateId}} отменено',
    body: 'Бронь {{aggregateId}} для авто {{carId}} отменена.',
  },
  {
    eventType: DomainEventType.BOOKING_COMPLETED,
    locale: 'en',
    subject: 'Rental completed #{{aggregateId}}',
    body: 'Thank you! Rental {{aggregateId}} ended at {{endAt}}.',
  },
  {
    eventType: DomainEventType.BOOKING_COMPLETED,
    locale: 'ru',
    subject: 'Аренда завершена #{{aggregateId}}',
    body: 'Спасибо! Аренда {{aggregateId}} завершена {{endAt}}.',
  },
  {
    eventType: DomainEventType.PAYMENT_COMPLETED,
    locale: 'en',
    subject: 'Payment received',
    body: 'Payment {{aggregateId}}: {{amount}} {{currency}} for booking {{bookingId}}.',
  },
  {
    eventType: DomainEventType.PAYMENT_COMPLETED,
    locale: 'ru',
    subject: 'Оплата получена',
    body: 'Платёж {{aggregateId}}: {{amount}} {{currency}}, бронь {{bookingId}}.',
  },
  {
    eventType: DomainEventType.CAR_STATUS_CHANGED,
    locale: 'en',
    subject: 'Car status updated',
    body: 'Car {{carId}} status: {{oldStatus}} → {{newStatus}}.',
  },
  {
    eventType: DomainEventType.CAR_STATUS_CHANGED,
    locale: 'ru',
    subject: 'Статус авто изменён',
    body: 'Авто {{carId}}: {{oldStatus}} → {{newStatus}}.',
  },
  {
    eventType: DomainEventType.MAINTENANCE_CREATED,
    locale: 'en',
    subject: 'Maintenance recorded',
    body: 'Car {{carId}} serviced at {{mileage}} km.',
  },
  {
    eventType: DomainEventType.MAINTENANCE_CREATED,
    locale: 'ru',
    subject: 'Обслуживание зафиксировано',
    body: 'Авто {{carId}}: ТО на пробеге {{mileage}} км.',
  },
];

async function main() {
  for (const tpl of templates) {
    await prisma.notificationTemplate.upsert({
      where: {
        eventType_channel_locale: {
          eventType: tpl.eventType,
          channel: NotificationChannel.email,
          locale: tpl.locale,
        },
      },
      create: {
        eventType: tpl.eventType,
        channel: NotificationChannel.email,
        locale: tpl.locale,
        subject: tpl.subject,
        body: tpl.body,
      },
      update: { subject: tpl.subject, body: tpl.body, isActive: true },
    });
  }
}

main()
  .finally(() => prisma.$disconnect());
