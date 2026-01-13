import { Calendar } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getAllPosts } from "@/lib/posts";

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
      </header>

      {posts.length > 0 ? (
        <ul className="flex flex-col">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="flex flex-col rounded-md p-4 -mx-4 hover:bg-accent"
              >
                <h2 className="font-medium">{post.metadata.title}</h2>
                <p className="flex items-center gap-2 py-1 text-sm text-muted-foreground">
                  <Calendar size={14} />
                  <time dateTime={post.metadata.date}>
                    {formatDate(post.metadata.date)}
                  </time>
                </p>
                <p className="text-sm text-muted-foreground">
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
