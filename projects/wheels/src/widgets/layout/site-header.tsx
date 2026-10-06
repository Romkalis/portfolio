import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "@/shared/ui/button";

export async function SiteHeader() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--card)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--card)]/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="font-semibold tracking-tight shrink-0">
          <span className="text-[var(--primary)]">Wheels</span>
          <span className="ml-2 hidden text-sm font-normal text-[var(--muted-foreground)] sm:inline">
            Шиномонтаж
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link
                  href={
                    session.user.role === "ADMIN" ? "/admin" : "/employee"
                  }
                >
                  Кабинет
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/api/auth/signout">Выйти</Link>
              </Button>
            </>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">Вход</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
