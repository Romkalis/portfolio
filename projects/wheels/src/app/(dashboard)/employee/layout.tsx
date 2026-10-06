import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  if (session.user.role !== "EMPLOYEE") redirect("/admin");
  if (!session.user.employeeProfileId) redirect("/login");

  return children;
}
