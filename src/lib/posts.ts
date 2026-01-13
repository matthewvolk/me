import fs from "node:fs";
import path from "node:path";

export interface PostMetadata {
  title: string;
  description: string;
  date: string;
  tags?: string[];
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
}

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

export async function getAllPosts(): Promise<Post[]> {
  const files = fs.readdirSync(CONTENT_DIR);
  const posts: Post[] = [];

  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;

    const slug = file.replace(/\.mdx$/, "");
    const { metadata } = await import(`@/content/blog/${file}`);

    posts.push({
      slug,
      metadata: metadata as PostMetadata,
    });
  }

  return posts.sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
  );
}

export async function getPostBySlug(slug: string) {
  const { default: Content, metadata } = await import(
    `@/content/blog/${slug}.mdx`
  );
  return {
    Content,
    metadata: metadata as PostMetadata,
  };
}

export function getAllSlugs(): string[] {
  const files = fs.readdirSync(CONTENT_DIR);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
