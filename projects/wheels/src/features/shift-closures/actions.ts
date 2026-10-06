"use server";

import { revalidatePath } from "next/cache";
import { ShiftClosureStatus } from "@prisma/client";
import { assertRoleInDb, requireAdmin, requireEmployee, requireSession } from "@/shared/lib/auth-server";
import { shiftClosureAdminReviewSchema, shiftClosureSchema } from "@/shared/lib/validators";
import { prisma } from "@/shared/lib/prisma";
import { handleDbError } from "@/shared/lib/db-error";
import {
  applyClosureToStatistics,
  approveClosure,
  createEmployeeClosure,
  createShopClosureByAdmin,
  rejectClosure,
} from "@/services/shift-closure.service";
import { parseDateOnly } from "@/shared/lib/utils";

function revalidateClosurePaths() {
  revalidatePath("/admin/shift-closures");
  revalidatePath("/admin/finances");
  revalidatePath("/admin/analytics");
  revalidatePath("/admin");
  revalidatePath("/employee/shift-close");
}

function parseClosureForm(formData: FormData) {
  const expensesRaw = formData.get("expensesAmount");
  return shiftClosureSchema.safeParse({
    date: formData.get("date"),
    cashAmount: Number(formData.get("cashAmount")),
    salaryAmount: Number(formData.get("salaryAmount")),
    discopravAmount: Number(formData.get("discopravAmount") || 0),
    expensesAmount:
      expensesRaw === "" || expensesRaw == null ? undefined : Number(expensesRaw),
    expensesNote: formData.get("expensesNote") || undefined,
    comment: formData.get("comment") || undefined,
  });
}

/** Начальник закрывает день — сразу в статистику. */
export async function closeDayByAdmin(formData: FormData) {
  const session = await requireAdmin();
  if ("error" in session) return { error: session.error };
  if (!(await assertRoleInDb(session.user.id, "ADMIN"))) return { error: "Нет доступа" };

  const parsed = parseClosureForm(formData);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  try {
    await createShopClosureByAdmin(session.user.id, parsed.data);
    revalidateClosurePaths();
    return { success: true };
  } catch (e) {
    return handleDbError(e);
  }
}

/** Сотрудник отправляет закрытие смены на проверку. */
export async function submitShiftClosureByEmployee(formData: FormData) {
  const session = await requireEmployee();
  if ("error" in session) return { error: session.error };

  const parsed = parseClosureForm(formData);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  try {
    const result = await createEmployeeClosure(
      session.user.id,
      session.user.employeeProfileId!,
      parsed.data,
    );
    if ("error" in result) return { error: result.error };
    revalidateClosurePaths();
    return { success: true };
  } catch (e) {
    return handleDbError(e);
  }
}

/** Сотрудник редактирует своё ожидающее закрытие. */
export async function updateOwnPendingClosure(formData: FormData) {
  const session = await requireEmployee();
  if ("error" in session) return { error: session.error };

  const id = formData.get("id") as string;
  const parsed = parseClosureForm(formData);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const existing = await prisma.shiftClosure.findFirst({
    where: {
      id,
      employeeId: session.user.employeeProfileId,
      status: ShiftClosureStatus.PENDING,
    },
  });
  if (!existing) return { error: "Нельзя редактировать эту запись" };

  try {
    await prisma.shiftClosure.update({
      where: { id },
      data: {
        date: parseDateOnly(parsed.data.date),
        cashAmount: parsed.data.cashAmount,
        salaryAmount: parsed.data.salaryAmount,
        discopravAmount: parsed.data.discopravAmount,
        expensesAmount: parsed.data.expensesAmount ?? null,
        expensesNote: parsed.data.expensesNote ?? null,
        comment: parsed.data.comment ?? null,
      },
    });
    revalidateClosurePaths();
    return { success: true };
  } catch (e) {
    return handleDbError(e);
  }
}

/** Начальник подтверждает с корректировкой. */
export async function approveShiftClosure(formData: FormData) {
  const session = await requireAdmin();
  if ("error" in session) return { error: session.error };
  if (!(await assertRoleInDb(session.user.id, "ADMIN"))) return { error: "Нет доступа" };

  const parsed = shiftClosureAdminReviewSchema.safeParse({
    id: formData.get("id"),
    date: formData.get("date"),
    cashAmount: Number(formData.get("cashAmount")),
    salaryAmount: Number(formData.get("salaryAmount")),
    discopravAmount: Number(formData.get("discopravAmount") || 0),
    expensesAmount:
      formData.get("expensesAmount") === "" || formData.get("expensesAmount") == null
        ? undefined
        : Number(formData.get("expensesAmount")),
    expensesNote: formData.get("expensesNote") || undefined,
    comment: formData.get("comment") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  try {
    const { id, ...data } = parsed.data;
    const result = await approveClosure(session.user.id, id, data);
    if ("error" in result) return { error: result.error };
    revalidateClosurePaths();
    return { success: true };
  } catch (e) {
    return handleDbError(e);
  }
}

export async function rejectShiftClosure(id: string) {
  const session = await requireAdmin();
  if ("error" in session) return { error: session.error };

  try {
    const result = await rejectClosure(session.user.id, id);
    if ("error" in result) return { error: result.error };
    revalidateClosurePaths();
    return { success: true };
  } catch (e) {
    return handleDbError(e);
  }
}

/** Начальник редактирует своё закрытие дня (уже в статистике — обновляет запись и финансы). */
export async function updateShopClosureByAdmin(formData: FormData) {
  const session = await requireAdmin();
  if ("error" in session) return { error: session.error };

  const id = formData.get("id") as string;
  const parsed = parseClosureForm(formData);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const existing = await prisma.shiftClosure.findFirst({
    where: { id, scopeKey: "shop", submittedByRole: "ADMIN" },
  });
  if (!existing) return { error: "Запись не найдена" };

  try {
    const date = parseDateOnly(parsed.data.date);
    await prisma.$transaction(async (tx) => {
      await tx.shiftClosure.update({
        where: { id },
        data: {
          date,
          cashAmount: parsed.data.cashAmount,
          salaryAmount: parsed.data.salaryAmount,
          discopravAmount: parsed.data.discopravAmount,
          expensesAmount: parsed.data.expensesAmount ?? null,
          expensesNote: parsed.data.expensesNote ?? null,
          comment: parsed.data.comment ?? null,
        },
      });
      await applyClosureToStatistics(tx, {
        date,
        employeeId: null,
        cashAmount: parsed.data.cashAmount,
        salaryAmount: parsed.data.salaryAmount,
        discopravAmount: parsed.data.discopravAmount,
        expensesAmount: parsed.data.expensesAmount ?? null,
        expensesNote: parsed.data.expensesNote ?? null,
        comment: parsed.data.comment ?? null,
      });
    });
    revalidateClosurePaths();
    return { success: true };
  } catch (e) {
    return handleDbError(e);
  }
}
