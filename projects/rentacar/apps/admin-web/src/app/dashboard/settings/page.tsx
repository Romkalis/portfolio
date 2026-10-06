'use client';

import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';
import { useLanguage } from '@/components/language-provider';
import styles from './settings.module.css';

type PlatformSettings = {
  cleaningBufferHours: number;
  defaultCurrency: string;
  defaultLocale: string;
  companyName: string;
};

export default function SettingsPage() {
  const { t } = useLanguage();
  const token = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();
  const [message, setMessage] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['platform-settings'],
    queryFn: () => apiFetch<PlatformSettings>('/settings/platform', { token }),
    enabled: Boolean(token),
  });

  const save = useMutation({
    mutationFn: (body: Partial<PlatformSettings>) =>
      apiFetch<PlatformSettings>('/settings/platform', {
        method: 'PATCH',
        token,
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['platform-settings'] });
      setMessage(t.settings.saved);
    },
    onError: () => setMessage(t.settings.error),
  });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    const form = new FormData(event.currentTarget);
    save.mutate({
      cleaningBufferHours: Number(form.get('cleaningBufferHours')),
      defaultCurrency: String(form.get('defaultCurrency')),
      defaultLocale: String(form.get('defaultLocale')),
      companyName: String(form.get('companyName')),
    });
  }

  if (isLoading || !data) {
    return <p className={styles.muted}>{t.settings.loading}</p>;
  }

  return (
    <div className={styles.page}>
      <h1>{t.settings.title}</h1>
      <p className={styles.muted}>{t.settings.hint}</p>

      <form className={styles.form} onSubmit={onSubmit}>
        <label>
          {t.settings.buffer}
          <input
            name="cleaningBufferHours"
            type="number"
            min={0}
            step={1}
            defaultValue={data.cleaningBufferHours}
            required
          />
        </label>
        <label>
          {t.settings.currency}
          <input name="defaultCurrency" defaultValue={data.defaultCurrency} required />
        </label>
        <label>
          {t.settings.locale}
          <input name="defaultLocale" defaultValue={data.defaultLocale} required />
        </label>
        <label>
          {t.settings.company}
          <input name="companyName" defaultValue={data.companyName} required />
        </label>

        {message && <p className={styles.message}>{message}</p>}

        <button type="submit" className={styles.btn} disabled={save.isPending}>
          {save.isPending ? '…' : t.settings.save}
        </button>
      </form>
    </div>
  );
}
