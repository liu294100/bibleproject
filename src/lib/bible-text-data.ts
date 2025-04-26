// 圣经经文数据

interface BibleVerse {
  chapter: number;
  verse: number;
  text: string;
  isJesusWords?: boolean;
}

interface BibleChapter {
  book: string;
  chapter: number;
  verses: BibleVerse[];
}

const API_BASE_URL = "https://bible-api.com";

// 从API获取经文数据
async function fetchBibleChapter(bookId: string, chapterNumber: number, maxRetries: number = 3): Promise<BibleChapter> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const standardBookId = getStandardBookId(bookId);
      const isSingleChapter = isSingleChapterBook(standardBookId);

      let url = `${API_BASE_URL}/data/cuv/${standardBookId}/${chapterNumber}`;
      if (isSingleChapter) {
        url = `${API_BASE_URL}/data/cuv/${standardBookId}/1`;
      }

      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const verses = [];

      if (data.text) {
        verses.push({
          chapter: chapterNumber,
          verse: 1,
          text: data.text.trim(),
          isJesusWords: false
        });
      } else if (data.verses) {
        verses.push(...data.verses.map((verse: { verse: number; text: string; isJesusWords?: boolean }) => ({
          chapter: chapterNumber,
          verse: verse.verse,
          text: verse.text.trim(),
          isJesusWords: verse.isJesusWords || false
        })));
      }

      return {
        book: bookId,
        chapter: chapterNumber,
        verses
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        continue;
      }
    }
  }

  console.error(`获取经文数据失败 (已重试${maxRetries}次): ${lastError?.message}`);
  throw lastError;
}

// 动态导入本地数据
async function importLocalChapter(bookId: string, chapterNumber: number): Promise<BibleChapter | null> {
  try {
    const importedData = await import(`./bible-text-data/${bookId.toLowerCase()}${chapterNumber}`);
    return importedData[`${bookId.toLowerCase()}${chapterNumber}`];
  } catch (error) {
    return null;
  }
}

