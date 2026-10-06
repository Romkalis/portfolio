"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/shared/lib/prisma";
import { expenseSchema, revenueSchema, salarySchema } from "@/shared/lib/validators";
import { parseDateOnly } from "@/shared/lib/utils";
import { assertRoleInDb, requireAdmin } from "@/shared/lib/auth-server";

export async function createRevenue(formData: FormData) {
  const session = await requireAdmin();
  if ("error" in session) return { error: session.error };
  if (!(await assertRoleInDb(session.user.id, "ADMIN"))) return { error: "Нет доступа" };

  const parsed = revenueSchema.safeParse({
    date: formData.get("date"),
    amount: Number(formData.get("amount")),
    comment: formData.get("comment") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  await prisma.revenue.upsert({
    where: { date: parseDateOnly(parsed.data.date) },
    create: {
      date: parseDateOnly(parsed.data.date),
      amount: parsed.data.amount,
      comment: parsed.data.comment,
    },
    update: { amount: parsed.data.amount, comment: parsed.data.comment },
  });

  revalidatePath("/admin/finances");
  revalidatePath("/admin/analytics");
  revalidatePath("/admin");
  return { success: true };
}

export async function createExpense(formData: FormData) {
  const session = await requireAdmin();
  if ("error" in session) return { error: session.error };
  if (!(await assertRoleInDb(session.user.id, "ADMIN"))) return { error: "Нет доступа" };

  const parsed = expenseSchema.safeParse({
    name: formData.get("name"),
    amount: Number(formData.get("amount")),
    date: formData.get("date"),
    category: formData.get("category"),
    comment: formData.get("comment") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  await prisma.expense.create({
    data: {
      name: parsed.data.name,
      amount: parsed.data.amount,
      date: parseDateOnly(parsed.data.date),
      category: parsed.data.category,
      comment: parsed.data.comment,
    },
  });

  revalidatePath("/admin/finances");
  revalidatePath("/admin/analytics");
  return { success: true };
}

export async function createSalary(formData: FormData) {
  const session = await requireAdmin();
  if ("error" in session) return { error: session.error };
  if (!(await assertRoleInDb(session.user.id, "ADMIN"))) return { error: "Нет доступа" };

  const parsed = salarySchema.safeParse({
    employeeId: formData.get("employeeId"),
    amount: Number(formData.get("amount")),
    date: formData.get("date"),
    comment: formData.get("comment") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const employee = await prisma.employeeProfile.findUnique({
    where: { id: parsed.data.employeeId },
  });
  if (!employee) return { error: "Сотрудник не найден" };

  await prisma.salary.create({
    data: {
      employeeId: parsed.data.employeeId,
      amount: parsed.data.amount,
      date: parseDateOnly(parsed.data.date),
      comment: parsed.data.comment,
    },
  });

  revalidatePath("/admin/finances");
  revalidatePath("/admin/analytics");
  return { success: true };
}
