import os
import re
import requests
from bs4 import BeautifulSoup

BASE_URL = "https://www.liriocatolico.com.br/biblia_online/biblia_matos_soares/"

def get_soup(url):
    response = requests.get(url)
    response.raise_for_status()
    return BeautifulSoup(response.text, "html.parser")

def scrape_book(book_name):
    """
    Scrape all verses from a book's complete page.
    """
    url = BASE_URL + book_name + "/completo/"
    verses = []
    soup = get_soup(url)
    
    # Find all chapter headers (they are in <h2 class="chapter-title">)
    chapters = [h2 for h2 in soup.find_all('h2') if re.search(r'Capítulo\s*\d+', h2.get_text())]
    print(f"Found {len(chapters)} chapters for {book_name}")
    
    for chap_header in chapters:
        chap_text = chap_header.get_text(" ", strip=True)
        chap_match = re.search(r'Capítulo\s*(\d+)', chap_text)
        if not chap_match:
            continue
        chap_num = int(chap_match.group(1))

        verses_in_chapter = []
        sibling = chap_header.find_next_sibling()
        while sibling and not (sibling.name == 'h2' and re.search(r'Capítulo\s*\d+', sibling.get_text())):
            if sibling.name == 'p':
                text = sibling.get_text(" ", strip=True)
                m = re.match(r'^(\d+)\s*(.*)$', text)
                if m:
                    verse_num = int(m.group(1))
                    verse_text = m.group(2).strip()
                    verse_text = re.sub(r'\s+', ' ', verse_text)
                    if verse_text:
                        verses_in_chapter.append((verse_num, verse_text))
            sibling = sibling.find_next_sibling()

        print(f"Chapter {chap_num}: {len(verses_in_chapter)} verses")
        if verses_in_chapter:
            print(f"  sample: {verses_in_chapter[0][0]} {verses_in_chapter[0][1][:120]}...")

        for verse_num, verse_text in verses_in_chapter:
            verses.append(f"{chap_num}\t{verse_num}\t{verse_text}")

    return verses

def save_book(latin_name, verses, folder="matos-soares"):
    os.makedirs(folder, exist_ok=True)
    filepath = os.path.join(folder, latin_name)  # File without extension
    with open(filepath, "w", encoding="utf-8") as f:
        for line in verses:
            f.write(line + "\n")
    print(f"Saved {latin_name} ({len(verses)} verses) to {filepath}")

# Mapping from Latin names to Portuguese site book names
correspondance = {
    "Genesis": "genesis",
    "Exodus": "exodo",
    "Leviticus": "levitico",
    "Numeri": "numeros",
    "Deuteronomium": "deuteronomio",
    "Josue": "josue",
    "Judicum": "juizes",
    "Ruth": "rute",
    "Regum 1": "i-samuel",
    "Regum 2": "ii-samuel",
    "Regum 3": "i-reis",
    "Regum 4": "ii-reis",
    "Paralipomenon 1": "i-cronicas",
    "Paralipomenon 2": "ii-cronicas",
    "Esdræ": "esdras",
    "Nehemiæ": "neemias",
    "Esther": "ester",
    "Tobiæ": "tobias",
    "Judith": "judite",
    "Machabæorum 1": "i-macabeus",
    "Machabæorum 2": "ii-macabeus",
    "Job": "jo",
    "Psalmi": "salmos",
    "Proverbia": "proverbios",
    "Ecclesiastes": "eclesiastes",
    "Canticum Canticorum": "cantico-dos-canticos",
    "Sapientia": "sabedoria",
    "Ecclesiasticus": "eclesiastico",
    "Isaias": "isaias",
    "Jeremias": "jeremias",
    "Lamentationes": "lamentacoes",
    "Baruch": "baruc",
    "Ezechiel": "ezequiel",
    "Daniel": "daniel",
    "Osee": "oseias",
    "Joel": "joel",
    "Amos": "amos",
    "Abdias": "abdias",
    "Jonas": "jonas",
    "Michæa": "miqueias",
    "Nahum": "naum",
    "Habacuc": "habacuc",
    "Sophonias": "sofonias",
    "Aggæus": "ageu",
    "Zacharias": "zacarias",
    "Malachias": "malaquias",
    
    "Matthæus": "sao-mateus",
    "Marcus": "sao-marcos",
    "Lucas": "sao-lucas",
    "Joannes": "sao-joao",
    "Actus Apostolorum": "atos-dos-apostolos",
    "Ad Romanos": "romanos",
    "Ad Corinthios 1": "i-corintios",
    "Ad Corinthios 2": "ii-corintios",
    "Ad Galatas": "galatas",
    "Ad Ephesios": "efesios",
    "Ad Philippenses": "filipenses",
    "Ad Colossenses": "colossenses",
    "Ad Thessalonicenses 1": "i-tessalonicenses",
    "Ad Thessalonicenses 2": "ii-tessalonicenses",
    "Ad Timotheum 1": "i-timoteo",
    "Ad Timotheum 2": "ii-timoteo",
    "Ad Titum": "tito",
    "Ad Philemonem": "filemon",
    "Ad Hebræos": "hebreus",
    "Jacobi": "sao-tiago",
    "Petri 1": "i-sao-pedro",
    "Petri 2": "ii-sao-pedro",
    "Joannis 1": "i-sao-joao",
    "Joannis 2": "ii-sao-joao",
    "Joannis 3": "iii-sao-joao",
    "Judæ": "sao-judas",
    "Apocalypsis": "apocalipse"
}

def scrape_all_books():
    folder = "."
    os.makedirs(folder, exist_ok=True)
    
    for latin_name, pt_name in correspondance.items():
        print(f"Scraping '{latin_name}' from {pt_name}")
        verses = scrape_book(pt_name)
        save_book(latin_name, verses, folder=folder)

if __name__ == "__main__":
    scrape_all_books()