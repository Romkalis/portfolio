"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/shared/lib/prisma";
import {
  assignShiftDaySchema,
  shiftRequestSchema,
  shiftRequestsBatchSchema,
  shiftSchema,
  shiftStatusActionSchema,
  updateBlockTimesSchema,
} from "@/shared/lib/validators";
import { getSelectableAvailabilityYmdSet } from "@/shared/lib/availability-window";
import {
  getDefaultShiftTimes,
  getShopSettings,
} from "@/services/shop-settings.service";
import { formatDateOnly, parseDateOnly } from "@/shared/lib/utils";
import {
  assertRoleInDb,
  requireAdmin,
  requireEmployee,
} from "@/shared/lib/auth-server";
import { ShiftStatus } from "@prisma/client";
import { z } from "zod";

function revalidateSchedulePaths() {
  revalidatePath("/");
  revalidatePath("/admin/schedule");
  revalidatePath("/employee/schedule");
  revalidatePath("/admin/shifts");
  revalidatePath("/employee/requests");
}

async function assertTimesWithinShop(startTime: string, endTime: string) {
  const shop = await getShopSettings();
  if (startTime < shop.defaultStartTime || endTime > shop.defaultEndTime) {
    return {
      error: `Время должно быть в пределах ${shop.defaultStartTime}–${shop.defaultEndTime}`,
    } as const;
  }
  return null;
}

