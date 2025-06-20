import glob
import os
import hashlib
import re
import difflib

def get_body(content):
    match = re.match(r"^---\n(.*?)\n---\n(.*)", content, re.DOTALL)
    if match:
        return match.group(2).strip()
    return content.strip()

def is_similar(a, b, threshold=0.9):
    return difflib.SequenceMatcher(None, a, b).ratio() >= threshold

def main():
    files = glob.glob("_posts/*.md")
    bodies = []
    keep_files = []
    for file in files:
        with open(file, encoding="utf-8") as f:
            content = f.read()
        body = get_body(content)
        found_similar = False
        for i, existing_body in enumerate(bodies):
            if is_similar(body, existing_body):
                print(f"Çok benzer içerik bulundu, siliniyor: {file}")
                os.remove(file)
                found_similar = True
                break
        if not found_similar:
            bodies.append(body)
            keep_files.append(file)
    print("Benzer içerikler temizlendi.")

if __name__ == "__main__":
    main()
