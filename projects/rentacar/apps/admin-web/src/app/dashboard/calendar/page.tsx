'use client';

import dynamic from 'next/dynamic';
import { useLanguage } from '@/components/language-provider';
import styles from './calendar.module.css';

const BookingCalendar = dynamic(() => import('@/components/booking-calendar'), {
  ssr: false,
  loading: () => <p className={styles.loading}>…</p>,
});

export default function CalendarPage() {
  const { t } = useLanguage();

  return (
    <div>
      <h1>{t.calendar.title}</h1>
      <div className={styles.wrap}>
        <BookingCalendar />
      </div>
    </div>
  );
}
