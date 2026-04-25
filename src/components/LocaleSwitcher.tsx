'use client';

import { Languages } from 'lucide-react';
import { useLocale } from '@/components/LocaleProvider';

const LocaleSwitcher = () => {
  const { locale, setLocale, t } = useLocale();
  const toggleLocale = () => setLocale(locale === 'zh' ? 'en' : 'zh');

  return (
    <div className="locale-switcher" aria-label={t('语言切换', 'Language Switcher')} title={t('语言切换 / Language', 'Language / 语言')}>
      <button
        type="button"
        className="locale-switcher-icon"
        onClick={toggleLocale}
        title={t('切换语言 / Switch language', 'Switch language / 切换语言')}
        aria-label={t('切换语言', 'Switch language')}
      >
        <Languages size={15} strokeWidth={2} />
      </button>
      <button
        type="button"
        className={`locale-switcher-button ${locale === 'zh' ? 'locale-switcher-button-active' : ''}`}
        onClick={() => setLocale('zh')}
        title="中文 / Chinese"
        aria-label="中文 / Chinese"
      >
        中文
      </button>
      <button
        type="button"
        className={`locale-switcher-button ${locale === 'en' ? 'locale-switcher-button-active' : ''}`}
        onClick={() => setLocale('en')}
        title="English / 英文"
        aria-label="English / 英文"
      >
        EN
      </button>
    </div>
  );
};

export default LocaleSwitcher;
