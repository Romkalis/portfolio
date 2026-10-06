import { PrismaClient } from '@prisma/booking-client';

const prisma = new PrismaClient();

const DEFAULT_OPTIONS = [
  { code: 'child_seat', name: 'Child seat', pricePerDay: 5 },
  { code: 'second_driver', name: 'Second driver', pricePerDay: 8 },
  { code: 'full_insurance', name: 'Full insurance', pricePerDay: 15 },
  { code: 'wifi', name: 'Wi-Fi hotspot', pricePerDay: 4 },
  { code: 'ski_rack', name: 'Ski rack', pricePerDay: 7 },
] as const;

async function main() {
  await prisma.bookingSettings.upsert({
    where: { id: 'default' },
    update: { cleaningBufferHours: 2 },
    create: { id: 'default', cleaningBufferHours: 2 },
  });

  for (const option of DEFAULT_OPTIONS) {
    await prisma.bookingOption.upsert({
      where: { code: option.code },
      update: { name: option.name, pricePerDay: option.pricePerDay, isActive: true },
      create: option,
    });
  }

  console.log('Booking service seed completed');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
