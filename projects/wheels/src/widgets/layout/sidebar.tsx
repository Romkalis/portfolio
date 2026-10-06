"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Home,
  Users,
  Wallet,
  BarChart3,
  ClipboardList,
  CircleDollarSign,
  ClipboardCheck,
  X,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useUiStore } from "@/shared/store/ui-store";
import type { Role } from "@prisma/client";

type NavItem = { href: string; label: string; icon: React.ComponentType<{ className?: string }> };

const employeeNav: NavItem[] = [
  { href: "/", label: "На сайт", icon: Home },
  { href: "/employee", label: "Обзор", icon: LayoutDashboard },
  { href: "/employee/schedule", label: "График", icon: Calendar },
  { href: "/employee/requests", label: "Заявки на смены", icon: ClipboardList },
  { href: "/employee/shift-close", label: "Закрыть смену", icon: ClipboardCheck },
  { href: "/employee/earnings", label: "Заработок", icon: CircleDollarSign },
];

const adminNav: NavItem[] = [
  { href: "/", label: "На сайт", icon: Home },
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/schedule", label: "График и смены", icon: Calendar },
  { href: "/admin/employees", label: "Сотрудники", icon: Users },
  { href: "/admin/shift-closures", label: "Финансы по сменам", icon: ClipboardCheck },
  { href: "/admin/finances", label: "Финансы", icon: Wallet },
  { href: "/admin/analytics", label: "Аналитика", icon: BarChart3 },
];

export function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useUiStore();
  const items = role === "ADMIN" ? adminNav : employeeNav;

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 lg:hidden",
          sidebarOpen ? "block" : "hidden",
        )}
        onClick={() => setSidebarOpen(false)}
        aria-hidden
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[min(18rem,85vw)] flex-col border-r border-[var(--border)] bg-[var(--sidebar)] transition-transform lg:static lg:translate-x-0 lg:w-60",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-[var(--border)] px-4">
          <Link href="/" className="font-semibold tracking-tight">
            <span className="text-[var(--primary)]">Wheels</span>
            <span className="ml-1 text-[var(--muted-foreground)] text-xs block sm:inline">Шиномонтаж</span>
          </Link>
          <button
            type="button"
            className="rounded-md p-1 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Закрыть меню"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {items.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-[var(--primary)]/12 text-[var(--primary)]"
                    : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
