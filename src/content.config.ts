import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Blog posts: src/content/blog/<slug>.md. The file name is the URL slug (/blog/<slug>/).
// Media for a post lives in public/media/<slug>/ and is linked as /media/<slug>/<file>.
const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().optional(),
    canonical: z.string().optional(),
    variantId: z.string().optional(),
    heroImage: z.string().optional(),
  }),
});

// Projects: src/content/projects/<slug>.md, shown at /projects/<slug>/.
const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    links: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
    heroImage: z.string().optional(),
    featured: z.boolean().optional(),
    // Optional display extras (not required by the harness contract).
    role: z.string().optional(),
    period: z.string().optional(),
  }),
});

export const collections = { blog, projects };
