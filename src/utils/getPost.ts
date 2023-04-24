import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { contentDir } from "@/utils/contentDir";
import { PostMeta } from "@/utils/getPostsMeta";

export const getPost = async (
  slug: string
): Promise<PostMeta & { html: string }> => {
  const meta = matter(
    fs.readFileSync(path.join(contentDir, `${slug}.md`), "utf-8")
  );

  const content = await remark().use(remarkHtml).process(meta.content);
  const html = content.toString();

  return {
    slug,
    title: meta.data.title,
    description: meta.data.description,
    published: meta.data.published,
    updated: meta.data.updated,
    html,
  };
};
