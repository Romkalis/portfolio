'use client';

import { useQuery } from '@tanstack/react-query';
import styles from './cars.module.css';
import { useLanguage } from '@/components/language-provider';
import { apiFetch } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';

type Car = {
  id: string;
  brand: string;
  model: string;
  status: string;
  pricePerDay: string;
  location: { city: string; name: string };
};

export default function CarsPage() {
  const { t } = useLanguage();
  const token = useAuthStore((s) => s.accessToken);

  const { data, isLoading } = useQuery({
    queryKey: ['cars'],
    queryFn: () => apiFetch<{ data: Car[] }>('/cars?limit=50', { token }),
  });

  return (
    <div>
      <h1>{t.cars.title}</h1>
      {isLoading ? (
        <p className={styles.muted}>…</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t.cars.brand}</th>
              <th>{t.cars.model}</th>
              <th>{t.cars.status}</th>
              <th>{t.cars.price}</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((car) => (
              <tr key={car.id}>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.status}</td>
                <td>{car.pricePerDay}</td>
                <td>
                  {car.location.city} — {car.location.name}
                </td>
              </tr>
            ))}
            {!data?.data.length && (
              <tr>
                <td colSpan={5}>{t.cars.empty}</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
