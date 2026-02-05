import re
from pathlib import Path

# Modern, kitabi CSS
modern_css = """
/* Modern Kitabi Tasarım */
:root {
  --primary-color: #2c3e50;
  --accent-color: #3498db;
  --text-color: #2c3e50;
  --text-light: #7f8c8d;
  --bg-color: #fefefe;
  --border-color: #e1e8ed;
  --hover-bg: #f8f9fa;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Georgia, 'Times New Roman', serif;
  color: var(--text-color);
  background-color: var(--bg-color);
  line-height: 1.8;
  font-size: 18px;
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

/* Header */
header {
  text-align: center;
  margin-bottom: 4rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid var(--border-color);
}

header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
}

header h1 a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

header h1 a:hover {
  color: var(--accent-color);
}

header p {
  color: var(--text-light);
  font-size: 1.1rem;
  font-style: italic;
  margin-top: 0.5rem;
}

/* Sections */
section {
  margin-bottom: 4rem;
}

h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
}

/* Posts List */
ul {
  list-style: none;
}

ul li {
  margin-bottom: 1.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
}

ul li:hover {
  background-color: var(--hover-bg);
  padding-left: 0.5rem;
}

ul li a {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

ul li a:hover {
  color: var(--accent-color);
}

ul li small {
  color: var(--text-light);
  font-size: 0.9rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  margin-left: 0.5rem;
}

/* Archive Link */
.archive-link-container {
  text-align: center;
  margin-top: 3rem;
}

.archive-link-container a {
  display: inline-block;
  padding: 14px 32px;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.archive-link-container a:hover {
  background-color: var(--accent-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Tags */
.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tags-list li {
  margin: 0;
  padding: 0;
  border: none;
}

.tags-list li:hover {
  background: none;
  padding: 0;
}

.tags-list a {
  display: inline-block;
  padding: 6px 14px;
  background-color: #f8f9fa;
  color: var(--text-light);
  text-decoration: none;
  border-radius: 20px;
  font-size: 0.9rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  transition: all 0.2s ease;
  border: 1px solid var(--border-color);
}

.tags-list a:hover {
  background-color: var(--accent-color);
  color: white;
  border-color: var(--accent-color);
}

/* Footer */
footer {
  text-align: center;
  margin-top: 5rem;
  padding-top: 2rem;
  border-top: 2px solid var(--border-color);
  color: var(--text-light);
  font-size: 0.9rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Responsive */
@media (max-width: 768px) {
  body {
    font-size: 16px;
    padding: 2rem 1.5rem;
  }
  
  header h1 {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
}
"""

# Read index.html
index_path = Path(r'd:\suat\repo_candidates\suat-blog\_site\index.html')
content = index_path.read_text(encoding='utf-8')

# Find and replace the style section
style_pattern = r'<style>.*?</style>'
new_style = f'<style>{modern_css}</style>'
content = re.sub(style_pattern, new_style, content, flags=re.DOTALL)

# Wrap archive link in a container div
archive_pattern = r'(<li style="margin-top: 2rem.*?<a href="/archive\.html".*?</a></li>)'
match = re.search(archive_pattern, content, re.DOTALL)
if match:
    old_link = match.group(1)
    new_link = '<div class="archive-link-container"><a href="/archive.html">Tüm Yazıları Görüntüle (Arşiv) →</a></div>'
    content = content.replace(old_link, new_link)

# Update tags list to use class
content = content.replace('<ul>', '<ul class="post-list">', 1)
content = re.sub(r'<h2>Etiketler</h2>\s*<ul>', '<h2>Etiketler</h2>\n<ul class="tags-list">', content)

# Write back
index_path.write_text(content, encoding='utf-8')
print("✅ Modern kitabi tasarım uygulandı (index.html)")

# Do the same for archive.html
archive_path = Path(r'd:\suat\repo_candidates\suat-blog\_site\archive.html')
if archive_path.exists():
    archive_content = archive_path.read_text(encoding='utf-8')
    archive_content = re.sub(style_pattern, new_style, archive_content, flags=re.DOTALL)
    archive_content = archive_content.replace('<ul>', '<ul class="post-list">', 1)
    archive_content = re.sub(r'<h2>Etiketler</h2>\s*<ul>', '<h2>Etiketler</h2>\n<ul class="tags-list">', archive_content)
    archive_path.write_text(archive_content, encoding='utf-8')
    print("✅ Modern kitabi tasarım uygulandı (archive.html)")
