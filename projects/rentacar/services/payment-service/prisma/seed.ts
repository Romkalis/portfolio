import { PrismaClient, PaymentProvider, PaymentStatus } from '@prisma/payment-client';

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.payment.count();
  if (existing > 0) return;

  await prisma.payment.create({
    data: {
      bookingId: 'seed-booking-demo',
      customerId: 'seed-customer-demo',
      provider: PaymentProvider.manual,
      status: PaymentStatus.completed,
      amount: 150,
      currency: 'EUR',
      externalId: 'manual-seed-1',
      metadata: { note: 'Seed demo payment' },
    },
  });
}

main()
  .finally(() => prisma.$disconnect());
