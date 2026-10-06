import type { EmployeeEmploymentType, Prisma } from "@prisma/client";

export const EMPLOYMENT_TYPE_LABELS: Record<EmployeeEmploymentType, string> = {
  PERMANENT: "Постоянный",
  PART_TIME: "На подработке",
};

export const employeeOrderBy: Prisma.EmployeeProfileOrderByWithRelationInput[] = [
  { employmentType: "asc" },
  { user: { name: "asc" } },
];

export function sortEmployeesForSelect<
  T extends { employmentType: EmployeeEmploymentType; name: string },
>(items: T[]): T[] {
  const rank = (t: EmployeeEmploymentType) => (t === "PERMANENT" ? 0 : 1);
  return [...items].sort((a, b) => {
    const d = rank(a.employmentType) - rank(b.employmentType);
    if (d !== 0) return d;
    return a.name.localeCompare(b.name, "ru");
  });
}
