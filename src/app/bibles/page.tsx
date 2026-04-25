'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { bibleBooks } from '@/lib/bible-data';

const BiblesPage = () => {
  const oldTestament = bibleBooks.slice(0, 39);
  const newTestament = bibleBooks.slice(39);

  return (
    <div className="textOptions page-shell">
      <div className="textHeader">
        <span className="feature-stat mb-4">中文圣经</span>
        <div className="section-heading">
          <div>
            <h1 className="idx mb-2 text-3xl font-bold">圣经</h1>
            <p className="faded">The Holy Bible in Chinese - Simplified - [CUV]</p>
          </div>
          <p className="faded">按书卷进入章节阅读与音频播放。</p>
        </div>
      </div>

      <section className="panel-card p-6 md:p-8">
        <div className="info-grid mb-6">
          <div className="feature-card">
            <span className="feature-stat mb-3">旧约</span>
            <h2 className="text-lg font-semibold mb-2">旧约全书</h2>
            <p className="faded text-sm">从创世记到玛拉基书，按书卷快速进入阅读。</p>
          </div>
          <div className="feature-card">
            <span className="feature-stat mb-3">新约</span>
            <h2 className="text-lg font-semibold mb-2">新约全书</h2>
            <p className="faded text-sm">从马太福音到启示录，适配桌面端与移动端浏览。</p>
          </div>
        </div>

        <div className="page-grid lg:grid-cols-2">
          <div className="panel-card-soft p-4 md:p-5">
            <div className="h4center mb-4 text-lg">旧约全书 - <span className="dimmed">O.T.</span></div>
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

          <div className="panel-card-soft p-4 md:p-5">
            <div className="h4center mb-4 text-lg">新约全书 - <span className="dimmed">N.T.</span></div>
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
      </section>

      <section className="panel-card p-6 md:p-8">
        <div className="section-heading mb-4">
          <div>
            <h2 className="text-xl font-bold mb-2">移动端应用</h2>
            <p className="faded">如果使用 Android 或 Apple 设备，可下载应用继续阅读和收听圣经。</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="https://itunes.apple.com/us/app/wordproject-audio-bible/id1149289190?ls=1&mt=8" target="_blank">
            <Image src="/images/app-store-apple.png" width={130} height={35} alt="Wordproject on iTunes" unoptimized />
          </Link>
          <Link href="https://play.google.com/store/apps/details?id=com.WordProject.HolyBible&hl=en" target="_blank">
            <Image src="/images/app-store-google.png" width={130} height={35} alt="Wordproject on Google Play" unoptimized />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BiblesPage;
