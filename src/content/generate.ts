import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import * as z from "zod";

const blogsdir = path.join(process.cwd(), "src/content/blogs");

const MatterSchema = z.object({
  content: z.string(),
  excerpt: z.string(),
  data: z.object({
    title: z.string(),
    description: z.string(),
    published: z.string(),
    updated: z.string().optional(),
  }),
});

const parseMetadata = (fileName: string) => {
  const meta = matter(readFileSync(path.join(blogsdir, fileName), "utf-8"));

  const parsed = MatterSchema.safeParse(meta);

  if (!parsed.success) {
    throw new Error(
      `Error in file ${fileName}: ${JSON.stringify(parsed.error, null, 2)}`,
    );
  }

  return parsed.data;
};

export const blogs = () => {
  const files = readdirSync(blogsdir);

  const metadata = files.map((fileName) => {
    const meta = parseMetadata(fileName);

    return {
      ...meta,
      slug: fileName.replace(/\.md$/, ""),
    };
  });

  const reordered = metadata.sort(
    (a, b) =>
      (b.data.updated
        ? new Date(b.data.updated).valueOf()
        : new Date(b.data.published).valueOf()) -
      (a.data.updated
        ? new Date(a.data.updated).valueOf()
        : new Date(a.data.published).valueOf()),
  );

  return reordered;
};

export const blog = async (slug: string) => {
  const meta = parseMetadata(`${slug}.md`);

  const content = await remark().use(remarkHtml).process(meta.content);
  const html = content.toString();

  return {
    ...meta,
    slug,
    html,
  };
};
