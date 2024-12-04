import os
import requests
from bs4 import BeautifulSoup
from typing import List, Tuple, Dict
import time
import logging
from pathlib import Path
import re

class BibleBooks:
    BOOKS = [
        ("Abdias", "obad/1:1-21"),
        ("Actus Apostolorum", "acts/1:1-28:31"),
        ("Ad Colossenses", "col/1:1-4:18"),
        ("Ad Corinthios 1", "1cor/1:1-16:24"),
        ("Ad Corinthios 2", "2cor/1:1-13:13"),
        ("Ad Ephesios", "eph/1:1-6:24"),
        ("Ad Galatas", "gal/1:1-6:18"),
        ("Ad Hebræos", "heb/1:1-13:25"),
        ("Ad Philemonem", "phmn/1:1-25"),
        ("Ad Philippenses", "phi/1:1-4:23"),
        ("Ad Romanos", "rom/1:1-16:27"),
        ("Ad Thessalonicenses 1", "1th/1:1-5:28"),
        ("Ad Thessalonicenses 2", "2th/1:1-3:18"),
        ("Ad Timotheum 1", "1tim/1:1-6:21"),
        ("Ad Timotheum 2", "2tim/1:1-4:22"),
        ("Ad Titum", "titus/1:1-3:15"),
        ("Aggæus", "hag/1:1-2:23"),
        ("Amos", "amos/1:1-9:15"),
        ("Apocalypsis", "rev/1:1-22:21"),
        ("Baruch", "bar/1:1-6:73"),
        ("Canticum Canticorum", "ssol/1:1-8:14"),
        ("Daniel", "dan/1:1-12:13"),
        ("Deuteronomium", "deu/1:1-34:12"),
        ("Ecclesiastes", "eccl/1:1-12:14"),
        ("Ecclesiasticus", "sir/1:1-51:30"),
        ("Esdræ", "ezra/1:1-10:44"),
        ("Esther", "est/1:1-10:3"),
        ("Exodus", "exo/1:1-40:38"),
        ("Ezechiel", "eze/1:1-48:35"),
        ("Genesis", "ge/1:1-50:26"),
        ("Habacuc", "hab/1:1-3:19"),
        ("Isaias", "isa/1:1-66:24"),
        ("Jacobi", "jas/1:1-5:20"),
        ("Jeremias", "jer/1:1-52:34"),
        ("Joannes", "john/1:1-21:25"),
        ("Joannis 1", "1jn/1:1-5:21"),
        ("Joannis 2", "2jn/1:1-13"),
        ("Joannis 3", "3jn/1:1-14"),
        ("Job", "job/1:1-42:17"),
        ("Joel", "joel/1:1-3:21"),
        ("Jonas", "jonah/1:1-4:11"),
        ("Josue", "josh/1:1-24:33"),
        ("Judæ", "jude/1:1-25"),
        ("Judicum", "jdgs/1:1-21:25"),
        ("Judith", "jdt/1:1-16:25"),
        ("Lamentationes", "lam/1:1-5:22"),
        ("Leviticus", "lev/1:1-27:34"),
        ("Lucas", "luke/1:1-24:53"),
        ("Machabæorum 1", "1ma/1:1-16:24"),
        ("Machabæorum 2", "2ma/1:1-15:39"),
        ("Malachias", "mal/1:1-4:6"),
        ("Marcus", "mark/1:1-16:20"),
        ("Matthæus", "mat/1:1-28:20"),
        ("Michæa", "mic/1:1-7:20"),
        ("Nahum", "nahum/1:1-3:19"),
        ("Nehemiæ", "neh/1:1-13:31"),
        ("Numeri", "num/1:1-36:13"),
        ("Osee", "hos/1:1-14:10"),
        ("Paralipomenon 1", "1chr/1:1-29:30"),
        ("Paralipomenon 2", "2chr/1:1-36:23"),
        ("Petri 1", "1pet/1:1-5:14"),
        ("Petri 2", "2pet/1:1-3:18"),
        ("Proverbia", "prv/1:1-31:31"),
        ("Psalmi", "psa/1:1-150:6"),
        ("Regum 1", "1sm/1:1-31:13"),
        ("Regum 2", "2sm/1:1-24:25"),
        ("Regum 3", "1ki/1:1-22:53"),
        ("Regum 4", "2ki/1:1-25:30"),
        ("Ruth", "ruth/1:1-4:22"),
        ("Sapientia", "wis/1:1-19:22"),
        ("Sophonias", "zep/1:1-3:20"),
        ("Tobiæ", "tob/1:1-14:15"),
        ("Zacharias", "zep/1:1-14:21")
    ]

