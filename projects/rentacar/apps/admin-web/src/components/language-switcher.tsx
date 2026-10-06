'use client';

import { useLanguage } from './language-provider';
import styles from '@/app/page.module.css';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className={styles.switcher}>
      <button
        type="button"
        className={locale === 'ru' ? styles.activeLang : styles.lang}
        onClick={() => setLocale('ru')}
      >
        RU
      </button>
      <button
        type="button"
        className={locale === 'en' ? styles.activeLang : styles.lang}
        onClick={() => setLocale('en')}
      >
        EN
      </button>
    </div>
  );
}
