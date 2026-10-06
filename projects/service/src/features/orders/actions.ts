"use server";

import { revalidatePath } from "next/cache";
import * as orderService from "@/services/order.service";
import { parseEntityId } from "@/shared/lib/entity-id";
import { guardAdminAction } from "@/shared/lib/require-auth";
import {
  completeOrderSchema,
  orderCreateSchema,
  orderStatusUpdateSchema,
} from "@/shared/lib/validators";

export async function createOrderAction(formData: FormData) {
  return guardAdminAction(async () => {
    const parsed = orderCreateSchema.safeParse({
      clientId: formData.get("clientId"),
      carId: formData.get("carId"),
      date: formData.get("date"),
      time: formData.get("time"),
      problem: formData.get("problem"),
      comment: formData.get("comment") || undefined,
    });
    if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };
    if (!parseEntityId(parsed.data.clientId) || !parseEntityId(parsed.data.carId)) {
      return { error: "Некорректный клиент или автомобиль" };
    }

    await orderService.createOrder({
      clientId: parsed.data.clientId,
      carId: parsed.data.carId,
      date: new Date(parsed.data.date),
      time: parsed.data.time,
      problem: parsed.data.problem,
      comment: parsed.data.comment,
      status: "PENDING",
    });
    revalidatePath("/orders");
    revalidatePath("/schedule");
    return { success: true };
  });
}

export async function updateOrderStatusAction(id: string, status: string) {
  return guardAdminAction(async () => {
    if (!parseEntityId(id)) return { error: "Некорректный id" };

    const parsed = orderStatusUpdateSchema.safeParse({ status });
    if (!parsed.success) return { error: "Недопустимый статус" };

    await orderService.updateOrder(id, { status: parsed.data.status });
    revalidatePath("/orders");
    return { success: true };
  });
}

export async function completeOrderAction(formData: FormData) {
  return guardAdminAction(async () => {
    const parsed = completeOrderSchema.safeParse({
      orderId: formData.get("orderId"),
      totalAmount: formData.get("totalAmount"),
      earnings: formData.get("earnings"),
    });
    if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };
    if (!parseEntityId(parsed.data.orderId)) return { error: "Некорректный заказ" };

    await orderService.completeOrder(
      parsed.data.orderId,
      parsed.data.totalAmount,
      parsed.data.earnings,
    );
    revalidatePath("/orders");
    revalidatePath("/earnings");
    return { success: true };
  });
}
