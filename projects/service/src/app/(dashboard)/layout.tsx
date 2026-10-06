import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AppShell } from "@/widgets/layout/AppShell/AppShell";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect("/login");
  }
  return <AppShell>{children}</AppShell>;
}
