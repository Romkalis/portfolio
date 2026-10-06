import { z } from "zod";

const shortText = z.string().min(1).max(200);
const mediumText = z.string().min(1).max(2000);
const optionalMediumText = z.string().max(2000).optional();
const phone = z.string().min(5).max(30);
const timeSlot = z.string().min(1).max(10);
const dateString = z.string().min(1).max(32);

export const loginSchema = z.object({
  login: z.string().min(1).max(64),
  password: z.string().min(1).max(128),
});

export const ownerSchema = z.object({
  lastName: shortText,
  firstName: shortText,
  middleName: z.string().max(200).optional(),
  phone,
  notes: optionalMediumText,
});

export const carSchema = z.object({
  ownerId: z.string().min(1).max(30),
  brand: shortText,
  model: shortText,
  year: z.coerce.number().int().min(1980).max(new Date().getFullYear() + 1),
  vin: z.string().min(11).max(17),
  mileage: z.coerce.number().int().min(0).max(9_999_999),
  oil: z.string().max(200).optional(),
  oilFilter: z.string().max(200).optional(),
  airFilter: z.string().max(200).optional(),
  fuelFilter: z.string().max(200).optional(),
  cabinFilter: z.string().max(200).optional(),
});

export const repairSchema = z.object({
  carId: z.string().min(1).max(30),
  repairDate: dateString,
  mileage: z.coerce.number().int().min(0).max(9_999_999),
  workDone: mediumText,
  partsList: mediumText,
  recommendations: optionalMediumText,
  nextServiceDate: dateString.optional(),
});

/** Создание заказа — только PENDING (без обхода completeOrder). */
export const orderCreateSchema = z.object({
  clientId: z.string().min(1).max(30),
  carId: z.string().min(1).max(30),
  date: dateString,
  time: timeSlot,
  problem: mediumText,
  comment: optionalMediumText,
});

/** Смена статуса из UI — нельзя выставить COMPLETED без сумм. */
export const orderStatusUpdateSchema = z.object({
  status: z.enum(["PENDING", "IN_PROGRESS"]),
});

export const completeOrderSchema = z.object({
  orderId: z.string().min(1).max(30),
  totalAmount: z.coerce
    .number()
    .positive("Сумма должна быть больше 0")
    .max(99_999_999.99),
  earnings: z.coerce
    .number()
    .positive("Заработок должен быть больше 0")
    .max(99_999_999.99),
});

export const appointmentSchema = z.object({
  date: dateString,
  time: timeSlot,
  clientId: z.string().min(1).max(30),
  carId: z.string().max(30).optional(),
  phone,
  problem: mediumText,
  status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]).optional(),
});

export const earningsFilterSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  clientId: z.string().optional(),
  carId: z.string().optional(),
});
