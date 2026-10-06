import { PrismaClient } from "@prisma/client";
import { addDays, subDays } from "date-fns";

const prisma = new PrismaClient();

async function main() {
  await prisma.scheduleAppointment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.repairHistory.deleteMany();
  await prisma.car.deleteMany();
  await prisma.owner.deleteMany();

  const owners = await Promise.all([
    prisma.owner.create({
      data: {
        lastName: "Иванов",
        firstName: "Сергей",
        middleName: "Петрович",
        phone: "+7 (903) 111-22-33",
        notes: "Постоянный клиент, предпочитает утренние записи",
      },
    }),
    prisma.owner.create({
      data: {
        lastName: "Петрова",
        firstName: "Анна",
        middleName: "Викторовна",
        phone: "+7 (916) 444-55-66",
      },
    }),
    prisma.owner.create({
      data: {
        lastName: "Сидоров",
        firstName: "Дмитрий",
        phone: "+7 (925) 777-88-99",
        notes: "Корпоративный клиент",
      },
    }),
  ]);

  const cars = await Promise.all([
    prisma.car.create({
      data: {
        ownerId: owners[0].id,
        brand: "Toyota",
        model: "Camry",
        year: 2018,
        vin: "JTDBR3FE8J3012345",
        mileage: 87500,
        oil: "5W-30",
        oilFilter: "OF-2341",
      },
    }),
    prisma.car.create({
      data: {
        ownerId: owners[0].id,
        brand: "Lada",
        model: "Vesta",
        year: 2021,
        vin: "XTA219040M0123456",
        mileage: 42000,
      },
    }),
    prisma.car.create({
      data: {
        ownerId: owners[1].id,
        brand: "BMW",
        model: "X3",
        year: 2019,
        vin: "WBA8E9C50HK123456",
        mileage: 65000,
        oil: "5W-40",
        cabinFilter: "CF-9912",
      },
    }),
    prisma.car.create({
      data: {
        ownerId: owners[2].id,
        brand: "Hyundai",
        model: "Solaris",
        year: 2020,
        vin: "Z94CB41AADR123456",
        mileage: 51000,
      },
    }),
  ]);

  const today = new Date();

  await prisma.repairHistory.createMany({
    data: [
      {
        carId: cars[0].id,
        repairDate: subDays(today, 90),
        mileage: 82000,
        workDone: "Замена масла и фильтров",
        partsList: "Масло 5W-30 4л, масляный фильтр, воздушный фильтр",
        recommendations: "Проверить тормозные колодки через 5000 км",
        nextServiceDate: subDays(today, 0),
      },
      {
        carId: cars[0].id,
        repairDate: subDays(today, 30),
        mileage: 86000,
        workDone: "Диагностика подвески, замена стоек",
        partsList: "Стойки передние x2, опоры",
        nextServiceDate: addDays(today, 180),
      },
      {
        carId: cars[2].id,
        repairDate: subDays(today, 45),
        mileage: 62000,
        workDone: "ТО, замена свечей",
        partsList: "Свечи NGK x4, масло 5W-40",
        nextServiceDate: addDays(today, 120),
      },
    ],
  });

  const orders = await Promise.all([
    prisma.order.create({
      data: {
        orderNumber: "ORD-2026-0001",
        clientId: owners[0].id,
        carId: cars[0].id,
        date: subDays(today, 14),
        time: "10:00",
        problem: "Замена тормозных колодок",
        status: "COMPLETED",
        totalAmount: 18500,
        earnings: 12000,
      },
    }),
    prisma.order.create({
      data: {
        orderNumber: "ORD-2026-0002",
        clientId: owners[1].id,
        carId: cars[2].id,
        date: subDays(today, 7),
        time: "14:30",
        problem: "Диагностика двигателя",
        status: "COMPLETED",
        totalAmount: 8500,
        earnings: 5500,
      },
    }),
    prisma.order.create({
      data: {
        orderNumber: "ORD-2026-0003",
        clientId: owners[2].id,
        carId: cars[3].id,
        date: subDays(today, 2),
        time: "11:00",
        problem: "Замена АКБ",
        status: "IN_PROGRESS",
      },
    }),
    prisma.order.create({
      data: {
        orderNumber: "ORD-2026-0004",
        clientId: owners[0].id,
        carId: cars[1].id,
        date: addDays(today, 1),
        time: "09:00",
        problem: "Развал-схождение",
        status: "PENDING",
      },
    }),
  ]);

  await prisma.scheduleAppointment.createMany({
    data: [
      {
        date: today,
        time: "09:30",
        clientId: owners[0].id,
        carId: cars[0].id,
        phone: owners[0].phone,
        problem: "Стук в подвеске",
        status: "CONFIRMED",
        orderId: orders[0].id,
      },
      {
        date: addDays(today, 1),
        time: "11:00",
        clientId: owners[1].id,
        carId: cars[2].id,
        phone: owners[1].phone,
        problem: "Проверка кондиционера",
        status: "PENDING",
      },
      {
        date: addDays(today, 3),
        time: "15:00",
        clientId: owners[2].id,
        carId: cars[3].id,
        phone: owners[2].phone,
        problem: "Замена масла",
        status: "PENDING",
      },
      {
        date: addDays(today, 7),
        time: "10:30",
        clientId: owners[0].id,
        carId: cars[1].id,
        phone: owners[0].phone,
        problem: "ТО-2",
        status: "PENDING",
      },
    ],
  });

  console.log("Seed completed:", {
    owners: owners.length,
    cars: cars.length,
    orders: orders.length,
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
