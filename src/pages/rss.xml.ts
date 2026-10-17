import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import profile from "../data/profile.json";
import { getPosts } from "../lib/content";
import { absoluteUrl } from "../lib/url";

export async function GET(_context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${profile.name}: writing`,
    description: "Notes on prototyping, testing and building hardware.",
    site: absoluteUrl("/"),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: absoluteUrl(`/blog/${post.id}/`),
      categories: post.data.tags,
    })),
    customData: "<language>en-us</language>",
  });
}
