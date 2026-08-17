#!/usr/bin/env python3
"""Static SEO and route checks that do not require a Jekyll runtime."""

from __future__ import annotations

import re
import sys
from collections import defaultdict
from pathlib import Path
from urllib.parse import unquote, urlparse

import yaml


ROOT = Path(__file__).resolve().parents[1]
FRONT_MATTER = re.compile(r"\A---\s*\n(.*?)\n---\s*\n", re.DOTALL)
AUDIT_ROW_URL = re.compile(r"^\|\s*\d+\s*\|\s*`(https://suatatan\.com/[^`]+)`")
NESTED_FRONT_MATTER = re.compile(
    r"\A---\s*\n(?:[A-Za-z_][A-Za-z0-9_-]*:\s*.*\n)+---\s*\n", re.MULTILINE
)
NESTED_FRONT_MATTER_EXEMPTIONS = {
    Path("_posts/2024-03-03-kimim.md"),
}


def read_document(path: Path) -> tuple[dict, str]:
    text = path.read_text(encoding="utf-8")
    match = FRONT_MATTER.match(text)
    if not match:
        return {}, text
    data = yaml.safe_load(match.group(1)) or {}
    if not isinstance(data, dict):
        raise ValueError("front matter must be a mapping")
    return data, text[match.end() :]


def post_route(path: Path, data: dict) -> str:
    if data.get("permalink"):
        return str(data["permalink"])
    match = re.match(r"(\d{4})-(\d{2})-(\d{2})-(.+)\.md$", path.name)
    if not match:
        raise ValueError("post filename does not follow YYYY-MM-DD-slug.md")
    year, month, day, slug = match.groups()
    categories = data.get("categories", [])
    if isinstance(categories, str):
        categories = categories.split()
    prefix = "/" + "/".join(str(item).strip("/").lower() for item in categories if item)
    if prefix != "/":
        prefix += "/"
    return f"{prefix}{year}/{month}/{day}/{slug}.html"


def page_route(path: Path, data: dict) -> str | None:
    if data.get("permalink"):
        return str(data["permalink"])
    relative = path.relative_to(ROOT).as_posix()
    if relative.startswith(("_", ".")) or relative in {"README.md"}:
        return None
    if path.suffix not in {".md", ".html"}:
        return None
    if path.name == "index.md" or path.name == "index.html":
        parent = path.parent.relative_to(ROOT).as_posix()
        return "/" if parent == "." else f"/{parent}/"
    if path.suffix == ".md":
        relative = relative[:-3] + ".html"
    return "/" + relative


def normalized_path(value: str) -> str:
    parsed = urlparse(value)
    path = parsed.path or "/"
    return unquote(path)


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []
    routes: dict[str, Path] = {}
    documents: list[tuple[Path, dict, str, str]] = []

    candidates = sorted((ROOT / "_posts").glob("*.md"))
    candidates += sorted(
        path
        for path in ROOT.rglob("*")
        if path.is_file()
        and path.suffix in {".md", ".html"}
        and "_posts" not in path.parts
        and not any(part.startswith(".") for part in path.relative_to(ROOT).parts)
        and not any(part in {"vendor", "node_modules", "scripts", "docs"} for part in path.parts)
    )

    for path in candidates:
        try:
            data, body = read_document(path)
        except (UnicodeDecodeError, yaml.YAMLError, ValueError) as exc:
            errors.append(f"{path.relative_to(ROOT)}: invalid front matter ({exc})")
            continue
        if path.parent.name == "_posts":
            if not data:
                errors.append(f"{path.relative_to(ROOT)}: post has no front matter")
                continue
            try:
                route = post_route(path, data)
            except ValueError as exc:
                errors.append(f"{path.relative_to(ROOT)}: {exc}")
                continue
        else:
            if not data:
                continue
            route = page_route(path, data)
            if route is None:
                continue

        route = normalized_path(route)
        if route in routes:
            errors.append(
                f"duplicate route {route}: {routes[route].relative_to(ROOT)} and {path.relative_to(ROOT)}"
            )
        else:
            routes[route] = path
        documents.append((path, data, body, route))

        relative_path = path.relative_to(ROOT)
        if NESTED_FRONT_MATTER.match(body) and relative_path not in NESTED_FRONT_MATTER_EXEMPTIONS:
            errors.append(f"{path.relative_to(ROOT)}: nested front matter marker remains in body")
        if data.get("redirect_to") and data.get("sitemap") is not False:
            errors.append(f"{path.relative_to(ROOT)}: redirect must set sitemap: false")
        if data.get("redirect_to") and "noindex" not in str(data.get("robots", "")):
            errors.append(f"{path.relative_to(ROOT)}: redirect must be noindex")
        if "noindex" in str(data.get("robots", "")) and data.get("sitemap") is not False:
            errors.append(f"{path.relative_to(ROOT)}: noindex document must set sitemap: false")

    for path, data, _body, route in documents:
        target = data.get("redirect_to")
        if not target:
            continue
        target_path = normalized_path(str(target))
        if target_path == route:
            errors.append(f"{path.relative_to(ROOT)}: redirect loop to itself")
        elif target_path not in routes:
            errors.append(f"{path.relative_to(ROOT)}: redirect target does not exist: {target_path}")
        elif routes[target_path] == path:
            errors.append(f"{path.relative_to(ROOT)}: redirect target resolves to source")

    reverse_redirects: defaultdict[str, list[str]] = defaultdict(list)
    for _path, data, _body, route in documents:
        if data.get("redirect_to"):
            reverse_redirects[normalized_path(str(data["redirect_to"]))].append(route)
    for target, sources in reverse_redirects.items():
        target_data = next((d for _p, d, _b, r in documents if r == target), {})
        if target_data.get("redirect_to"):
            errors.append(f"redirect chain: {sources[0]} -> {target} -> {target_data['redirect_to']}")

    audit_text = (ROOT / "SEO_INDEX_AUDIT.md").read_text(encoding="utf-8")
    audit_urls = []
    for line in audit_text.splitlines():
        match = AUDIT_ROW_URL.match(line)
        if match:
            path = normalized_path(match.group(1))
            if path not in audit_urls:
                audit_urls.append(path)
    if len(audit_urls) != 62:
        errors.append(f"audit must contain 62 unique supplied URLs; found {len(audit_urls)}")
    for audit_path in audit_urls:
        if audit_path not in routes:
            warnings.append(f"audit URL is intentionally moved or generated externally: {audit_path}")

    robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
    if "{{" in robots or "https://suatatan.com/sitemap.xml" not in robots:
        errors.append("robots.txt must contain a rendered absolute sitemap URL")

    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    for required in ("page.sitemap == false", 'contains "noindex"', "page.redirect_to", "post.redirect_to"):
        if required not in sitemap:
            errors.append(f"sitemap.xml is missing exclusion guard: {required}")

    if errors:
        print("SEO validation failed:")
        for error in errors:
            print(f"- ERROR: {error}")
        for warning in warnings:
            print(f"- WARNING: {warning}")
        return 1

    print(f"SEO validation passed: {len(documents)} generated documents, {len(routes)} unique routes.")
    print(f"Audit coverage: {len(audit_urls)} supplied URLs classified.")
    for warning in warnings:
        print(f"WARNING: {warning}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
