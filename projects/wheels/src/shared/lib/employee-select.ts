import { prisma } from "@/shared/lib/prisma";
import { employeeOrderBy, sortEmployeesForSelect } from "./employees";

export async function getActiveEmployeesForSelect() {
  const rows = await prisma.employeeProfile.findMany({
    where: { isActive: true },
    include: { user: { select: { name: true } } },
    orderBy: employeeOrderBy,
  });

  return sortEmployeesForSelect(
    rows.map((e) => ({
      id: e.id,
      name: e.user.name,
      employmentType: e.employmentType,
    })),
  );
}
