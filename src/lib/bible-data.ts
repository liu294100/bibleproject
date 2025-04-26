// Bible book data with chapter counts
export interface BibleBook {
  number: string;
  name: string;
  chapters: number;
  verses?: number;
}

export const bibleBooks: BibleBook[] = [
  // Old Testament - 旧约
  { number: '01', name: '创世记', chapters: 50 },
  { number: '02', name: '出埃及记', chapters: 40 },
  { number: '03', name: '利未记', chapters: 27 },
  { number: '04', name: '民数记', chapters: 36 },
  { number: '05', name: '申命记', chapters: 34 },
  { number: '06', name: '约书亚记', chapters: 24 },
  { number: '07', name: '士师记', chapters: 21 },
  { number: '08', name: '路得记', chapters: 4 },
  { number: '09', name: '撒母耳记上', chapters: 31 },
  { number: '10', name: '撒母耳记下', chapters: 24 },
  { number: '11', name: '列王纪上', chapters: 22 },
  { number: '12', name: '列王纪下', chapters: 25 },
  { number: '13', name: '历代志上', chapters: 29 },
  { number: '14', name: '历代志下', chapters: 36 },
  { number: '15', name: '以斯拉记', chapters: 10 },
  { number: '16', name: '尼希米记', chapters: 13 },
  { number: '17', name: '以斯帖记', chapters: 10 },
  { number: '18', name: '约伯记', chapters: 42 },
  { number: '19', name: '诗篇', chapters: 150 },
  { number: '20', name: '箴言', chapters: 31 },
  { number: '21', name: '传道书', chapters: 12 },
  { number: '22', name: '雅歌', chapters: 8 },
  { number: '23', name: '以赛亚书', chapters: 66 },
  { number: '24', name: '耶利米书', chapters: 52 },
  { number: '25', name: '耶利米哀歌', chapters: 5 },
  { number: '26', name: '以西结书', chapters: 48 },
  { number: '27', name: '但以理书', chapters: 12 },
  { number: '28', name: '何西阿书', chapters: 14 },
  { number: '29', name: '约珥书', chapters: 3 },
  { number: '30', name: '阿摩司书', chapters: 9 },
  { number: '31', name: '俄巴底亚书', chapters: 1 },
  { number: '32', name: '约拿书', chapters: 4 },
  { number: '33', name: '弥迦书', chapters: 7 },
  { number: '34', name: '那鸿书', chapters: 3 },
  { number: '35', name: '哈巴谷书', chapters: 3 },
  { number: '36', name: '西番雅书', chapters: 3 },
  { number: '37', name: '哈该书', chapters: 2 },
  { number: '38', name: '撒迦利亚书', chapters: 14 },
  { number: '39', name: '玛拉基书', chapters: 4 },

  // New Testament - 新约
  { number: '40', name: '马太福音', chapters: 28 },
  { number: '41', name: '马可福音', chapters: 16 },
  { number: '42', name: '路加福音', chapters: 24 },
  { number: '43', name: '约翰福音', chapters: 21 },
  { number: '44', name: '使徒行传', chapters: 28 },
  { number: '45', name: '罗马书', chapters: 16 },
  { number: '46', name: '哥林多前书', chapters: 16 },
  { number: '47', name: '哥林多后书', chapters: 13 },
  { number: '48', name: '加拉太书', chapters: 6 },
  { number: '49', name: '以弗所书', chapters: 6 },
  { number: '50', name: '腓立比书', chapters: 4 },
  { number: '51', name: '歌罗西书', chapters: 4 },
  { number: '52', name: '帖撒罗尼迦前书', chapters: 5 },
  { number: '53', name: '帖撒罗尼迦后书', chapters: 3 },
  { number: '54', name: '提摩太前书', chapters: 6 },
  { number: '55', name: '提摩太后书', chapters: 4 },
  { number: '56', name: '提多书', chapters: 3 },
  { number: '57', name: '腓利门书', chapters: 1 },
  { number: '58', name: '希伯来书', chapters: 13 },
  { number: '59', name: '雅各书', chapters: 5 },
  { number: '60', name: '彼得前书', chapters: 5 },
  { number: '61', name: '彼得后书', chapters: 3 },
  { number: '62', name: '约翰一书', chapters: 5 },
  { number: '63', name: '约翰二书', chapters: 1 },
  { number: '64', name: '约翰三书', chapters: 1 },
  { number: '65', name: '犹大书', chapters: 1 },
  { number: '66', name: '启示录', chapters: 22 }
];