export async function createShiftRequest(formData: FormData) {
  const session = await requireEmployee();
  if ("error" in session) return { error: session.error };

  const parsed = shiftRequestSchema.safeParse({
    date: formData.get("date"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    comment: formData.get("comment") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  await prisma.shiftRequest.create({
    data: {
      employeeId: session.user.employeeProfileId!,
      date: parseDateOnly(parsed.data.date),
      startTime: parsed.data.startTime,
      endTime: parsed.data.endTime,
      comment: parsed.data.comment,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/schedule");
  revalidatePath("/employee/schedule");
  revalidatePath("/employee/requests");
  revalidatePath("/admin/schedule");
  revalidatePath("/admin/shifts");
  return { success: true };
}

function allowedAvailabilityYmdSet(): Set<string> {
  return getSelectableAvailabilityYmdSet();
}

/** Заявка на несколько дней из календаря доступности. */
export async function createShiftRequestsBatch(
  dates: string[],
  startTime: string,
  endTime: string,
  comment?: string,
) {
  const session = await requireEmployee();
  if ("error" in session) return { error: session.error };

  const parsed = shiftRequestsBatchSchema.safeParse({
    dates,
    startTime,
    endTime,
    comment,
  });
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const shop = await getShopSettings();
  if (
    parsed.data.startTime < shop.defaultStartTime ||
    parsed.data.endTime > shop.defaultEndTime ||
    parsed.data.endTime <= parsed.data.startTime
  ) {
    return {
      error: `Укажите время в пределах режима точки (${shop.defaultStartTime}–${shop.defaultEndTime})`,
    };
  }

  const allowed = allowedAvailabilityYmdSet();
  const uniqueDates = [...new Set(parsed.data.dates)];
  const invalid = uniqueDates.filter((d) => !allowed.has(d));
  if (invalid.length > 0) {
    return { error: "Выбраны дни вне доступного периода" };
  }

  const employeeId = session.user.employeeProfileId!;
  const [existingRequests, existingShifts] = await Promise.all([
    prisma.shiftRequest.findMany({
      where: {
        employeeId,
        status: { in: [ShiftStatus.PENDING, ShiftStatus.CONFIRMED] },
      },
      select: { date: true },
    }),
    prisma.shift.findMany({
      where: { employeeId },
      select: { date: true },
    }),
  ]);
  const blocked = new Set([
    ...existingRequests.map((r) => formatDateOnly(r.date)),
    ...existingShifts.map((s) => formatDateOnly(s.date)),
  ]);
  const toCreate = uniqueDates.filter((d) => !blocked.has(d));
  if (toCreate.length === 0) {
    return { error: "На выбранные дни уже есть активные заявки" };
  }

  await prisma.shiftRequest.createMany({
    data: toCreate.map((dateStr) => ({
      employeeId,
      date: parseDateOnly(dateStr),
      startTime: parsed.data.startTime,
      endTime: parsed.data.endTime,
      comment: parsed.data.comment,
      status: ShiftStatus.PENDING,
    })),
  });

  revalidatePath("/");
  revalidatePath("/admin/schedule");
  revalidatePath("/employee/schedule");
  revalidatePath("/employee/requests");
  revalidatePath("/admin/schedule");
  revalidatePath("/admin/shifts");
  return { success: true, created: toCreate.length, skipped: uniqueDates.length - toCreate.length };
}

export async function updateShiftRequestStatus(id: string, status: ShiftStatus) {
  const session = await requireAdmin();
  if ("error" in session) return { error: session.error };

  const parsed = shiftStatusActionSchema.safeParse({ id, status });
  if (!parsed.success) return { error: "Некорректные данные" };

  if (!(await assertRoleInDb(session.user.id, "ADMIN"))) {
    return { error: "Нет доступа" };
  }

  const request = await prisma.shiftRequest.findUnique({ where: { id: parsed.data.id } });
  if (!request) return { error: "Заявка не найдена" };

  await prisma.shiftRequest.update({
    where: { id: parsed.data.id },
    data: { status: parsed.data.status },
  });

  if (parsed.data.status === ShiftStatus.CONFIRMED) {
    const existingShift = await prisma.shift.findFirst({
      where: { employeeId: request.employeeId, date: request.date },
    });
    if (existingShift) {
      await prisma.shift.update({
        where: { id: existingShift.id },
        data: {
          startTime: request.startTime,
          endTime: request.endTime,
          status: ShiftStatus.CONFIRMED,
        },
      });
    } else {
      await prisma.shift.create({
        data: {
          employeeId: request.employeeId,
          date: request.date,
          startTime: request.startTime,
          endTime: request.endTime,
          comment: request.comment,
          status: ShiftStatus.CONFIRMED,
          createdBy: session.user.id,
        },
      });
    }
  }

  revalidateSchedulePaths();
  return { success: true };
}

/** Изменить время смены или заявки (админ). */
export async function updateScheduleBlockTimes(
  source: "shift" | "request",
  id: string,
  startTime: string,
  endTime: string,
) {
  const session = await requireAdmin();
  if ("error" in session) return { error: session.error };

  if (!(await assertRoleInDb(session.user.id, "ADMIN"))) {
    return { error: "Нет доступа" };
  }

  const parsed = updateBlockTimesSchema.safeParse({ source, id, startTime, endTime });
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const shopErr = await assertTimesWithinShop(parsed.data.startTime, parsed.data.endTime);
  if (shopErr) return shopErr;

  if (parsed.data.source === "shift") {
    const shift = await prisma.shift.findUnique({ where: { id: parsed.data.id } });
    if (!shift) return { error: "Смена не найдена" };
    await prisma.shift.update({
      where: { id: parsed.data.id },
      data: {
        startTime: parsed.data.startTime,
        endTime: parsed.data.endTime,
      },
    });
  } else {
    const req = await prisma.shiftRequest.findUnique({ where: { id: parsed.data.id } });
    if (!req) return { error: "Заявка не найдена" };
    if (req.status !== ShiftStatus.PENDING) {
      return { error: "Можно менять время только у ожидающих заявок" };
    }
    const onShift = await prisma.shift.findFirst({
      where: { employeeId: req.employeeId, date: req.date },
    });
    if (onShift) {
      return { error: "Сотрудник уже на смене — меняйте время смены, а не заявки" };
    }
    await prisma.shiftRequest.update({
      where: { id: parsed.data.id },
      data: {
        startTime: parsed.data.startTime,
        endTime: parsed.data.endTime,
      },
    });
  }

  revalidateSchedulePaths();
  return { success: true };
}

export async function upsertShift(formData: FormData) {
  const session = await requireAdmin();
  if ("error" in session) return { error: session.error };

  if (!(await assertRoleInDb(session.user.id, "ADMIN"))) {
    return { error: "Нет доступа" };
  }

  const id = formData.get("id") as string | null;
  const parsed = shiftSchema.safeParse({
    employeeId: formData.get("employeeId"),
    date: formData.get("date"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    comment: formData.get("comment") || undefined,
    status: formData.get("status") || ShiftStatus.CONFIRMED,
  });
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const employee = await prisma.employeeProfile.findUnique({
    where: { id: parsed.data.employeeId },
  });
  if (!employee) return { error: "Сотрудник не найден" };

  const data = {
    employeeId: parsed.data.employeeId,
    date: parseDateOnly(parsed.data.date),
    startTime: parsed.data.startTime,
    endTime: parsed.data.endTime,
    comment: parsed.data.comment,
    status: parsed.data.status ?? ShiftStatus.CONFIRMED,
    createdBy: session.user.id,
  };

  if (id) {
    const existing = await prisma.shift.findUnique({ where: { id } });
    if (!existing) return { error: "Смена не найдена" };
    await prisma.shift.update({ where: { id }, data });
  } else {
    await prisma.shift.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/admin/schedule");
  revalidatePath("/employee/schedule");
  revalidatePath("/admin/schedule");
  revalidatePath("/admin/shifts");
  return { success: true };
}

/** Назначить сотрудника на день (несколько человек в один день — отдельные смены). */
export async function assignEmployeeToDay(employeeId: string, date: string) {
  const session = await requireAdmin();
  if ("error" in session) return { error: session.error };

  if (!(await assertRoleInDb(session.user.id, "ADMIN"))) {
    return { error: "Нет доступа" };
  }

  const parsed = assignShiftDaySchema.safeParse({ employeeId, date });
  if (!parsed.success) return { error: "Некорректные данные" };

  const employee = await prisma.employeeProfile.findUnique({
    where: { id: parsed.data.employeeId },
  });
  if (!employee) return { error: "Сотрудник не найден" };

  const shiftDate = parseDateOnly(parsed.data.date);

  const duplicate = await prisma.shift.findFirst({
    where: {
      employeeId: parsed.data.employeeId,
      date: shiftDate,
    },
  });
  if (duplicate) {
    return { error: "Этот сотрудник уже назначен на выбранный день" };
  }

  const { startTime, endTime } = await getDefaultShiftTimes();

  await prisma.$transaction([
    prisma.shift.create({
      data: {
        employeeId: parsed.data.employeeId,
        date: shiftDate,
        startTime,
        endTime,
        status: ShiftStatus.CONFIRMED,
        createdBy: session.user.id,
      },
    }),
    prisma.shiftRequest.updateMany({
      where: {
        employeeId: parsed.data.employeeId,
        date: shiftDate,
        status: ShiftStatus.PENDING,
      },
      data: { status: ShiftStatus.REJECTED },
    }),
  ]);

  revalidateSchedulePaths();
  return { success: true };
}

export async function deleteShift(id: string) {
  const session = await requireAdmin();
  if ("error" in session) return { error: session.error };

  if (!(await assertRoleInDb(session.user.id, "ADMIN"))) {
    return { error: "Нет доступа" };
  }

  const idParsed = z.string().cuid().safeParse(id);
  if (!idParsed.success) return { error: "Некорректный id" };

  const existing = await prisma.shift.findUnique({ where: { id: idParsed.data } });
  if (!existing) return { error: "Смена не найдена" };

  await prisma.shift.delete({ where: { id: idParsed.data } });
  revalidatePath("/");
  revalidatePath("/admin/schedule");
  revalidatePath("/employee/schedule");
  revalidatePath("/admin/schedule");
  revalidatePath("/admin/shifts");
  return { success: true };
}
