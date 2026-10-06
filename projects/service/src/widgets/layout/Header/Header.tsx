"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/features/auth/actions";
import { Button } from "@/shared/ui/Button/Button";
import styles from "./Header.module.scss";

const nav = [
  { href: "/schedule", label: "График" },
  { href: "/owners", label: "Владельцы" },
  { href: "/cars", label: "Машины" },
  { href: "/orders", label: "Заказы" },
  { href: "/earnings", label: "Заработок" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/schedule" className={styles.logo}>
          Автосервис CRM
        </Link>
        <nav className={styles.nav}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname.startsWith(item.href) ? styles.active : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logoutAction}>
          <Button type="submit" variant="ghost" size="sm">
            Выйти
          </Button>
        </form>
      </div>
    </header>
  );
}
