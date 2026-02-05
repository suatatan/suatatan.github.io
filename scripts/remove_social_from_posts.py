import re
from pathlib import Path

# Find all HTML files in _site directory (posts)
site_path = Path(r'd:\suat\repo_candidates\suat-blog\_site')
html_files = list(site_path.rglob('*.html'))

# Exclude index.html and archive.html (already cleaned)
exclude_files = ['index.html', 'archive.html', '404.html', 'offline.html']
post_files = [f for f in html_files if f.name not in exclude_files and 'tag' not in str(f)]

print(f"Temizlenecek {len(post_files)} dosya bulundu...")

updated_count = 0
for post_file in post_files:
    try:
        content = post_file.read_text(encoding='utf-8')
        original_content = content
        
        # Remove social media sections with various patterns
        patterns = [
            # Share links divs
            r'<div[^>]*class="[^"]*share[^"]*"[^>]*>.*?</div>',
            r'<div[^>]*id="[^"]*share[^"]*"[^>]*>.*?</div>',
            # Social sections
            r'<section[^>]*class="[^"]*social[^"]*"[^>]*>.*?</section>',
            r'<section[^>]*id="[^"]*social[^"]*"[^>]*>.*?</section>',
            # Share buttons
            r'<div[^>]*class="[^"]*share-buttons[^"]*"[^>]*>.*?</div>',
            # Navigation with social
            r'<nav[^>]*class="[^"]*social[^"]*"[^>]*>.*?</nav>',
            # Any element with "social-media" in class
            r'<[^>]*class="[^"]*social-media[^"]*"[^>]*>.*?</[^>]*>',
            # Common social media keywords in comments + following elements
            r'<!--\s*(?:social|share|facebook|twitter|linkedin).*?-->[\s\S]*?(?=<(?:h\d|p|div class="post|footer|$))',
        ]
        
        for pattern in patterns:
            content = re.sub(pattern, '', content, flags=re.DOTALL | re.IGNORECASE)
        
        # Remove common social media icons/links (more aggressive)
        # Look for links containing social media domains
        social_domains = ['facebook.com', 'twitter.com', 'linkedin.com', 'instagram.com', 
                         'youtube.com', 'pinterest.com', 'reddit.com', 'whatsapp.com']
        
        for domain in social_domains:
            # Remove links containing these domains
            pattern = rf'<a[^>]*href="[^"]*{re.escape(domain)}[^"]*"[^>]*>.*?</a>'
            content = re.sub(pattern, '', content, flags=re.DOTALL | re.IGNORECASE)
        
        # Remove empty divs/sections that might be left
        content = re.sub(r'<div[^>]*>\s*</div>', '', content)
        content = re.sub(r'<section[^>]*>\s*</section>', '', content)
        
        # Only write if content changed
        if content != original_content:
            post_file.write_text(content, encoding='utf-8')
            updated_count += 1
            
            if updated_count % 100 == 0:
                print(f"  {updated_count} dosya temizlendi...")
                
    except Exception as e:
        print(f"  Hata: {post_file}: {e}")

print(f"✅ {updated_count} post sayfasından sosyal medya ikonları kaldırıldı")
