import { NavBar } from "@/components/navbar";
import { Metadata } from "next";
import path from "node:path";
import { readdirSync, readFileSync } from "node:fs";
import matter from "gray-matter";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - volk.dev",
  description: "Software Engineer",
};

const contentDir = path.join(process.cwd(), "src/content");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  published: string;
  updated?: string;
}

const getPostsMeta = (): PostMeta[] =>
  readdirSync(contentDir)
    .map((fileName) => {
      const meta = matter(
        readFileSync(path.join(contentDir, fileName), "utf-8")
      );

      return {
        slug: fileName.replace(/\.md$/, ""),
        title: meta.data.title,
        description: meta.data.description,
        published: meta.data.published,
        updated: meta.data.updated,
      };
    })
    .sort(
      (a, b) =>
        (b.updated
          ? new Date(b.updated).valueOf()
          : new Date(b.published).valueOf()) -
        (a.updated
          ? new Date(a.updated).valueOf()
          : new Date(a.published).valueOf())
    );

const Blog = () => {
  const posts = getPostsMeta();
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col p-4">
      <NavBar />

      <h1>Posts</h1>
      {posts.map((post) => (
        <Link href={`/blog/${post.slug}`} key={post.slug}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          {post.updated ? (
            <p>
              <span>Updated:</span> {post.updated}
            </p>
          ) : (
            <p>
              <span>Published:</span> {post.published}
            </p>
          )}
        </Link>
      ))}
    </main>
  );
};

export default Blog;
