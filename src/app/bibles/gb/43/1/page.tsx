import React from 'react';
import Link from 'next/link';
import BibleChapterNavigation from '@/components/BibleChapterNavigation';
import AudioPlayer from '@/components/AudioPlayer';
import ShareButtons from '@/components/ShareButtons';

const JohnChapter1Page = () => {
  return (
    <div className="textOptions">
      <div className="textHeader">
        <h1 className="text-2xl font-bold mb-4">约翰福音</h1>
        <BibleChapterNavigation bookChapters={21} currentChapter={1} bookPath="/bibles/gb/43" />
      </div>

      <AudioPlayer
        audioUrl="http://audio2.abiblica.org/bibles/app/audio/4/43/1.mp3"
        title="约翰福音 1 章 [Mandarin]"
      />

      <div className="textBody">
        <h3 className="text-xl font-semibold my-4">第一章</h3>

        <p>
          太初有道，道与神同在，道就是神。
          <br /><span className="verse" id="2">2 </span>这道太初与神同在。
          <br /><span className="verse" id="3">3 </span>万物是借着他造的。凡被造的，没有一样不是借着他造的。
          <br /><span className="verse" id="4">4 </span>生命在他里头。这生命就是人的光。
          <br /><span className="verse" id="5">5 </span>光照在黑暗里，黑暗却不接受光。
          <br /><span className="verse" id="6">6 </span>有一个人，是从神那里差来的，名叫约翰。
          <br /><span className="verse" id="7">7 </span>这人来，为要作见证，就是为光作见证，叫众人因他可以信。
          <br /><span className="verse" id="8">8 </span>他不是那光，乃是要为光作见证。
          <br /><span className="verse" id="9">9 </span>那光是真光，照亮一切生在世上的人。
          <br /><span className="verse" id="10">10 </span>他在世界，世界也是借着他造的，世界却不认识他。
          <br /><span className="verse" id="11">11 </span>他到自己的地方来，自己的人倒不接待他。
          <br /><span className="verse" id="12">12 </span>凡接待他的，就是信他名的人，他就赐他们权柄，作神的儿女。
          <br /><span className="verse" id="13">13 </span>这等人不是从血气生的，不是从情欲生的，也不是从人意生的，乃是从神生的。
          <br /><span className="verse" id="14">14 </span>道成了肉身住在我们中间，充充满满的有恩典有真理。我们也见过他的荣光，正是父独生子的荣光。
          <br /><span className="verse" id="15">15 </span>约翰为他作见证，喊着说，这就是我曾说，那在我以后来的，反成了在我以前的。因他本来在我以前。
          <br /><span className="verse" id="16">16 </span>从他丰满的恩典里我们都领受了，而且恩上加恩。
          <br /><span className="verse" id="17">17 </span>律法本是借着摩西传的，恩典和真理，都是由耶稣基督来的。
          <br /><span className="verse" id="18">18 </span>从来没有人看见神。只有在父怀里的独生子将他表明出来。
          <br /><span className="verse" id="19">19 </span>约翰所作的见证，记在下面。犹太人从耶路撒冷差祭司和利未人到约翰那里，问他说，你是谁。
          <br /><span className="verse" id="20">20 </span>他就明说，并不隐瞒。明说，我不是基督。
          <br /><span className="verse" id="21">21 </span>他们又问他说，这样你是谁呢？是以利亚吗？他说，我不是。是那先知吗？他回答说，不是。
          <br /><span className="verse" id="22">22 </span>于是他们说，你到底是谁？叫我们好回覆差我们来的人。你自己说，你是谁。
          <br /><span className="verse" id="23">23 </span>他说，我就是那在旷野有人声喊着说，修直主的道路，正如先知以赛亚所说的。
          <br /><span className="verse" id="24">24 </span>那些人是法利赛人差来的。（或作那差来的是法利赛人）
          <br /><span className="verse" id="25">25 </span>他们就问他说，你既不是基督，不是以利亚，也不是那先知，为什么施洗呢？
          <br /><span className="verse" id="26">26 </span>约翰回答说，我是用水施洗，但有一位站在你们中间，是你们不认识的，
          <br /><span className="verse" id="27">27 </span>就是那在我以后来的，我给他解鞋带，也不配。
          <br /><span className="verse" id="28">28 </span>这是在约但河外，伯大尼，（有古卷作伯大巴喇）约翰施洗的地方作的见证。
          <br /><span className="verse" id="29">29 </span>次日，约翰看见耶稣来到他那里，就说，看哪，神的羔羊，除去（或作背负）世人罪孽的。
          <br /><span className="verse" id="30">30 </span>这就是我曾说，有一位在我以后来，反成了在我以前的。因他本来在我以前。
          <br /><span className="verse" id="31">31 </span>我先前不认识他，如今我来用水施洗，为要叫他显明给以色列人。
          <br /><span className="verse" id="32">32 </span>约翰又作见证说，我曾看见圣灵，仿佛鸽子从天降下，住在他的身上。
          <br /><span className="verse" id="33">33 </span>我先前不认识他。只是那差我来用水施洗的，对我说，你看见圣灵降下来，住在谁的身上，谁就是用圣灵施洗的。
          <br /><span className="verse" id="34">34 </span>我看见了，就证明这是神的儿子。
          <br /><span className="verse" id="35">35 </span>再次日，约翰同两个门徒站在那里。
          <br /><span className="verse" id="36">36 </span>他见耶稣行走，就说，看哪，这是神的羔羊。
          <br /><span className="verse" id="37">37 </span>两个门徒听见他的话，就跟从了耶稣。
          <br /><span className="verse" id="38">38 </span>耶稣转过身来，看见他们跟着，就问他们说，<span className="word">你们要什么？</span>他们说，拉比，在哪里住？（拉比翻出来，就是夫子）
          <br /><span className="verse" id="39">39 </span>耶稣说，<span className="word">你们来看。</span>他们就去看他在哪里住，这一天便与他同住，那时约有申正了。
          <br /><span className="verse" id="40">40 </span>听见约翰的话，跟从耶稣的那两个人，一个是西门彼得的兄弟安得烈。
          <br /><span className="verse" id="41">41 </span>他先找着自己的哥哥西门，对他说，我们遇见弥赛亚了，（弥赛亚翻出来，就是基督）
          <br /><span className="verse" id="42">42 </span>于是领他去见耶稣。耶稣看着他说，<span className="word">你是约翰的儿子西门，</span>（约翰马太十六章十七节称约拿）<span className="word">你要称为矶法。</span>（矶法翻出来，就是彼得）
          <br /><span className="verse" id="43">43 </span>又次日，耶稣想要往加利利去，遇见腓力，就对他说，<span className="word">来跟从我吧。</span>
          <br /><span className="verse" id="44">44 </span>这腓力是伯赛大人，和安得烈、彼得同城。
          <br /><span className="verse" id="45">45 </span>腓力找着拿但业，对他说，摩西在律法上所写的，和众先知所记的那一位，我们遇见了，就是约瑟的儿子拿撒勒人耶稣。
          <br /><span className="verse" id="46">46 </span>拿但业对他说，拿撒勒还能出什么好的吗？腓力说，你来看。
          <br /><span className="verse" id="47">47 </span>耶稣看见拿但业来，就指着他说，<span className="word">看哪，这是个真以色列人，他心里是没有诡诈的。</span>
          <br /><span className="verse" id="48">48 </span>拿但业对耶稣说，你从哪里知道我呢？耶稣回答说，<span className="word">腓力还没有招呼你，你在无花果树底下，我就看见你了。</span>
          <br /><span className="verse" id="49">49 </span>拿但业说，拉比，你是神的儿子，你是以色列的王。
          <br /><span className="verse" id="50">50 </span>耶稣对他说，<span className="word">因为我说在无花果树底下看见你，你就信吗？你将要看见比这更大的事。</span>
          <br /><span className="verse" id="51">51 </span>又说，<span className="word">我实实在在地告诉你们，你们将要看见天开了，神的使者上去下来在人子身上。</span>
        </p>
      </div>

      <div className="ym-wrapper mt-8">
        <div className="ym-wbox">
          <ShareButtons pageTitle="约翰福音 - 第1章" />
        </div>
      </div>
    </div>
  );
};

export default JohnChapter1Page;
