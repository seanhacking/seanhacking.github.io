// A deliberately small Markdown renderer for the short text fields in src/data/profile.json
// (paragraphs, ## headings, - lists, **bold**, *italic*, `code`, [links](url)). Blog posts and
// projects are rendered by Astro itself.
import { url } from "./url";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function inline(text: string): string {
  let out = escape(text);
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label: string, href: string) => {
    const target = href.replace(/&amp;/g, "&");
    return `<a href="${escape(url(target))}">${label}</a>`;
  });
  return out;
}

export function renderMarkdown(src: string): string {
  const blocks = src.replace(/\r\n/g, "\n").trim().split(/\n{2,}/);
  return blocks
    .map((block) => {
      const lines = block.split("\n");
      const heading = /^(#{2,4})\s+(.*)$/.exec(block);
      if (heading && lines.length === 1) {
        const level = heading[1]!.length;
        return `<h${level}>${inline(heading[2]!)}</h${level}>`;
      }
      if (lines.every((l) => /^\s*[-*]\s+/.test(l))) {
        return `<ul>${lines.map((l) => `<li>${inline(l.replace(/^\s*[-*]\s+/, ""))}</li>`).join("")}</ul>`;
      }
      return `<p>${inline(lines.join(" "))}</p>`;
    })
    .join("\n");
}
