import { CarClass, CarStatus, FuelType, PrismaClient, Transmission } from '@prisma/car-client';

const prisma = new PrismaClient();

async function main() {
  const location = await prisma.location.upsert({
    where: { id: 'seed-location-belgrade' },
    update: {},
    create: {
      id: 'seed-location-belgrade',
      name: 'Belgrade Airport',
      city: 'Belgrade',
      country: 'Serbia',
      address: 'Aerodrom Beograd 59',
      timezone: 'Europe/Belgrade',
      latitude: 44.8184,
      longitude: 20.3091,
    },
  });

  await prisma.car.upsert({
    where: { vin: 'SEEDVIN0000000001' },
    update: {},
    create: {
      locationId: location.id,
      brand: 'Toyota',
      model: 'Corolla',
      class: CarClass.standard,
      year: 2023,
      transmission: Transmission.automatic,
      seats: 5,
      horsepower: 132,
      engineVolume: 1.8,
      fuelType: FuelType.hybrid,
      color: 'white',
      trunkVolume: 470,
      pricePerDay: 45,
      status: CarStatus.available,
      vin: 'SEEDVIN0000000001',
      mileage: 12000,
      purchasePrice: 22000,
      photos: {
        create: [{ url: 'https://placehold.co/800x600?text=Toyota+Corolla', isPrimary: true }],
      },
      serviceIntervals: {
        create: {},
      },
    },
  });

  console.log('Car service seed completed');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
