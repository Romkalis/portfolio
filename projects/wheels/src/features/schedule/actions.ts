"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/shared/lib/auth-server";
import {
  getShopSettings,
  syncEmployeeSchedulesFromShop,
} from "@/services/shop-settings.service";
import { prisma } from "@/shared/lib/prisma";

const shopHoursSchema = z
  .object({
    defaultStartTime: z.string().regex(/^\d{2}:\d{2}$/),
    defaultEndTime: z.string().regex(/^\d{2}:\d{2}$/),
  })
  .refine((d) => d.defaultEndTime > d.defaultStartTime, {
    message: "Конец должен быть позже начала",
    path: ["defaultEndTime"],
  });

export async function updateShopHours(formData: FormData) {
  const session = await requireAdmin();
  if ("error" in session) return { error: session.error };

  const parsed = shopHoursSchema.safeParse({
    defaultStartTime: formData.get("defaultStartTime"),
    defaultEndTime: formData.get("defaultEndTime"),
  });
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  await prisma.shopSettings.upsert({
    where: { id: "default" },
    create: { id: "default", ...parsed.data },
    update: parsed.data,
  });

  await syncEmployeeSchedulesFromShop(
    parsed.data.defaultStartTime,
    parsed.data.defaultEndTime,
  );

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/schedule");
  revalidatePath("/admin/schedule");
  revalidatePath("/admin/shifts");
  revalidatePath("/employee/schedule");
  return { success: true };
}

export async function getShopHoursForClient() {
  const s = await getShopSettings();
  return {
    defaultStartTime: s.defaultStartTime,
    defaultEndTime: s.defaultEndTime,
  };
}
