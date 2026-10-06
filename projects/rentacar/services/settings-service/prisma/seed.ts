import { PrismaClient } from '@prisma/settings-client';

const prisma = new PrismaClient();

async function main() {
  await prisma.platformSettings.upsert({
    where: { id: 'singleton' },
    create: {
      id: 'singleton',
      cleaningBufferHours: 2,
      defaultCurrency: 'EUR',
      defaultLocale: 'en',
      companyName: 'RentACar',
    },
    update: {},
  });
}

main()
  .finally(() => prisma.$disconnect());
