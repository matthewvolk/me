import fs from "fs";
import { parse } from "path";

import matter from "gray-matter";
import * as z from "zod";

const contentSourceDir = `${process.cwd()}/src/content/blog`;

const contentSourceFileNames = fs.readdirSync(contentSourceDir);

const FrontMatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  published: z.string(),
  updated: z.string().optional(),
});

export const blogs = contentSourceFileNames.map((contentSourceFileName) => {
  const slug = parse(contentSourceFileName).name;
  const path = `/blog/${slug}`;
  const fileContents = fs.readFileSync(
    `${contentSourceDir}/${contentSourceFileName}`,
    "utf8",
  );
  const { data, content } = matter(fileContents);

  const frontmatter = FrontMatterSchema.parse(data);

  return {
    slug,
    path,
    ...frontmatter,
    content,
  };
});

export type Blog = (typeof blogs)[number];
