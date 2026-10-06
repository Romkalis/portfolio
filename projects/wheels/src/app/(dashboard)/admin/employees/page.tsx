import { prisma } from "@/shared/lib/prisma";
import { employeeOrderBy } from "@/shared/lib/employees";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { AdminCreateEmployeeForm } from "@/features/employees/admin-create-employee-form";
import { AdminEmployeeRow } from "@/features/employees/admin-employee-row";
import { decimalToNumber } from "@/shared/lib/utils";

export default async function AdminEmployeesPage() {
  const employees = await prisma.employeeProfile.findMany({
    include: {
      user: true,
      _count: { select: { shifts: true, requests: true } },
    },
    orderBy: employeeOrderBy,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1>Сотрудники</h1>
          <p className="text-[var(--muted-foreground)] mt-1">
            Постоянные и на подработке — в списках сначала постоянные
          </p>
        </div>
        <AdminCreateEmployeeForm />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Все сотрудники</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Имя</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Должность</TableHead>
                <TableHead>Ставка</TableHead>
                <TableHead>Смены</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-[var(--muted-foreground)]">
                    Нет сотрудников
                  </TableCell>
                </TableRow>
              ) : (
                employees.map((e) => (
                  <AdminEmployeeRow
                    key={e.id}
                    employee={{
                      id: e.id,
                      name: e.user.name,
                      email: e.user.email,
                      phone: e.phone,
                      position: e.position,
                      hourlyRate: e.hourlyRate ? decimalToNumber(e.hourlyRate) : null,
                      employmentType: e.employmentType,
                      isActive: e.isActive,
                      shiftsCount: e._count.shifts,
                      requestsCount: e._count.requests,
                    }}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