class BibleVersions:
    VERSIONS = {
        'cus': 'Chinese Union Simplified 简体和合本',
        'cut': 'Chinese Union Traditional 繁體和合本',
        'asv': 'English American Standard Version',
        'bbe': 'English Bible in Basic English',
        'kjv': 'English King James Version',
        'niv': 'English New International Version',
        'gmv': 'Greek Modern Version σύγχρονη εκδοχή',
        'lxx': 'Greek Septuagint Version Εβδομήκοντα εκδοχή',
        'gtr': 'Greek Textus Receptus Κείμενο Αποδεκτές',
        'gwh': 'Greek Westcott Hort 1881 NA27/UBS4 με παρα λλαγές',
        'hmv': 'Hebrew Modern Version הגרסה מודרנית',
        'hac': 'Hebrew Aleppo Codex כֶּתֶר אֲרָם צוֹבָא',
        'bhs': 'Hebrew Biblia Hebraica Stuttgartensia הבראיקה',
        'hwl': 'Hebrew Westminster Leningrad Codex וסטמינסטר לנינגרד קודקס',
        'lvc': 'Latin Vulgata Clementina Vulgatae Clementina',
        'lvn': 'Latin New Vulgata Nova Vulgatae',
        'fda': 'French Français Darby',
        'fdm': 'French Français David Martin',
        'fos': 'French Français Ostervald',
        'lsg': 'French Français Louis Segond',
        'glm': 'German Deutsch Luther Modern',
        'glo': 'German Deutsch Luther Original',
        'gel': 'German Deutsch Elberfelder',
        'gsc': 'German Deutsch Schlachter',
        'jcl': 'Japanese Classical 文語訳',
        'jco': 'Japanese Colloquial 口語訳',
        'kor': 'Korean 한국어 성경'
    }

    @classmethod
    def get_version_name(cls, version_code: str) -> str:
        return cls.VERSIONS.get(version_code, 'Unknown Version')

    @classmethod
    def list_versions(cls) -> None:
        for code, name in cls.VERSIONS.items():
            print(f"{code}: {name}")

class BibleScraper:
    def __init__(self, version: str):
        if version not in BibleVersions.VERSIONS:
            raise ValueError(f"Invalid version code: {version}")
        
        self.version = version
        self.version_name = BibleVersions.get_version_name(version)
        self.output_dir = Path(self.version_name)
        self.base_url = "http://bibletool.net/quote.php?"
        self.session = requests.Session()
        self.failed_books = []  # List to store failed books
        self.empty_books = []  # List to store books with empty content
        
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(f'bible_scraper_{version}.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)
        
    def setup_output_directory(self) -> None:
        self.output_dir.mkdir(parents=True, exist_ok=True)

    def scrape_books(self) -> None:
        self.setup_output_directory()
        
        for book_name, book_code in BibleBooks.BOOKS:
            try:
                self.logger.info(f"Processing book: {book_name}")
                content = self.fetch_content(book_code)
                
                if not content.strip():
                    self.empty_books.append(book_name)  # Track empty content books
                    self.logger.warning(f"Content for {book_name} is empty. Skipping creation.")
                else:
                    self.save_content(book_name, content)
                time.sleep(1)  # Polite delay between requests
                
            except Exception as e:
                self.logger.error(f"Failed to process book {book_name}: {str(e)}")
                self.failed_books.append(book_name)  # Track failed books
                continue
        
        # Summarize the results (log only)
        self.summarize_results()

    def summarize_results(self) -> None:
        # Log the summary of empty files and failed books
        if self.empty_books:
            self.logger.warning(f"Books with empty content: {', '.join(self.empty_books)}")

        if self.failed_books:
            self.logger.warning(f"Failed to process books: {', '.join(self.failed_books)}")

        if not self.empty_books and not self.failed_books:
            self.logger.info("All books processed successfully with content.")

    def format_verses(self, text: str) -> str:
        text = " ".join(text.split())
        verses = []
        pattern = r'(\d+):(\d+)(.+?)(?=\d+:\d+|$)'
        matches = re.finditer(pattern, text)
        
        for match in matches:
            chapter = match.group(1)
            verse = match.group(2)
            content = match.group(3).strip()
            formatted_verse = f"{chapter}\t{verse}\t{content}"
            verses.append(formatted_verse)
        
        return "\n".join(verses)

    def fetch_content(self, book_code: str) -> str:
        max_retries = 5
        retry_delay = 1

        for attempt in range(max_retries):
            try:
                # Construct the full code with the version
                full_code = f"{self.version}-{book_code}"
                
                url = f"{self.base_url}{full_code}"
                response = self.session.get(url, timeout=10)
                response.raise_for_status()
                
                soup = BeautifulSoup(response.content, "html.parser")
                content = soup.find("body")
                
                if not content:
                    raise ValueError("No content found in response")
                
                text = content.get_text(strip=True)
                return self.format_verses(text)

            except requests.RequestException as e:
                self.logger.warning(f"Attempt {attempt + 1} failed: {str(e)}")
                if attempt < max_retries - 1:
                    time.sleep(retry_delay * (attempt + 1))
                else:
                    raise

    def save_content(self, filename: str, content: str) -> None:
        try:
            if not content.strip():  # Check if content is empty
                self.logger.warning(f"Content for {filename} is empty. Skipping creation.")
                return

            filepath = self.output_dir / filename
            with open(filepath, "w", encoding="utf-8") as file:
                file.write(content)
            self.logger.info(f"Successfully created file: {filename}")

        except IOError as e:
            self.logger.error(f"Error saving file {filename}: {str(e)}")
            raise

def main():
    print("Available Bible versions:")
    BibleVersions.list_versions()
    print("\nEnter 'all' to download all available versions.")
    
    version = input("\nEnter the version code (e.g., 'lsg' for Louis Segond) or 'all': ").lower()
    
    if version == "all":
        for code in BibleVersions.VERSIONS:
            try:
                print(f"Starting download for version: {BibleVersions.get_version_name(code)}")
                scraper = BibleScraper(code)
                scraper.scrape_books()
            except Exception as e:
                logging.error(f"Failed to scrape version {BibleVersions.get_version_name(code)}: {str(e)}")
    else:
        try:
            scraper = BibleScraper(version)
            scraper.scrape_books()
        except ValueError as e:
            print(f"Error: {e}")
        except Exception as e:
            logging.error(f"Scraping failed: {str(e)}")

if __name__ == "__main__":
    main()
