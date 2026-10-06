"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/shared/lib/prisma";
import { registerSchema } from "@/shared/lib/validators";
import { Role } from "@prisma/client";
import { BCRYPT_ROUNDS } from "@/auth";
import {
  isRegistrationAllowed,
  rateLimitAction,
} from "@/shared/lib/auth-server";
import { handleDbError } from "@/shared/lib/db-error";

export async function registerUser(formData: FormData) {
  if (!isRegistrationAllowed()) {
    return { error: { _form: ["Регистрация отключена администратором"] } };
  }

  const limited = await rateLimitAction("register", 5);
  if (limited.error) return { error: { _form: [limited.error] } };

  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const email = parsed.data.email.toLowerCase().trim();

  try {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return { error: { email: ["Не удалось завершить регистрацию"] } };
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, BCRYPT_ROUNDS);
    await prisma.user.create({
      data: {
        name: parsed.data.name.trim(),
        email,
        passwordHash,
        role: Role.EMPLOYEE,
        profile: { create: { position: "Мастер" } },
      },
    });

    return { success: true };
  } catch (e) {
    return handleDbError(e);
  }
}
