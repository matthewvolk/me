import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles about software engineering, web development, and more",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="mt-2 text-muted-foreground">
          Articles about software engineering, web development, and more
        </p>
      </header>

      {posts.length > 0 ? (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <time
                  className="text-sm text-muted-foreground"
                  dateTime={post.metadata.date}
                >
                  {post.metadata.date}
                </time>
                <h2 className="text-xl font-medium group-hover:underline">
                  {post.metadata.title}
                </h2>
                <p className="mt-1 text-muted-foreground">
                  {post.metadata.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">No posts yet.</p>
      )}
    </article>
  );
}
