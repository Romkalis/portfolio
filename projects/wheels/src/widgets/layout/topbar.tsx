"use client";

import { signOut, useSession } from "next-auth/react";
import { Menu, Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/shared/ui/button";
import { useUiStore } from "@/shared/store/ui-store";

export function Topbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--background)]/80 px-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar} aria-label="Меню">
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
          <p className="text-xs text-[var(--muted-foreground)]">{session?.user?.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Тема"
        >
          <Sun className="h-4 w-4 dark:hidden" />
          <Moon className="hidden h-4 w-4 dark:block" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => signOut({ callbackUrl: "/login" })} aria-label="Выйти">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
