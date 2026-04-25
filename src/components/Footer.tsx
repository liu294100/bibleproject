'use client';

import React from 'react';
import Link from 'next/link';
import BrandIcon from '@/components/BrandIcon';
import { useLocale } from '@/components/LocaleProvider';

const Footer = () => {
  const { t } = useLocale();
  const socialLinks = [
    { name: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@wordproaction3358/shorts', enabled: true },
    { name: 'googleplay', label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=org.wordproject.app&hl=en', enabled: true },
    { name: 'appstore', label: 'App Store', href: '#', enabled: false },
    { name: 'facebook', label: 'Facebook', href: '#', enabled: false },
    { name: 'tiktok', label: 'TikTok', href: '#', enabled: false },
    { name: 'x', label: 'X', href: '#', enabled: false },
    { name: 'instagram', label: 'Instagram', href: '#', enabled: false },
  ] as const;

  return (
    <footer className="ym-noprint site-footer">
      <div className="ym-wrapper">
        <div className="ym-wbox site-footer-inner">
          <p className="alignCenter site-footer-note">
            {/* Wordproject® 是 <a href="https://www.abiblica.org/index.html">国际圣经组织</a> 的注册名，是一个非营利性的组织，在中国澳门特别行政区注册. */}
          </p>
          <p className="alignCenter site-footer-copy">
            {/* <Link href="/contact/new/index.htm">联系我们</Link> | <Link href="/contact/new/disclaim.htm">免责声明</Link> |
            <Link href="/contact/new/state.htm">信仰说明</Link> |
            <Link href="/contact/new/mstate.htm">天职说明</Link> | */}
            <Link href="/contact/new/copyrights.htm">{t('版权声明', 'Copyright')}</Link>
            <span>{t('Copyright Apollo\'s project 2025', 'Copyright Apollo\'s project 2025')}</span>
          </p>

          <div className="site-footer-follow">
            <p className="site-footer-follow-title">{t('关注我们', 'Follow Us')}</p>
            <div className="centered spacingdiv site-footer-socials">
              {socialLinks.map((item) => (
                <span key={item.name} className={`fa-stack site-social-link ${!item.enabled ? 'site-social-link-disabled' : ''}`}>
                  <a
                    title={item.enabled ? item.label : `${item.label} ${t('敬请期待', 'Coming soon')}`}
                    href={item.href}
                    target={item.enabled ? "_blank" : undefined}
                    aria-label={item.label}
                    onClick={(event) => {
                      if (!item.enabled) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <BrandIcon name={item.name} />
                  </a>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
