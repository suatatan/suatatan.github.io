#!/usr/bin/env python3
"""Replace confirmed duplicate post sources with canonical HTML redirects.

The canonical copy remains a normal post. Git history preserves the duplicate
source body while the public legacy URL stays reachable and leaves the sitemap.
"""

from pathlib import Path

import yaml


ROOT = Path(__file__).resolve().parents[1]
DUPLICATES = {
    "_posts/2008-11-03-ajax-ile-veri-cekerken-veriyi-salt-veya-htmlnin.md": {
        "title": "AJAX yazısının güncel arşiv adresine yönlendiriliyor",
        "permalink": "/bilgisayar/genel/2008/11/03/ajax-ile-veri-cekerken-veriyi-salt-veya-htmlnin.html",
        "redirect_to": "/bilgisayar/2008/11/03/ajax-ile-veri-cekerken-veriyi-salt-veya-htmlnin-okunmus-hali-olarak-alma.html",
    },
    "_posts/2008-12-21-dom-erisimi-ile-tarayici-tarafinda-dinamik-olarak.md": {
        "title": "DOM erişimi yazısının güncel arşiv adresine yönlendiriliyor",
        "permalink": "/bilgisayar/genel/2008/12/21/dom-erisimi-ile-tarayici-tarafinda-dinamik-olarak.html",
        "redirect_to": "/bilgisayar/2008/12/21/dom-erisimi-ile-tarayici-tarafinda-dinamik-olarak-icerik-olusturulmasi.html",
    },
}


def main() -> None:
    for relative_path, values in DUPLICATES.items():
        path = ROOT / relative_path
        data = {
            "layout": "redirect",
            **values,
            "robots": "noindex, follow",
            "sitemap": False,
        }
        front_matter = yaml.safe_dump(data, allow_unicode=True, sort_keys=False).rstrip()
        path.write_text(f"---\n{front_matter}\n---\n", encoding="utf-8")
        print(f"Consolidated {relative_path} -> {values['redirect_to']}")


if __name__ == "__main__":
    main()
