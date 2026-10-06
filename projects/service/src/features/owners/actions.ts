"use server";

import { revalidatePath } from "next/cache";
import * as ownerService from "@/services/owner.service";
import { parseEntityId } from "@/shared/lib/entity-id";
import { guardAdminAction } from "@/shared/lib/require-auth";
import { ownerSchema } from "@/shared/lib/validators";

export async function createOwnerAction(formData: FormData) {
  return guardAdminAction(async () => {
    const parsed = ownerSchema.safeParse({
      lastName: formData.get("lastName"),
      firstName: formData.get("firstName"),
      middleName: formData.get("middleName") || undefined,
      phone: formData.get("phone"),
      notes: formData.get("notes") || undefined,
    });
    if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

    await ownerService.createOwner(parsed.data);
    revalidatePath("/owners");
    return { success: true };
  });
}

export async function updateOwnerAction(id: string, formData: FormData) {
  return guardAdminAction(async () => {
    if (!parseEntityId(id)) return { error: "Некорректный id" };

    const parsed = ownerSchema.safeParse({
      lastName: formData.get("lastName"),
      firstName: formData.get("firstName"),
      middleName: formData.get("middleName") || undefined,
      phone: formData.get("phone"),
      notes: formData.get("notes") || undefined,
    });
    if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

    await ownerService.updateOwner(id, parsed.data);
    revalidatePath("/owners");
    revalidatePath(`/owners/${id}`);
    return { success: true };
  });
}

export async function deleteOwnerAction(id: string) {
  return guardAdminAction(async () => {
    if (!parseEntityId(id)) return { error: "Некорректный id" };

    await ownerService.deleteOwner(id);
    revalidatePath("/owners");
    return { success: true };
  });
}
