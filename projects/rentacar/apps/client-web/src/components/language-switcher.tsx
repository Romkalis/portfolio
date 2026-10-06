'use client';

import { useLanguage } from './language-provider';
import type { CSSProperties } from 'react';

const btn: CSSProperties = {
  border: '1px solid #d0d7e2',
  background: '#fff',
  color: '#1f2a3b',
  padding: '0.4rem 0.65rem',
  borderRadius: '0.4rem',
  cursor: 'pointer',
  fontSize: '0.75rem',
};

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div style={{ display: 'inline-flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <button
        type="button"
        style={{ ...btn, background: locale === 'ru' ? '#2563eb' : '#fff', color: locale === 'ru' ? '#fff' : '#1f2a3b' }}
        onClick={() => setLocale('ru')}
      >
        RU
      </button>
      <button
        type="button"
        style={{ ...btn, background: locale === 'en' ? '#2563eb' : '#fff', color: locale === 'en' ? '#fff' : '#1f2a3b' }}
        onClick={() => setLocale('en')}
      >
        EN
      </button>
    </div>
  );
}
