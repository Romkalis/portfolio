import {
  ExpenseCategory,
  Role,
  ShiftClosureStatus,
  ShiftStatus,
  type Prisma,
} from "@prisma/client";
import { prisma } from "@/shared/lib/prisma";
import { parseDateOnly } from "@/shared/lib/utils";

export const SHOP_CLOSURE_SCOPE = "shop";

export type ShiftClosureInput = {
  date: string;
  cashAmount: number;
  salaryAmount: number;
  discopravAmount: number;
  expensesAmount?: number;
  expensesNote?: string;
  comment?: string;
};

export async function employeeHadShiftOnDate(employeeId: string, date: Date) {
  const shift = await prisma.shift.findFirst({
    where: {
      employeeId,
      date,
      status: ShiftStatus.CONFIRMED,
    },
  });
  return !!shift;
}

/** Запись закрытия в Revenue / Salary / Expense для статистики. */
export async function applyClosureToStatistics(
  tx: Prisma.TransactionClient,
  closure: {
    date: Date;
    employeeId: string | null;
    cashAmount: Prisma.Decimal | number;
    salaryAmount: Prisma.Decimal | number;
    discopravAmount: Prisma.Decimal | number;
    expensesAmount: Prisma.Decimal | number | null;
    expensesNote: string | null;
    comment: string | null;
  },
) {
  const cash = Number(closure.cashAmount);
  const salary = Number(closure.salaryAmount);
  const discoprav = Number(closure.discopravAmount);
  const expenses = closure.expensesAmount != null ? Number(closure.expensesAmount) : 0;

  await tx.revenue.upsert({
    where: { date: closure.date },
    create: {
      date: closure.date,
      amount: cash,
      comment: closure.comment ?? "Закрытие смены",
    },
    update: { amount: cash, comment: closure.comment ?? "Закрытие смены" },
  });

  if (closure.employeeId && salary > 0) {
    await tx.salary.create({
      data: {
        employeeId: closure.employeeId,
        amount: salary,
        date: closure.date,
        comment: "Закрытие смены",
      },
    });
  } else if (salary > 0) {
    await tx.expense.create({
      data: {
        name: "Зарплаты за смену",
        amount: salary,
        date: closure.date,
        category: ExpenseCategory.OTHER,
        comment: "Закрытие смены (начальник)",
      },
    });
  }

  if (discoprav > 0) {
    await tx.expense.create({
      data: {
        name: "Дископрав",
        amount: discoprav,
        date: closure.date,
        category: ExpenseCategory.WHEEL_BALANCER,
      },
    });
  }

  if (expenses > 0) {
    await tx.expense.create({
      data: {
        name: closure.expensesNote?.trim() || "Расходы смены",
        amount: expenses,
        date: closure.date,
        category: ExpenseCategory.OTHER,
        comment: closure.expensesNote,
      },
    });
  }
}

export async function createShopClosureByAdmin(
  userId: string,
  data: ShiftClosureInput,
) {
  const date = parseDateOnly(data.date);

  return prisma.$transaction(async (tx) => {
    const closure = await tx.shiftClosure.create({
      data: {
        date,
        scopeKey: SHOP_CLOSURE_SCOPE,
        submittedByUserId: userId,
        submittedByRole: Role.ADMIN,
        cashAmount: data.cashAmount,
        salaryAmount: data.salaryAmount,
        discopravAmount: data.discopravAmount,
        expensesAmount: data.expensesAmount ?? null,
        expensesNote: data.expensesNote ?? null,
        comment: data.comment ?? null,
        status: ShiftClosureStatus.APPROVED,
        reviewedByUserId: userId,
        reviewedAt: new Date(),
      },
    });

    await applyClosureToStatistics(tx, {
      date,
      employeeId: null,
      cashAmount: data.cashAmount,
      salaryAmount: data.salaryAmount,
      discopravAmount: data.discopravAmount,
      expensesAmount: data.expensesAmount ?? null,
      expensesNote: data.expensesNote ?? null,
      comment: data.comment ?? null,
    });

    return closure;
  });
}

export async function createEmployeeClosure(
  userId: string,
  employeeId: string,
  data: ShiftClosureInput,
) {
  const date = parseDateOnly(data.date);
  const onShift = await employeeHadShiftOnDate(employeeId, date);
  if (!onShift) {
    return { error: "Нет подтверждённой смены на эту дату" as const };
  }

  const existing = await prisma.shiftClosure.findUnique({
    where: { date_scopeKey: { date, scopeKey: employeeId } },
  });
  if (existing) {
    return { error: "Закрытие на эту дату уже отправлено" as const };
  }

  const closure = await prisma.shiftClosure.create({
    data: {
      date,
      scopeKey: employeeId,
      employeeId,
      submittedByUserId: userId,
      submittedByRole: Role.EMPLOYEE,
      cashAmount: data.cashAmount,
      salaryAmount: data.salaryAmount,
      discopravAmount: data.discopravAmount,
      expensesAmount: data.expensesAmount ?? null,
      expensesNote: data.expensesNote ?? null,
      comment: data.comment ?? null,
      status: ShiftClosureStatus.PENDING,
    },
  });

  return { closure };
}

export async function approveClosure(
  reviewerId: string,
  id: string,
  data: ShiftClosureInput,
) {
  const existing = await prisma.shiftClosure.findUnique({ where: { id } });
  if (!existing) return { error: "Закрытие не найдено" as const };
  if (existing.status !== ShiftClosureStatus.PENDING) {
    return { error: "Уже обработано" as const };
  }

  const date = parseDateOnly(data.date);

  return prisma.$transaction(async (tx) => {
    const closure = await tx.shiftClosure.update({
      where: { id },
      data: {
        date,
        cashAmount: data.cashAmount,
        salaryAmount: data.salaryAmount,
        discopravAmount: data.discopravAmount,
        expensesAmount: data.expensesAmount ?? null,
        expensesNote: data.expensesNote ?? null,
        comment: data.comment ?? null,
        status: ShiftClosureStatus.APPROVED,
        reviewedByUserId: reviewerId,
        reviewedAt: new Date(),
      },
    });

    await applyClosureToStatistics(tx, {
      date,
      employeeId: closure.employeeId,
      cashAmount: data.cashAmount,
      salaryAmount: data.salaryAmount,
      discopravAmount: data.discopravAmount,
      expensesAmount: data.expensesAmount ?? null,
      expensesNote: data.expensesNote ?? null,
      comment: data.comment ?? null,
    });

    return { closure };
  });
}

export async function rejectClosure(reviewerId: string, id: string) {
  const existing = await prisma.shiftClosure.findUnique({ where: { id } });
  if (!existing) return { error: "Закрытие не найдено" as const };
  if (existing.status !== ShiftClosureStatus.PENDING) {
    return { error: "Уже обработано" as const };
  }

  await prisma.shiftClosure.update({
    where: { id },
    data: {
      status: ShiftClosureStatus.REJECTED,
      reviewedByUserId: reviewerId,
      reviewedAt: new Date(),
    },
  });

  return { success: true as const };
}
