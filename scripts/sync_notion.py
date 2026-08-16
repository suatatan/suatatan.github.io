#!/usr/bin/env python3
"""Synchronize published Notion pages into Jekyll posts.

Required environment variables:
  NOTION_ACCESS_TOKEN
  NOTION_DATA_SOURCE_ID
"""

from __future__ import annotations

import json
import mimetypes
import os
import re
import sys
import urllib.parse
import urllib.request
from datetime import date
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
POSTS = ROOT / "_posts"
IMAGES = ROOT / "images" / "notion"
API_VERSION = "2026-03-11"
TOKEN = os.environ.get("NOTION_ACCESS_TOKEN", "").strip()
DATA_SOURCE_ID = os.environ.get("NOTION_DATA_SOURCE_ID", "").strip()


def api(path: str, payload: dict | None = None) -> dict:
    method = "POST" if payload is not None else "GET"
    body = json.dumps(payload).encode() if payload is not None else None
    request = urllib.request.Request(
        f"https://api.notion.com/v1/{path}",
        data=body,
        method=method,
        headers={
            "Authorization": f"Bearer {TOKEN}",
            "Notion-Version": API_VERSION,
            "Content-Type": "application/json",
        },
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)


def rich_text(items: list[dict]) -> str:
    parts: list[str] = []
    for item in items:
        text = item.get("plain_text", "")
        annotations = item.get("annotations", {})
        href = item.get("href")
        if annotations.get("code"):
            text = f"`{text}`"
        if annotations.get("bold"):
            text = f"**{text}**"
        if annotations.get("italic"):
            text = f"*{text}*"
        if annotations.get("strikethrough"):
            text = f"~~{text}~~"
        if href:
            text = f"[{text}]({href})"
        parts.append(text)
    return "".join(parts)


def property_text(prop: dict) -> str:
    prop_type = prop.get("type")
    if prop_type == "title":
        return rich_text(prop.get("title", []))
    if prop_type == "rich_text":
        return rich_text(prop.get("rich_text", []))
    return ""


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = value.translate(str.maketrans("çğıöşü", "cgiosu"))
    value = re.sub(r"[^a-z0-9]+", "-", value).strip("-")
    return value or "untitled"


def yaml_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def download_image(url: str, slug: str, index: int) -> str:
    parsed = urllib.parse.urlparse(url)
    extension = Path(parsed.path).suffix.lower()
    if extension not in {".png", ".jpg", ".jpeg", ".gif", ".webp"}:
        content_type = mimetypes.guess_type(url)[0]
        extension = mimetypes.guess_extension(content_type or "") or ".jpg"
    target_dir = IMAGES / slug
    target_dir.mkdir(parents=True, exist_ok=True)
    target = target_dir / f"image-{index:02d}{extension}"
    request = urllib.request.Request(url, headers={"User-Agent": "suatatan.com content sync"})
    with urllib.request.urlopen(request, timeout=45) as response:
        target.write_bytes(response.read())
    return f"/images/notion/{slug}/{target.name}"


def children(block_id: str) -> list[dict]:
    results: list[dict] = []
    cursor = ""
    while True:
        suffix = f"?page_size=100&start_cursor={urllib.parse.quote(cursor)}" if cursor else "?page_size=100"
        response = api(f"blocks/{block_id}/children{suffix}")
        results.extend(response.get("results", []))
        if not response.get("has_more"):
            return results
        cursor = response.get("next_cursor", "")


def blocks_to_markdown(blocks: list[dict], slug: str) -> str:
    lines: list[str] = []
    image_index = 0
    numbered_index = 1
    for block in blocks:
        kind = block.get("type", "")
        data = block.get(kind, {})
        text = rich_text(data.get("rich_text", []))
        if kind == "paragraph":
            lines.append(text)
        elif kind == "heading_1":
            lines.append(f"# {text}")
        elif kind == "heading_2":
            lines.append(f"## {text}")
        elif kind == "heading_3":
            lines.append(f"### {text}")
        elif kind == "bulleted_list_item":
            lines.append(f"- {text}")
        elif kind == "numbered_list_item":
            lines.append(f"{numbered_index}. {text}")
            numbered_index += 1
        elif kind == "quote":
            lines.append("\n".join(f"> {row}" for row in text.splitlines()))
        elif kind == "code":
            language = data.get("language", "")
            lines.append(f"```{language}\n{text}\n```")
        elif kind == "divider":
            lines.append("---")
        elif kind == "callout":
            lines.append(f"> {text}")
        elif kind == "image":
            image_index += 1
            source = data.get(data.get("type", ""), {}).get("url", "")
            caption = rich_text(data.get("caption", [])) or "Article image"
            if source:
                local_url = download_image(source, slug, image_index)
                lines.append(f"![{caption}]({local_url})")
        elif kind == "bookmark":
            url = data.get("url", "")
            lines.append(f"[{url}]({url})")

        if block.get("has_children"):
            nested = blocks_to_markdown(children(block["id"]), slug)
            if nested:
                lines.append(nested)
        lines.append("")
    return "\n".join(lines).strip() + "\n"


def query_published() -> list[dict]:
    results: list[dict] = []
    cursor: str | None = None
    while True:
        payload: dict = {
            "page_size": 100,
            "filter": {"property": "Status", "status": {"equals": "Published"}},
            "sorts": [{"property": "Published", "direction": "descending"}],
        }
        if cursor:
            payload["start_cursor"] = cursor
        response = api(f"data_sources/{DATA_SOURCE_ID}/query", payload)
        results.extend(response.get("results", []))
        if not response.get("has_more"):
            return results
        cursor = response.get("next_cursor")


def sync_page(page: dict) -> Path:
    props = page.get("properties", {})
    title = property_text(props.get("Name", {})).strip()
    slug = slugify(property_text(props.get("Slug", {})) or title)
    summary = property_text(props.get("Summary", {})).strip()
    language = (props.get("Language", {}).get("select") or {}).get("name", "English")
    published = ((props.get("Published", {}).get("date") or {}).get("start") or date.today().isoformat())[:10]
    tags = [item.get("name", "") for item in props.get("Tags", {}).get("multi_select", []) if item.get("name")]
    language_tag = "turkish" if language.lower().startswith(("tr", "tü")) else "english"
    if language_tag not in tags:
        tags.append(language_tag)

    markdown = blocks_to_markdown(children(page["id"]), slug)
    front_matter = [
        "---",
        "layout: post",
        f"title: {yaml_string(title)}",
        f"date: {published}",
        f"description: {yaml_string(summary)}",
        f"lang: {'tr' if language_tag == 'turkish' else 'en'}",
        f"tags: {json.dumps(tags, ensure_ascii=False)}",
        f"notion_id: {yaml_string(page['id'])}",
        "notion_generated: true",
        "---",
        "",
    ]
    POSTS.mkdir(parents=True, exist_ok=True)
    target = POSTS / f"{published}-{slug}.md"
    target.write_text("\n".join(front_matter) + markdown, encoding="utf-8")
    return target


def main() -> int:
    if not TOKEN or not DATA_SOURCE_ID:
        print("Notion secrets are not configured; skipping content sync.")
        return 0
    pages = query_published()
    for page in pages:
        print(f"Synced {sync_page(page).relative_to(ROOT)}")
    print(f"Synchronized {len(pages)} published Notion page(s).")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"Notion sync failed: {exc}", file=sys.stderr)
        raise
