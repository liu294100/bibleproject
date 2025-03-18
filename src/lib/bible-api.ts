interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export async function getRandomVerse(): Promise<BibleVerse> {
  try {
    const response = await fetch('https://bible-api.com/data/cuv/random');
    if (!response.ok) {
      throw new Error(`获取随机经文失败: ${response.status}`);
    }
    const data = await response.json();
    const [book, chapterVerse] = data.reference.split(' ');
    const [chapter, verse] = chapterVerse.split(':').map(Number);
    return {
      book,
      chapter,
      verse,
      text: data.text
    };
  } catch (error) {
    console.error('Error fetching random verse:', error);
    // 提供默认经文作为备选
    return {
      book: '提摩太前书',
      chapter: 6,
      verse: 10,
      text: '贪财是万恶之根。有人贪恋钱财，就被引诱离了真道，用许多愁苦把自己刺透了。'
    };
  }
}