"use server";

import { revalidatePath } from "next/cache";
import * as carService from "@/services/car.service";
import * as repairService from "@/services/repair.service";
import { parseEntityId } from "@/shared/lib/entity-id";
import { guardAdminAction } from "@/shared/lib/require-auth";
import { carSchema, repairSchema } from "@/shared/lib/validators";

export async function createCarAction(formData: FormData) {
  return guardAdminAction(async () => {
    const parsed = carSchema.safeParse({
      ownerId: formData.get("ownerId"),
      brand: formData.get("brand"),
      model: formData.get("model"),
      year: formData.get("year"),
      vin: formData.get("vin"),
      mileage: formData.get("mileage"),
      oil: formData.get("oil") || undefined,
      oilFilter: formData.get("oilFilter") || undefined,
      airFilter: formData.get("airFilter") || undefined,
      fuelFilter: formData.get("fuelFilter") || undefined,
      cabinFilter: formData.get("cabinFilter") || undefined,
    });
    if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };
    if (!parseEntityId(parsed.data.ownerId)) return { error: "Некорректный владелец" };

    const { ownerId, ...carData } = parsed.data;
    await carService.createCar({ ...carData, owner: { connect: { id: ownerId } } });
    revalidatePath("/cars");
    revalidatePath("/owners");
    return { success: true };
  });
}

export async function updateCarAction(id: string, formData: FormData) {
  return guardAdminAction(async () => {
    if (!parseEntityId(id)) return { error: "Некорректный id" };

    const parsed = carSchema.safeParse({
      ownerId: formData.get("ownerId"),
      brand: formData.get("brand"),
      model: formData.get("model"),
      year: formData.get("year"),
      vin: formData.get("vin"),
      mileage: formData.get("mileage"),
      oil: formData.get("oil") || undefined,
      oilFilter: formData.get("oilFilter") || undefined,
      airFilter: formData.get("airFilter") || undefined,
      fuelFilter: formData.get("fuelFilter") || undefined,
      cabinFilter: formData.get("cabinFilter") || undefined,
    });
    if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };
    if (!parseEntityId(parsed.data.ownerId)) return { error: "Некорректный владелец" };

    const { ownerId, ...rest } = parsed.data;
    await carService.updateCar(id, { ...rest, owner: { connect: { id: ownerId } } });
    revalidatePath("/cars");
    revalidatePath(`/cars/${id}`);
    return { success: true };
  });
}

export async function createRepairAction(formData: FormData) {
  return guardAdminAction(async () => {
    const parsed = repairSchema.safeParse({
      carId: formData.get("carId"),
      repairDate: formData.get("repairDate"),
      mileage: formData.get("mileage"),
      workDone: formData.get("workDone"),
      partsList: formData.get("partsList"),
      recommendations: formData.get("recommendations") || undefined,
      nextServiceDate: formData.get("nextServiceDate") || undefined,
    });
    if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };
    if (!parseEntityId(parsed.data.carId)) return { error: "Некорректный автомобиль" };

    await repairService.createRepair({
      repairDate: new Date(parsed.data.repairDate),
      mileage: parsed.data.mileage,
      workDone: parsed.data.workDone,
      partsList: parsed.data.partsList,
      recommendations: parsed.data.recommendations,
      nextServiceDate: parsed.data.nextServiceDate
        ? new Date(parsed.data.nextServiceDate)
        : undefined,
      car: { connect: { id: parsed.data.carId } },
    });
    revalidatePath(`/cars/${parsed.data.carId}`);
    return { success: true };
  });
}
