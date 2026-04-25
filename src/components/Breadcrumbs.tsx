'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/components/LocaleProvider';

const labelMap: Record<string, string> = {
  bibles: '圣经',
  gb: '简体圣经',
  audio: '音频',
  'bible-player': '音频播放器',
  parallel: '多语言对照',
  search: '搜索',
};

const formatSegment = (segment: string) => {
  const decoded = decodeURIComponent(segment);
  return labelMap[decoded] || decoded;
};

const Breadcrumbs = () => {
  const pathname = usePathname();
  const { t } = useLocale();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="面包屑" className="breadCrumbs">
      <ol className="breadcrumb-list">
        <li>
          <Link href="/">{t('主页', 'Home')}</Link>
        </li>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join('/')}`;

          return (
            <li key={href}>
              <span className="breadcrumb-separator">/</span>
              <Link href={href}>{t(formatSegment(segment), segment)}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
