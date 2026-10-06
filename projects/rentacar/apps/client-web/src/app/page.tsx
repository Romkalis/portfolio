'use client';

import { FormEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useLanguage } from '@/components/language-provider';
import { apiFetch } from '@/lib/api';
import styles from './booking.module.css';

type Car = {
  id: string;
  brand: string;
  model: string;
  seats: number;
  pricePerDay: string;
  location: { id: string; name: string; city: string };
  estimatedTotal?: number;
  currency?: string;
  available?: boolean;
};

export default function ClientBookingPage() {
  const { t } = useLanguage();
  const [locationId, setLocationId] = useState('');
  const [startLocal, setStartLocal] = useState('');
  const [endLocal, setEndLocal] = useState('');
  const [searchParams, setSearchParams] = useState<{ startAt: string; endAt: string } | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [message, setMessage] = useState<{ type: 'ok' | 'err' | 'warn'; text: string } | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const { data: carsData, refetch: refetchCars, isFetching } = useQuery({
    queryKey: ['search-cars', searchParams, locationId],
    queryFn: () => {
      const params = new URLSearchParams({
        limit: '50',
        status: 'available',
        onlyAvailable: 'true',
        startAt: searchParams!.startAt,
        endAt: searchParams!.endAt,
      });
      if (locationId) params.set('locationId', locationId);
      return apiFetch<{ data: Car[] }>(`/search/cars?${params.toString()}`);
    },
    enabled: Boolean(searchParams),
  });

  async function onSearch(event: FormEvent) {
    event.preventDefault();
    setSelectedCar(null);
    setMessage(null);

    const startAt = toIso(startLocal);
    const endAt = toIso(endLocal);
    if (!startAt || !endAt) {
      setMessage({ type: 'warn', text: t.error });
      return;
    }

    setSearchParams({ startAt, endAt });
    await refetchCars();
  }

  function selectCar(car: Car) {
    setSelectedCar(car);
    setMessage(null);
  }

  async function onBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedCar) return;

    const startAt = searchParams?.startAt ?? toIso(startLocal);
    const endAt = searchParams?.endAt ?? toIso(endLocal);
    if (!startAt || !endAt) return;

    setLoading(true);
    setMessage(null);
    const form = new FormData(event.currentTarget);

    try {
      const customer = await apiFetch<{ id: string }>('/customers', {
        method: 'POST',
        body: JSON.stringify({
          firstName: String(form.get('firstName')),
          lastName: String(form.get('lastName')),
          email: String(form.get('email')),
          phone: String(form.get('phone')),
        }),
      });

      await apiFetch('/bookings/client', {
        method: 'POST',
        body: JSON.stringify({
          carId: selectedCar.id,
          customerId: customer.id,
          pickupLocationId: selectedCar.location.id,
          returnLocationId: selectedCar.location.id,
          startAt,
          endAt,
          totalPrice: selectedCar.estimatedTotal,
        }),
      });

      setMessage({ type: 'ok', text: t.success });
    } catch {
      setMessage({ type: 'err', text: t.error });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <LanguageSwitcher />
        <h1>{t.title}</h1>
        <p className={styles.muted}>{t.subtitle}</p>
      </header>

      <form className={styles.filters} onSubmit={onSearch}>
        <label>
          {t.from}
          <input
            type="datetime-local"
            value={startLocal}
            onChange={(e) => setStartLocal(e.target.value)}
            required
          />
        </label>
        <label>
          {t.to}
          <input
            type="datetime-local"
            value={endLocal}
            onChange={(e) => setEndLocal(e.target.value)}
            required
          />
        </label>
        <label>
          {t.location}
          <input value={locationId} onChange={(e) => setLocationId(e.target.value)} placeholder="optional" />
        </label>
        <button type="submit" className={styles.btn} disabled={isFetching}>
          {isFetching ? '…' : t.search}
        </button>
      </form>

      {carsData && (
        <section>
          <h2 className={styles.muted} style={{ marginBottom: '1rem' }}>
            {t.cars}
          </h2>
          <div className={styles.grid}>
            {carsData.data.map((car) => (
              <article
                key={car.id}
                className={`${styles.card} ${selectedCar?.id === car.id ? styles.cardSelected : ''}`}
                onClick={() => selectCar(car)}
                onKeyDown={(e) => e.key === 'Enter' && selectCar(car)}
                role="button"
                tabIndex={0}
              >
                <h3>
                  {car.brand} {car.model}
                </h3>
                <p className={styles.meta}>
                  {car.location.city} · {car.seats} {t.seats}
                </p>
                <p className={styles.priceRow}>
                  {car.pricePerDay} EUR {t.perDay}
                  {car.estimatedTotal !== undefined && (
                    <span>
                      {' '}
                      · {t.price}: {car.estimatedTotal} {car.currency ?? 'EUR'}
                    </span>
                  )}
                </p>
              </article>
            ))}
            {!carsData.data.length && <p className={styles.muted}>{t.noCars}</p>}
          </div>
        </section>
      )}

      {selectedCar && (
        <form className={styles.form} onSubmit={onBook}>
          <h2>{t.book}</h2>
          {selectedCar.estimatedTotal !== undefined && (
            <p className={styles.muted}>
              {t.price}: {selectedCar.estimatedTotal} {selectedCar.currency ?? 'EUR'}
            </p>
          )}
          <div className={styles.formRow}>
            <label>
              {t.firstName}
              <input name="firstName" required />
            </label>
            <label>
              {t.lastName}
              <input name="lastName" required />
            </label>
          </div>
          <div className={styles.formRow}>
            <label>
              {t.email}
              <input name="email" type="email" required />
            </label>
            <label>
              {t.phone}
              <input name="phone" required />
            </label>
          </div>
          {message && (
            <p
              className={`${styles.alert} ${message.type === 'ok' ? styles.alertOk : message.type === 'warn' ? styles.alertWarn : styles.alertErr}`}
            >
              {message.text}
            </p>
          )}
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? '…' : t.book}
          </button>
        </form>
      )}
    </main>
  );
}

function toIso(local: string) {
  if (!local) return '';
  const d = new Date(local);
  return Number.isNaN(d.getTime()) ? '' : d.toISOString();
}
