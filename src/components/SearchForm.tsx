'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { bibleBooks } from '@/lib/bible-data';
import { Converter } from 'opencc-js';

// Initialize OpenCC converters
const simplifiedToTraditional = Converter({ from: 'cn', to: 'tw' });
const traditionalToSimplified = Converter({ from: 'tw', to: 'cn' });



// 简繁转换函数 - using OpenCC
const convertText = (text: string, direction: 'toTraditional' | 'toSimplified'): string => {
  if (direction === 'toTraditional') {
    return simplifiedToTraditional(text);
  } else {
    return traditionalToSimplified(text);
  }
};

// Types
interface VerseData {
  id?: string;
  text: string;
}

interface SearchResult {
  id: string;
  reference: string;
  text: string;
  url: string;
  book_name?: string;
  book_id?: string | number;
  verses?: {
    ckjv_sdt?: Record<string, Record<string, {
      id?: string;
      text: string;
    }>>;
  };
}

// Mock data
const mockVerses: SearchResult[] = [
  {
    id: '1',
    reference: '约翰福音 3:16',
    text: '神爱世人，甚至将他的独生子赐给他们，叫一切信他的，不致灭亡，反得永生。',
    url: '/bibles/gb/43/3#16',
  },
  {
    id: '2',
    reference: '罗马书 5:8',
    text: '惟有基督在我们还作罪人的时候为我们死，神的爱就在此向我们显明了。',
    url: '/bibles/gb/45/5#8',
  },
  {
    id: '3',
    reference: '约翰一书 4:8',
    text: '没有爱心的，就不认识神，因为神就是爱。',
    url: '/bibles/gb/62/4#8',
  },
  {
    id: '4',
    reference: '以弗所书 2:8-9',
    text: '你们得救是本乎恩，也因着信；这并不是出于自己，乃是神所赐的；也不是出于行为，免得有人自夸。',
    url: '/bibles/gb/49/2#8',
  },
  {
    id: '5',
    reference: '马太福音 11:28',
    text: '凡劳苦担重担的人可以到我这里来，我就使你们得安息。',
    url: '/bibles/gb/40/11#28',
  },
];

// Utils
const checkIfBibleReference = (query: string): boolean => {
  const pattern = /^([a-zA-Z\u4e00-\u9fa5]+)[\s\.]*(\d+)[\s:\.]*(\d+)?$/;
  return pattern.test(query);
};

const parseBibleReference = (reference: string) => {
  const pattern = /^([a-zA-Z\u4e00-\u9fa5]+)[\s\.]*(\d+)[\s:\.]*(\d+)?$/;
  const match = reference.match(pattern);

  if (match) {
    const [, book, chapter, verse] = match;
    return {
      book: book.trim(),
      chapter: parseInt(chapter, 10),
      verse: verse ? parseInt(verse, 10) : undefined,
    };
  }
  return { book: '', chapter: 0 };
};

const generateMockSearchResults = (query: string): SearchResult[] => {
  const keywords = query.toLowerCase().split(/\s+/);
  return mockVerses.filter(verse => 
    keywords.some(keyword => verse.text.toLowerCase().includes(keyword))
  ).slice(0, 10);
};

// Component
const SearchForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [version, setVersion] = useState('gb');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchBible = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
  
    setLoading(true);
    setSearched(true);
  
    const isReference = checkIfBibleReference(searchQuery);
    
    try {
      const allResults: SearchResult[] = [];
      
      if (isReference) {
        // 经文引用 - 尝试简繁转换
        const { book, chapter, verse } = parseBibleReference(searchQuery);
        
        // 尝试原始书名、简体转繁体、繁体转简体
        const bookVariations = [
          book,
          convertText(book, 'toTraditional'),
          convertText(book, 'toSimplified')
        ];
        
        // 去重
        const uniqueBooks = Array.from(new Set(bookVariations));
        
        for (const bookName of uniqueBooks) {
          const ref = verse ? `${bookName}${chapter}:${verse}` : `${bookName}${chapter}`;
          const apiUrl = `https://api.biblesupersearch.com/api?bible=ckjv_sdt&reference=${encodeURIComponent(ref)}`;
          
          try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            if (data?.results?.length) {
              data.results.forEach((result: SearchResult) => {
                const resultBookName = result.book_name || '';
                const bookNumber = result.book_id?.toString() || '';
                const versesObj = result.verses?.ckjv_sdt || {};
        
                Object.entries(versesObj).forEach(([chapKey, chapData]: [string, Record<string, VerseData>]) => {
                  Object.entries(chapData).forEach(([verseKey, verseData]: [string, VerseData]) => {
                    const resultId = verseData.id || `${bookNumber}_${chapKey}_${verseKey}`;
                    // 避免重复结果
                    if (!allResults.find(r => r.id === resultId)) {
                      allResults.push({
                        id: resultId,
                        reference: `${resultBookName} ${chapKey}:${verseKey}`,
                        text: verseData.text || '',
                        url: `/bibles/${version}/${bookNumber}/${chapKey}#${verseKey}`,
                      });
                    }
                  });
                });
              });
              break; // 找到结果就停止尝试其他变体
            }
          } catch (error) {
            console.warn(`Failed to search with book name: ${bookName}`, error);
          }
        }
      } else {
        // 关键词搜索 - 使用简繁转换
        const originalQuery = searchQuery.trim();
        const traditionalQuery = convertText(originalQuery, 'toTraditional');
          const simplifiedQuery = convertText(originalQuery, 'toSimplified');
        
        // 创建唯一查询集合
        const queries = Array.from(new Set([originalQuery, traditionalQuery, simplifiedQuery]));
        
        // 并行搜索所有查询变体
        const searchPromises = queries.map(async (query) => {
          const apiUrl = `https://api.biblesupersearch.com/api?bible=ckjv_sdt&search=${encodeURIComponent(query)}`;
          
          try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            if (data?.results?.length) {
              const results: SearchResult[] = [];
              
              data.results.forEach((result: SearchResult) => {
                const bookName = result.book_name || '';
                const bookNumber = result.book_id?.toString() || '';
                const versesObj = result.verses?.ckjv_sdt || {};
        
                Object.entries(versesObj).forEach(([chapKey, chapData]: [string, Record<string, VerseData>]) => {
                  Object.entries(chapData).forEach(([verseKey, verseData]: [string, VerseData]) => {
                    results.push({
                      id: verseData.id || `${bookNumber}_${chapKey}_${verseKey}`,
                      reference: `${bookName} ${chapKey}:${verseKey}`,
                      text: verseData.text || '',
                      url: `/bibles/${version}/${bookNumber}/${chapKey}#${verseKey}`,
                    });
                  });
                });
              });
              
              return results;
            }
          } catch (error) {
            console.warn(`Failed to search with query: ${query}`, error);
          }
          
          return [];
        });
        
        const searchResults = await Promise.all(searchPromises);
        
        // 合并并去重结果
        const seenIds = new Set<string>();
        searchResults.forEach(results => {
          results.forEach(result => {
            if (!seenIds.has(result.id)) {
              seenIds.add(result.id);
              allResults.push(result);
            }
          });
        });
      }
      
      setResults(allResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [version]);
  

  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery?.trim()) {
      setQuery(urlQuery);
      searchBible(urlQuery);
    }
  }, [searchParams, searchBible]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
    searchBible(query);
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

export default SearchForm;
