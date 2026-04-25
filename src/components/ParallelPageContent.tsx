'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import ParallelBibleView from '@/components/ParallelBibleView';
import { useLocale } from '@/components/LocaleProvider';

const recommendedPassages = [
  {
    reference: '约翰福音 3:16',
    description: '神爱世人 - 这节经文是圣经中最著名的经文之一，表达了神对人类的爱。',
    book: '43',
    chapter: '3'
  },
  {
    reference: '诗篇 23',
    description: '耶和华是我的牧者 - 大卫的诗篇，表达了对神的信任和依靠。',
    book: '19',
    chapter: '23'
  },
  {
    reference: '马太福音 5-7',
    description: '登山宝训 - 耶稣最著名的教导之一，包含许多道德和伦理原则。',
    book: '40',
    chapter: '5'
  },
  {
    reference: '创世记 1',
    description: '创造故事 - 圣经的开篇，记录了神创造世界的过程。',
    book: '01',
    chapter: '1'
  },
  {
    reference: '罗马书 8',
    description: '在基督里的生命 - 保罗关于基督徒在圣灵中生活的教导。',
    book: '45',
    chapter: '8'
  },
  {
    reference: '以弗所书 6',
    description: '属灵争战 - 保罗关于属灵争战和神的全副军装的教导。',
    book: '49',
    chapter: '6'
  }
];

const availableVersions = [
  { shortCode: 'GB', name: '中文和合本', language: '简体中文' },
  { shortCode: 'BIG5', name: '中文和合本', language: '繁体中文' },
  { shortCode: 'GB_CAT', name: '思高版', language: '简体中文' },
  { shortCode: 'KJV', name: 'King James Version', language: '英文' },
  { shortCode: 'NIV', name: 'New International Version', language: '英文' },
  { shortCode: 'ESV', name: 'English Standard Version', language: '英文' },
  { shortCode: 'NVI', name: 'Nueva Versión Internacional', language: '西班牙文' },
  { shortCode: 'LSG', name: 'Louis Segond', language: '法文' },
  { shortCode: 'LUT', name: 'Luther Bibel', language: '德文' },
  { shortCode: 'KOR', name: '개역한글', language: '韩文' },
  { shortCode: 'JPS', name: '新共同訳', language: '日文' },
  { shortCode: 'ARA', name: 'الكتاب المقدس', language: '阿拉伯文' }
];

const ParallelPageContent = () => {
  const { t } = useLocale();

  return (
    <div className="textOptions page-shell">
      <div className="textHeader">
        <span className="feature-stat mb-4">{t('多语言对照', 'Parallel Bible')}</span>
        <h1 className="text-3xl font-bold mb-4">{t('多语言圣经对照', 'Parallel Bible')}</h1>
        <p className="mb-0">{t('对比不同语言和版本的圣经经文，加深对经文的理解。', 'Compare Bible passages across versions and languages.')}</p>
      </div>

      <section className="panel-card p-4 md:p-6">
        <Suspense fallback={<div className="text-center py-8">{t('加载中...', 'Loading...')}</div>}>
          <ParallelBibleView />
        </Suspense>
      </section>

      <section className="page-grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="panel-card p-6">
          <h2 className="text-xl font-bold mb-4">{t('对照阅读的好处', 'Benefits of Parallel Reading')}</h2>
          <div className="space-y-4">
            <div className="feature-card">
              <h3 className="font-semibold mb-2">{t('更深入的理解', 'Deeper Understanding')}</h3>
              <p className="faded">{t('不同的翻译版本可以帮助您理解经文的全部含义。', 'Different translations help you understand the full meaning of a passage.')}</p>
            </div>
            <div className="feature-card">
              <h3 className="font-semibold mb-2">{t('跨文化视角', 'Cross-cultural Perspective')}</h3>
              <p className="faded">{t('了解不同语言和文化背景下对圣经的理解。', 'See how the Bible is understood across languages and cultures.')}</p>
            </div>
            <div className="feature-card">
              <h3 className="font-semibold mb-2">{t('翻译差异与语言学习', 'Translation Nuance and Language Learning')}</h3>
              <p className="faded">{t('发现并理解不同翻译之间的微妙差异，也可辅助外语学习。', 'Discover subtle translation differences and support language learning.')}</p>
            </div>
          </div>
        </div>

        <div className="panel-card p-6">
          <h2 className="text-xl font-bold mb-4">{t('推荐对照阅读的经文', 'Recommended Passages')}</h2>
          <div className="page-grid md:grid-cols-2">
            {recommendedPassages.map((passage, index) => (
              <div key={index} className="feature-card">
                <h3 className="font-semibold">{passage.reference}</h3>
                <p className="text-sm mb-2 faded">{passage.description}</p>
                <Link
                  href={`/parallel?book=${passage.book}&chapter=${passage.chapter}`}
                  className="action-link action-link-secondary text-sm"
                >
                  {t('查看对照 →', 'Open Parallel →')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel-card p-6">
        <h2 className="text-xl font-bold mb-4">{t('可用的圣经版本', 'Available Versions')}</h2>
        <div className="page-grid md:grid-cols-2 xl:grid-cols-3">
          {availableVersions.map((version, index) => (
            <div key={index} className="feature-card flex items-start space-x-2">
              <div className="w-2 h-2 rounded-full bg-red-600 mt-2"></div>
              <div>
                <span className="font-medium">{version.shortCode}:</span> {version.name}
                <span className="text-sm ml-1 text-gray-600 dark:text-gray-400">({version.language})</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ParallelPageContent;
