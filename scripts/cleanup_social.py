import re
from pathlib import Path

# Read both files
index_path = Path(r'd:\suat\repo_candidates\suat-blog\_site\index.html')
archive_path = Path(r'd:\suat\repo_candidates\suat-blog\_site\archive.html')

index_content = index_path.read_text(encoding='utf-8')
archive_content = archive_path.read_text(encoding='utf-8')

# Remove social icons/share links from both pages
# Pattern to find share links section
share_pattern = r'<div class="share-links">.*?</div>'
index_content = re.sub(share_pattern, '', index_content, flags=re.DOTALL | re.IGNORECASE)
archive_content = re.sub(share_pattern, '', archive_content, flags=re.DOTALL | re.IGNORECASE)

# Also remove any social media sections
social_patterns = [
    r'<section[^>]*social[^>]*>.*?</section>',
    r'<div[^>]*social[^>]*>.*?</div>',
    r'<!-- Social.*?-->.*?(?=<(?:section|div|footer|h2))',
]

for pattern in social_patterns:
    index_content = re.sub(pattern, '', index_content, flags=re.DOTALL | re.IGNORECASE)
    archive_content = re.sub(pattern, '', archive_content, flags=re.DOTALL | re.IGNORECASE)

# Make sure archive page has the same structure as index
# Copy the header from index to archive
header_pattern = r'(<header>.*?</header>)'
index_header_match = re.search(header_pattern, index_content, re.DOTALL)
archive_header_match = re.search(header_pattern, archive_content, re.DOTALL)

if index_header_match and archive_header_match:
    index_header = index_header_match.group(1)
    archive_content = archive_content.replace(archive_header_match.group(1), index_header)

# Copy footer from index to archive
footer_pattern = r'(<footer>.*?</footer>)'
index_footer_match = re.search(footer_pattern, index_content, re.DOTALL)
archive_footer_match = re.search(footer_pattern, archive_content, re.DOTALL)

if index_footer_match and archive_footer_match:
    index_footer = index_footer_match.group(1)
    archive_content = archive_content.replace(archive_footer_match.group(1), index_footer)

# Write back
index_path.write_text(index_content, encoding='utf-8')
archive_path.write_text(archive_content, encoding='utf-8')

print("✅ Sosyal medya ikonları kaldırıldı")
print("✅ Arşiv sayfası ana sayfa ile aynı yapıya getirildi")
