'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { bibleBooks, getBookByNumber } from '@/lib/bible-data';
import { useLocale } from '@/components/LocaleProvider';

interface ParallelBibleViewProps {
  initialBook?: string;
  initialChapter?: number;
}

// 本地圣经数据（作为API不可用时的备选方案）
const localBibleData: { [key: string]: { [key: string]: { [key: string]: string } } } = {
  'cuv': {
    '40': {
      '1': '虚心的人有福了，因为天国是他们的。',
      '2': '哀恸的人有福了，因为他们必得安慰。',
      '3': '温柔的人有福了，因为他们必承受地土。'
    },
    '43': {
      '1': '太初有道，道与神同在，道就是神。',
      '2': '这道太初与神同在。',
      '3': '万物是借着他造的；凡被造的，没有一样不是借着他造的。'
    }
  },
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLocale();
  const [book, setBook] = useState(searchParams.get('book') || initialBook || '43');
  const [chapter, setChapter] = useState(Number(searchParams.get('chapter') || initialChapter || 1));
  const [versions, setVersions] = useState<string[]>(['cuv', 'kjv', 'web']);
  const [maxChapters, setMaxChapters] = useState(21); // Default to John's Gospel
  const [verseData, setVerseData] = useState<ParallelVerseData>({});
  const [loading, setLoading] = useState(false);
  const hasVerses = Object.keys(verseData).length > 0;

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

  useEffect(() => {
    const nextBook = searchParams.get('book') || initialBook || '43';
    const nextChapter = Number(searchParams.get('chapter') || initialChapter || 1);

    if (nextBook !== book) {
      setBook(nextBook);
    }

    if (!Number.isNaN(nextChapter) && nextChapter !== chapter) {
      setChapter(nextChapter);
    }
  }, [searchParams, initialBook, initialChapter, book, chapter]);

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

  const handleBookChange = (nextBook: string) => {
    const selectedBook = bibleBooks.find((item) => item.number === nextBook);
    const nextChapter = selectedBook ? Math.min(chapter, selectedBook.chapters) : chapter;
    setBook(nextBook);
    setChapter(nextChapter);
    router.replace(`/parallel?book=${nextBook}&chapter=${nextChapter}`, { scroll: false });
  };

  const handleChapterChange = (nextChapter: number) => {
    setChapter(nextChapter);
    router.replace(`/parallel?book=${book}&chapter=${nextChapter}`, { scroll: false });
  };

  return (
    <div className="page-shell">
      <div className="page-grid xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="panel-card-soft p-4 md:p-5">
          <h2 className="text-xl font-semibold mb-4">{t('选择经文', 'Choose Passage')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
          <label className="block text-sm font-medium mb-2">{t('圣经书卷', 'Book')}</label>
          <select
            className="w-full p-3 border rounded-xl dark:bg-gray-800 dark:border-gray-700"
            value={book}
            onChange={(e) => handleBookChange(e.target.value)}
          >
            {bibleBooks.map((book) => (
              <option key={book.number} value={book.number}>
                {book.name}
              </option>
            ))}
          </select>
            </div>
            <div>
          <label className="block text-sm font-medium mb-2">{t('章节', 'Chapter')}</label>
          <select
            className="w-full p-3 border rounded-xl dark:bg-gray-800 dark:border-gray-700"
            value={chapter}
            onChange={(e) => handleChapterChange(parseInt(e.target.value))}
          >
            {getChapterOptions().map((chapterNum) => (
              <option key={chapterNum} value={chapterNum}>
                {chapterNum}
              </option>
            ))}
          </select>
            </div>
          </div>
        </div>

        <div className="panel-card-soft p-4 md:p-5">
          <label className="block text-sm font-medium mb-2">{t('选择版本', 'Versions')}</label>
          <div className="flex flex-wrap gap-2">
            {availableVersions.map((version) => (
              <button
                type="button"
                key={version.code}
                onClick={() => toggleVersion(version.code)}
                className={`px-3 py-2 text-sm rounded-full transition-colors ${
                  versions.includes(version.code)
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {version.label}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm faded">{t(`至少保留一个版本，当前共选择 ${versions.length} 个版本。`, `Keep at least one version selected. ${versions.length} selected.`)}</p>
        </div>
      </div>

      {loading ? (
        <div className="panel-card-soft text-center py-16">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
          <p className="mt-2">{t('加载中...', 'Loading...')}</p>
        </div>
      ) : (
        <div className="panel-card-soft p-4 md:p-5">
          <div className="section-heading mb-4">
            <h2 className="text-xl font-bold">
            {getBookByNumber(book)?.name || '未知书卷'} {chapter}
            </h2>
            <p>{t('按节分组显示所选译本，移动端会纵向排列。', 'Selected versions are grouped by verse and stacked on mobile.')}</p>
          </div>

          {!hasVerses ? (
            <div className="parallel-empty-state">
              <h3 className="text-lg font-semibold mb-2">{t('当前章节暂无可用对照内容', 'No parallel content is available for this chapter')}</h3>
              <p className="faded">
                {t('可尝试切换到其他章节，或只保留英文版本查看。部分中文对照内容依赖外部接口，可能暂时不可用。', 'Try another chapter or keep only English versions selected. Some Chinese parallel content depends on external APIs and may be temporarily unavailable.')}
              </p>
            </div>
          ) : (
          <div className="space-y-4">
            {Object.keys(verseData).map(verseNum => (
              <div key={verseNum} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <h3 className="font-semibold text-red-600 mb-3">{t(`${verseNum}节`, `Verse ${verseNum}`)}</h3>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {versions.map(version => (
                    <div key={version} className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-black/5 dark:border-white/5">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {getVersionLabel(version)}
                      </div>
                      <div className="text-base leading-7">
                        {verseData[verseNum]?.[version] || t('无内容', 'No content')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          )}
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
