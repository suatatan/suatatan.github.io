import re
from pathlib import Path

# Read the archive.html file
archive_path = Path(r'd:\suat\repo_candidates\suat-blog\_site\archive.html')
content = archive_path.read_text(encoding='utf-8')

# Change title
content = re.sub(r'<title>.*?</title>', '<title>Blog Arşivi | Suat ATAN Blogu</title>', content)

# Remove the archive link from the posts list (since we're already on archive page)
content = re.sub(r'<li style="margin-top: 2rem.*?</li>', '', content, flags=re.DOTALL)

# Change h2 to "Tüm Yazılar"
content = content.replace('<h2>Yazılar</h2>', '<h2>Tüm Yazılar (Arşiv)</h2>')

# Write back
archive_path.write_text(content, encoding='utf-8')
print("✅ archive.html created with all posts")
