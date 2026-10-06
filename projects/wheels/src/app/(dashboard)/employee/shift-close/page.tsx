import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/shared/lib/prisma";
import { ShiftStatus, ShiftClosureStatus } from "@prisma/client";
import { EmployeeCloseShiftClient } from "@/features/shift-closures/employee-close-client";
import { formatDateOnly, decimalToNumber } from "@/shared/lib/utils";

export default async function EmployeeShiftClosePage() {
  const session = await auth();
  const profileId = session?.user?.employeeProfileId;
  if (!profileId) redirect("/login");

  const [shifts, closures] = await Promise.all([
    prisma.shift.findMany({
      where: { employeeId: profileId, status: ShiftStatus.CONFIRMED },
      orderBy: { date: "desc" },
      take: 30,
    }),
    prisma.shiftClosure.findMany({
      where: { employeeId: profileId },
      orderBy: { date: "desc" },
      take: 20,
    }),
  ]);

  const closedDates = new Set(closures.map((c) => formatDateOnly(c.date)));
  const shiftDates = shifts
    .map((s) => formatDateOnly(s.date))
    .filter((d) => !closedDates.has(d));

  const myClosures = closures.map((c) => ({
    id: c.id,
    date: formatDateOnly(c.date),
    status: c.status,
    cashAmount: decimalToNumber(c.cashAmount),
    salaryAmount: decimalToNumber(c.salaryAmount),
    discopravAmount: decimalToNumber(c.discopravAmount),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1>Закрытие смены</h1>
        <p className="text-[var(--muted-foreground)] mt-1">
          Отчёт уходит начальнику в «Финансы по сменам» для подтверждения
        </p>
      </div>
      <EmployeeCloseShiftClient shiftDates={shiftDates} myClosures={myClosures} />
    </div>
  );
}
