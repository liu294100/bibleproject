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
  const resolvedParams = await params;
  const book = getBookByNumber(resolvedParams.book);
  if (!book) return <div>书卷不存在</div>;

  const chapterNum = parseInt(resolvedParams.chapter);
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
          bookPath={`/bibles/gb/${resolvedParams.book}`}
        />
      </div>

      <AudioPlayer
        audioUrl={`http://audio2.abiblica.org/bibles/app/audio/4/${resolvedParams.book}/${resolvedParams.chapter}.mp3`}
        title={`${book.name} ${resolvedParams.chapter} 章 [Mandarin]`}
      />

      <div className="textBody">
        <h3 className="text-xl font-semibold my-4">第{resolvedParams.chapter}章</h3>
        {
          (async () => {
            const bibleText = await getBibleChapterText(resolvedParams.book, chapterNum);
            if (!bibleText || !bibleText.verses) {
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
          <ShareButtons pageTitle={`${book.name} - 第${resolvedParams.chapter}章`} />
        </div>
      </div>
    </div>
  );
};