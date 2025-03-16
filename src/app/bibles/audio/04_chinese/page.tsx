import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AudioBiblePage = () => {
  return (
    <div className="textOptions">
      <div className="textHeader">
        <h1 className="audi text-2xl font-bold mb-4">音频圣经 - Audio Bible [Playlist]</h1>
        <p><span className="faded" id="0">下载中国语文Android的应用: </span></p>
        <p>
          现在，您可以享受聆听圣经了， 让这生命的话语进入您的人生，并改变，启发，鼓励您。 您能在线收听或者下载文档。从下面的音频中选择您的语言。
        </p>
        <p><span className="faded">选择一本书：</span></p>
      </div>

      <div className="ym-grid linearize-level-2">
        <div className="alignCenter" id="1">
          <p><Link href="/bibles/audio/04_chinese/index_en.htm#1" className="ym-button22 bg-gray-200 py-1 px-3 rounded-md">Index with Book Numbers</Link></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="h4center">旧约全书 - <span className="dimmed">O.T.</span></div>
            <ul className="nav nav-tabs nav-stacked list-audio">
              <li><Link href="/bibles/audio/04_chinese/b01">创世记</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b02">出埃及记</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b03">利未记</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b04">民数记</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b05">申命记</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b06">约书亚记</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b07">士师记</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b08">路得记</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b09">撒母耳记上</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b10">撒母耳记下</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b11">列王纪上</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b12">列王纪下</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b13">历代志上</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b14">历代志下</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b15">以斯拉记</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b16">尼希米记</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b17">以斯帖记</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b18">约伯记</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b19">诗篇</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b20">箴言</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b21">传道书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b22">雅歌</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b23">以赛亚书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b24">耶利米书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b25">耶利米哀歌</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b26">以西结书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b27">但以理书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b28">何西阿书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b29">约珥书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b30">阿摩司书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b31">俄巴底亚书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b32">约拿书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b33">弥迦书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b34">那鸿书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b35">哈巴谷书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b36">西番雅书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b37">哈该书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b38">撒迦利亚书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b39">玛拉基书</Link></li>
            </ul>
          </div>

          <div>
            <div className="h4center">新约全书 - <span className="dimmed">NT</span></div>
            <ul className="nav nav-tabs nav-stacked list-audio">
              <li><Link href="/bibles/audio/04_chinese/b40">马太福音</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b41">马可福音</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b42">路加福音</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b43">约翰福音</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b44">使徒行传</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b45">罗马书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b46">哥林多前书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b47">哥林多后书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b48">加拉太书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b49">以弗所书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b50">腓立比书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b51">歌罗西书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b52">帖撒罗尼迦前书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b53">帖撒罗尼迦后书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b54">提摩太前书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b55">提摩太后书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b56">提多书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b57">腓利门书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b58">希伯来书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b59">雅各书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b60">彼得前书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b61">彼得后书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b62">约翰一书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b63">约翰二书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b64">约翰三书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b65">犹大书</Link></li>
              <li><Link href="/bibles/audio/04_chinese/b66">启示录</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="my-8">
        <p className="faded">如果使用Android或Apple设备，请下载并使用我们的Bible App来阅读和收听中文和其他语言的圣经：[现在，Android版本采用了一种新的改进格式]</p>

        <p className="centered my-4">
          <Link href="https://itunes.apple.com/us/app/wordproject-audio-bible/id1149289190?ls=1&mt=8" target="_blank">
            <Image src="/images/app-store-apple.png" width={130} height={35} alt="Wordproject on iTunes" unoptimized />
          </Link>
        </p>

        <p className="faded text-center">以前的Android APP仍然可用 <Link href="https://play.google.com/store/apps/details?id=com.WordProject.HolyBible&hl=en" target="_blank" className="text-red-600">这里</Link></p>
      </div>
    </div>
  );
};

export default AudioBiblePage;
