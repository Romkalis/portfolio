import { prisma } from "@/shared/lib/prisma";
import { addDays, startOfDay } from "date-fns";
import type { AppointmentStatus, Prisma } from "@prisma/client";

export async function listAppointments(from: Date, to: Date) {
  return prisma.scheduleAppointment.findMany({
    where: {
      date: { gte: from, lte: to },
    },
    orderBy: [{ date: "asc" }, { time: "asc" }],
    include: {
      client: true,
      car: true,
      order: true,
    },
  });
}

export async function getWeekAppointments(weeksAhead = 1) {
  const from = startOfDay(new Date());
  const to = addDays(from, 7 * weeksAhead);
  return listAppointments(from, to);
}

export async function getMonthAppointments() {
  const from = startOfDay(new Date());
  const to = addDays(from, 30);
  return listAppointments(from, to);
}

export async function getAppointment(id: string) {
  return prisma.scheduleAppointment.findUnique({
    where: { id },
    include: { client: true, car: true, order: true },
  });
}

export async function createAppointment(data: {
  date: Date;
  time: string;
  clientId: string;
  carId?: string;
  phone: string;
  problem: string;
  status?: AppointmentStatus;
}) {
  return prisma.scheduleAppointment.create({
    data,
    include: { client: true, car: true },
  });
}

export async function updateAppointment(id: string, data: Prisma.ScheduleAppointmentUpdateInput) {
  return prisma.scheduleAppointment.update({
    where: { id },
    data,
    include: { client: true, car: true, order: true },
  });
}

export async function deleteAppointment(id: string) {
  return prisma.scheduleAppointment.delete({ where: { id } });
}

export async function createOrderFromAppointment(appointmentId: string) {
  const appointment = await prisma.scheduleAppointment.findUniqueOrThrow({
    where: { id: appointmentId },
    include: { client: true },
  });

  if (!appointment.carId) {
    throw new Error("Для создания заказа укажите автомобиль в записи");
  }

  const { generateOrderNumber } = await import("@/shared/lib/utils");
  const orderNumber = await generateOrderNumber();

  const order = await prisma.order.create({
    data: {
      orderNumber,
      clientId: appointment.clientId,
      carId: appointment.carId,
      date: appointment.date,
      time: appointment.time,
      problem: appointment.problem,
      status: "PENDING",
    },
  });

  await prisma.scheduleAppointment.update({
    where: { id: appointmentId },
    data: { orderId: order.id, status: "CONFIRMED" },
  });

  return order;
}
