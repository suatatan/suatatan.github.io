import re
from pathlib import Path

# Read empty posts list
empty_posts_file = Path(r'd:\suat\repo_candidates\suat-blog\scripts\empty_posts.txt')
if not empty_posts_file.exists():
    print("Boş postlar listesi bulunamadı!")
    exit(1)

empty_posts = empty_posts_file.read_text(encoding='utf-8').strip().split('\n')
print(f"{len(empty_posts)} boş post bulundu, kaldırılıyor...")

# Convert paths to URLs
empty_urls = []
for post_path in empty_posts:
    # Convert Windows path to URL path (2014\11\15\1218.html -> /2014/11/15/1218.html)
    url_path = '/' + post_path.replace('\\', '/')
    empty_urls.append(url_path)

# Update index.html and archive.html
for filename in ['index.html', 'archive.html']:
    file_path = Path(r'd:\suat\repo_candidates\suat-blog\_site') / filename
    
    if not file_path.exists():
        continue
    
    content = file_path.read_text(encoding='utf-8')
    original_content = content
    removed_count = 0
    
    # Remove list items containing empty post links
    for url in empty_urls:
        # Pattern to match <li>...<a href="url">...</a>...</li>
        pattern = rf'<li[^>]*>.*?<a[^>]*href="{re.escape(url)}"[^>]*>.*?</a>.*?</li>'
        matches = len(re.findall(pattern, content, re.DOTALL | re.IGNORECASE))
        content = re.sub(pattern, '', content, flags=re.DOTALL | re.IGNORECASE)
        removed_count += matches
    
    if content != original_content:
        file_path.write_text(content, encoding='utf-8')
        print(f"✅ {filename}: {removed_count} boş post linki kaldırıldı")

print(f"\n✅ Boş postlar listeden temizlendi")
print("Not: Boş post HTML dosyaları hala _site klasöründe, ama artık listelenmiyorlar")
