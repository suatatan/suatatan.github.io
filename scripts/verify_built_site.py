#!/usr/bin/env python3
"""Verify representative built pages and SEO output after `jekyll build`."""

from __future__ import annotations

import sys
from html.parser import HTMLParser
from pathlib import Path
from xml.etree import ElementTree


ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "_site"


class HeadParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.canonical: str | None = None
        self.robots: str | None = None
        self.refresh: str | None = None
        self.title_seen = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if tag == "link" and values.get("rel") == "canonical":
            self.canonical = values.get("href")
        if tag == "meta" and values.get("name") == "robots":
            self.robots = values.get("content")
        if tag == "meta" and values.get("http-equiv", "").lower() == "refresh":
            self.refresh = values.get("content")
        if tag == "title":
            self.title_seen = True


def parse_html(relative: str) -> HeadParser:
    path = SITE / relative
    if not path.exists():
        raise AssertionError(f"built page missing: {relative}")
    parser = HeadParser()
    parser.feed(path.read_text(encoding="utf-8"))
    if not parser.title_seen:
        raise AssertionError(f"page has no title element: {relative}")
    return parser


def expect_canonical(relative: str, canonical: str) -> HeadParser:
    parser = parse_html(relative)
    if parser.canonical != canonical:
        raise AssertionError(
            f"wrong canonical in {relative}: expected {canonical}, found {parser.canonical}"
        )
    return parser


def main() -> int:
    checks = {
        "index.html": "https://suatatan.com/",
        "tr/index.html": "https://suatatan.com/tr/",
        "pages/about-en.html": "https://suatatan.com/pages/about-en.html",
        "pages/2017-01-02-dr-suat-atan-kimdir.html": "https://suatatan.com/pages/2017-01-02-dr-suat-atan-kimdir.html",
        "archive/index.html": "https://suatatan.com/archive/",
        "bilgisayar/2022/03/02/pythonda-kume-islemleri.html": "https://suatatan.com/bilgisayar/2022/03/02/pythonda-kume-islemleri.html",
        "2024/03/03/disleksinin_tarihcesi.html": "https://suatatan.com/2024/03/03/disleksinin_tarihcesi.html",
    }
    for relative, canonical in checks.items():
        expect_canonical(relative, canonical)

    redirect_checks = {
        "bilgisayar/genel/2008/11/03/ajax-ile-veri-cekerken-veriyi-salt-veya-htmlnin.html": "https://suatatan.com/bilgisayar/2008/11/03/ajax-ile-veri-cekerken-veriyi-salt-veya-htmlnin-okunmus-hali-olarak-alma.html",
        "bilgisayar/genel/2008/12/21/dom-erisimi-ile-tarayici-tarafinda-dinamik-olarak.html": "https://suatatan.com/bilgisayar/2008/12/21/dom-erisimi-ile-tarayici-tarafinda-dinamik-olarak-icerik-olusturulmasi.html",
    }
    for relative, canonical in redirect_checks.items():
        parser = expect_canonical(relative, canonical)
        if not parser.robots or "noindex" not in parser.robots:
            raise AssertionError(f"redirect is not noindex: {relative}")
        if not parser.refresh or not parser.refresh.startswith("0;"):
            raise AssertionError(f"redirect has no zero-delay refresh: {relative}")

    robots = (SITE / "robots.txt").read_text(encoding="utf-8")
    if "Sitemap: https://suatatan.com/sitemap.xml" not in robots or "{{" in robots:
        raise AssertionError("built robots.txt is invalid")

    sitemap_path = SITE / "sitemap.xml"
    tree = ElementTree.parse(sitemap_path)
    namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = {node.text for node in tree.findall(".//sm:loc", namespace)}
    redirect_sources = {
        "https://suatatan.com/bilgisayar/genel/2008/11/03/ajax-ile-veri-cekerken-veriyi-salt-veya-htmlnin.html",
        "https://suatatan.com/bilgisayar/genel/2008/12/21/dom-erisimi-ile-tarayici-tarafinda-dinamik-olarak.html",
        "https://suatatan.com/tag/turkish.html",
    }
    present_forbidden = sorted(urls & redirect_sources)
    if present_forbidden:
        raise AssertionError(f"sitemap contains excluded URLs: {present_forbidden}")
    for canonical in checks.values():
        if canonical not in urls:
            raise AssertionError(f"sitemap is missing canonical URL: {canonical}")

    print(f"Built-site verification passed for {len(checks)} representative pages and {len(redirect_checks)} redirects.")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (AssertionError, ElementTree.ParseError) as exc:
        print(f"Built-site verification failed: {exc}", file=sys.stderr)
        sys.exit(1)
