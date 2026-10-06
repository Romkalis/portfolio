import { PrismaClient } from '@prisma/pricing-client';

const prisma = new PrismaClient();

async function main() {
  await prisma.pricingSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: { id: 'default' },
  });
  await prisma.loyaltyRule.upsert({
    where: { id: 'default' },
    update: {},
    create: { id: 'default' },
  });
  console.log('Pricing seed done');
}

main().finally(() => prisma.$disconnect());
