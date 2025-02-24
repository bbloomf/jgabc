import os
import re
import requests
from bs4 import BeautifulSoup

BASE_URL = "https://www.aelf.org"

def get_soup(url):
    response = requests.get(url)
    response.raise_for_status()
    return BeautifulSoup(response.text, "html.parser")

def scrape_book(book_url):
    """
    Pour un URL donné (d'un livre), récupère l'ensemble des pages de chapitres.
    Pour chaque chapitre, le texte est extrait depuis la div "block-single-reading" ;
    chaque verset est repéré grâce au <span class="verse_number">.
    Chaque ligne de résultat aura le format : "chapitre   verset   texte".
    Le numéro du verset est formaté sur 2 caractères (ajout d'un espace pour les nombres à un chiffre).
    """
    verses = []
    soup = get_soup(book_url)
    chapter_links = {}

    # Récupération des liens de chapitres depuis le menu déroulant
    for a in soup.select("div.dropdown-menu a"):
        link_text = a.get_text(strip=True)
        try:
            chap_num = int(re.search(r'\d+', link_text).group())
        except (ValueError, AttributeError):
            continue
        link = a["href"]
        if not link.startswith("http"):
            link = BASE_URL + link
        chapter_links[chap_num] = link

    # Si le premier chapitre n'est pas trouvé, utiliser l'URL initiale
    if 1 not in chapter_links:
        print("Chapitre 1 non trouvé, ajout de l'URL initial")
        chapter_links[1] = book_url

    # Recherche du bouton "Dernier" pour obtenir le dernier chapitre
    last_chap_link = None
    for a in soup.find_all("a", class_="btn btn-default btn-aelf btn-red"):
        if "Dernier" in a.get_text():
            last_chap_link = a
            break
    if last_chap_link:
        last_link = last_chap_link["href"]
        m = re.search(r'/(\d+)$', last_link)
        if m:
            last_chap_num = int(m.group(1))
            chapter_links[last_chap_num] = last_link if last_link.startswith("http") else BASE_URL + last_link
        else:
            print("Impossible d'extraire le numéro de chapitre du lien Dernier:", last_link)

    if not chapter_links:
        print(f"Aucun chapitre trouvé pour {book_url}")
        return verses

    # Scraping des chapitres par ordre croissant
    for chap in sorted(chapter_links.keys()):
        chap_url = chapter_links[chap]
        print(f"Scraping du chapitre {chap} : {chap_url}")
        chap_soup = get_soup(chap_url)
        reading_div = chap_soup.select_one("div.block-single-reading")
        if not reading_div:
            print(f"Aucun texte trouvé pour le chapitre {chap}")
            continue

        # Extraction des versets pour ce chapitre
        for p in reading_div.find_all("p"):
            verse_number_elem = p.select_one("span.verse_number, span.text-danger")
            verse_text = p.get_text(" ", strip=True)
            verse_text = verse_text.replace("\n", " ")
            verse_text = re.sub(r'\s+', ' ', verse_text).strip()

            if verse_number_elem:
                verse_number_raw = verse_number_elem.get_text(strip=True)
                try:
                    verse_number_int = int(verse_number_raw)
                    verse_text = re.sub(rf'^0*{verse_number_int}\s*', '', verse_text).strip()
                    verses.append(f"{chap}\t{verse_number_int}\t{verse_text}")
                except ValueError:
                    print(f"Erreur de conversion du numéro de verset: {verse_number_raw}")
                    
    return verses

def save_book(latin_name, verses, folder="bible_scraped"):
    os.makedirs(folder, exist_ok=True)
    filepath = os.path.join(folder, latin_name)  # Fichier sans extension
    with open(filepath, "w", encoding="utf-8") as f:
        for line in verses:
            f.write(line + "\n")
    print(f"Enregistré {latin_name} ({len(verses)} versets) dans {filepath}")

