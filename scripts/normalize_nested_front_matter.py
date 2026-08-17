#!/usr/bin/env python3
"""Normalize accidentally nested front matter and resolvable wiki links.

This migration is intentionally narrow: it only merges a second YAML block
immediately following valid Jekyll front matter, and only converts [[slug]]
links when an existing post with that exact slug can be resolved.
"""

from __future__ import annotations

import re
from pathlib import Path

import yaml


ROOT = Path(__file__).resolve().parents[1]
POSTS = ROOT / "_posts"
FRONT_MATTER = re.compile(r"\A---\s*\n(.*?)\n---\s*\n", re.DOTALL)
WIKI_LINK = re.compile(r"\[\[([\wçğıöşüÇĞİÖŞÜ-]+)\]\]")


def load_front_matter(text: str) -> tuple[dict, str]:
    match = FRONT_MATTER.match(text)
    if not match:
        return {}, text
    return yaml.safe_load(match.group(1)) or {}, text[match.end() :]


def post_url(path: Path, data: dict) -> str:
    if data.get("permalink"):
        return str(data["permalink"])
    match = re.match(r"(\d{4})-(\d{2})-(\d{2})-(.+)", path.stem)
    if not match:
        raise ValueError(f"Unexpected post filename: {path.name}")
    year, month, day, slug = match.groups()
    categories = data.get("categories") or []
    if isinstance(categories, str):
        categories = categories.split()
    prefix = "/" + "/".join(str(item).strip("/") for item in categories) if categories else ""
    return f"{prefix}/{year}/{month}/{day}/{slug}.html"


def normalize_nested_block(data: dict, body: str) -> tuple[dict, str, bool]:
    stripped = body.lstrip()
    if not stripped.startswith("---\n"):
        return data, body, False
    inner, remaining = load_front_matter(stripped)
    if not inner:
        return data, body, False

    merged = dict(data)
    outer_tags = list(merged.get("tags") or [])
    inner_tags = list(inner.pop("tags", []) or [])
    if outer_tags or inner_tags:
        merged["tags"] = list(dict.fromkeys([*outer_tags, *inner_tags]))

    field_map = {
        "meta_desc": "description",
        "meta_keywords": "keywords",
        "imgurl": "legacy_image",
        "tarih": "source_published_at",
        "statu": "status",
    }
    for key, value in inner.items():
        destination = field_map.get(key, key)
        merged.setdefault(destination, value)
    return merged, remaining.lstrip("\n"), True


def dump_post(data: dict, body: str) -> str:
    front_matter = yaml.safe_dump(
        data,
        allow_unicode=True,
        sort_keys=False,
        default_flow_style=False,
    ).rstrip()
    return f"---\n{front_matter}\n---\n\n{body.rstrip()}\n"


def main() -> None:
    posts = [path for path in POSTS.iterdir() if path.is_file()]
    slug_map: dict[str, str] = {}
    parsed: dict[Path, tuple[dict, str]] = {}

    for path in posts:
        data, body = load_front_matter(path.read_text(encoding="utf-8"))
        parsed[path] = (data, body)
        match = re.match(r"\d{4}-\d{2}-\d{2}-(.+)", path.stem)
        if match and data:
            slug_map[match.group(1)] = post_url(path, data)

    changed = 0
    for path, (data, body) in parsed.items():
        if not data:
            continue
        data, body, nested_changed = normalize_nested_block(data, body)

        def replace_link(match: re.Match[str]) -> str:
            slug = match.group(1)
            target = slug_map.get(slug)
            if not target:
                return match.group(0)
            label = slug.replace("_", " ").replace("-", " ")
            return f"[{label}]({target})"

        new_body = WIKI_LINK.sub(replace_link, body)
        if nested_changed or new_body != body:
            path.write_text(dump_post(data, new_body), encoding="utf-8")
            changed += 1

    print(f"Normalized {changed} posts")


if __name__ == "__main__":
    main()
