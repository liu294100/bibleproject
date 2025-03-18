import requests
import json
import os
import time
import random
from typing import Dict, List
from concurrent.futures import ThreadPoolExecutor, as_completed
from tqdm import tqdm

# 配置项
BASE_URL = "https://bible-api.com/data/cuv"
OUTPUT_DIR = "../src/lib/bible-text-data"
BIBLE_DATA_FILE = "../src/lib/bible-text-data.ts"
MAX_WORKERS = 3  # 降低最大线程数以避免请求限制

# 确保输出目录存在
os.makedirs(OUTPUT_DIR, exist_ok=True)

def fetch_chapter_data(book_id: str, chapter: int, max_retries: int = 5) -> Dict:
    """从bible-api.com获取章节数据，使用指数退避重试机制"""
    for attempt in range(max_retries):
        try:
            # 在每次请求前添加基础延迟
            time.sleep(2)
            response = requests.get(f"{BASE_URL}/{book_id}/{chapter}")
            response.raise_for_status()
            return response.json()
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 429:  # Too Many Requests
                # 使用指数退避增加等待时间
                wait_time = (2 ** attempt) + random.uniform(0, 1)
                time.sleep(wait_time)
                continue
            if attempt == max_retries - 1:
                raise e
        except Exception as e:
            if attempt == max_retries - 1:
                raise e
            time.sleep(2)

def generate_chapter_file(book_id: str, chapter: int, data: Dict) -> str:
    """生成单个章节的TypeScript文件"""
    verses = []
    for verse in data.get('verses', []):
        verses.append({
            'verse': verse['verse'],
            'text': verse['text'].strip(),
            'isJesusWords': False  # 默认为非耶稣的话
        })

    content = f"""// 自动生成的文件 - 请勿手动修改

export const {book_id.lower()}{chapter} = {{
    verses: {json.dumps(verses, ensure_ascii=False, indent=2)}
}};
"""

    filename = f"{book_id.lower()}{chapter}.ts"
    file_path = os.path.join(OUTPUT_DIR, filename)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    return f"{book_id.lower()}{chapter}"

def process_chapter(args) -> str:
    """处理单个章节的数据获取和文件生成"""
    book_id, chapter = args
    filename = f"{book_id.lower()}{chapter}.ts"
    file_path = os.path.join(OUTPUT_DIR, filename)
    
    # 检查文件是否已存在
    if os.path.exists(file_path):
        print(f"跳过已存在的文件: {filename}")
        return f"{book_id.lower()}{chapter}"
        
    try:
        data = fetch_chapter_data(book_id, chapter)
        return generate_chapter_file(book_id, chapter, data)
    except Exception as e:
        print(f"处理 {book_id} 第 {chapter} 章时出错: {e}")
        return ""

def update_bible_data_file(generated_files: List[str]) -> None:
    """更新bible-text-data.ts文件"""
    # 过滤掉空字符串
    generated_files = [f for f in generated_files if f]
    
    imports = []
    exports = []

    for file in generated_files:
        module_name = os.path.splitext(file)[0]
        imports.append(f"import {{ {module_name} }} from './bible-text-data/{module_name}';")
        exports.append(module_name)

    content = f"""// 自动生成的文件 - 请勿手动修改

{"\n".join(imports)}

export const bibleTextData = {{
    {",\n    ".join(f"'{module_name}': {module_name}" for module_name in exports)}
}};
"""

    with open(BIBLE_DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    # 定义要生成的书卷和章节（完整的66卷圣经）
    books_to_generate = [
        ('GEN', 50),  # 创世记
        ('EXO', 40),  # 出埃及记
        ('LEV', 27),  # 利未记
        ('NUM', 36),  # 民数记
        ('DEU', 34),  # 申命记
        ('JOS', 24),  # 约书亚记
        ('JDG', 21),  # 士师记
        ('RUT', 4),   # 路得记
        ('1SA', 31),  # 撒母耳记上
        ('2SA', 24),  # 撒母耳记下
        ('1KI', 22),  # 列王纪上
        ('2KI', 25),  # 列王纪下
        ('1CH', 29),  # 历代志上
        ('2CH', 36),  # 历代志下
        ('EZR', 10),  # 以斯拉记
        ('NEH', 13),  # 尼希米记
        ('EST', 10),  # 以斯帖记
        ('JOB', 42),  # 约伯记
        ('PSA', 150), # 诗篇
        ('PRO', 31),  # 箴言
        ('ECC', 12),  # 传道书
        ('SNG', 8),   # 雅歌
        ('ISA', 66),  # 以赛亚书
        ('JER', 52),  # 耶利米书
        ('LAM', 5),   # 耶利米哀歌
        ('EZK', 48),  # 以西结书
        ('DAN', 12),  # 但以理书
        ('HOS', 14),  # 何西阿书
        ('JOL', 3),   # 约珥书
        ('AMO', 9),   # 阿摩司书
        ('OBA', 1),   # 俄巴底亚书
        ('JON', 4),   # 约拿书
        ('MIC', 7),   # 弥迦书
        ('NAM', 3),   # 那鸿书
        ('HAB', 3),   # 哈巴谷书
        ('ZEP', 3),   # 西番雅书
        ('HAG', 2),   # 哈该书
        ('ZEC', 14),  # 撒迦利亚书
        ('MAL', 4),   # 玛拉基书
        ('MAT', 28),  # 马太福音
        ('MRK', 16),  # 马可福音
        ('LUK', 24),  # 路加福音
        ('JHN', 21),  # 约翰福音
        ('ACT', 28),  # 使徒行传
        ('ROM', 16),  # 罗马书
        ('1CO', 16),  # 哥林多前书
        ('2CO', 13),  # 哥林多后书
        ('GAL', 6),   # 加拉太书
        ('EPH', 6),   # 以弗所书
        ('PHP', 4),   # 腓立比书
        ('COL', 4),   # 歌罗西书
        ('1TH', 5),   # 帖撒罗尼迦前书
        ('2TH', 3),   # 帖撒罗尼迦后书
        ('1TI', 6),   # 提摩太前书
        ('2TI', 4),   # 提摩太后书
        ('TIT', 3),   # 提多书
        ('PHM', 1),   # 腓利门书
        ('HEB', 13),  # 希伯来书
        ('JAS', 5),   # 雅各书
        ('1PE', 5),   # 彼得前书
        ('2PE', 3),   # 彼得后书
        ('1JN', 5),   # 约翰一书
        ('2JN', 1),   # 约翰二书
        ('3JN', 1),   # 约翰三书
        ('JUD', 1),   # 犹大书
        ('REV', 22)   # 启示录
    ]

    # 准备所有需要处理的章节
    all_chapters = []
    total_chapters = 0
    for book_id, num_chapters in books_to_generate:
        for chapter in range(1, num_chapters + 1):
            all_chapters.append((book_id, chapter))
            total_chapters += 1

    generated_files = []
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        # 提交所有任务并使用tqdm显示进度
        futures = [executor.submit(process_chapter, chapter) for chapter in all_chapters]
        
        # 使用tqdm显示进度
        with tqdm(total=total_chapters, desc="生成圣经数据") as pbar:
            for future in as_completed(futures):
                result = future.result()
                if result:  # 只添加成功生成的文件
                    generated_files.append(result)
                pbar.update(1)

    print("\n正在更新数据索引文件...")
    update_bible_data_file(generated_files)
    print("所有文件生成完成！")

if __name__ == "__main__":
    main()