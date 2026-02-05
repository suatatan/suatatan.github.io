import re
from pathlib import Path

# Find all post HTML files
site_path = Path(r'd:\suat\repo_candidates\suat-blog\_site')
html_files = list(site_path.rglob('*.html'))

# Exclude non-post pages
exclude_files = ['index.html', 'archive.html', '404.html', 'offline.html', 'tag.html']
post_files = [f for f in html_files if f.name not in exclude_files and 'tag' not in str(f) and 'pages' not in str(f)]

print(f"Kontrol edilen post sayısı: {len(post_files)}")

empty_posts = []
for post_file in post_files:
    try:
        content = post_file.read_text(encoding='utf-8')
        
        # Remove HTML tags and check if there's actual content
        text_content = re.sub(r'<[^>]+>', '', content)
        text_content = re.sub(r'\s+', ' ', text_content).strip()
        
        # Check for various empty conditions
        is_empty = False
        
        # Very short content (less than 100 characters)
        if len(text_content) < 100:
            is_empty = True
        
        # No paragraphs or very few words
        word_count = len(text_content.split())
        if word_count < 20:
            is_empty = True
        
        # Check if main content area is empty
        # Look for post content div/section
        content_match = re.search(r'<(?:div|article|section)[^>]*(?:class|id)="[^"]*(?:post-content|entry-content|content)[^"]*"[^>]*>(.*?)</(?:div|article|section)>', content, re.DOTALL | re.IGNORECASE)
        if content_match:
            main_content = re.sub(r'<[^>]+>', '', content_match.group(1))
            main_content = re.sub(r'\s+', ' ', main_content).strip()
            if len(main_content) < 50:
                is_empty = True
        
        if is_empty:
            empty_posts.append(str(post_file.relative_to(site_path)))
            
    except Exception as e:
        print(f"Hata: {post_file.name}: {e}")

print(f"\nBulunan boş post sayısı: {len(empty_posts)}")

if empty_posts:
    print("\nBoş postlar:")
    for post in empty_posts[:20]:  # Show first 20
        print(f"  - {post}")
    
    if len(empty_posts) > 20:
        print(f"  ... ve {len(empty_posts) - 20} post daha")
    
    # Save to file for review
    output_file = Path(r'd:\suat\repo_candidates\suat-blog\scripts\empty_posts.txt')
    output_file.write_text('\n'.join(empty_posts), encoding='utf-8')
    print(f"\nTam liste kaydedildi: {output_file}")
else:
    print("\n✅ Boş post bulunamadı!")
