'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Locale = 'zh' | 'en';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (zh: string, en: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('zh');

  useEffect(() => {
    const savedLocale = window.localStorage.getItem('locale');
    const normalizedLocale = savedLocale === 'en' ? 'en' : 'zh';
    setLocaleState(normalizedLocale);
    document.documentElement.lang = normalizedLocale;
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem('locale', nextLocale);
    document.documentElement.lang = nextLocale;
  };

  const value = useMemo<LocaleContextValue>(() => ({
    locale,
    setLocale,
    t: (zh, en) => (locale === 'en' ? en : zh),
  }), [locale]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
}
