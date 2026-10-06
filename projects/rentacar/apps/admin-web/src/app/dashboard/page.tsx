'use client';

import { useQuery } from '@tanstack/react-query';
import styles from './dashboard.module.css';
import { useLanguage } from '@/components/language-provider';
import { apiFetch } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';

export default function DashboardPage() {
  const { t } = useLanguage();
  const token = useAuthStore((s) => s.accessToken);

  const carsQuery = useQuery({
    queryKey: ['cars-count'],
    queryFn: () =>
      apiFetch<{ meta: { total: number } }>('/cars?limit=1', { token }),
  });

  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const to = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();

  const bookingsQuery = useQuery({
    queryKey: ['bookings-count', from, to],
    queryFn: () =>
      apiFetch<{ bookings: unknown[] }>(
        `/bookings/calendar?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
        { token },
      ),
  });

  return (
    <div>
      <h1>{t.dashboard.title}</h1>
      <div className={styles.grid}>
        <article className={styles.card}>
          <p className={styles.label}>{t.dashboard.cars}</p>
          <p className={styles.value}>{carsQuery.data?.meta.total ?? '—'}</p>
        </article>
        <article className={styles.card}>
          <p className={styles.label}>{t.dashboard.bookings}</p>
          <p className={styles.value}>{bookingsQuery.data?.bookings.length ?? '—'}</p>
        </article>
      </div>
    </div>
  );
}
