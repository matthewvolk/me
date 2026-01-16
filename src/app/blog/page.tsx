import type { Metadata } from "next";
import Link from "next/link";
import { DateChip } from "@/components/date-chip";
import { getVisiblePosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles about software engineering, web development, and more",
};

export default async function BlogPage() {
  const posts = await getVisiblePosts();

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
                <h2 className="font-semibold">{post.metadata.title}</h2>
                <DateChip date={post.metadata.date} className="py-1" />
                <p className="text-sm">{post.metadata.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts yet.</p>
      )}
    </article>
  );
}
