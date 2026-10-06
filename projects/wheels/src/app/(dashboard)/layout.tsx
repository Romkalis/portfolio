import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AppShell } from "@/widgets/layout/app-shell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return <AppShell role={session.user.role}>{children}</AppShell>;
}
