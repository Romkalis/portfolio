import { notFound } from "next/navigation";
import { CarDetail } from "@/features/cars/CarDetail/CarDetail";
import * as carService from "@/services/car.service";

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await carService.getCar(id);
  if (!car) notFound();
  return <CarDetail car={car} />;
}
