import React from 'react';
import Link from 'next/link';

interface BibleChapterNavigationProps {
  bookChapters: number;
  currentChapter: number;
  bookPath: string;
}

const BibleChapterNavigation: React.FC<BibleChapterNavigationProps> = ({
  bookChapters,
  currentChapter,
  bookPath
}) => {
  const chapters = [];

  for (let i = 1; i <= bookChapters; i++) {
    if (i === currentChapter) {
      chapters.push(
        <span key={i} className="chapread">{i}</span>
      );
    } else {
      chapters.push(
        <Link key={i} href={`${bookPath}/${i}`} className="chap">{i}</Link>
      );
    }
  }

  return (
    <div className="ym-noprint chapter-nav">
      <div className="chapter-nav-header">
        <span className="feature-stat">章节导航</span>
        <span className="faded text-sm">共 {bookChapters} 章</span>
      </div>
      <div className="chapter-nav-list">
        {chapters}
      </div>
    </div>
  );
};

export default BibleChapterNavigation;
