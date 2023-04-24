import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { contentDir } from "@/utils/contentDir";

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  published: string;
  updated?: string;
}

export const getPostsMeta = (): PostMeta[] =>
  fs.readdirSync(contentDir).map((fileName) => {
    const meta = matter(
      fs.readFileSync(path.join(contentDir, fileName), "utf-8")
    );

    return {
      slug: fileName.replace(/\.md$/, ""),
      title: meta.data.title,
      description: meta.data.description,
      published: meta.data.published,
      updated: meta.data.updated,
    };
  });
