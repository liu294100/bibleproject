'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  return (
    <nav id="nav" className="sticky top-0 z-50" style={{ backgroundColor: "#232321" }}>
      <div className="ym-wrapper">
        <div className="ym-hlist">
          <ul className="flex flex-wrap gap-2 p-2 text-white text-sm md:text-base">
            <li>
              <Link
                href="/"
                className={`px-2 py-1 hover:text-gray-300 ${isActive('/') && !isActive('/bibles') ? 'bg-red-600 rounded' : ''}`}
              >
                主页
              </Link>
            </li>
            <li>
              <Link
                href="/bibles/"
                className={`px-2 py-1 hover:text-gray-300 ${isActive('/bibles') ? 'bg-red-600 rounded' : ''}`}
              >
                圣经
              </Link>
            </li>
            <li>
              <Link
                href="/bible-player"
                className={`px-2 py-1 hover:text-gray-300 ${isActive('/bible-player') ? 'bg-red-600 rounded' : ''}`}
              >
                音频播放器
              </Link>
            </li>
            <li>
              <Link
                href="/parallel"
                className={`px-2 py-1 hover:text-gray-300 ${isActive('/parallel') ? 'bg-red-600 rounded' : ''}`}
              >
                多语言对照
              </Link>
            </li>
            <li>
              <Link
                href="/search"
                className={`px-2 py-1 hover:text-gray-300 ${isActive('/search') ? 'bg-red-600 rounded' : ''}`}
              >
                搜索
              </Link>
            </li>
            {/* <li>
              <Link
                href="/bibles/resources/index.htm"
                className={`px-2 py-1 hover:text-gray-300 ${isActive('/bibles/resources') ? 'bg-red-600 rounded' : ''}`}
              >
                资源
              </Link>
            </li>
            <li>
              <Link
                href="/download/bibles/index.htm"
                className={`px-2 py-1 hover:text-gray-300 ${isActive('/download') ? 'bg-red-600 rounded' : ''}`}
              >
                下载
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
