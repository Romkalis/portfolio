import { redirect } from "next/navigation";

/** Смены объединены с разделом «График». */
export default async function AdminShiftsRedirect({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const p = await searchParams;
  redirect(p.month ? `/admin/schedule?month=${p.month}` : "/admin/schedule");
}
