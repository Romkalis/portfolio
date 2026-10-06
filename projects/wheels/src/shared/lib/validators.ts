import { z } from "zod";
import { ExpenseCategory, ShiftStatus } from "@prisma/client";
import { employmentTypeSchema } from "./employment";
import { LIMITS } from "./security";

const optionalComment = z.string().max(LIMITS.comment).optional();
const money = z
  .number()
  .positive("Сумма должна быть больше 0")
  .max(LIMITS.moneyMax, "Слишком большая сумма");

export const loginSchema = z.object({
  email: z.string().email("Введите корректный email").max(LIMITS.email),
  password: z.string().min(LIMITS.passwordMin).max(LIMITS.passwordMax),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Укажите имя").max(LIMITS.name),
    email: z.string().email("Введите корректный email").max(LIMITS.email),
    password: z
      .string()
      .min(LIMITS.passwordMin, `Минимум ${LIMITS.passwordMin} символов`)
      .max(LIMITS.passwordMax),
    confirmPassword: z.string().max(LIMITS.passwordMax),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

/** Создание сотрудника администратором (email = логин). */
const nonNegativeMoney = z
  .number()
  .min(0, "Сумма не может быть отрицательной")
  .max(LIMITS.moneyMax, "Слишком большая сумма");

export const adminCreateEmployeeSchema = z.object({
  name: z.string().min(2, "Укажите имя").max(LIMITS.name),
  email: z.string().email("Введите корректный email").max(LIMITS.email),
  password: z
    .string()
    .min(LIMITS.passwordMin, `Минимум ${LIMITS.passwordMin} символов`)
    .max(LIMITS.passwordMax),
  phone: z.string().max(20).optional(),
  position: z.string().min(1, "Укажите должность").max(80),
  hourlyRate: z.string().optional(),
  employmentType: employmentTypeSchema.optional(),
});

export const adminUpdateEmployeeSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(2).max(LIMITS.name),
  email: z.string().email().max(LIMITS.email),
  phone: z.string().max(20).optional(),
  position: z.string().min(1).max(80),
  hourlyRate: z.string().optional(),
  employmentType: employmentTypeSchema,
  password: z.string().min(LIMITS.passwordMin).max(LIMITS.passwordMax).optional().or(z.literal("")),
});

export const employeeProfileUpdateSchema = z.object({
  phone: z.string().max(20).optional(),
  position: z.string().min(1).max(80).optional(),
});

export const shiftClosureSchema = z.object({
  date: z.string().min(1).max(10),
  cashAmount: nonNegativeMoney,
  salaryAmount: nonNegativeMoney,
  discopravAmount: nonNegativeMoney,
  expensesAmount: nonNegativeMoney.optional(),
  expensesNote: z.string().max(LIMITS.comment).optional(),
  comment: optionalComment,
});

export const shiftClosureAdminReviewSchema = shiftClosureSchema.extend({
  id: z.string().cuid(),
});

export const assignShiftDaySchema = z.object({
  employeeId: z.string().cuid("Некорректный сотрудник"),
  date: z.string().min(1, "Укажите дату").max(10),
});

const shiftTimeSchema = z.object({
  date: z.string().min(1, "Укажите дату").max(10),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Формат ЧЧ:ММ"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Формат ЧЧ:ММ"),
  comment: optionalComment,
});

export const shiftRequestSchema = shiftTimeSchema.refine(
  (d) => d.endTime > d.startTime,
  { message: "Время окончания должно быть позже начала", path: ["endTime"] },
);

export const shiftRequestsBatchSchema = z
  .object({
    dates: z
      .array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/))
      .min(1, "Выберите хотя бы один день")
      .max(30, "Не более 30 дней за раз"),
    startTime: z.string().regex(/^\d{2}:\d{2}$/),
    endTime: z.string().regex(/^\d{2}:\d{2}$/),
    comment: optionalComment,
  })
  .refine((d) => d.endTime > d.startTime, {
    message: "Конец должен быть позже начала",
    path: ["endTime"],
  });

export const shiftSchema = shiftTimeSchema.extend({
  employeeId: z.string().cuid("Некорректный сотрудник"),
  status: z.nativeEnum(ShiftStatus).optional(),
});

export const shiftStatusActionSchema = z.object({
  id: z.string().cuid(),
  status: z.enum([ShiftStatus.CONFIRMED, ShiftStatus.REJECTED]),
});

export const updateBlockTimesSchema = z
  .object({
    source: z.enum(["shift", "request"]),
    id: z.string().cuid(),
    startTime: z.string().regex(/^\d{2}:\d{2}$/),
    endTime: z.string().regex(/^\d{2}:\d{2}$/),
  })
  .refine((d) => d.endTime > d.startTime, {
    message: "Конец должен быть позже начала",
    path: ["endTime"],
  });

export const revenueSchema = z.object({
  date: z.string().min(1).max(10),
  amount: money,
  comment: optionalComment,
});

export const expenseSchema = z.object({
  name: z.string().min(1, "Укажите название").max(LIMITS.expenseName),
  amount: money,
  date: z.string().min(1).max(10),
  category: z.nativeEnum(ExpenseCategory),
  comment: optionalComment,
});

export const salarySchema = z.object({
  employeeId: z.string().cuid("Некорректный сотрудник"),
  amount: money,
  date: z.string().min(1).max(10),
  comment: optionalComment,
});

export const periodSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
});
