# Meridian Research Hub – frontend

Static HTML/CSS/JavaScript for every screen in the scope. No build step and no dependencies: open `index.html` in a browser.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home: intro, search, featured papers, research areas, team |
| `about.html` | About page and the four researcher profiles |
| `papers.html` | Listing with keyword search and subject / author / year filters |
| `paper.html?id=1` | Paper detail, PDF viewer area, related papers, save button |
| `contact.html` | Enquiry form with validation |
| `auth.html` | Login and registration (with a demo role picker) |
| `saved.html` | Bookmarked papers |
| `assistant.html` | AI assistant: ask, recommend, summarise (simulated) |
| `researcher.html` | Researcher dashboard: my papers, upload/edit/archive, CSV import |
| `admin.html` | Super-admin: stats, approval queue, all papers, researchers, categories, site content |

## What is real and what is a placeholder

- All content comes from `js/data.js` (sample names, papers, numbers). Replace with real content or database output.
- Login, uploads, approvals, saving and the enquiry form only change data in the browser. They reset on reload (bookmarks use localStorage). The backend must replace these.
- The assistant uses simple keyword matching on the sample data to show the interaction. The real one needs the RAG pipeline (text extraction, embeddings, retrieval, LLM answer with citations).
- The PDF viewer is a placeholder box. Use PDF.js in the live site.

## Moving into Django

1. Copy `css/` and `js/app.js` to Django's `static/` folder. Drop `js/data.js`.
2. Turn the shared header/footer (built in `js/app.js`) into a `base.html` template, and make each page extend it.
3. Replace the `PAPERS` / `RESEARCHERS` lookups with template loops or JSON endpoints, and the `// Live site:` comments with real form posts.
4. Keep the status values (`pending`, `approved`, `rejected`, `archived`): approval status is the single gate for the public site and the AI index.

## Researcher CSV template

Columns: `title, abstract, authors, year, category, keywords`. The category must match an existing category exactly. Download the template from the CSV import tab.
