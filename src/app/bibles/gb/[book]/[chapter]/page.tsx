import React from 'react';
import Link from 'next/link';
import BibleChapterNavigation from '@/components/BibleChapterNavigation';
import AudioPlayer from '@/components/AudioPlayer';
import ShareButtons from '@/components/ShareButtons';
import { getBookByNumber } from '@/lib/bible-data';
import { getBibleChapterText } from '@/lib/bible-text-data';

type Params = {
  book: string;
  chapter: string;
};

export default async function BibleChapterPage(
  { params }: { params: Params & Promise<Params> }
) {
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
        {
          (() => {
            const bibleText = getBibleChapterText(params.book, chapterNum);
            if (!bibleText) {
              return <p>暂无经文内容</p>;
            }
            
            return (
              <p>
                {bibleText.verses.map((verse) => (
                  <React.Fragment key={verse.verse}>
                    {verse.verse === 1 ? '' : <br />}
                    <span className="verse" id={verse.verse.toString()}>{verse.verse} </span>
                    {verse.isJesusWords ? 
                      <span className="word">{verse.text}</span> : 
                      verse.text
                    }
                  </React.Fragment>
                ))}
              </p>
            );
          })()
        }
      </div>

      <div className="ym-wrapper mt-8">
        <div className="ym-wbox">
          <ShareButtons pageTitle={`${book.name} - 第${params.chapter}章`} />
        </div>
      </div>
    </div>
  );
};