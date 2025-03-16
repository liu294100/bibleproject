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
    <p className="ym-noprint">
      {chapters}
    </p>
  );
};

export default BibleChapterNavigation;
