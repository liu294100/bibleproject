'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { bibleBooks } from '@/lib/bible-data';

const SearchForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [version, setVersion] = useState('gb');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Memoize the searchBible function
  const searchBible = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.trim() === '') return;

    setLoading(true);
    setSearched(true);

    // 判断是否为经文引用
    const isBibleReference = checkIfBibleReference(searchQuery);
    try {
      if (isBibleReference) {
        // 处理经文引用搜索
        const { book, chapter, verse } = parseBibleReference(searchQuery);
        if (book && chapter) {
          // 直接请求API获取经文内容
          const ref = verse ? `${book}${chapter}:${verse}` : `${book}${chapter}`;
          const apiUrl = `https://api.biblesupersearch.com/api?bible=ckjv_sdt&reference=${encodeURIComponent(ref)}`;
          const response = await fetch(apiUrl);
          const data = await response.json();
          if (data && data.results && Array.isArray(data.results)) {
            // 解析复杂 JSON 结构，提取所有经文
            const parsedResults = [];
            data.results.forEach((result: any, idx: number) => {
              const bookName = result.book_name || '';
              const chapterVerse = result.chapter_verse || '';
              const bookNumber = result.book_id ? result.book_id.toString() : '';
              // 处理 verses 下所有经文
              const versesObj = result.verses && result.verses.ckjv_sdt ? result.verses.ckjv_sdt : {};
              Object.keys(versesObj).forEach(chapterKey => {
                const chapterData = versesObj[chapterKey];
                Object.keys(chapterData).forEach(verseKey => {
                  const verseData = chapterData[verseKey];
                  parsedResults.push({
                    id: verseData.id || `${bookNumber}_${chapterKey}_${verseKey}`,
                    reference: `${bookName} ${chapterKey}:${verseKey}`,
                    text: verseData.text || '',
                    url: `/bibles/${version}/${bookNumber}/${chapterKey}#${verseKey}`
                  });
                });
              });
            });
            setResults(parsedResults);
          } else {
            setResults([]);
          }
          setLoading(false);
          return;
        }
      }

      // 关键词搜索（mock）
      const mockResults = generateMockSearchResults(searchQuery);
      setResults(mockResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [router, version]);

  // Load search results when component mounts with a query in URL
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery && urlQuery.trim() !== '') {
      setQuery(urlQuery);
      searchBible(urlQuery);
    }
  }, [searchParams, searchBible]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === '') return;

    // Update URL with search query
    const params = new URLSearchParams();
    params.set('q', query);
    router.push(`/search?${params.toString()}`);

    searchBible(query);
  };

  // Check if a query looks like a Bible reference
  const checkIfBibleReference = (query: string): boolean => {
    // Simple pattern for Bible references (e.g., "约翰福音 3:16" or "约 3:16")
    const referencePattern = /^([a-zA-Z\u4e00-\u9fa5]+)[\s\.]*(\d+)[\s:\.]*(\d+)?$/;
    return referencePattern.test(query);
  };

  // Parse a Bible reference into book, chapter, and verse
  const parseBibleReference = (reference: string): { book: string, chapter: number, verse?: number } => {
    // Extended pattern to match various reference formats
    const pattern = /^([a-zA-Z\u4e00-\u9fa5]+)[\s\.]*(\d+)[\s:\.]*(\d+)?$/;
    const match = reference.match(pattern);

    if (match) {
      const [, book, chapter, verse] = match;
      return {
        book: book.trim(),
        chapter: parseInt(chapter, 10),
        verse: verse ? parseInt(verse, 10) : undefined
      };
    }

    return { book: '', chapter: 0 };
  };

  // Find a Bible book by name or abbreviation
  const findBookByName = (name: string): { number: string, name: string } | undefined => {
    const normalizedName = name.toLowerCase().trim();

    // First try exact match
    const exactMatch = bibleBooks.find(book =>
      book.name.toLowerCase() === normalizedName
    );

    if (exactMatch) return exactMatch;

    // Try partial match
    return bibleBooks.find(book =>
      book.name.toLowerCase().includes(normalizedName) ||
      normalizedName.includes(book.name.toLowerCase())
    );
  };

  // Generate mock search results based on the query
  const generateMockSearchResults = (query: string): SearchResult[] => {
    const keywords = query.toLowerCase().split(/\s+/);

    return mockVerses
      .filter(verse => {
        const text = verse.text.toLowerCase();
        return keywords.some(keyword => text.includes(keyword));
      })
      .map(verse => ({
        id: verse.id,
        reference: verse.reference,
        text: verse.text,
        url: verse.url
      }))
      .slice(0, 10); // Limit to 10 results
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-grow">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="输入关键词或经文引用 (例如: 约翰福音 3:16)"
              className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          <div className="md:w-40">
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            >
              <option value="gb">简体中文 (CUV)</option>
              <option value="big5">繁体中文</option>
              <option value="gb_cat">思高版 (简体)</option>
              <option value="en">英文 (KJV)</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              搜索
            </button>
          </div>
        </div>
      </form>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
          <p className="mt-2">搜索中...</p>
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <div className="text-center py-8">
          <p>未找到与 "{query}" 相关的结果</p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            请尝试不同的关键词或检查拼写。
          </p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">搜索结果 ({results.length})</h2>
          <div className="space-y-4">
            {results.map((result) => (
              <div key={result.id} className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-sm">
                <h3 className="font-semibold text-red-600">
                  <Link href={result.url}>{result.reference}</Link>
                </h3>
                <p className="mt-1">{result.text}</p>
                <Link href={result.url} className="mt-2 inline-block text-sm text-red-600 hover:underline">
                  阅读全章 →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Types for search results
interface SearchResult {
  id: string;
  reference: string;
  text: string;
  url: string;
}

// Mock verses for simulating search results
const mockVerses = [
  {
    id: '1',
    reference: '约翰福音 3:16',
    text: '神爱世人，甚至将他的独生子赐给他们，叫一切信他的，不致灭亡，反得永生。',
    url: '/bibles/gb/43/3#16'
  },
  {
    id: '2',
    reference: '罗马书 5:8',
    text: '惟有基督在我们还作罪人的时候为我们死，神的爱就在此向我们显明了。',
    url: '/bibles/gb/45/5#8'
  },
  {
    id: '3',
    reference: '约翰一书 4:8',
    text: '没有爱心的，就不认识神，因为神就是爱。',
    url: '/bibles/gb/62/4#8'
  },
  {
    id: '4',
    reference: '以弗所书 2:8-9',
    text: '你们得救是本乎恩，也因着信；这并不是出于自己，乃是神所赐的；也不是出于行为，免得有人自夸。',
    url: '/bibles/gb/49/2#8'
  },
  {
    id: '5',
    reference: '马太福音 11:28',
    text: '凡劳苦担重担的人可以到我这里来，我就使你们得安息。',
    url: '/bibles/gb/40/11#28'
  },
  {
    id: '6',
    reference: '诗篇 23:1',
    text: '耶和华是我的牧者，我必不致缺乏。',
    url: '/bibles/gb/19/23#1'
  },
  {
    id: '7',
    reference: '箴言 3:5-6',
    text: '你要专心仰赖耶和华，不可倚靠自己的聪明，在你一切所行的事上都要认定他，他必指引你的路。',
    url: '/bibles/gb/20/3#5'
  },
  {
    id: '8',
    reference: '腓立比书 4:13',
    text: '我靠着那加给我力量的，凡事都能做。',
    url: '/bibles/gb/50/4#13'
  },
  {
    id: '9',
    reference: '以赛亚书 40:31',
    text: '但那等候耶和华的必从新得力。他们必如鹰展翅上腾；他们奔跑却不困倦，行走却不疲乏。',
    url: '/bibles/gb/23/40#31'
  },
  {
    id: '10',
    reference: '约翰福音 14:6',
    text: '耶稣said I am the way, the truth, the life; if not me, no one can go to father.',
    url: '/bibles/gb/43/14#6'
  },
  {
    id: '11',
    reference: '马太福音 6:33',
    text: '你们要先求他的国和他的义，这些东西都要加给你们了。',
    url: '/bibles/gb/40/6#33'
  },
  {
    id: '12',
    reference: '耶利米书 29:11',
    text: '耶和华说：我知道我向你们所怀的意念是赐平安的意念，不是降灾祸的意念，要叫你们末后有指望。',
    url: '/bibles/gb/24/29#11'
  },
  {
    id: '13',
    reference: '罗马书 8:28',
    text: '我们晓得万事都互相效力，叫爱神的人受益，就是按他旨意被召的人。',
    url: '/bibles/gb/45/8#28'
  },
  {
    id: '14',
    reference: '加拉太书 5:22-23',
    text: '圣灵所结的果子，就是仁爱、喜乐、和平、忍耐、恩慈、良善、信实、温柔、节制。这样的事没有律法禁止。',
    url: '/bibles/gb/48/5#22'
  },
  {
    id: '15',
    reference: '约翰福音 10:10',
    text: '盗贼来，无非要偷窃，杀害，毁坏；我来了，是要叫羊得生命，并且得的更丰盛。',
    url: '/bibles/gb/43/10#10'
  }
];

export default SearchForm;
