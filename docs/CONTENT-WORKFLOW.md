# Website content workflow

New articles can be written in Notion and synchronized into this Jekyll site. Existing archive posts remain untouched.

## Notion data source

Create a data source named `Website Content` with these properties:

| Property | Type | Required | Example |
| --- | --- | --- | --- |
| Name | Title | Yes | Building reliable RAG systems |
| Status | Status | Yes | Published |
| Language | Select | Yes | English or Türkçe |
| Slug | Rich text | Yes | reliable-rag-systems |
| Summary | Rich text | Recommended | A short search and social description |
| Published | Date | Yes | 2026-08-16 |
| Tags | Multi-select | Optional | ai, rag, english |

Write the article itself in the Notion page body. Paragraphs, headings, lists, quotes, code blocks, dividers and images are supported.

## One-time connection

1. Create a Notion internal integration and share `Website Content` with it.
2. Copy the data source ID from `Manage data sources` in Notion.
3. In the GitHub repository settings, add two Actions secrets: `NOTION_ACCESS_TOKEN` and `NOTION_DATA_SOURCE_ID`.
4. Run the `Sync published Notion content` workflow once from GitHub Actions.

The workflow checks for published pages each day and on manual request. It converts them to Markdown under `_posts/`, downloads Notion-hosted images into `images/notion/`, builds the Jekyll site and commits only generated content changes.

## Publishing

Change a Notion page's `Status` to `Published`. A new article will appear after the next workflow run. To publish immediately, run the workflow manually.

The `Language` field adds the `english` or `turkish` tag automatically. The existing archive and URLs are preserved.
