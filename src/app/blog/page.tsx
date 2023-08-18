import { Metadata } from "next";
import Link from "next/link";

import { NavBar } from "@/components/navbar";
import { blogs } from "@/content/generate";

export const metadata: Metadata = {
  title: "Blog - volk.dev",
  description: "Software Engineer",
};

const Blog = () => {
  const posts = blogs();
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col p-4">
      <NavBar />

      <h1>Posts</h1>
      {posts.map((post) => (
        <Link href={`/blog/${post.slug}`} key={post.slug}>
          <h2>{post.data.title}</h2>
          <p>{post.data.description}</p>
          {post.data.updated ? (
            <p>
              <span>Updated:</span> {post.data.updated}
            </p>
          ) : (
            <p>
              <span>Published:</span> {post.data.published}
            </p>
          )}
        </Link>
      ))}
    </main>
  );
};

export default Blog;
