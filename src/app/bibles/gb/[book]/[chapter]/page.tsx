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
    <div className="textOptions page-shell">
      <div className="textHeader">
        <span className="feature-stat mb-4">章节阅读</span>
        <div className="section-heading mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{book.name}</h1>
            <p className="faded">当前阅读第 {resolvedParams.chapter} 章，可切换章节并播放音频。</p>
          </div>
          <Link href="/bibles" className="text-red-600 hover:text-red-700 font-medium">
            返回目录
          </Link>
        </div>
        <BibleChapterNavigation
          bookChapters={book.chapters}
          currentChapter={chapterNum}
          bookPath={`/bibles/gb/${resolvedParams.book}`}
        />
      </div>

      <section className="panel-card p-4 md:p-6">
        <AudioPlayer
          audioUrl={`http://audio2.abiblica.org/bibles/app/audio/4/${parseInt(resolvedParams.book)}/${resolvedParams.chapter}.mp3`}
          title={`${book.name} ${resolvedParams.chapter} 章 [Mandarin]`}
        />
      </section>

      <section className="panel-card p-6 md:p-8" id="printable-reading-content">
        <div className="reader-heading">
          <h2 className="text-2xl font-semibold">第{resolvedParams.chapter}章</h2>
          <p className="faded">经文内容保持不变，仅优化阅读版式与移动端排版。</p>
        </div>
        {
          (async () => {
            const bibleText = await getBibleChapterText(resolvedParams.book, chapterNum);
            if (!bibleText || !bibleText.verses) {
              return <p>暂无经文内容</p>;
            }
            
            return (
              <div className="textBody reader-body">
                {bibleText.verses.map((verse) => (
                  <React.Fragment key={verse.verse}>
                    <p className="reader-verse" key={verse.verse}>
                    <span className="verse" id={verse.verse.toString()}>{verse.verse} </span>
                    {verse.isJesusWords ? 
                      <span className="word">{verse.text}</span> : 
                      verse.text
                    }
                    </p>
                  </React.Fragment>
                ))}
              </div>
            );
          })()
        }
      </section>

      <section className="panel-card p-4 md:p-5">
        <div className="ym-wbox">
          <ShareButtons
            pageTitle={`${book.name} - 第${resolvedParams.chapter}章`}
            printTargetId="printable-reading-content"
            printDocumentTitle={`${book.name} 第${resolvedParams.chapter}章`}
          />
        </div>
      </section>
    </div>
  );
};
