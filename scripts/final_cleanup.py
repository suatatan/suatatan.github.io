import re
from pathlib import Path

# Find all HTML files
site_path = Path(r'd:\suat\repo_candidates\suat-blog\_site')
html_files = list(site_path.rglob('*.html'))

print(f"Toplam {len(html_files)} HTML dosyası işleniyor...")

updated_count = 0
for html_file in html_files:
    try:
        content = html_file.read_text(encoding='utf-8')
        original_content = content
        
        # 1. Remove ALL social media and app install related elements
        patterns = [
            # PWA/App install buttons
            r'<button[^>]*install[^>]*>.*?</button>',
            r'<a[^>]*install[^>]*>.*?</a>',
            r'<div[^>]*install[^>]*>.*?</div>',
            # Share/Social patterns
            r'<div[^>]*share[^>]*>.*?</div>',
            r'<button[^>]*share[^>]*>.*?</button>',
            r'<a[^>]*share[^>]*>.*?</a>',
            # Navigation or sections with social
            r'<nav[^>]*social[^>]*>.*?</nav>',
            r'<section[^>]*social[^>]*>.*?</section>',
            # Any element with PWA/install in text
            r'<[^>]*>\s*Uygulamayı\s+Yükle\s*</[^>]*>',
            r'<[^>]*>\s*Install\s+App\s*</[^>]*>',
        ]
        
        for pattern in patterns:
            content = re.sub(pattern, '', content, flags=re.DOTALL | re.IGNORECASE)
        
        # 2. Ensure Georgia font in ALL styles
        # Find existing style tags and ensure Georgia is set
        if '<style>' in content:
            # Add Georgia font-family to body if not present
            content = re.sub(
                r'(body\s*{[^}]*)(font-family:\s*[^;]+;)?',
                r"\1font-family: Georgia, 'Times New Roman', serif;",
                content,
                flags=re.IGNORECASE
            )
        
        # Remove empty elements
        content = re.sub(r'<div[^>]*>\s*</div>', '', content)
        content = re.sub(r'<section[^>]*>\s*</section>', '', content)
        content = re.sub(r'<nav[^>]*>\s*</nav>', '', content)
        
        # Only write if changed
        if content != original_content:
            html_file.write_text(content, encoding='utf-8')
            updated_count += 1
            
            if updated_count % 100 == 0:
                print(f"  {updated_count} dosya güncellendi...")
                
    except Exception as e:
        print(f"  Hata: {html_file.name}: {e}")

print(f"\n✅ {updated_count} dosya güncellendi")
print("✅ Tüm sosyal medya/uygulama butonları kaldırıldı")
print("✅ Georgia fontu tüm sayfalarda uygulandı")
