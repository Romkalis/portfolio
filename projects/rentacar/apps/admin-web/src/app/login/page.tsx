'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { apiFetch } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useLanguage } from '@/components/language-provider';

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: { email: string };
};

export default function LoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const email = String(form.get('email'));
    const password = String(form.get('password'));

    try {
      const data = await apiFetch<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setSession({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        email: data.user.email,
      });
      router.push('/dashboard');
    } catch {
      setError(t.login.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.main}>
      <LanguageSwitcher />
      <form className={styles.card} onSubmit={onSubmit}>
        <h1>{t.login.title}</h1>
        <label>
          {t.login.email}
          <input name="email" type="email" defaultValue="admin@admin.admin" required />
        </label>
        <label>
          {t.login.password}
          <input name="password" type="password" defaultValue="admin" required />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? '…' : t.login.submit}
        </button>
      </form>
    </main>
  );
}
