'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { getRandomVerse } from "@/lib/bible-api";

interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export default function Home() {
  const [verse, setVerse] = useState<BibleVerse | null>(null);

  useEffect(() => {
    const fetchVerse = async () => {
      const randomVerse = await getRandomVerse();
      setVerse(randomVerse);
    };
    fetchVerse();
  }, []);

  return (
    <div className="textOptions">
      <div className="textHeader">
        <h1 className="text-2xl font-bold mb-4">每日经文:</h1>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm my-4">
          {verse && (
            <div className="text-center">
              <p className="text-lg mb-2">{verse.text}</p>
              <Link href={`/bibles/gb/${verse.book}/${verse.chapter}#${verse.verse}`} 
                    className="text-red-600 hover:text-red-700 transition-colors">
                  {verse.book} {verse.chapter}:{verse.verse}
                </Link>
            </div>
          )}
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-4">圣经国际:</h1>
      <h2 className="text-xl font-bold mt-8 mb-4">圣经在超过40种语言:</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <h3 className="h4center">中文版本</h3>
          <ul className="nav nav-tabs nav-stacked">
            <li><Link href="/bibles/big5/index.htm">中文圣经 [繁体字]</Link></li>
            <li><Link href="/bibles/gb/index.htm">中文圣经 [简体字 - CUV]</Link></li>
            <li><Link href="/bibles/pn/index.htm">Sheng Jing [拼音 - 由wordproject制作]</Link></li>
            <li><Link href="/bibles/gb_cat/index.htm">中文圣经 [思高版 - 简体字]</Link></li>
            <li><Link href="/bibles/big5_cath/index.htm">中文圣经 [思高版 - 繁体字]</Link></li>
          </ul>

          <h3 className="h4center mt-6">亚洲语言</h3>
          <ul className="nav nav-tabs nav-stacked">
            <li><Link href="/bibles/jp/index.htm">聖書 [日本語]</Link></li>
            <li><Link href="/bibles/ko/index.htm">성경 [한국어]</Link></li>
            <li><Link href="/bibles/th/index.htm">พระคริสตธรรมคัมภีร์ [ไทย]</Link></li>
            <li><Link href="/bibles/vt/index.htm">Kinh Thánh [Tiếng Việt]</Link></li>
            <li><Link href="/bibles/id/index.htm">Alkitab [Indonesia]</Link></li>
            <li><Link href="/bibles/my/index.htm">သမ္မာကျမ်း [缅甸语]</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="h4center">欧洲语言</h3>
          <ul className="nav nav-tabs nav-stacked">
            <li><Link href="/bibles/en/index.htm">Holy Bible [English - KJV]</Link></li>
            <li><Link href="/bibles/fr/index.htm">La Bible [Français]</Link></li>
            <li><Link href="/bibles/de/index.htm">Die Bibel [Deutsch]</Link></li>
            <li><Link href="/bibles/es/index.htm">La Biblia [Español]</Link></li>
            <li><Link href="/bibles/it/index.htm">La Bibbia [Italiano]</Link></li>
            <li><Link href="/bibles/pt/index.htm">A Bíblia [Português]</Link></li>
            <li><Link href="/bibles/ru/index.htm">Библия [Русский]</Link></li>
            <li><Link href="/bibles/tr/index.htm">Kutsal Kitap [Türkçe]</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="h4center">非洲语言</h3>
          <ul className="nav nav-tabs nav-stacked">
            <li><Link href="/bibles/sw/index.htm">Biblia [Kiswahili]</Link></li>
            <li><Link href="/bibles/yo/index.htm">Bíbélì Mímọ́ [Yorùbá]</Link></li>
            <li><Link href="/bibles/zu/index.htm">IBhayibheli [IsiZulu]</Link></li>
          </ul>

          <h3 className="h4center mt-6">中东语言</h3>
          <ul className="nav nav-tabs nav-stacked">
            <li><Link href="/bibles/ar/index.htm">الكتاب المقدس [العربية]</Link></li>
            <li><Link href="/bibles/fa/index.htm">کتاب مقدس [فارسی]</Link></li>
            <li><Link href="/bibles/ur/index.htm">مقدس بائبل [اردو]</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
