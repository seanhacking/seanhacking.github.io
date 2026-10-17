# seanhacking.github.io

Sean Hacking's personal site: About and CV, Projects, Blog and Contact. Static [Astro](https://astro.build) site, deployed to GitHub Pages at https://seanhacking.github.io by GitHub Actions. No tracking, no analytics, no external scripts or fonts (fonts are self-hosted from `@fontsource` packages).

The look is an engineering drawing that comes alive, in the Shop Floor style (graphite, brushed aluminium, anodised blue): hand-made animated SVG drawings, and the home page told as seven chapters on one running belt. `DESIGN.md` has the concept and motion rules; `STYLE-GUIDE.md` has the palette, type and colour rules.

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
| Home-page story chapters (text, which drawing, which project) | `src/data/story.json` | `/` |
| Project photos (optional, see below) | `public/media/projects/<slug>/` | project pages |
| Layout, nav, OpenGraph tags, theme and motion switches | `src/layouts/Base.astro` | |
| Styles (Shop Floor light and dark tokens, print CSS for the CV) | `src/styles/global.css` | |
| Drawing line styles and animations | `src/styles/art.css` | |
| The drawings (inline SVG, one component each) | `src/components/art/` | |
| "How it works" diagrams per project | `src/components/diagrams/`, chosen in `src/components/HowItWorks.astro` | project pages |

`profile.json` fields: `name`, `headline`, `location?`, `email?` (left out on purpose: no email is shown until Sean picks one), `intro?` (home page), `links` (`{label, url}[]`), `about` (short Markdown: paragraphs, `##` headings, `-` lists, bold, italic, links), and `cv` (`summary?`, `experience[]` of `{role, org, start, end, highlights[]}`, `education[]` of `{degree, school, year}`, `skills[]` of `{area, items[]}`).

Project frontmatter: `title`, `summary`, `date`, `tags`, optional `links` (`{label, url}[]`), `heroImage`, `featured` (featured projects show on the home page), and display-only `role` and `period`.

## Project photos

Every project page has a photo slot. To fill it, drop image files (`.jpg`, `.png`, `.webp`, `.avif`) into `public/media/projects/<slug>/`, for example `public/media/projects/veer-belt-drive/01-test-rig.jpg`. They appear on the project page automatically, sorted by file name, in a framed grid (cropped to 4:3, so nothing shifts while they load). Add captions, which are also the alt text, in `captions.json` in the same folder:

```json
{ "01-test-rig.jpg": "The log-splitter test rig with a belt sample loaded" }
```

Without a caption the file name is used ("01-test-rig.jpg" becomes "Test rig"), so name files sensibly. A project's `heroImage` frontmatter, if set, is shown first and used for link previews. Until a project has photos, dev and preview builds show a sketched "Photo slot" box in their place; the live site shows nothing. Remember to check `PRIVACY-CHECK.md` before adding photos (no photos of Sean unless he decides so, nothing confidential from Zipline).

Slugs with a slot today: `zipline-dropbox-kiosk`, `veer-belt-drive`, `shift-seamless-belt-transmission`, `lavalock-workholding`.

## Drawings and motion

- Each drawing is an Astro component in `src/components/art/` that outputs one inline SVG, built from small geometry helpers in `src/lib/geometry.ts` (belt paths, toothed pulleys, pencil-sketch circles).
- New projects get a generic pulley drawing; to give one its own, add a component and a case in `src/components/ProjectArt.astro` (and optionally a diagram in `HowItWorks.astro`).
- Animations are CSS only and run only when `<html>` has the class `motion`. That class is set before first paint unless the visitor prefers reduced motion or turned motion off with the header switch, so the finished, still drawing is what reduced-motion visitors, no-JavaScript visitors and printers see. A small inline script starts each drawing when it scrolls into view, pauses loops off-screen, and moves the home-page belt with the scroll.
- Drawings of Zipline and SHIFT carry a note that they are illustrations, not the real design. Keep it that way.

## Adding a post

Create `src/content/blog/<slug>.md`. The slug is the title in kebab case, at most 60 characters, unique (add `-2`, `-3` if needed).

```markdown
---
title: "A homemade test rig that beat the standard"
description: "One or two sentences for the post list, RSS and link previews."
date: 2026-10-17
tags: ["testing", "prototyping"]
draft: false          # true keeps it off the live site (still visible in npm run dev)
canonical: ""         # optional: the original URL if the post first appeared elsewhere
variantId: ""         # optional: set by the harness (Presence library variant id)
heroImage: "/media/a-homemade-test-rig/rig.jpg"   # optional
---

Body in Markdown. Link images and other pages root-relative, e.g. ![The rig](/media/a-homemade-test-rig/rig.jpg)
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
