"use server";

import { revalidatePath } from "next/cache";
import * as scheduleService from "@/services/schedule.service";
import { parseEntityId } from "@/shared/lib/entity-id";
import { guardAdminAction } from "@/shared/lib/require-auth";
import { appointmentSchema } from "@/shared/lib/validators";

export async function createAppointmentAction(formData: FormData) {
  return guardAdminAction(async () => {
    const parsed = appointmentSchema.safeParse({
      date: formData.get("date"),
      time: formData.get("time"),
      clientId: formData.get("clientId"),
      carId: formData.get("carId") || undefined,
      phone: formData.get("phone"),
      problem: formData.get("problem"),
      status: formData.get("status") || "PENDING",
    });
    if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };
    if (!parseEntityId(parsed.data.clientId)) return { error: "Некорректный клиент" };
    if (parsed.data.carId && !parseEntityId(parsed.data.carId)) {
      return { error: "Некорректный автомобиль" };
    }

    await scheduleService.createAppointment({
      date: new Date(parsed.data.date),
      time: parsed.data.time,
      clientId: parsed.data.clientId,
      carId: parsed.data.carId,
      phone: parsed.data.phone,
      problem: parsed.data.problem,
      status: parsed.data.status,
    });
    revalidatePath("/schedule");
    return { success: true };
  });
}

export async function updateAppointmentAction(id: string, formData: FormData) {
  return guardAdminAction(async () => {
    if (!parseEntityId(id)) return { error: "Некорректный id" };

    const parsed = appointmentSchema.safeParse({
      date: formData.get("date"),
      time: formData.get("time"),
      clientId: formData.get("clientId"),
      carId: formData.get("carId") || undefined,
      phone: formData.get("phone"),
      problem: formData.get("problem"),
      status: formData.get("status"),
    });
    if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };
    if (!parseEntityId(parsed.data.clientId)) return { error: "Некорректный клиент" };
    if (parsed.data.carId && !parseEntityId(parsed.data.carId)) {
      return { error: "Некорректный автомобиль" };
    }

    await scheduleService.updateAppointment(id, {
      date: new Date(parsed.data.date),
      time: parsed.data.time,
      client: { connect: { id: parsed.data.clientId } },
      car: parsed.data.carId
        ? { connect: { id: parsed.data.carId } }
        : { disconnect: true },
      phone: parsed.data.phone,
      problem: parsed.data.problem,
      status: parsed.data.status,
    });
    revalidatePath("/schedule");
    return { success: true };
  });
}

export async function toggleAppointmentCompletedAction(id: string, completed: boolean) {
  return guardAdminAction(async () => {
    if (!parseEntityId(id)) return { error: "Некорректный id" };

    await scheduleService.updateAppointment(id, { completed: Boolean(completed) });
    revalidatePath("/schedule");
    return { success: true };
  });
}

export async function deleteAppointmentAction(id: string) {
  return guardAdminAction(async () => {
    if (!parseEntityId(id)) return { error: "Некорректный id" };

    await scheduleService.deleteAppointment(id);
    revalidatePath("/schedule");
    return { success: true };
  });
}

export async function createOrderFromAppointmentAction(appointmentId: string) {
  return guardAdminAction(async () => {
    if (!parseEntityId(appointmentId)) return { error: "Некорректный id" };

    try {
      const order = await scheduleService.createOrderFromAppointment(appointmentId);
      revalidatePath("/schedule");
      revalidatePath("/orders");
      return { success: true, orderId: order.id };
    } catch (e) {
      const message = e instanceof Error ? e.message : "Ошибка создания заказа";
      return { error: message };
    }
  });
}
