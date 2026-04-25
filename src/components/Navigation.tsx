'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/components/LocaleProvider';

const Navigation = () => {
  const pathname = usePathname();
  const { t } = useLocale();

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  return (
    <nav id="nav" className="site-nav sticky top-0 z-50">
      <div className="ym-wrapper">
        <div className="ym-hlist site-nav-inner">
          <ul className="site-nav-list">
            <li>
              <Link
                href="/"
                className={`site-nav-link ${isActive('/') && !isActive('/bibles') ? 'site-nav-link-active' : ''}`}
              >
                {t('主页', 'Home')}
              </Link>
            </li>
            <li>
              <Link
                href="/bibles/"
                className={`site-nav-link ${isActive('/bibles') ? 'site-nav-link-active' : ''}`}
              >
                {t('圣经', 'Bible')}
              </Link>
            </li>
            <li>
              <Link
                href="/bible-player"
                className={`site-nav-link ${isActive('/bible-player') ? 'site-nav-link-active' : ''}`}
              >
                {t('音频播放器', 'Audio Player')}
              </Link>
            </li>
            <li>
              <Link
                href="/parallel"
                className={`site-nav-link ${isActive('/parallel') ? 'site-nav-link-active' : ''}`}
              >
                {t('多语言对照', 'Parallel')}
              </Link>
            </li>
            <li>
              <Link
                href="/search"
                className={`site-nav-link ${isActive('/search') ? 'site-nav-link-active' : ''}`}
              >
                {t('搜索', 'Search')}
              </Link>
            </li>
            {/* <li>
              <Link
                href="/bibles/resources/index.htm"
                className={`px-2 py-1 hover:text-gray-300 ${isActive('/bibles/resources') ? 'bg-red-600 rounded' : ''}`}
              >
                资源
              </Link>
            </li>
            <li>
              <Link
                href="/download/bibles/index.htm"
                className={`px-2 py-1 hover:text-gray-300 ${isActive('/download') ? 'bg-red-600 rounded' : ''}`}
              >
                下载
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
