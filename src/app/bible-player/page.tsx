import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AudioBiblePlayer from '@/components/AudioBiblePlayer';

export const metadata = {
  title: '圣经播放器 - Word Project Chinese Bible',
  description: '在线聆听圣经朗读，多种语言和版本可供选择。'
};

export default function BiblePlayerPage() {
  return (
    <div className="textOptions">
      <div className="textHeader">
        <h1 className="text-2xl font-bold mb-4">圣经播放器</h1>
        <p className="mb-4">选择语言、圣经书卷和章节，在线聆听神的话语。</p>
      </div>

      <AudioBiblePlayer />

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">如何使用圣经播放器</h2>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md space-y-3">
          <p>1. 从上方的下拉菜单中选择语言和圣经版本</p>
          <p>2. 选择您想要聆听的圣经书卷</p>
          <p>3. 选择特定的章节</p>
          <p>4. 点击播放按钮开始聆听</p>
          <p>5. 使用音量和播放速度控制按钮调整您的聆听体验</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">热门圣经章节</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularPassages.map((passage, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="font-semibold">{passage.reference}</h3>
              <p className="text-sm mb-2">{passage.description}</p>
              <Link href={passage.url} className="text-red-600 hover:underline text-sm">
                去阅读 →
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">离线收听</h2>
        <p className="mb-4">
          您可以下载我们的应用程序，随时随地离线收听圣经朗读。可用于iOS和Android设备。
        </p>
        <div className="flex justify-center gap-4 my-4">
          <Link href="https://play.google.com/store/apps/details?id=org.wordproject.app&hl=en" target="_blank">
            <Image src="/images/app-store-google.png" alt="Google Play" width={130} height={40} unoptimized />
          </Link>
          <Link href="https://itunes.apple.com/us/app/wordproject-audio-bible/id1149289190?ls=1&mt=8" target="_blank">
            <Image src="/images/app-store-apple.png" alt="App Store" width={130} height={40} unoptimized />
          </Link>
        </div>
      </div>
    </div>
  );
}

const popularPassages = [
  {
    reference: '约翰福音 3:16',
    description: '神爱世人，甚至将他的独生子赐给他们，叫一切信他的，不致灭亡，反得永生。',
    url: '/bibles/gb/43/3'
  },
  {
    reference: '诗篇 23:1',
    description: '耶和华是我的牧者，我必不至缺乏。',
    url: '/bibles/gb/19/23'
  },
  {
    reference: '罗马书 8:28',
    description: '我们晓得万事都互相效力，叫爱神的人得益处，就是按他旨意被召的人。',
    url: '/bibles/gb/45/8'
  },
  {
    reference: '腓立比书 4:13',
    description: '我靠着那加给我力量的，凡事都能做。',
    url: '/bibles/gb/50/4'
  },
  {
    reference: '以赛亚书 40:31',
    description: '但那等候耶和华的必从新得力。他们必如鹰展翅上腾；他们奔跑却不困倦，行走却不疲乏。',
    url: '/bibles/gb/23/40'
  },
  {
    reference: '马太福音 6:33',
    description: '你们要先求他的国和他的义，这些东西都要加给你们了。',
    url: '/bibles/gb/40/6'
  }
];
