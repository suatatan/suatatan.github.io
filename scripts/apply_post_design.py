import re
from pathlib import Path

# Modern kitabi CSS with text-align: justify
modern_css = """
/* Modern Kitabi Tasarım - Post Sayfaları */
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

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  color: var(--primary-color);
  margin-top: 2rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }

/* Paragraphs - JUSTIFIED */
p {
  margin-bottom: 1.5rem;
  text-align: justify;
  text-justify: inter-word;
}

/* Links */
a {
  color: var(--accent-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: var(--primary-color);
  text-decoration: underline;
}

/* Lists */
ul, ol {
  margin: 1.5rem 0;
  padding-left: 2rem;
  text-align: justify;
}

li {
  margin-bottom: 0.5rem;
}

/* Blockquotes */
blockquote {
  border-left: 4px solid var(--accent-color);
  padding-left: 1.5rem;
  margin: 2rem 0;
  font-style: italic;
  color: var(--text-light);
  text-align: justify;
}

/* Code */
code {
  font-family: 'Courier New', monospace;
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.9em;
}

pre {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

pre code {
  background: none;
  padding: 0;
}

/* Images */
img {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  margin: 1.5rem 0;
}

/* Header */
header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid var(--border-color);
}

.post-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
  color: var(--primary-color);
}

.post-meta {
  color: var(--text-light);
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  margin-top: 0.5rem;
}

/* Post Content */
.post-content {
  margin: 3rem 0;
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

/* Navigation */
.post-navigation {
  display: flex;
  justify-content: space-between;
  margin: 3rem 0;
  padding: 1.5rem 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.post-navigation a {
  color: var(--primary-color);
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  body {
    font-size: 16px;
    padding: 2rem 1.5rem;
  }
  
  h1, .post-title {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
}
"""

# Find all HTML files in _site directory (posts)
site_path = Path(r'd:\suat\repo_candidates\suat-blog\_site')
html_files = list(site_path.rglob('*.html'))

# Exclude index.html and archive.html (already done)
exclude_files = ['index.html', 'archive.html', '404.html', 'offline.html']
post_files = [f for f in html_files if f.name not in exclude_files and 'tag' not in str(f)]

print(f"Found {len(post_files)} post files to update...")

updated_count = 0
for post_file in post_files:
    try:
        content = post_file.read_text(encoding='utf-8')
        
        # Replace or add style section
        style_pattern = r'<style>.*?</style>'
        new_style = f'<style>{modern_css}</style>'
        
        if re.search(style_pattern, content, re.DOTALL):
            # Replace existing style
            content = re.sub(style_pattern, new_style, content, flags=re.DOTALL)
        else:
            # Add style before </head>
            content = content.replace('</head>', f'{new_style}\n</head>')
        
        # Write back
        post_file.write_text(content, encoding='utf-8')
        updated_count += 1
        
        if updated_count % 100 == 0:
            print(f"  Updated {updated_count} files...")
            
    except Exception as e:
        print(f"  Error updating {post_file}: {e}")

print(f"✅ {updated_count} post sayfası güncellendi")
print("✅ Georgia fontu ve text-align: justify uygulandı")