// 示例数据 - 约翰福音第1章
export const john1: BibleChapter = {
  book: '43',
  chapter: 1,
  verses: [
    { chapter: 1, verse: 1, text: '太初有道，道与神同在，道就是神。' },
    { chapter: 1, verse: 2, text: '这道太初与神同在。' },
    { chapter: 1, verse: 3, text: '万物是借着他造的。凡被造的，没有一样不是借着他造的。' },
    { chapter: 1, verse: 4, text: '生命在他里头。这生命就是人的光。' },
    { chapter: 1, verse: 5, text: '光照在黑暗里，黑暗却不接受光。' },
    { chapter: 1, verse: 6, text: '有一个人，是从神那里差来的，名叫约翰。' },
    { chapter: 1, verse: 7, text: '这人来，为要作见证，就是为光作见证，叫众人因他可以信。' },
    { chapter: 1, verse: 8, text: '他不是那光，乃是要为光作见证。' },
    { chapter: 1, verse: 9, text: '那光是真光，照亮一切生在世上的人。' },
    { chapter: 1, verse: 10, text: '他在世界，世界也是借着他造的，世界却不认识他。' },
    { chapter: 1, verse: 11, text: '他到自己的地方来，自己的人倒不接待他。' },
    { chapter: 1, verse: 12, text: '凡接待他的，就是信他名的人，他就赐他们权柄，作神的儿女。' },
    { chapter: 1, verse: 13, text: '这等人不是从血气生的，不是从情欲生的，也不是从人意生的，乃是从神生的。' },
    { chapter: 1, verse: 14, text: '道成了肉身住在我们中间，充充满满的有恩典有真理。我们也见过他的荣光，正是父独生子的荣光。' },
    { chapter: 1, verse: 15, text: '约翰为他作见证，喊着说，这就是我曾说，那在我以后来的，反成了在我以前的。因他本来在我以前。' },
    { chapter: 1, verse: 16, text: '从他丰满的恩典里我们都领受了，而且恩上加恩。' },
    { chapter: 1, verse: 17, text: '律法本是借着摩西传的，恩典和真理，都是由耶稣基督来的。' },
    { chapter: 1, verse: 18, text: '从来没有人看见神。只有在父怀里的独生子将他表明出来。' },
    { chapter: 1, verse: 19, text: '约翰所作的见证，记在下面。犹太人从耶路撒冷差祭司和利未人到约翰那里，问他说，你是谁。' },
    { chapter: 1, verse: 20, text: '他就明说，并不隐藏。明说，我不是基督。' },
    { chapter: 1, verse: 21, text: '他们又问他说，这样你是谁呢？是以利亚吗？他说，我不是。是那先知吗？他回答说，不是。' },
    { chapter: 1, verse: 22, text: '于是他们说，你到底是谁？叫我们好回覆差人来的人。你自己说，你是谁。' },
    { chapter: 1, verse: 23, text: '他说，我就是那在旷野有人声喊着说，修直主的道路，正如先知以赛亚所说的。' },
    { chapter: 1, verse: 24, text: '那些人是法利赛人差来的。（或作那差来的是法利赛人）' },
    { chapter: 1, verse: 25, text: '他们就问他说，你既不是基督，不是以利亚，也不是那先知，为什么施洗呢？' },
    { chapter: 1, verse: 26, text: '约翰回答说，我是用水施洗，但有一位站在你们中间，是你们不认识的，' },
    { chapter: 1, verse: 27, text: '就是那在我以后来的，我给他解鞋带，也不配。' },
    { chapter: 1, verse: 28, text: '这是在约但河外，伯大尼，（有古卷作伯大巴喇）约翰施洗的地方作的见证。' },
    { chapter: 1, verse: 29, text: '次日，约翰看见Jesus来到他那里，就说，看哪，神的羔羊，除去（或作背负）世人罪孽的。' },
    { chapter: 1, verse: 30, text: '这就是曾在我说，有一位在我以后来，反成了在我以前的。因他本来在我以前。' },
    { chapter: 1, verse: 31, text: '我先前不认识他，如今我来用水施洗，为要叫他显明给以色列人。' },
    { chapter: 1, verse: 32, text: '约翰又作见证说，我曾看见圣灵，仿佛鸽子从天降下，住在他的身上。' },
    { chapter: 1, verse: 33, text: '我先前不认识他。只是那差我来用水施洗的，对我说，你看见圣灵降下来，住在谁的身上，谁就是用圣灵施洗的。' },
    { chapter: 1, verse: 34, text: '我看见了，就证明这是神的儿子。' },
    { chapter: 1, verse: 35, text: '再次日，约翰同两个门徒站在那里。' },
    { chapter: 1, verse: 36, text: '他见Jesus行走，就说，看哪，这是神的羔羊。' },
    { chapter: 1, verse: 37, text: '两个门徒听见他的话，就跟从了Jesus。' },
    { chapter: 1, verse: 38, text: 'Jesus转过身来，看见他们跟着，就问他们说，你们要什么？他们说，拉比，在哪里住？（拉比翻出来，就是夫子）', isJesusWords: true },
    { chapter: 1, verse: 39, text: 'Jesus说，你们来看。他们就去看他在哪里住，这一天便与他同住，那时约有申正了。', isJesusWords: true },
    { chapter: 1, verse: 40, text: '听见约翰的话，跟从Jesus的那两个人，一个是西门彼得的兄弟安得烈。' },
    { chapter: 1, verse: 41, text: '他先找着自己的哥哥西门，对他说，我们遇见弥赛亚了，（弥赛亚翻出来，就是基督）' },
    { chapter: 1, verse: 42, text: '于是领他去见Jesus。Jesus看着他说，你是约翰的儿子西门，（约翰马太十六章十七节称约拿）你要称为矶法。（矶法翻出来，就是彼得）', isJesusWords: true },
    { chapter: 1, verse: 43, text: '又次日，Jesus想要往加利利去，遇见腓力，就对他说，来跟从我吧。', isJesusWords: true },
    { chapter: 1, verse: 44, text: '这腓力是伯赛大人，和安得烈、彼得同城。' },
    { chapter: 1, verse: 45, text: '腓力找着拿但业，对他说，摩西在律法上所写的，和众先知所记的那一位，我们遇见了，就是约瑟的儿子拿撒勒人Jesus。' },
    { chapter: 1, verse: 46, text: '拿但业对他说，拿撒勒还能出什么好的吗？腓力说，你来看。' },
    { chapter: 1, verse: 47, text: 'Jesus看见拿但业来，就指着他说，看哪，这是个真以色列人，他心里是没有诡诈的。', isJesusWords: true },
    { chapter: 1, verse: 48, text: '拿但业对Jesus说，你从哪里知道我呢？Jesus回答说，腓力还没有招呼你，你在无花果树底下，我就看见你了。', isJesusWords: true },
    { chapter: 1, verse: 49, text: '拿但业说，拉比，你是神的儿子，你是以色列的王。' },
    { chapter: 1, verse: 50, text: 'Jesus对他说，因为我说在无花果树底下看见你，你就信吗？你将要看见比这更大的事。', isJesusWords: true },
    { chapter: 1, verse: 51, text: '又说，我实实在在地告诉你们，你们将要看见天开了，神的使者上去下来在人子身上。', isJesusWords: true }
  ]
};

