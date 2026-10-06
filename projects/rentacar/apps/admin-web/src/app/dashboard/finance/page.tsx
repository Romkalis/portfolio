'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { apiFetch } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';
import { useLanguage } from '@/components/language-provider';
import styles from './finance.module.css';

type FinanceSummary = {
  totalIncome: number;
  totalExpense: number;
  profit: number;
};

function monthRange() {
  const now = new Date();
  const from = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const to = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59));
  return { from: from.toISOString(), to: to.toISOString() };
}

export default function FinancePage() {
  const { t } = useLanguage();
  const token = useAuthStore((s) => s.accessToken);
  const range = useMemo(() => monthRange(), []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['finance-summary', range.from, range.to],
    queryFn: () =>
      apiFetch<FinanceSummary>(
        `/finance/summary?from=${encodeURIComponent(range.from)}&to=${encodeURIComponent(range.to)}`,
        { token },
      ),
    enabled: Boolean(token),
  });

  return (
    <div className={styles.page}>
      <h1>{t.finance.title}</h1>
      {isLoading && <p>{t.finance.loading}</p>}
      {error && <p className={styles.error}>{t.finance.error}</p>}
      {data && (
        <div className={styles.grid}>
          <article className={styles.card}>
            <span>{t.finance.income}</span>
            <strong>{data.totalIncome.toFixed(2)} EUR</strong>
          </article>
          <article className={styles.card}>
            <span>{t.finance.expenses}</span>
            <strong>{data.totalExpense.toFixed(2)} EUR</strong>
          </article>
          <article className={styles.card}>
            <span>{t.finance.profit}</span>
            <strong>{data.profit.toFixed(2)} EUR</strong>
          </article>
        </div>
      )}
    </div>
  );
}
