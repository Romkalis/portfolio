"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { EmployeeEmploymentType, Role } from "@prisma/client";
import { BCRYPT_ROUNDS } from "@/auth";
import { assertRoleInDb, requireAdmin, requireEmployee } from "@/shared/lib/auth-server";
import { prisma } from "@/shared/lib/prisma";
import {
  adminCreateEmployeeSchema,
  adminUpdateEmployeeSchema,
  employeeProfileUpdateSchema,
} from "@/shared/lib/validators";
import { handleDbError } from "@/shared/lib/db-error";

export async function createEmployeeByAdmin(formData: FormData) {
  const session = await requireAdmin();
  if ("error" in session) return { error: session.error };
  if (!(await assertRoleInDb(session.user.id, "ADMIN"))) return { error: "Нет доступа" };

  const parsed = adminCreateEmployeeSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    phone: formData.get("phone") || undefined,
    position: formData.get("position") || "Мастер",
    hourlyRate: formData.get("hourlyRate") || undefined,
    employmentType: formData.get("employmentType") || EmployeeEmploymentType.PERMANENT,
  });

  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  let hourlyRate: number | undefined;
  const rateRaw = parsed.data.hourlyRate?.trim();
  if (rateRaw) {
    const n = Number(rateRaw);
    if (!Number.isFinite(n) || n <= 0) return { error: { hourlyRate: ["Укажите корректную ставку"] } };
    hourlyRate = Math.min(n, 999_999_999);
  }

  const email = parsed.data.email.toLowerCase().trim();
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return { error: { email: ["Пользователь с таким email уже есть"] } };

  try {
    const passwordHash = await bcrypt.hash(parsed.data.password, BCRYPT_ROUNDS);
    await prisma.user.create({
      data: {
        name: parsed.data.name.trim(),
        email,
        passwordHash,
        role: Role.EMPLOYEE,
        profile: {
          create: {
            phone: parsed.data.phone?.trim() || null,
            position: parsed.data.position,
            hourlyRate: hourlyRate ?? null,
            employmentType: parsed.data.employmentType ?? EmployeeEmploymentType.PERMANENT,
          },
        },
      },
    });
    revalidatePath("/admin/employees");
    revalidatePath("/admin/schedule");
    revalidatePath("/admin/shifts");
    return { success: true };
  } catch (e) {
    return handleDbError(e);
  }
}

export async function updateEmployeeByAdmin(formData: FormData) {
  const session = await requireAdmin();
  if ("error" in session) return { error: session.error };
  if (!(await assertRoleInDb(session.user.id, "ADMIN"))) return { error: "Нет доступа" };

  const parsed = adminUpdateEmployeeSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    position: formData.get("position"),
    hourlyRate: formData.get("hourlyRate") || undefined,
    employmentType: formData.get("employmentType"),
    password: formData.get("password") || "",
  });
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const profile = await prisma.employeeProfile.findUnique({
    where: { id: parsed.data.id },
    include: { user: true },
  });
  if (!profile) return { error: "Сотрудник не найден" };

  let hourlyRate: number | null = profile.hourlyRate ? Number(profile.hourlyRate) : null;
  const rateRaw = parsed.data.hourlyRate?.trim();
  if (rateRaw) {
    const n = Number(rateRaw);
    if (!Number.isFinite(n) || n <= 0) return { error: { hourlyRate: ["Укажите корректную ставку"] } };
    hourlyRate = Math.min(n, 999_999_999);
  } else if (rateRaw === "") {
    hourlyRate = null;
  }

  const email = parsed.data.email.toLowerCase().trim();
  if (email !== profile.user.email) {
    const taken = await prisma.user.findUnique({ where: { email } });
    if (taken) return { error: { email: ["Email уже занят"] } };
  }

  try {
    const userData: { name: string; email: string; passwordHash?: string } = {
      name: parsed.data.name.trim(),
      email,
    };
    if (parsed.data.password && parsed.data.password.length >= 8) {
      userData.passwordHash = await bcrypt.hash(parsed.data.password, BCRYPT_ROUNDS);
    }

    await prisma.user.update({
      where: { id: profile.userId },
      data: userData,
    });

    await prisma.employeeProfile.update({
      where: { id: parsed.data.id },
      data: {
        phone: parsed.data.phone?.trim() || null,
        position: parsed.data.position,
        hourlyRate,
        employmentType: parsed.data.employmentType,
      },
    });

    revalidatePath("/admin/employees");
    revalidatePath("/admin/schedule");
    revalidatePath("/admin/shifts");
    return { success: true };
  } catch (e) {
    return handleDbError(e);
  }
}

export async function deactivateEmployee(employeeId: string) {
  const session = await requireAdmin();
  if ("error" in session) return { error: session.error };
  if (!(await assertRoleInDb(session.user.id, "ADMIN"))) return { error: "Нет доступа" };

  const profile = await prisma.employeeProfile.findUnique({ where: { id: employeeId } });
  if (!profile) return { error: "Сотрудник не найден" };

  await prisma.employeeProfile.update({
    where: { id: employeeId },
    data: { isActive: false },
  });

  revalidatePath("/admin/employees");
  revalidatePath("/admin/shifts");
  return { success: true };
}

export async function updateOwnEmployeeProfile(formData: FormData) {
  const session = await requireEmployee();
  if ("error" in session) return { error: session.error };

  const parsed = employeeProfileUpdateSchema.safeParse({
    phone: formData.get("phone") || undefined,
    position: formData.get("position") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  await prisma.employeeProfile.update({
    where: { id: session.user.employeeProfileId },
    data: {
      ...(parsed.data.phone !== undefined && { phone: parsed.data.phone.trim() || null }),
      ...(parsed.data.position !== undefined && { position: parsed.data.position }),
    },
  });

  revalidatePath("/employee");
  return { success: true };
}
