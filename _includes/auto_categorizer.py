import requests
import glob
import re
import yaml

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "llama3"  # veya listede gördüğün başka bir model ismini kullanabilirsin

def get_tags_from_ollama(text):
    prompt = (
        "Aşağıdaki blog yazısı için, sadece uygun etiketleri (virgülle ayırarak) üret:\n"
        "Kurallar:\n"
        "- Yazı İngilizce ise 'english', değilse 'turkish'\n"
        "- Yazı tırnak ile başlayıp bitiyorsa 'cite'\n"
        "- Yazı 3 paragraf veya daha uzunsa 'longread', değilse 'quickread'\n"
        "- Yazı teknolojiyle ilgiliyse 'technology'\n"
        "- Yazı edebiyat, hayat, meditasyon, felsefe veya fikir yazısıysa 'opinion'\n"
        "Yazı:\n"
        f"{text}\n"
        "Etiketler:"
    )
    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL,
            "prompt": prompt,
            "stream": False
        }
    )
    result = response.json()
    tags = result["response"].strip()
    return [t.strip() for t in tags.split(",") if t.strip()]

def update_tags(filepath):
    with open(filepath, encoding="utf-8") as f:
        content = f.read()
    match = re.match(r"^---\n(.*?)\n---\n(.*)", content, re.DOTALL)
    if not match:
        print(f"YAML front matter bulunamadı: {filepath}")
        return
    front_matter = yaml.safe_load(match.group(1))
    body = match.group(2)
    tags = get_tags_from_ollama(body)
    front_matter["tags"] = tags
    new_content = "---\n" + yaml.dump(front_matter, allow_unicode=True) + "---\n" + body
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"Etiketler güncellendi: {filepath}")

if __name__ == "__main__":
    for mdfile in glob.glob("_posts/*.md"):
        update_tags(mdfile)