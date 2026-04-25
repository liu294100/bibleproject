'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import SearchForm from '@/components/SearchForm';
import { useLocale } from '@/components/LocaleProvider';

const popularSearches = [
  "爱", "信心", "救恩", "恩典", "祷告", "平安",
  "希望", "喜乐", "公义", "怜悯", "天国", "永生"
];

const bibleTopics = [
  {
    name: "上帝的爱",
    description: "探索圣经中关于上帝对人类的爱的经文",
  },
  {
    name: "救恩",
    description: "了解关于耶稣基督救赎工作的经文",
  },
  {
    name: "信心",
    description: "学习圣经中对信心的描述和例子",
  },
  {
    name: "祷告",
    description: "关于祷告方式和祷告的能力的经文",
  },
  {
    name: "圣灵",
    description: "了解圣灵的工作和恩赐",
  },
  {
    name: "末世",
    description: "关于世界末了和基督再来的预言",
  },
  {
    name: "婚姻与家庭",
    description: "圣经中关于婚姻、家庭和关系的教导",
  },
  {
    name: "上帝的应许",
    description: "圣经中上帝对我们的应许和诺言",
  }
];

const SearchPageContent = () => {
  const { t } = useLocale();

  return (
    <div className="textOptions page-shell">
      <div className="textHeader">
        <span className="feature-stat mb-4">{t('圣经搜索', 'Bible Search')}</span>
        <h1 className="text-3xl font-bold mb-4">{t('圣经搜索', 'Bible Search')}</h1>
        <p className="mb-0">{t('通过关键词或经文引用搜索圣经内容。', 'Search Bible content by keyword or passage reference.')}</p>
      </div>

      <section className="panel-card p-4 md:p-6">
        <Suspense fallback={<div className="text-center py-8">{t('加载中...', 'Loading...')}</div>}>
          <SearchForm />
        </Suspense>
      </section>

      <section className="page-grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="panel-card p-6">
          <h2 className="text-xl font-bold mb-4">{t('搜索帮助', 'Search Help')}</h2>
          <div className="space-y-4">
            <div className="feature-card">
              <h3 className="font-semibold mb-2">{t('关键词搜索', 'Keyword Search')}</h3>
              <p className="faded">{t('输入一个或多个关键词，例如"爱"、"信心"等，找到圣经中包含这些词的经文。', 'Enter one or more keywords such as "love" or "faith" to find matching verses.')}</p>
            </div>
            <div className="feature-card">
              <h3 className="font-semibold mb-2">{t('经文引用', 'Passage Reference')}</h3>
              <p className="faded">{t('直接搜索特定章节，例如"约翰福音 3:16"或"约 3:16"。', 'Search a specific passage directly, such as "John 3:16".')}</p>
            </div>
            <div className="feature-card">
              <h3 className="font-semibold mb-2">{t('主题搜索与精确短语', 'Topics and Exact Phrases')}</h3>
              <p className="faded">{t('输入主题词汇，如"救恩"、"上帝的爱"，也可使用引号搜索精确短语。', 'Search themes such as salvation or God’s love, or use quotes for exact phrases.')}</p>
            </div>
          </div>
        </div>

        <div className="panel-card p-6">
          <h2 className="text-xl font-bold mb-4">{t('热门搜索', 'Popular Searches')}</h2>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search, index) => (
              <Link
                key={index}
                href={`/search?q=${encodeURIComponent(search)}`}
                className="chip-link text-sm"
              >
                {search}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="panel-card p-6">
        <h2 className="text-xl font-bold mb-4">{t('常见圣经主题', 'Common Bible Topics')}</h2>
        <div className="page-grid md:grid-cols-2 xl:grid-cols-4">
          {bibleTopics.map((topic, index) => (
            <div key={index} className="feature-card">
              <h3 className="font-semibold">{topic.name}</h3>
              <p className="text-sm mb-2 faded">{topic.description}</p>
              <Link
                href={`/search?q=${encodeURIComponent(topic.name)}`}
                className="action-link action-link-secondary text-sm"
              >
                {t('搜索此主题 →', 'Search This Topic →')}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SearchPageContent;
