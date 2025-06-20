import os
import requests
import glob
import re
import yaml

print("OpenAI ile otomatik etiketleme başlatılıyor...")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"
OPENAI_MODEL = "gpt-3.5-turbo"  # veya başka bir model ismi kullanabilirsiniz


def get_tags_from_openai(text):
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
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": OPENAI_MODEL,
        "messages": [
            {"role": "system", "content": "Sen bir etiketleme asistanısın."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 50,
        "temperature": 0.2
    }
    response = requests.post(OPENAI_API_URL, headers=headers, json=data)
    result = response.json()
    tags = result["choices"][0]["message"]["content"].strip()
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
    tags = get_tags_from_openai(body)
    front_matter["tags"] = tags
    new_content = "---\n" + yaml.dump(front_matter, allow_unicode=True) + "---\n" + body
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"Etiketler güncellendi: {filepath}")

if __name__ == "__main__":
    for mdfile in glob.glob("_posts/*.md"):
        update_tags(mdfile)