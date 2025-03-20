import { availableVersions, bibleBooks } from '@/lib/bible-data';
import Link from 'next/link';
import AudioBiblePlayer from '@/components/AudioBiblePlayer';

export default async function BibleVersionPage({
  params,
}: {
  params: { version: string };
}) {
  const { version } = params;
  const versionInfo = availableVersions.find(v => v.shortCode === version);

  if (!versionInfo) {
    return <div className="p-4 text-red-600">无效的圣经版本</div>;
  }

  return (
    <div className="textOptions">
      <div className="textHeader">
        <h1 className="text-2xl font-bold mb-2">{versionInfo.name}</h1>
        <div className="mb-6 text-gray-600 dark:text-gray-400">
          <p>语言：{versionInfo.language}</p>
          <p>版本代码：{versionInfo.shortCode}</p>
        </div>
        <AudioBiblePlayer defaultVersion={version} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bibleBooks.map(book => (
          <Link
            key={book.number}
            href={`/bibles/${version}/${book.number}`}
            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <h3 className="font-semibold">{book.name}</h3>
            <p className="text-sm text-gray-500 mt-1">
              共 {book.chapters} 章
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-md">
        <h2 className="text-lg font-semibold mb-2">使用说明</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>从上方列表选择要阅读的圣经书卷</li>
          <li>在章节页面使用音频播放器聆听经文</li>
          <li>支持左右滑动切换章节（移动端）</li>
          <li>点击章节数字可直接跳转到指定章节</li>
        </ol>
      </div>
    </div>
  );
}