'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from '@/components/LocaleProvider';

const Header = () => {
  const { t } = useLocale();

  return (
    <header className="site-header ym-noprint">
      <div id="mytop" className="ym-wrapper">
        <div className="ym-wbox site-header-inner">
          <div className="wp">
            <strong>
              <Link className="wplink" href="/">Apollo&apos;s Open Source</Link>
            </strong>
            <Link className="wplink" href="/"><em> Project</em></Link>
          </div>
          <p className="site-header-copy">{t('多语言圣经阅读、搜索与对照', 'Read, search, and compare multilingual Bibles')}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
