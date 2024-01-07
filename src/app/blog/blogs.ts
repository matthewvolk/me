import fs from "fs";
import { parse } from "path";

import matter from "gray-matter";
import * as z from "zod";

const contentSourceDir = `${process.cwd()}/src/content`;

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

type Blog = (typeof blogs)[number];

export const formatDate = (input: string | number) => {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const latestFirst = (a: Blog, b: Blog) =>
  (b.updated
    ? new Date(b.updated).valueOf()
    : new Date(b.published).valueOf()) -
  (a.updated ? new Date(a.updated).valueOf() : new Date(a.published).valueOf());
