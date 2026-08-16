# Website content workflow

New articles can be written in Notion and synchronized into this Jekyll site. Existing archive posts remain untouched.

## Notion data source

The content database is ready: [Website Content](https://app.notion.com/p/cf98f2c5be5443cfb5f136bddc5719e8).

| Property | Type | Required | Example |
| --- | --- | --- | --- |
| Name | Title | Yes | Building reliable RAG systems |
| Status | Select | Yes | Published |
| Language | Select | Yes | English or Türkçe |
| Slug | Rich text | Yes | reliable-rag-systems |
| Summary | Rich text | Recommended | A short search and social description |
| Published | Date | Yes | 2026-08-16 |
| Tags | Multi-select | Optional | ai, rag, english |

Write the article itself in the Notion page body. Paragraphs, headings, lists, quotes, code blocks, dividers and images are supported.

## One-time connection

1. Create a Notion internal integration and copy its token.
2. Share the `Website Content` database with that integration.
3. In the GitHub repository settings, add one Actions secret named `NOTION_ACCESS_TOKEN`.
4. Run the `Sync published Notion content` workflow once from GitHub Actions.

The data source ID is already configured in the workflow; it is not a secret and does not need to be copied manually.

The workflow checks for published pages each day and on manual request. It converts them to Markdown under `_posts/`, downloads Notion-hosted images into `images/notion/`, builds the Jekyll site and commits only generated content changes.

## Publishing

Change a Notion page's `Status` to `Published`. A new article will appear after the next workflow run. To publish immediately, run the workflow manually.

The `Language` field adds the `english` or `turkish` tag automatically. The existing archive and URLs are preserved.
