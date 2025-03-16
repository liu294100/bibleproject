'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { bibleBooks, getBookByNumber, BibleBook } from '@/lib/bible-data';

interface ParallelBibleViewProps {
  initialBook?: string;
  initialChapter?: number;
}

const getEnglishBookName = (bookId: string): string => {
  const englishNames: {[key: string]: string} = {
    '01': 'Genesis',
    '19': 'Psalms',
    '40': 'Matthew',
    '43': 'John',
    '45': 'Romans',
    '49': 'Ephesians'
  };

  return englishNames[bookId] || 'Unknown Book';
};

// 本地圣经数据（作为API不可用时的备选方案）
const localBibleData: { [key: string]: { [key: string]: { [key: string]: string } } } = {
  'gb': {
    '43': {
      '1': '太初有道，道与神同在，道就是神。',
      '2': '这道太初与神同在。',
      '3': '万物是借着他造的；凡被造的，没有一样不是借着他造的。'
    }
  }
};

// 从本地数据获取经文
const getLocalVerseData = (bookId: string, chapterNum: number, version: string): { verses?: { [key: string]: string } } => {
  try {
    const bookData = localBibleData[version]?.[bookId];
    if (bookData) {
      return { verses: bookData };
    }
  } catch (error) {
    console.warn(`无法从本地数据获取经文: ${error}`);
  }
  return {};
};

// 检查是否为单章书卷
const isSingleChapterBook = (bookId: string): boolean => {
  const singleChapterBooks = ['OBA', 'PHM', '2JN', '3JN', 'JUD'];
  return singleChapterBooks.includes(bookId);
};

// 获取标准化的书卷ID
const getStandardBookId = (bookId: string): string => {
  const bookIdMap: { [key: string]: string } = {
    '01': 'GEN', '19': 'PSA', '40': 'MAT',
    '43': 'JHN', '45': 'ROM', '49': 'EPH'
  };
  return bookIdMap[bookId] || 'JHN';
};

// 获取API版本ID
const getApiVersionId = (version: string): string => {
  return version; // 直接使用API提供的版本标识符
};

// Fetch verse data from bible-api.com with fallback to local data
const fetchVerseData = async (
  bookId: string,
  chapterNum: number,
  versions: string[],
): Promise<ParallelVerseData> => {
  const result: ParallelVerseData = {};
  const errors: string[] = [];

  try {
    const standardBookId = getStandardBookId(bookId);
    const versionPromises = versions.map(async (version) => {
      try {
        console.log(`正在获取 ${version} 版本的经文数据...`);
        const isSingleChapter = isSingleChapterBook(standardBookId);

        let url = `https://bible-api.com/${standardBookId}+${chapterNum}`;
        if (isSingleChapter) {
          url = `https://bible-api.com/${standardBookId}`;
        }

        const response = await fetch(`${url}?translation=${version}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP错误! 状态码: ${response.status}`);
        }

        const data = await response.json();
        // 将API返回的数据格式转换为内部使用的格式
        const verses: { [key: string]: string } = {};
        if (data.text) {
          verses['1'] = data.text;
        } else if (data.verses) {
          data.verses.forEach((verse: { verse: number; text: string }) => {
            verses[verse.verse] = verse.text;
          });
        }
        return { version, data: { verses }, source: 'api' };
      } catch (error) {
        console.warn(`API请求失败，正在尝试使用本地数据: ${error}`);
        const errorMessage = error instanceof Error ? error.message : String(error);
        errors.push(`${version}: ${errorMessage}`);
        // 尝试使用本地数据作为备选
        const localData = getLocalVerseData(bookId, chapterNum, version);
        return { version, data: localData, source: 'local' };
      }
    });

    const responses = await Promise.all(versionPromises);

    responses.forEach(({ version, data, source }) => {
      if (data.verses) {
        // 处理API返回的数据格式
        Object.entries(data.verses).forEach(([verseNum, text]) => {
          const verse = parseInt(verseNum);
          if (!result[verse]) {
            result[verse] = {};
          }
          result[verse][version] = text;
        });
        console.log(`成功加载 ${version} 版本的经文（来源: ${source}）`);
      } else {
        console.warn(`${version} 版本没有返回经文数据`);
      }
    });

    return result;
  } catch (error) {
    console.error('Error fetching verse data:', error);
    throw error;
  }
};

