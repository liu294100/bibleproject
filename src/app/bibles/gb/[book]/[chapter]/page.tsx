import React from 'react';
import Link from 'next/link';
import BibleChapterNavigation from '@/components/BibleChapterNavigation';
import AudioPlayer from '@/components/AudioPlayer';
import ShareButtons from '@/components/ShareButtons';
import { getBookByNumber } from '@/lib/bible-data';

interface BibleChapterPageProps {
  params: {
    book: string;
    chapter: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const BibleChapterPage = ({ params }: BibleChapterPageProps) => {
  const book = getBookByNumber(params.book);
  if (!book) return <div>书卷不存在</div>;

  const chapterNum = parseInt(params.chapter);
  if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > book.chapters) {
    return <div>章节不存在</div>;
  }

  return (
    <div className="textOptions">
      <div className="textHeader">
        <h1 className="text-2xl font-bold mb-4">{book.name}</h1>
        <BibleChapterNavigation
          bookChapters={book.chapters}
          currentChapter={chapterNum}
          bookPath={`/bibles/gb/${params.book}`}
        />
      </div>

      <AudioPlayer
        audioUrl={`http://audio2.abiblica.org/bibles/app/audio/4/${params.book}/${params.chapter}.mp3`}
        title={`${book.name} ${params.chapter} 章 [Mandarin]`}
      />

      <div className="textBody">
        <h3 className="text-xl font-semibold my-4">第{params.chapter}章</h3>
        {/* 经文内容将通过API或数据文件加载 */}
      </div>

      <div className="ym-wrapper mt-8">
        <div className="ym-wbox">
          <ShareButtons pageTitle={`${book.name} - 第${params.chapter}章`} />
        </div>
      </div>
    </div>
  );
};

export default BibleChapterPage;