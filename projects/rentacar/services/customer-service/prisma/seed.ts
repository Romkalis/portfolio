import { PrismaClient } from '@prisma/customer-client';

const prisma = new PrismaClient();

async function main() {
  await prisma.customer.upsert({
    where: { email: 'demo@client.local' },
    update: {},
    create: {
      firstName: 'Demo',
      lastName: 'Client',
      email: 'demo@client.local',
      phone: '+381600000000',
    },
  });
  console.log('Customer seed done');
}

main().finally(() => prisma.$disconnect());
