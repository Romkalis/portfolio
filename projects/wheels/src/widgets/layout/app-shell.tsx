"use client";

import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import type { Role } from "@prisma/client";

export function AppShell({ role, children }: { role: Role; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role={role} />
      <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
        <Topbar />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
