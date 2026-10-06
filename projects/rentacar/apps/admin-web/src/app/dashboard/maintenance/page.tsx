'use client';

import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';
import { useLanguage } from '@/components/language-provider';
import styles from './maintenance.module.css';

type UpcomingItem = {
  carId: string;
  oilChangeDueInKm: number;
  airFilterDueInKm: number;
  sparkPlugDueInKm: number;
};

export default function MaintenancePage() {
  const { t } = useLanguage();
  const token = useAuthStore((s) => s.accessToken);

  const { data, isLoading, error } = useQuery({
    queryKey: ['maintenance-upcoming'],
    queryFn: () => apiFetch<UpcomingItem[]>('/maintenance/upcoming', { token }),
    enabled: Boolean(token),
  });

  return (
    <div className={styles.page}>
      <h1>{t.maintenance.title}</h1>
      <p className={styles.muted}>{t.maintenance.subtitle}</p>

      {isLoading && <p>{t.maintenance.loading}</p>}
      {error && <p className={styles.error}>{t.maintenance.error}</p>}

      {data && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t.maintenance.car}</th>
              <th>{t.maintenance.oil}</th>
              <th>{t.maintenance.filter}</th>
              <th>{t.maintenance.spark}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.carId}>
                <td>{row.carId}</td>
                <td>{row.oilChangeDueInKm} km</td>
                <td>{row.airFilterDueInKm} km</td>
                <td>{row.sparkPlugDueInKm} km</td>
              </tr>
            ))}
            {!data.length && (
              <tr>
                <td colSpan={4}>{t.maintenance.empty}</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
