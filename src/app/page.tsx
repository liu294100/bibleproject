import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="textOptions">
      <div className="textHeader">
        <h1 className="text-2xl font-bold mb-4">圣经国际:</h1>
        <p>[Copy and send from here:]</p>
        <div className="bg-gray-200 p-4 rounded-md my-4">
          <p className="text-center">
            耶稣说，你们要先求祂的国和祂的义，这些东西都要加给你们了。 - <Link href="https://www.wordproject.org/bibles/gb/47/12.htm#9" className="text-red-600">哥林多后书 12:9-10</Link>
          </p>
          {/* <p className="text-right text-sm mt-2">
            https://www.wordproject.org/bibles/votd25/index_gb.htm
          </p> */}
        </div>
      </div>

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
            <li><Link href="/bibles/pt/index.htm">Bíblia [Português]</Link></li>
            <li><Link href="/bibles/nl/index.htm">Bijbel [Nederlands]</Link></li>
            <li><Link href="/bibles/ru/index.htm">Библия [Русский]</Link></li>
            <li><Link href="/bibles/ro/index.htm">Biblia [Română]</Link></li>
            <li><Link href="/bibles/pl/index.htm">Biblia [Polski]</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="h4center">非洲和中东语言</h3>
          <ul className="nav nav-tabs nav-stacked">
            <li><Link href="/bibles/ar/index.htm">الكتاب المقدس [العربية]</Link></li>
            <li><Link href="/bibles/am/index.htm">የመጽሐፍ ቅዱስ [አማርኛ]</Link></li>
            <li><Link href="/bibles/sw/index.htm">Biblia Takatifu [Kiswahili]</Link></li>
            <li><Link href="/bibles/yoruba/index.htm">Bíbélì Mímọ́ [Yorùbá]</Link></li>
            <li><Link href="/bibles/igbo/index.htm">Baịbụl Nsọ [Igbo]</Link></li>
            <li><Link href="/bibles/hausa/index.htm">Littafi Mai Tsarki [Hausa]</Link></li>
            <li><Link href="/bibles/he/index.htm">תנ״ך [עברית]</Link></li>
            <li><Link href="/bibles/fa/index.htm">کتاب مقدس [فارسی]</Link></li>
            <li><Link href="/bibles/tr/index.htm">Kutsal Kitap [Türkçe]</Link></li>
          </ul>
        </div>
      </div>

      <div className="my-6 flex justify-center">
        <Link href="/bibles" className="py-2 px-6 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
          查看所有语言版本
        </Link>
      </div>

      <div className="mt-10">
        <div className="my-8">
          <h3 className="text-lg font-bold mb-4">每日经文</h3>
          <div className="mb-4">
            <p>约翰福音 3:16</p>
            <p>罗马书 5:12 3:23</p>
            <p>约翰一书 4:8 4:16</p>
            <p>马太福音 5:44</p>
            <p>以弗所书 6:12</p>
          </div>
        </div>

        <div className="w-full my-10">
          <div className="relative bg-gray-900 text-white rounded-lg overflow-hidden">
            <Image
              src="https://ext.same-assets.com/2538071721/1559288700.jpeg"
              alt="Bible Verse"
              width={600}
              height={400}
              className="w-full"
              unoptimized
            />
            <div className="absolute inset-0 flex items-center justify-center flex-col p-4 bg-black bg-opacity-30">
              <p className="text-xl text-center">
                贪财是万恶之根。有人贪恋钱财，就被引诱离了真道，用许多愁苦把自己刺透了。
              </p>
              <p className="mt-2 text-sm">[提摩太前书 6:10] 1 Timothy 6:10</p>
            </div>
          </div>
        </div>

        <div className="my-8">
          <h3 className="text-lg font-bold mb-4">应用程序下载</h3>
          <p className="faded">如果使用Android或Apple设备，请下载并使用我们的Bible App来阅读和收听中文和其他语言的圣经：[现在，Android版本采用了一种新的改进格式]</p>

          <div className="flex justify-center gap-4 my-4">
            <Link href="https://play.google.com/store/apps/details?id=org.wordproject.app&hl=en" target="_blank">
              <Image src="/images/app-store-google.png" alt="Google Play" width={130} height={40} unoptimized />
            </Link>
            <Link href="https://itunes.apple.com/us/app/wordproject-audio-bible/id1149289190?ls=1&mt=8" target="_blank">
              <Image src="/images/app-store-apple.png" alt="App Store" width={130} height={40} unoptimized />
            </Link>
            {/* <Link href="https://www.wordproject.org/bibles/app/wpplus.htm" target="_blank">
              <Image src="/images/appchina.png" alt="China App Store" width={130} height={40} unoptimized />
            </Link> */}
          </div>

          <p className="faded text-center">以前的Android APP仍然可用 <Link href="https://play.google.com/store/apps/details?id=com.WordProject.HolyBible&hl=en" className="text-red-600">这里</Link></p>
        </div>
      </div>
    </div>
  );
}
