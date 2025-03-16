import React, { Suspense } from 'react';
import SearchForm from '@/components/SearchForm';

export const metadata = {
  title: '圣经搜索 - Word Project Chinese Bible',
  description: '搜索圣经中的关键词和经文，快速找到您想要的章节。'
};

const SearchPage = () => {
  return (
    <div className="textOptions">
      <div className="textHeader">
        <h1 className="text-2xl font-bold mb-4">圣经搜索</h1>
        <p className="mb-4">通过关键词或经文引用搜索圣经内容。</p>
      </div>

      <Suspense fallback={<div className="text-center py-8">加载中...</div>}>
        <SearchForm />
      </Suspense>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">搜索帮助</h2>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md space-y-3">
          <h3 className="font-semibold">如何使用搜索功能</h3>
          <p>• <strong>关键词搜索</strong>: 输入一个或多个关键词，例如"爱"、"信心"等，找到圣经中包含这些词的经文。</p>
          <p>• <strong>经文引用</strong>: 直接搜索特定章节，例如"约翰福音 3:16"或"约 3:16"。</p>
          <p>• <strong>主题搜索</strong>: 输入主题词汇，如"救恩"、"上帝的爱"等，找到相关内容。</p>
          <p>• <strong>高级搜索</strong>: 使用引号来搜索精确短语，如"永生"。</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">热门搜索</h2>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((search, index) => (
            <a
              key={index}
              href={`/search?q=${encodeURIComponent(search)}`}
              className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm hover:bg-red-100 dark:hover:bg-gray-600"
            >
              {search}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">常见圣经主题</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {bibleTopics.map((topic, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="font-semibold">{topic.name}</h3>
              <p className="text-sm mb-2">{topic.description}</p>
              <a
                href={`/search?q=${encodeURIComponent(topic.name)}`}
                className="text-red-600 hover:underline text-sm"
              >
                搜索此主题 →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

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

export default SearchPage;
