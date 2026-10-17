// Every internal link goes through url() so the site works at the root (https://seanhacking.github.io/)
// and inside a pull-request preview (https://seanhacking.github.io/preview/pr-<n>/).
const RAW_BASE = import.meta.env.BASE_URL || "/";
export const BASE = RAW_BASE.endsWith("/") ? RAW_BASE : RAW_BASE + "/";

/** True for preview builds (anything not served from the site root). */
export const IS_PREVIEW = BASE !== "/";

/** Show draft posts in `astro dev`, or when SHOW_DRAFTS=1 is set for a build. */
export const SHOW_DRAFTS = import.meta.env.DEV || process.env.SHOW_DRAFTS === "1";

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;

/** Site-internal path -> path with the base. url("blog/") or url("/blog/") -> "/preview/pr-3/blog/". */
export function url(path = "/"): string {
  if (EXTERNAL.test(path)) return path;
  if (path.startsWith(BASE) && BASE !== "/") return path;
  return BASE + path.replace(/^\/+/, "");
}

/** Absolute URL for OpenGraph, canonical links, RSS. */
export function absoluteUrl(path = "/"): string {
  if (/^[a-z][a-z0-9+.-]*:/i.test(path)) return path;
  return new URL(url(path), import.meta.env.SITE).toString();
}
