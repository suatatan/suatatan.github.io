# SEO Indexing Cleanup — Changes

Date: 2026-08-17

## Audit outcome

The supplied block contains 62 unique URL lines although its heading says 63. All 62 are documented in `SEO_INDEX_AUDIT.md`: 20 **KEEP**, 30 **UPDATE**, 2 **REDIRECT**, 4 **IGNORE**, and 6 **NOINDEX**.

No normal historical article was removed or noindexed merely because it is old. Dates and authorship were preserved.

## Changes made

### Redirects and normalized routes

- Consolidated the weaker AJAX duplicate into `/bilgisayar/2008/11/03/ajax-ile-veri-cekerken-veriyi-salt-veya-htmlnin-okunmus-hali-olarak-alma.html`.
- Consolidated the truncated DOM duplicate into `/bilgisayar/2008/12/21/dom-erisimi-ile-tarayici-tarafinda-dinamik-olarak-icerik-olusturulmasi.html`.
- Moved the malformed SQL Server route containing a literal space to `/data/performance/sql-server/2025/08/07/sql-approx-query.html` and retained a redirect document at the old route.
- Redirect sources are zero-delay redirect pages with canonical targets, `noindex,follow`, and sitemap exclusion. There are no redirect chains or loops.

GitHub Pages cannot emit a true origin-level HTTP 301 from repository content alone. The redirect documents are the safest repository-only fallback. True 301 status codes can later be configured at the CDN/DNS edge using the same source/target mapping.

### Canonical, robots and social metadata

- Post, landing and editorial layouts now honor page-level `canonical_url` and `robots` values instead of hard-coding indexability.
- OpenGraph URLs and share links now use the canonical URL.
- The current PNG social preview is now the site-wide default instead of the superseded SVG.
- Redirect pages explicitly emit `noindex,follow` and a canonical target.

### Sitemap and robots.txt

- Reworked the custom sitemap to exclude redirects, `noindex` documents, `sitemap:false` documents, and non-content utility pages.
- Removed duplicate homepage entries and generated tag routes that did not correspond to real pages.
- Removed `changefreq` and priority signals that were not grounded in real update behavior.
- Replaced the unrendered Liquid expression in `robots.txt` with the valid absolute sitemap URL.
- Tag pages remain crawlable so search engines can see `noindex,follow`; they are not blocked in `robots.txt`.

### Front matter and content parsing

- Systematically merged accidentally nested YAML front matter in migrated 2024 dyslexia content so fields such as `meta_desc`, `meta_keywords`, `imgurl`, and `statu` no longer appear in article bodies.
- Mapped legacy fields to usable Jekyll metadata and converted resolvable Obsidian-style wiki links to real internal links.
- Improved human-facing titles and descriptions for the two priority dyslexia pages.
- Added complete front matter to the SymPy, Effective Journaling, and NLP package-list posts, which previously lacked reliable page metadata.

### Historical technical archive and internal links

- Added a standard bilingual historical-archive notice to selected valuable legacy technical tutorials.
- Added a compact curated technical section to the archive for Python, R, SQL, data science, JavaScript, Flask, Arduino, and crawling content.
- Excluded redirect pseudo-posts from the visible archive count and listing.

### Noindex and intentionally de-emphasized pages

- Added `noindex,follow` and sitemap exclusion to the thin Stack Overflow excerpt, the automated Fizy status, three near-empty Arabic quotation pages, and tag pages.
- Kept four low-value historical announcements/definitions accessible but removed them from the sitemap: LibreOffice 3.5, Fast Track, Blogger for Android, and free visitor-statistics applications.
- Preserved the remaining original essays, reading notes, tutorials, and personal archive pages at their existing public URLs.

### Duplicate candidates intentionally left unchanged

Archive-wide title scanning found additional possible pairs listed in `SEO_INDEX_AUDIT.md`. They were not mass-consolidated because backlink and traffic evidence was not supplied, and aggressive redirects could damage the historical archive.

## Verification

- `python scripts/validate_seo.py` passes: 873 generated documents, 873 unique routes, and all 62 supplied URLs classified.
- YAML/front matter parsing passes for the repository content.
- Redirect targets exist; redirect loops and chains were not found.
- `git diff --check` passes.
- A pull-request workflow runs the same static checks, performs a real Jekyll 4.4 build on Linux, and verifies the homepage, Turkish homepage, both About pages, archive, representative legacy posts, redirects, canonical tags, sitemap, and robots output.

The local execution environment used for this change does not include Ruby or Bundler, so the real Jekyll build is delegated to the pull-request check and must pass before merge.
