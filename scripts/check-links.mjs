#!/usr/bin/env node
// Checks that every internal link and asset in the built site (dist/) resolves to a file.
// Usage: npm run check-links            (checks dist/ built for the site root)
//        SITE_BASE=/preview/pr-3/ npm run check-links   (checks a preview build)
// External links (other hosts, mailto:, tel:) are listed but not fetched: no network access.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://seanhacking.github.io";
const DIST = fileURLToPath(new URL("../dist/", import.meta.url));
const rawBase = (process.env.SITE_BASE ?? "/").trim() || "/";
const BASE = ("/" + rawBase.replace(/^\/+|\/+$/g, "") + "/").replace(/\/+/g, "/");

if (!existsSync(DIST)) {
  console.error("dist/ not found. Run `npm run build` first.");
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const files = walk(DIST);
const pages = files.filter((f) => f.endsWith(".html"));
const xmlFiles = files.filter((f) => f.endsWith(".xml"));

/** URL path of a file in dist, e.g. dist/blog/index.html -> /<base>/blog/index.html */
const urlPathOf = (file) => BASE + relative(DIST, file).split(sep).join("/");

/** Map a site URL path (already including the base) to a file in dist, or null. */
function resolveToFile(pathname) {
  let p;
  try { p = decodeURIComponent(pathname); } catch { return null; }
  if (!p.startsWith(BASE)) return null;
  const rel = p.slice(BASE.length);
  const candidates = rel === "" || rel.endsWith("/")
    ? [join(DIST, rel, "index.html")]
    : [join(DIST, rel), join(DIST, rel, "index.html"), join(DIST, rel + ".html")];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile()) ?? null;
}

const idCache = new Map();
function idsIn(file) {
  if (!idCache.has(file)) {
    const html = readFileSync(file, "utf8");
    idCache.set(file, new Set([...html.matchAll(/\s(?:id|name)=["']([^"']+)["']/g)].map((m) => m[1])));
  }
  return idCache.get(file);
}

const problems = [];
const external = new Set();
let checked = 0;

function check(raw, fromFile, attr) {
  const value = raw.trim().replace(/&amp;/g, "&");
  if (!value || value.startsWith("data:") || value.startsWith("javascript:")) return;
  if (/^(mailto|tel|sms):/i.test(value)) { external.add(value); return; }
  const from = new URL(urlPathOf(fromFile), SITE);
  let target;
  try { target = new URL(value, from); } catch { problems.push({ fromFile, value, why: "malformed URL" }); return; }
  if (target.origin !== SITE) { external.add(target.href); return; }
  checked++;
  if (!target.pathname.startsWith(BASE)) {
    problems.push({ fromFile, value, why: `outside the base path ${BASE}` });
    return;
  }
  const file = resolveToFile(target.pathname);
  if (!file) { problems.push({ fromFile, value, why: `no file for ${target.pathname} (${attr})` }); return; }
  if (target.hash && file.endsWith(".html")) {
    const id = decodeURIComponent(target.hash.slice(1));
    if (id && !idsIn(file).has(id)) problems.push({ fromFile, value, why: `missing anchor #${id}` });
  }
}

for (const page of pages) {
  const html = readFileSync(page, "utf8");
  // Skip the content of inline scripts and styles.
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
  for (const m of markup.matchAll(/<([a-z][a-z0-9-]*)\b([^>]*)>/gi)) {
    const [, tag, attrs] = m;
    for (const a of attrs.matchAll(/\s(href|src|poster|content|srcset)=("([^"]*)"|'([^']*)')/gi)) {
      const name = a[1].toLowerCase();
      const val = a[3] ?? a[4] ?? "";
      if (name === "content") {
        // Only OpenGraph/Twitter URLs pointing at this site.
        if (/^(meta)$/i.test(tag) && val.startsWith(SITE)) check(val, page, "meta content");
        continue;
      }
      if (name === "srcset") {
        for (const part of val.split(",")) check(part.trim().split(/\s+/)[0] ?? "", page, "srcset");
        continue;
      }
      check(val, page, `${tag} ${name}`);
    }
  }
}

// RSS and sitemap links.
for (const xml of xmlFiles) {
  const body = readFileSync(xml, "utf8");
  for (const m of body.matchAll(/<(?:loc|link)>([^<]+)<\/(?:loc|link)>/g)) {
    if (m[1].startsWith(SITE)) check(m[1], xml, "xml");
  }
}

for (const required of ["index.html", "404.html", "rss.xml", "robots.txt"]) {
  if (!existsSync(join(DIST, required))) problems.push({ fromFile: DIST, value: required, why: "required file missing" });
}

const rel = (f) => relative(DIST, f).split(sep).join("/") || ".";
console.log(`Checked ${checked} internal links in ${pages.length} pages and ${xmlFiles.length} XML files (base ${BASE}).`);
console.log(`${external.size} external links (not fetched).`);
if (problems.length) {
  console.error(`\n${problems.length} broken link(s):`);
  for (const p of problems) console.error(`  ${rel(p.fromFile)}: ${p.value}  ->  ${p.why}`);
  process.exit(1);
}
console.log("All internal links resolve.");
