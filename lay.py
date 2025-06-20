import os
import re

POSTS_DIR = r'd:\suat\repo_candidates\suat-blog\_posts'

for filename in os.listdir(POSTS_DIR):
    if filename.endswith('.md'):
        path = os.path.join(POSTS_DIR, filename)
        with open(path, encoding='utf-8') as f:
            content = f.read()
        # Front matter'ı bul
        match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
        if match:
            fm = match.group(1)
            # layout satırı var mı?
            if 'layout:' in fm:
                # layout satırını güncelle
                new_fm = re.sub(r'layout:.*', 'layout: post', fm)
            else:
                # yoksa ekle
                new_fm = 'layout: post\n' + fm
            new_content = content.replace(fm, new_fm, 1)
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)