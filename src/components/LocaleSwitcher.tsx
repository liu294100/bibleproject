'use client';

import { useLocale } from '@/components/LocaleProvider';

const LocaleSwitcher = () => {
  const { locale, setLocale } = useLocale();

  return (
    <div className="locale-switcher" aria-label="语言切换">
      <button
        type="button"
        className={`locale-switcher-button ${locale === 'zh' ? 'locale-switcher-button-active' : ''}`}
        onClick={() => setLocale('zh')}
      >
        中文
      </button>
      <button
        type="button"
        className={`locale-switcher-button ${locale === 'en' ? 'locale-switcher-button-active' : ''}`}
        onClick={() => setLocale('en')}
      >
        EN
      </button>
    </div>
  );
};

export default LocaleSwitcher;
