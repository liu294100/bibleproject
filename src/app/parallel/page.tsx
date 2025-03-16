import React, { Suspense } from 'react';
import ParallelBibleView from '@/components/ParallelBibleView';

export const metadata = {
  title: '多语言圣经对照 - Word Project Chinese Bible',
  description: '在同一页面上比较不同语言和版本的圣经经文，深入学习和理解上帝的话语。'
};

const ParallelBiblePage = () => {
  return (
    <div className="textOptions">
      <div className="textHeader">
        <h1 className="text-2xl font-bold mb-4">多语言圣经对照</h1>
        <p className="mb-4">对比不同语言和版本的圣经经文，加深对经文的理解。</p>
      </div>

      <Suspense fallback={<div className="text-center py-8">加载中...</div>}>
        <ParallelBibleView />
      </Suspense>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">对照阅读的好处</h2>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md space-y-3">
          <h3 className="font-semibold">为什么使用多版本对照阅读？</h3>
          <p>• <strong>更深入的理解</strong>: 不同的翻译版本可以帮助您理解经文的全部含义。</p>
          <p>• <strong>跨文化视角</strong>: 了解不同语言和文化背景下对圣经的理解。</p>
          <p>• <strong>翻译差异</strong>: 发现并理解不同翻译之间的微妙差异。</p>
          <p>• <strong>语言学习</strong>: 通过对照阅读提高您的外语能力。</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">推荐对照阅读的经文</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedPassages.map((passage, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="font-semibold">{passage.reference}</h3>
              <p className="text-sm mb-2">{passage.description}</p>
              <a
                href={`/parallel?book=${passage.book}&chapter=${passage.chapter}`}
                className="text-red-600 hover:underline text-sm"
              >
                查看对照 →
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">可用的圣经版本</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableVersions.map((version, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-2 h-2 rounded-full bg-red-600 mt-2"></div>
              <div>
                <span className="font-medium">{version.shortCode}:</span> {version.name}
                <span className="text-sm ml-1 text-gray-600 dark:text-gray-400">({version.language})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

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

export default ParallelBiblePage;
