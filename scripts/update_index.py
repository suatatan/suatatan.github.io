import re
from pathlib import Path

# Read the index.html file
index_path = Path(r'd:\suat\repo_candidates\suat-blog\_site\index.html')
content = index_path.read_text(encoding='utf-8')

# Find the posts list section and limit to 10 posts
# Pattern to find the ul with posts
pattern = r'(<h2>Yazılar</h2>\s*<ul>)(.*?)(</ul>)'
match = re.search(pattern, content, re.DOTALL)

if match:
    header = match.group(1)
    posts_html = match.group(2)
    closing = match.group(3)
    
    # Split posts into individual li elements
    posts = re.findall(r'<li>.*?</li>', posts_html, re.DOTALL)
    
    # Keep only first 10 posts
    limited_posts = posts[:10]
    
    # Add archive link
    new_posts_section = header + '\n'.join(limited_posts) + '\n'
    new_posts_section += '<li style="margin-top: 2rem; text-align: center; list-style: none;">'
    new_posts_section += '<a href="/archive.html" style="display: inline-block; padding: 12px 24px; background: #3498db; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Tüm Yazıları Görüntüle (Arşiv) →</a>'
    new_posts_section += '</li>\n' + closing
    
    # Replace in content
    content = content[:match.start()] + new_posts_section + content[match.end():]
    
    # Write back
    index_path.write_text(content, encoding='utf-8')
    print("✅ index.html updated - limited to 10 posts with archive link")
else:
    print("❌ Could not find posts section")
