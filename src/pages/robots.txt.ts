import { absoluteUrl, IS_PREVIEW } from "../lib/url";

// Only the root robots.txt is read by crawlers. Previews also carry a noindex meta tag.
export function GET() {
  const body = IS_PREVIEW
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\nDisallow: /preview/\n\nSitemap: ${absoluteUrl("/sitemap-index.xml")}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
