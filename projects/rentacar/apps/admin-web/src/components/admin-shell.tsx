'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './admin-shell.module.css';
import { LanguageSwitcher } from './language-switcher';
import { useAuthStore } from '@/lib/auth-store';
import { useLanguage } from './language-provider';

const links = [
  { href: '/dashboard', key: 'dashboard' as const },
  { href: '/dashboard/cars', key: 'cars' as const },
  { href: '/dashboard/calendar', key: 'calendar' as const },
  { href: '/dashboard/finance', key: 'finance' as const },
  { href: '/dashboard/maintenance', key: 'maintenance' as const },
  { href: '/dashboard/settings', key: 'settings' as const },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  const { email, clear } = useAuthStore();

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>RentACar</div>
        <nav className={styles.nav}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? styles.active : styles.link}
            >
              {t.nav[link.key]}
            </Link>
          ))}
        </nav>
        <div className={styles.footer}>
          <LanguageSwitcher />
          <p className={styles.email}>{email}</p>
          <button
            type="button"
            className={styles.logout}
            onClick={() => {
              clear();
              router.push('/login');
            }}
          >
            {t.logout}
          </button>
        </div>
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
