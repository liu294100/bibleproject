'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { bibleBooks } from '@/lib/bible-data';

const BiblesPage = () => {
  const oldTestament = bibleBooks.slice(0, 39);
  const newTestament = bibleBooks.slice(39);

  return (
    <div className="textOptions">
      <div className="textHeader">
        <h1 className="idx mb-4 text-2xl font-bold">圣经</h1>
        <span className="faded4">The Holy Bible in Chinese - Simplified - [CUV]</span>
      </div>

      <div className="ym-grid linearize-level-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="h4center mb-4">旧约全书 - <span className="dimmed">O.T.</span></div>
            <ul className="nav nav-tabs nav-stacked space-y-2">
              {oldTestament.map((book) => (
                <li key={book.number}>
                  <Link 
                    href={`/bibles/gb/${book.number}/1`}
                    className="hover:text-red-600 transition-colors"
                  >
                    {book.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="h4center mb-4">新约全书 - <span className="dimmed">N.T.</span></div>
            <ul className="nav nav-tabs nav-stacked space-y-2">
              {newTestament.map((book) => (
                <li key={book.number}>
                  <Link 
                    href={`/bibles/gb/${book.number}/1`}
                    className="hover:text-red-600 transition-colors"
                  >
                    {book.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="my-8">
        <p className="faded text-center mb-4">如果使用Android或Apple设备，请下载并使用我们的Bible App来阅读和收听中文和其他语言的圣经：</p>
        <div className="flex justify-center gap-4">
          <Link href="https://itunes.apple.com/us/app/wordproject-audio-bible/id1149289190?ls=1&mt=8" target="_blank">
            <Image src="/images/app-store-apple.png" width={130} height={35} alt="Wordproject on iTunes" unoptimized />
          </Link>
          <Link href="https://play.google.com/store/apps/details?id=com.WordProject.HolyBible&hl=en" target="_blank">
            <Image src="/images/app-store-google.png" width={130} height={35} alt="Wordproject on Google Play" unoptimized />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BiblesPage;
