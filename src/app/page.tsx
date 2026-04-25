'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { getRandomVerse } from "@/lib/bible-api";
import { useLocale } from "@/components/LocaleProvider";

interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

const languageGroups = [
  {
    title: "中文版本",
    description: "快速进入当前站点的中文圣经阅读入口。",
    items: [
      { href: "/bibles/", label: "中文圣经 [简体字 - CUV]" },
    ],
  },
  {
    title: "亚洲语言",
    description: "保留原有亚洲语种入口，方便按语言浏览。",
    items: [
      { href: "/bibles/jp/index.htm", label: "聖書 [日本語]" },
      { href: "/bibles/ko/index.htm", label: "성경 [한국어]" },
    ],
  },
  {
    title: "欧洲语言",
    description: "集中展示欧洲常用语种版本。",
    items: [
      { href: "/bibles/en/index.htm", label: "Holy Bible [English - KJV]" },
      { href: "/bibles/fr/index.htm", label: "La Bible [Français]" },
      { href: "/bibles/de/index.htm", label: "Die Bibel [Deutsch]" },
      { href: "/bibles/es/index.htm", label: "La Biblia [Español]" },
      { href: "/bibles/it/index.htm", label: "La Bibbia [Italiano]" },
      { href: "/bibles/pt/index.htm", label: "A Bíblia [Português]" },
      { href: "/bibles/ru/index.htm", label: "Библия [Русский]" },
      { href: "/bibles/tr/index.htm", label: "Kutsal Kitap [Türkçe]" },
    ],
  },
  {
    title: "非洲语言",
    description: "继续保留原站点的非洲语种入口。",
    items: [
      { href: "/bibles/sw/index.htm", label: "Biblia [Kiswahili]" },
      { href: "/bibles/yo/index.htm", label: "Bíbélì Mímọ́ [Yorùbá]" },
      { href: "/bibles/zu/index.htm", label: "IBhayibheli [IsiZulu]" },
    ],
  },
];

export default function Home() {
  const [verse, setVerse] = useState<BibleVerse | null>(null);
  const { t } = useLocale();

  useEffect(() => {
    const fetchVerse = async () => {
      const randomVerse = await getRandomVerse();
      setVerse(randomVerse);
    };
    fetchVerse();
  }, []);

  return (
    <div className="textOptions page-shell">
      <div className="textHeader">
        <span className="feature-stat mb-4">{t('每日经文', 'Daily Verse')}</span>
        <div className="section-heading mb-4">
          <h1 className="text-3xl font-bold">{t('每日经文', 'Daily Verse')}</h1>
          <p>{t('在首页直接进入阅读、搜索和多语言对照。', 'Start reading, searching, and comparing from the home page.')}</p>
        </div>
        <div className="panel-card p-6">
          {verse ? (
            <div className="text-center">
              <p className="text-lg leading-8 mb-3">{verse.text}</p>
              <Link
                href={`/bibles/gb/${verse.book}/${verse.chapter}#${verse.verse}`}
                className="text-red-600 hover:text-red-700 transition-colors font-semibold"
              >
                {verse.book} {verse.chapter}:{verse.verse}
              </Link>
            </div>
          ) : (
            <div className="text-center py-4 text-sm faded">{t('经文加载中...', 'Loading verse...')}</div>
          )}
        </div>
      </div>

      <section className="panel-card p-6 md:p-8">
        <div className="section-heading mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{t('圣经国际', 'Global Bible')}</h2>
            <p>{t('圣经在超过40种语言。', 'Bible resources in over 40 languages.')}</p>
          </div>
          <Link href="/search" className="action-link">
            {t('前往搜索', 'Go to Search')}
          </Link>
        </div>

        <div className="info-grid mb-6">
          <div className="feature-card">
            <span className="feature-stat mb-3">{t('阅读', 'Read')}</span>
            <h3 className="text-lg font-semibold mb-2">{t('中文圣经与章节入口', 'Chinese Bible and chapter access')}</h3>
            <p className="faded">{t('保留原有内容，通过更清晰的分区让入口更容易找到。', 'Original content is preserved while entry points are clearer.')}</p>
          </div>
          <div className="feature-card">
            <span className="feature-stat mb-3">{t('对照', 'Compare')}</span>
            <h3 className="text-lg font-semibold mb-2">{t('多语言版本快速切换', 'Quick multilingual version switching')}</h3>
            <p className="faded">{t('适合结合首页语言入口和对照阅读页使用。', 'Works well together with the language sections and parallel reading page.')}</p>
          </div>
          <div className="feature-card">
            <span className="feature-stat mb-3">{t('检索', 'Search')}</span>
            <h3 className="text-lg font-semibold mb-2">{t('按主题或经文搜索', 'Search by topic or reference')}</h3>
            <p className="faded">{t('支持关键词和经文引用检索，移动端也更易操作。', 'Supports keywords and references with a mobile-friendly layout.')}</p>
          </div>
        </div>

        <div className="language-grid">
          {languageGroups.map((group) => (
            <section key={group.title} className="language-card">
              <h3 className="text-lg font-semibold mb-2">{group.title}</h3>
              <p className="faded text-sm mb-4">{group.description}</p>
              <ul className="nav nav-tabs nav-stacked">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="page-grid md:grid-cols-3">
        <div className="support-card">
          <h3 className="text-lg font-semibold mb-2">圣经阅读</h3>
          <p className="faded mb-3">{t('使用目录页进入章节阅读，保留原有导航结构。', 'Use the index page to enter chapter reading with the original navigation preserved.')}</p>
          <Link href="/bibles/" className="action-link action-link-secondary">
            {t('打开圣经目录', 'Open Bible Index')}
          </Link>
        </div>
        <div className="support-card">
          <h3 className="text-lg font-semibold mb-2">{t('多语言对照', 'Parallel Reading')}</h3>
          <p className="faded mb-3">{t('在同一页切换版本，查看不同译本内容。', 'Switch versions on one page and compare translations.')}</p>
          <Link href="/parallel" className="action-link action-link-secondary">
            {t('打开对照页', 'Open Parallel Page')}
          </Link>
        </div>
        <div className="support-card">
          <h3 className="text-lg font-semibold mb-2">{t('圣经搜索', 'Bible Search')}</h3>
          <p className="faded mb-3">{t('按主题、关键词或书卷章节快速定位经文。', 'Quickly find passages by topic, keyword, or reference.')}</p>
          <Link href="/search" className="action-link action-link-secondary">
            {t('进入搜索', 'Search Now')}
          </Link>
        </div>
      </section>
    </div>
  );
}
