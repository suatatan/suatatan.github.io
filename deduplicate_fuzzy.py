import os
from difflib import SequenceMatcher
import shutil

POSTS_DIR = r'd:/suat/repo_candidates/suat-blog/_posts'
LOG_FILE = os.path.join(POSTS_DIR, 'deduplication_log.txt')
SIMILARITY_THRESHOLD = 0.97  # 97% benzerlik ve üstü aynı kabul edilir

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def log_deletion(file1, file2, similarity):
    with open(LOG_FILE, 'a', encoding='utf-8') as log:
        log.write(f"Deleted: {file2}\nKept: {file1}\nSimilarity: {similarity:.4f}\n---\n")

def main():
    files = [f for f in os.listdir(POSTS_DIR) if f.endswith('.md')]
    checked = set()
    for i, fname1 in enumerate(files):
        if fname1 in checked:
            continue
        path1 = os.path.join(POSTS_DIR, fname1)
        content1 = read_file(path1)
        for fname2 in files[i+1:]:
            if fname2 in checked:
                continue
            path2 = os.path.join(POSTS_DIR, fname2)
            content2 = read_file(path2)
            similarity = SequenceMatcher(None, content1, content2).ratio()
            if similarity >= SIMILARITY_THRESHOLD:
                # Silinecek dosya: fname2 (daha sonra geleni sil)
                print(f"Deleting {fname2} (%.2f%% benzerlik)" % (similarity*100))
                os.remove(path2)
                log_deletion(fname1, fname2, similarity)
                checked.add(fname2)
        checked.add(fname1)

if __name__ == '__main__':
    main()
