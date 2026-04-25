'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from '@/components/LocaleProvider';

const Footer = () => {
  const { t } = useLocale();

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

          <div className="centered spacingdiv site-footer-socials">
            <span className="fa-stack site-social-link">
              <a title="Follow us on Youtube" href="https://www.youtube.com/@wordproaction3358/shorts" target="_blank">
                <i className="fab fa-youtube"></i>
              </a>
            </span>

            <span className="fa-stack site-social-link">
              <a title="Download NEW App from Playstore" href="https://play.google.com/store/apps/details?id=org.wordproject.app&hl=en" target="_blank">
                <i className="fab fa-google-play"></i>
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
