// @ts-check
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// The live site is https://seanhacking.github.io (a GitHub Pages user site, served from the root).
// Pull-request previews build with SITE_BASE=/preview/pr-<n>/ and are published under that folder.
const SITE = "https://seanhacking.github.io";
const rawBase = (process.env.SITE_BASE ?? "/").trim() || "/";
const BASE = ("/" + rawBase.replace(/^\/+|\/+$/g, "") + "/").replace(/\/+/g, "/");
const IS_PREVIEW = BASE !== "/";

/**
 * Markdown authors write root-relative links such as /media/<slug>/photo.jpg or /blog/other-post/.
 * Those are right for the live site; in a preview build this rewrites them to carry the base path.
 * Links the templates generate already carry the base (via src/lib/url.ts) and are left alone.
 */
function rebaseRootLinks() {
  return {
    name: "rebase-root-links",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        if (!IS_PREVIEW) return;
        const root = fileURLToPath(dir);
        let changed = 0;
        const walk = async (d) => {
          for (const entry of await readdir(d, { withFileTypes: true })) {
            const p = join(d, entry.name);
            if (entry.isDirectory()) await walk(p);
            else if (entry.name.endsWith(".html")) {
              const html = await readFile(p, "utf8");
              const out = html.replace(
                /(\s(?:href|src|poster)=["'])\/(?!\/)([^"']*)/g,
                (m, pre, rest) => ("/" + rest).startsWith(BASE) ? m : pre + BASE + rest,
              );
              if (out !== html) { await writeFile(p, out); changed++; }
            }
          }
        };
        await walk(root);
        logger.info(`rebased root-relative links in ${changed} page(s) to ${BASE}`);
      },
    },
  };
}

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: "ignore",
  build: { format: "directory" },
  // Previews are not indexed: no sitemap, plus a noindex meta tag (see src/layouts/Base.astro).
  integrations: IS_PREVIEW ? [rebaseRootLinks()] : [sitemap()],
});
