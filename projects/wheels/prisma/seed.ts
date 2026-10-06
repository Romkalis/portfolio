import {
  PrismaClient,
  Role,
  ShiftStatus,
  ExpenseCategory,
  EmployeeEmploymentType,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 12);

  await prisma.shopSettings.deleteMany();
  await prisma.shiftClosure.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.salary.deleteMany();
  await prisma.revenue.deleteMany();
  await prisma.shiftRequest.deleteMany();
  await prisma.shift.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.employeeProfile.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      email: "admin@wheels.local",
      name: "Иван Начальников",
      passwordHash,
      role: Role.ADMIN,
    },
  });

  const emp1User = await prisma.user.create({
    data: {
      email: "alex@wheels.local",
      name: "Алексей Мастеров",
      passwordHash,
      role: Role.EMPLOYEE,
      profile: {
        create: { phone: "+7 900 111-22-33", position: "Мастер", hourlyRate: 450 },
      },
    },
    include: { profile: true },
  });

  const emp2User = await prisma.user.create({
    data: {
      email: "dmitry@wheels.local",
      name: "Дмитрий Колёсов",
      passwordHash,
      role: Role.EMPLOYEE,
      profile: {
        create: {
          phone: "+7 900 444-55-66",
          position: "Мастер",
          hourlyRate: 420,
          employmentType: EmployeeEmploymentType.PART_TIME,
        },
      },
    },
    include: { profile: true },
  });

  const emp1 = emp1User.profile!;
  const emp2 = emp2User.profile!;

  await prisma.shopSettings.create({
    data: { id: "default", defaultStartTime: "09:00", defaultEndTime: "21:00" },
  });

  for (const emp of [emp1, emp2]) {
    for (let weekday = 1; weekday <= 7; weekday++) {
      await prisma.schedule.create({
        data: {
          employeeId: emp.id,
          weekday,
          startTime: "09:00",
          endTime: "21:00",
        },
      });
    }
  }

  const today = new Date();
  const days = (n: number) => {
    const d = new Date(today);
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + n));
  };

  for (let i = -14; i <= 14; i++) {
    const date = days(i);
    await prisma.revenue.upsert({
      where: { date },
      create: {
        date,
        amount: 15000 + Math.floor(Math.random() * 25000),
        comment: i === 0 ? "Сегодня" : undefined,
      },
      update: {},
    });
  }

  const expenses = [
    { name: "Грузики 50г", category: ExpenseCategory.WEIGHTS, amount: 3200 },
    { name: "Клей для шин", category: ExpenseCategory.MATERIALS, amount: 1800 },
    { name: "Аренда бокса", category: ExpenseCategory.RENT, amount: 45000 },
    { name: "Кофе для персонала", category: ExpenseCategory.OTHER, amount: 890 },
  ];

  for (let i = 0; i < expenses.length; i++) {
    const e = expenses[i];
    await prisma.expense.create({
      data: {
        name: e.name,
        category: e.category,
        amount: e.amount,
        date: days(-i * 3),
        comment: "Тестовые данные",
      },
    });
  }

  await prisma.salary.createMany({
    data: [
      { employeeId: emp1.id, amount: 28000, date: days(-7), comment: "Неделя 1" },
      { employeeId: emp2.id, amount: 26500, date: days(-7) },
      { employeeId: emp1.id, amount: 29500, date: days(-1) },
      { employeeId: emp2.id, amount: 27000, date: days(-1) },
    ],
  });

  const shiftData = [
    { employeeId: emp1.id, date: days(1), startTime: "09:00", endTime: "18:00", status: ShiftStatus.CONFIRMED },
    { employeeId: emp2.id, date: days(2), startTime: "10:00", endTime: "19:00", status: ShiftStatus.CONFIRMED },
    { employeeId: emp1.id, date: days(3), startTime: "09:00", endTime: "17:00", status: ShiftStatus.PENDING },
    { employeeId: emp2.id, date: days(-2), startTime: "09:00", endTime: "18:00", status: ShiftStatus.REJECTED, comment: "Перегруз" },
  ];

  for (const s of shiftData) {
    await prisma.shift.create({ data: s });
  }

  await prisma.shiftRequest.createMany({
    data: [
      { employeeId: emp1.id, date: days(5), startTime: "09:00", endTime: "18:00", comment: "Могу подработать" },
      { employeeId: emp2.id, date: days(6), startTime: "11:00", endTime: "20:00", status: ShiftStatus.PENDING },
      { employeeId: emp1.id, date: days(-5), startTime: "09:00", endTime: "18:00", status: ShiftStatus.CONFIRMED },
    ],
  });

  for (const emp of [emp1, emp2]) {
    for (let weekday = 1; weekday <= 5; weekday++) {
      await prisma.schedule.create({
        data: { employeeId: emp.id, weekday, startTime: "09:00", endTime: "18:00" },
      });
    }
  }

  console.log("Seed completed:");
  console.log("  Admin: admin@wheels.local / password123");
  console.log("  Employee 1: alex@wheels.local / password123");
  console.log("  Employee 2: dmitry@wheels.local / password123");
  console.log("  (admin user id:", admin.id, ")");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