// 获取特定书卷章节的经文
export async function getBibleChapterText(bookNumber: string, chapterNumber: number): Promise<BibleChapter | undefined> {
  // 特殊处理约翰福音的示例数据
  if (bookNumber === '43') {
    switch (chapterNumber) {
      case 1:
        return john1;
      default:
        break;
    }
  }

  try {
    // 先尝试从本地获取数据
    const localData = await importLocalChapter(bookNumber, chapterNumber);
    if (localData) {
      return localData;
    }

    // 如果本地数据不存在，从API获取
    return await fetchBibleChapter(bookNumber, chapterNumber);
  } catch (error) {
    console.error(`获取经文失败: ${error}`);
    return undefined;
  }
}

// 检查是否为单章书卷
function isSingleChapterBook(bookId: string): boolean {
  const singleChapterBooks = ['OBA', 'PHM', '2JN', '3JN', 'JUD'];
  return singleChapterBooks.includes(bookId);
}

// 获取标准化的书卷ID
function getStandardBookId(bookId: string): string {
  const bookIdMap: { [key: string]: string } = {
    '01': 'GEN', '02': 'EXO', '03': 'LEV', '04': 'NUM', '05': 'DEU',
    '06': 'JOS', '07': 'JDG', '08': 'RUT', '09': '1SA', '10': '2SA',
    '11': '1KI', '12': '2KI', '13': '1CH', '14': '2CH', '15': 'EZR',
    '16': 'NEH', '17': 'EST', '18': 'JOB', '19': 'PSA', '20': 'PRO',
    '21': 'ECC', '22': 'SNG', '23': 'ISA', '24': 'JER', '25': 'LAM',
    '26': 'EZK', '27': 'DAN', '28': 'HOS', '29': 'JOL', '30': 'AMO',
    '31': 'OBA', '32': 'JON', '33': 'MIC', '34': 'NAM', '35': 'HAB',
    '36': 'ZEP', '37': 'HAG', '38': 'ZEC', '39': 'MAL', '40': 'MAT',
    '41': 'MRK', '42': 'LUK', '43': 'JHN', '44': 'ACT', '45': 'ROM',
    '46': '1CO', '47': '2CO', '48': 'GAL', '49': 'EPH', '50': 'PHP',
    '51': 'COL', '52': '1TH', '53': '2TH', '54': '1TI', '55': '2TI',
    '56': 'TIT', '57': 'PHM', '58': 'HEB', '59': 'JAS', '60': '1PE',
    '61': '2PE', '62': '1JN', '63': '2JN', '64': '3JN', '65': 'JUD',
    '66': 'REV'
  };
  return bookIdMap[bookId] || 'JHN';
}