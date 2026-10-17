import { getCollection, type CollectionEntry } from "astro:content";
import { SHOW_DRAFTS } from "./url";

export type Post = CollectionEntry<"blog">;
export type Project = CollectionEntry<"projects">;

/** Published posts, newest first. Drafts appear only in `astro dev` or with SHOW_DRAFTS=1. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection("blog", ({ data }) => SHOW_DRAFTS || data.draft !== true);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Projects: featured first, then newest first. */
export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection("projects");
  return projects.sort(
    (a, b) =>
      Number(b.data.featured === true) - Number(a.data.featured === true) ||
      b.data.date.valueOf() - a.data.date.valueOf(),
  );
}

/** "Belt Drive" -> "belt-drive" (used for tag URLs). */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

/** All tags used by published posts, with counts, sorted by name. */
export function collectTags(posts: Post[]): { tag: string; slug: string; count: number }[] {
  const map = new Map<string, { tag: string; slug: string; count: number }>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = slugify(tag);
      const entry = map.get(slug) ?? { tag, slug, count: 0 };
      entry.count++;
      map.set(slug, entry);
    }
  }
  return [...map.values()].sort((a, b) => a.tag.localeCompare(b.tag));
}
