"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {Locale} from "@/data/resume";
import {translations} from "@/data/resume";

type Translation = (typeof translations)[Locale];

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "portfolio-locale";

export function LanguageProvider({children}: {children: React.ReactNode}) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved === "ru" || saved === "en") {
      setLocaleState(saved);
    }
    setReady(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  useEffect(() => {
    if (ready) {
      document.documentElement.lang = locale;
    }
  }, [locale, ready]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: translations[locale],
    }),
    [locale, setLocale],
  );

  if (!ready) {
    return null;
  }

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