// Supported Bible versions
export const availableVersions = [
  { code: 'chinese', label: '中文' },
  { code: 'english', label: 'English' },
  { code: 'french', label: 'Français' },
  { code: 'spanish', label: 'Español' },
  { code: 'german', label: 'Deutsch' },
  { code: 'arabic', label: 'العربية' },
  { code: 'russian', label: 'Русский' },
  { code: 'italian', label: 'Italiano' },
  { code: 'portuguese', label: 'Português' },
  { code: 'japanese', label: '日本語' },
  { code: 'korean', label: '한국어' },
];

// Common Bible verses for quick references
export const commonVerses = [
  { reference: '约翰福音 3:16', book: '43', chapter: 3, verse: 16 },
  { reference: '诗篇 23:1', book: '19', chapter: 23, verse: 1 },
  { reference: '罗马书 8:28', book: '45', chapter: 8, verse: 28 },
  { reference: '腓立比书 4:13', book: '50', chapter: 4, verse: 13 },
  { reference: '马太福音 6:33', book: '40', chapter: 6, verse: 33 },
  { reference: '约翰一书 1:9', book: '62', chapter: 1, verse: 9 },
  { reference: '罗马书 12:2', book: '45', chapter: 12, verse: 2 },
  { reference: '以弗所书 2:8-9', book: '49', chapter: 2, verse: 8 },
  { reference: '希伯来书 11:1', book: '58', chapter: 11, verse: 1 },
  { reference: '以赛亚书 40:31', book: '23', chapter: 40, verse: 31 }
];

// Get book name by book number
export function getBookByNumber(bookNumber: string): BibleBook | undefined {
  return bibleBooks.find(book => book.number === bookNumber);
}

// Format a Bible reference
export function formatBibleReference(bookNumber: string, chapter: number, verse?: number): string {
  const book = getBookByNumber(bookNumber);
  if (!book) return '';

  if (verse) {
    return `${book.name} ${chapter}:${verse}`;
  }
  return `${book.name} ${chapter}`;
}

// Get previous and next chapters for navigation
export function getAdjacentChapters(bookNumber: string, chapter: number): { prev: { book: string, chapter: number } | null, next: { book: string, chapter: number } | null } {
  const currentBookIndex = bibleBooks.findIndex(book => book.number === bookNumber);
  const currentBook = bibleBooks[currentBookIndex];

  if (!currentBook) {
    return { prev: null, next: null };
  }

  // Previous chapter
  let prev: { book: string, chapter: number } | null = null;
  if (chapter > 1) {
    // Previous chapter in the same book
    prev = { book: bookNumber, chapter: chapter - 1 };
  } else if (currentBookIndex > 0) {
    // Last chapter of the previous book
    const prevBook = bibleBooks[currentBookIndex - 1];
    prev = { book: prevBook.number, chapter: prevBook.chapters };
  }

  // Next chapter
  let next: { book: string, chapter: number } | null = null;
  if (chapter < currentBook.chapters) {
    // Next chapter in the same book
    next = { book: bookNumber, chapter: chapter + 1 };
  } else if (currentBookIndex < bibleBooks.length - 1) {
    // First chapter of the next book
    const nextBook = bibleBooks[currentBookIndex + 1];
    next = { book: nextBook.number, chapter: 1 };
  }

  return { prev, next };
}