# Dictionnaire de correspondance : clé = nom français sur le site,
# valeur = (nom latin, lien relatif vers le premier chapitre)
correspondance = {
    "Livre de la Genèse": ("Genesis", "/bible/Gn/1"),
    "Livre de l'Exode": ("Exodus", "/bible/Ex/1"),
    "Livre du Lévitique": ("Leviticus", "/bible/Lv/1"),
    "Livre des Nombres": ("Numeri", "/bible/Nb/1"),
    "Livre du Deutéronome": ("Deuteronomium", "/bible/Dt/1"),
    "Livre de Josué": ("Josue", "/bible/Jos/1"),
    "Livre des Juges": ("Judicum", "/bible/Jg/1"),
    "Livre de Ruth": ("Ruth", "/bible/Rt/1"),
    "Premier livre de Samuel": ("Regum 1", "/bible/1S/1"),
    "Deuxième livre de Samuel": ("Regum 2", "/bible/2S/1"),
    "Premier livre des Rois": ("Regum 3", "/bible/1R/1"),
    "Deuxième livre des Rois": ("Regum 4", "/bible/2R/1"),
    "Premier livre des Chroniques": ("Paralipomenon 1", "/bible/1Ch/1"),
    "Deuxième livre des Chroniques": ("Paralipomenon 2", "/bible/2Ch/1"),
    "Livre d'Esdras": ("Esdræ", "/bible/Esd/1"),
    "Livre de Néhémie": ("Nehemiæ", "/bible/Ne/1"),
    "Livre de Tobie": ("Tobiæ", "/bible/Tb/1"),
    "Livre de Judith": ("Judith", "/bible/Jdt/1"),
    "Livre d'Esther": ("Esther", "/bible/Est/1"),
    "Premier Livre des Martyrs d'Israël": ("Machabæorum 1", "/bible/1M/1"),
    "Deuxième Livre des Martyrs d'Israël": ("Machabæorum 2", "/bible/2M/1"),
    "Livre de Job": ("Job", "/bible/Jb/1"),
    "Livre des Proverbes": ("Proverbia", "/bible/Pr/1"),
    "L'Ecclésiaste": ("Ecclesiastes", "/bible/Qo/1"),
    "Cantique des cantiques": ("Canticum Canticorum", "/bible/Ct/1"),
    "Livre de la Sagesse": ("Sapientia", "/bible/Sg/1"),
    "Livre de Ben Sira le Sage": ("Ecclesiasticus", "/bible/Si/1"),
    "Livre d'Isaïe": ("Isaias", "/bible/Is/1"),
    "Livre de Jérémie": ("Jeremias", "/bible/Jr/1"),
    "Livre des lamentations de Jérémie": ("Lamentationes", "/bible/Lm/1"),
    "Livre de Baruch": ("Baruch", "/bible/Ba/1"),
    "Livre d'Ezekiel": ("Ezechiel", "/bible/Ez/1"),
    "Livre de Daniel": ("Daniel", "/bible/Dn/1"),
    "Livre d'Osée": ("Osee", "/bible/Os/1"),
    "Livre de Joël": ("Joel", "/bible/Jl/1"),  # Correction ici
    "Livre d'Amos": ("Amos", "/bible/Am/1"),
    "Livre d'Abdias": ("Abdias", "/bible/Ab/1"),
    "Livre de Jonas": ("Jonas", "/bible/Jon/1"),
    "Livre de Michée": ("Michæa", "/bible/Mi/1"),
    "Livre de Nahum": ("Nahum", "/bible/Na/1"),
    "Livre d'Habaquc": ("Habacuc", "/bible/Ha/1"),  # Correction ici
    "Livre de Sophonie": ("Sophonias", "/bible/So/1"),
    "Livre d'Aggée": ("Aggæus", "/bible/Ag/1"),
    "Livre de Zacharie": ("Zacharias", "/bible/Za/1"),
    "Livre de Malachie": ("Malachias", "/bible/Ml/1"),
    
    "Évangile selon Matthieu": ("Matthæus", "/bible/Mt/1"),
    "Évangile selon Marc": ("Marcus", "/bible/Mc/1"),
    "Évangile selon Luc": ("Lucas", "/bible/Lc/1"),
    "Évangile selon Jean": ("Joannes", "/bible/Jn/1"),
    "Livre des Actes des Apôtres": ("Actus Apostolorum", "/bible/Ac/1"),
    "Lettre aux Romains": ("Ad Romanos", "/bible/Rm/1"),
    "Première lettre aux Corinthiens": ("Ad Corinthios 1", "/bible/1Co/1"),
    "Deuxième lettre aux Corinthiens": ("Ad Corinthios 2", "/bible/2Co/1"),
    "Lettre aux Galates": ("Ad Galatas", "/bible/Ga/1"),
    "Lettre aux Éphésiens": ("Ad Ephesios", "/bible/Ep/1"),
    "Lettre aux Philippiens": ("Ad Philippenses", "/bible/Ph/1"),
    "Lettre aux Colossiens": ("Ad Colossenses", "/bible/Col/1"),
    "Première lettre aux Thessaloniciens": ("Ad Thessalonicenses 1", "/bible/1Th/1"),
    "Deuxième lettre aux Thessaloniciens": ("Ad Thessalonicenses 2", "/bible/2Th/1"),
    "Première lettre à Timothée": ("Ad Timotheum 1", "/bible/1Tm/1"),
    "Deuxième lettre à Timothée": ("Ad Timotheum 2", "/bible/2Tm/1"),
    "Lettre à Tite": ("Ad Titum", "/bible/Tt/1"),
    "Lettre à Philémon": ("Ad Philemonem", "/bible/Phm/1"),  # Ajout ici
    "Lettre aux Hébreux": ("Ad Hebræos", "/bible/He/1"),
    "Lettre de Jacques": ("Jacobi", "/bible/Jc/1"),
    "Première lettre de Pierre": ("Petri 1", "/bible/1P/1"),
    "Deuxième lettre de Pierre": ("Petri 2", "/bible/2P/1"),
    "Première lettre de Jean": ("Joannis 1", "/bible/1Jn/1"),
    "Deuxième lettre de Jean": ("Joannis 2", "/bible/2Jn/1"),  # Correction ici
    "Troisième lettre de Jean": ("Joannis 3", "/bible/3Jn/1"),  # Correction ici
    "Lettre de Jude": ("Judæ", "/bible/Jude/1"),  # Correction ici
    "Livre de l'Apocalypse": ("Apocalypsis", "/bible/Ap/1"),

    "Psaumes": ("Psalmi", "/bible/Ps/1")
}

def scrape_all_books():
    folder = "aelf"
    os.makedirs(folder, exist_ok=True)
    
    for french_name, (latin_name, relative_url) in correspondance.items():
        full_url = BASE_URL + relative_url
        print(f"\nScraping '{french_name}' ({latin_name}) depuis l'URL : {full_url}")
        verses = scrape_book(full_url)
        save_book(latin_name, verses, folder=folder)

if __name__ == "__main__":
    scrape_all_books()
