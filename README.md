# seanhacking.github.io

Sean Hacking's personal site: About and CV, Projects, Blog and Contact. Static [Astro](https://astro.build) site, deployed to GitHub Pages at https://seanhacking.github.io by GitHub Actions. No tracking, no analytics, no external scripts or fonts.

The repo stays private, and Pages stays off, until Sean launches the site from the Business Agent Harness.

## Commands

```
npm ci                 # install exactly what package-lock.json pins
npm run dev            # local dev server with hot reload (shows draft posts)
npm run build          # build the site into dist/
npm run check-links    # check every internal link and asset in dist/ (no network)
npm run preview        # serve dist/ locally
```

Node 22.22 or newer. To build or check a preview the way CI does, set `SITE_BASE` (in Git Bash also set `MSYS_NO_PATHCONV=1`, or the path gets rewritten):

```
SITE_BASE=/preview/pr-7/ npm run build && SITE_BASE=/preview/pr-7/ npm run check-links
```

## How content is organised

| What | Where | URL |
| --- | --- | --- |
| Name, headline, location, links, About text, CV | `src/data/profile.json` | `/`, `/about/`, `/cv/`, `/contact/` |
| Projects | `src/content/projects/<slug>.md` | `/projects/<slug>/` |
| Blog posts | `src/content/blog/<slug>.md` | `/blog/<slug>/` |
| Images and files for a post or project | `public/media/<slug>/` | `/media/<slug>/<file>` |
| Layout, nav, OpenGraph tags, theme toggle | `src/layouts/Base.astro` | |
| Styles (light and dark tokens, print CSS for the CV) | `src/styles/global.css` | |

`profile.json` fields: `name`, `headline`, `location?`, `email?` (left out on purpose: no email is shown until Sean picks one), `intro?` (home page), `links` (`{label, url}[]`), `about` (short Markdown: paragraphs, `##` headings, `-` lists, bold, italic, links), and `cv` (`summary?`, `experience[]` of `{role, org, start, end, highlights[]}`, `education[]` of `{degree, school, year}`, `skills[]` of `{area, items[]}`).

Project frontmatter: `title`, `summary`, `date`, `tags`, optional `links` (`{label, url}[]`), `heroImage`, `featured` (featured projects show on the home page), and display-only `role` and `period`.

## Adding a post

Create `src/content/blog/<slug>.md`. The slug is the title in kebab case, at most 60 characters, unique (add `-2`, `-3` if needed).

```markdown
---
title: "A $500 test rig that beat the standard"
description: "One or two sentences for the post list, RSS and link previews."
date: 2026-10-17
tags: ["testing", "prototyping"]
draft: false          # true keeps it off the live site (still visible in npm run dev)
canonical: ""         # optional: the original URL if the post first appeared elsewhere
variantId: ""         # optional: set by the harness (Presence library variant id)
heroImage: "/media/a-500-dollar-test-rig/rig.jpg"   # optional
---

Body in Markdown. Link images and other pages root-relative, e.g. ![The rig](/media/a-500-dollar-test-rig/rig.jpg)
or [the CV](/cv/). Preview builds rewrite these to the preview path automatically.
```

Posts are sorted by `date`, newest first, and appear in the blog list, tag pages, the home page (latest three), `rss.xml` and the sitemap. A link to a draft post from a published page fails `npm run check-links`.

## Links inside templates

Every internal link in `.astro` files goes through `url()` from `src/lib/url.ts`, which adds `import.meta.env.BASE_URL`. That is what lets the same code serve the root site and a preview under `/preview/pr-<n>/`. Absolute URLs (OpenGraph, canonical, RSS) use `absoluteUrl()`.

## Deploys and previews

- **`.github/workflows/deploy.yml`**: on every push to `main`, build, check links, and publish `dist/` to the root of the `gh-pages` branch. Existing `preview/` folders on `gh-pages` are copied over first, so deploys never remove open previews.
- **`.github/workflows/preview.yml`**: on every pull request, build with `SITE_BASE=/preview/pr-<n>/`, check links, publish to `gh-pages:/preview/pr-<n>/`, and comment the URL `https://seanhacking.github.io/preview/pr-<n>/` on the PR (the comment is updated on later pushes). Preview pages carry `noindex`, have no sitemap, and the live `robots.txt` disallows `/preview/`. When the PR is closed or merged, the folder is deleted.
- Both workflows use only `GITHUB_TOKEN` and share one concurrency group, so only one job writes to `gh-pages` at a time.
- GitHub Pages must be set to deploy from the `gh-pages` branch (root). That happens at launch, not before; until then the workflows still run and fill `gh-pages`, but nothing is served.

## Privacy

`PRIVACY-CHECK.md` lists every personal detail the site shows. Never add phone numbers, street addresses, salary, references, private notes, or job-search targeting details. Location stays at city or region level.