const ParallelBibleView: React.FC<ParallelBibleViewProps> = ({
  initialBook,
  initialChapter
}) => {
  const searchParams = useSearchParams();
  const [book, setBook] = useState(searchParams.get('book') || initialBook || '43');
  const [chapter, setChapter] = useState(Number(searchParams.get('chapter') || initialChapter || 1));
  const [versions, setVersions] = useState<string[]>(['cuv', 'kjv', 'web']);
  const [maxChapters, setMaxChapters] = useState(21); // Default to John's Gospel
  const [verseData, setVerseData] = useState<ParallelVerseData>({});
  const [loading, setLoading] = useState(false);

  // Helper to get a verse count for a book and chapter
  const getVerseCount = useCallback((bookId: string, chapterNum: number): number => {
    // This is simplified for the demo - real data would have actual verse counts
    const verseCounts: {[key: string]: {[key: number]: number}} = {
      '01': { 1: 31, 2: 25, 3: 24 }, // Genesis sample
      '19': { 23: 6 }, // Psalm 23
      '43': { 1: 51, 3: 36 }, // John sample
      '45': { 8: 39 } // Romans 8 sample
    };

    return (bookId in verseCounts && chapterNum in verseCounts[bookId])
      ? verseCounts[bookId][chapterNum]
      : 30; // Default verse count for demo
  }, []);

  // Memoize loadParallelTexts function to maintain stable reference
  const loadParallelTexts = useCallback(async () => {
    setLoading(true);

    try {
      const data = await fetchVerseData(book, chapter, versions);
      setVerseData(data);
    } catch (error) {
      console.error('Failed to load parallel texts:', error);
    } finally {
      setLoading(false);
    }
  }, [book, chapter, versions]);

  // Update max chapters when book changes
  useEffect(() => {
    const selectedBook = bibleBooks.find(b => b.number === book);
    if (selectedBook) {
      setMaxChapters(selectedBook.chapters);

      // Reset chapter to 1 if out of range
      if (chapter > selectedBook.chapters) {
        setChapter(1);
      }
    }
  }, [book, chapter]);

  // Load parallel texts when book or chapter changes
  useEffect(() => {
    loadParallelTexts();
  }, [loadParallelTexts]);

  // Generate chapter options for the current book
  const getChapterOptions = () => {
    const chapters = [];
    for (let i = 1; i <= maxChapters; i++) {
      chapters.push(i);
    }
    return chapters;
  };

  // Toggle a version on/off
  const toggleVersion = (version: string) => {
    if (versions.includes(version)) {
      if (versions.length > 1) {
        setVersions(versions.filter(v => v !== version));
      }
    } else {
      setVersions([...versions, version]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">圣经书卷</label>
          <select
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            value={book}
            onChange={(e) => setBook(e.target.value)}
          >
            {bibleBooks.map((book) => (
              <option key={book.number} value={book.number}>
                {book.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">章节</label>
          <select
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            value={chapter}
            onChange={(e) => setChapter(parseInt(e.target.value))}
          >
            {getChapterOptions().map((chapterNum) => (
              <option key={chapterNum} value={chapterNum}>
                {chapterNum}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">选择版本</label>
          <div className="flex flex-wrap gap-2">
            {availableVersions.map((version) => (
              <button
                key={version.code}
                onClick={() => toggleVersion(version.code)}
                className={`px-2 py-1 text-sm rounded ${
                  versions.includes(version.code)
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                {version.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
          <p className="mt-2">加载中...</p>
        </div>
      ) : (
        <div className="mt-6 overflow-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
          <h2 className="text-xl font-bold mb-4 sticky top-0 bg-white dark:bg-gray-900 py-2 z-10">
            {getBookByNumber(book)?.name || '未知书卷'} {chapter}
          </h2>

          <div className="space-y-4">
            {Object.keys(verseData).map(verseNum => (
              <div key={verseNum} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <h3 className="font-semibold text-red-600 mb-3">{verseNum}节</h3>
                <div className="grid grid-cols-1 gap-4">
                  {versions.map(version => (
                    <div key={version} className="p-3 bg-white dark:bg-gray-900 rounded shadow-sm">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {getVersionLabel(version)}
                      </div>
                      <div className="text-base">
                        {verseData[verseNum]?.[version] || '无内容'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper to get version label
const getVersionLabel = (code: string): string => {
  const version = availableVersions.find(v => v.code === code);
  return version ? version.label : code.toUpperCase();
};

// Available Bible versions
const availableVersions = [
  { code: 'cuv', label: '和合本', language: 'Chinese' },
  { code: 'kjv', label: 'King James Version', language: 'English' },
  { code: 'web', label: 'World English Bible', language: 'English' },
  { code: 'bbe', label: 'Bible in Basic English', language: 'English' },
  { code: 'asv', label: 'American Standard Version', language: 'English' },
  { code: 'clementine', label: 'Clementine Latin Vulgate', language: 'Latin' },
  { code: 'almeida', label: 'João Ferreira de Almeida', language: 'Portuguese' },
  { code: 'rccv', label: 'Romanian Corrected Cornilescu', language: 'Romanian' }
];

// Types
interface ParallelVerseData {
  [verse: string]: {
    [version: string]: string;
  };
}

export default ParallelBibleView;
