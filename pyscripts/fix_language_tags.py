import glob
import yaml
import re
from langdetect import detect

def detect_language(text):
    try:
        lang = detect(text)
    except Exception as e:
        print(f"Dil tespit hatası: {e}")
        lang = None
    return lang

def fix_language_tag(filepath):
    with open(filepath, encoding="utf-8") as f:
        content = f.read()
    match = re.match(r"^---\n(.*?)\n---\n(.*)", content, re.DOTALL)
    if not match:
        print(f"YAML front matter bulunamadı: {filepath}")
        return
    front_matter = yaml.safe_load(match.group(1))
    body = match.group(2)
    tags = front_matter.get("tags", [])
    lang = detect_language(body[:1000])  # ilk 1000 karakteri kullan
    # Dil etiketini düzelt
    if lang == "en":
        if "english" not in tags:
            tags = [t for t in tags if t != "turkish"]
            tags.insert(0, "english")
    elif lang == "tr":
        if "turkish" not in tags:
            tags = [t for t in tags if t != "english"]
            tags.insert(0, "turkish")
    else:
        print(f"Dil tespit edilemedi veya farklı: {lang} - {filepath}")
    front_matter["tags"] = tags
    new_content = "---\n" + yaml.dump(front_matter, allow_unicode=True) + "---\n" + body
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"Dil etiketi güncellendi: {filepath} -> {tags}")

if __name__ == "__main__":
    for mdfile in glob.glob("_posts/*.md"):
        fix_language_tag(mdfile)
