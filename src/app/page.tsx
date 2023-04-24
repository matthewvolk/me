import { getPostsMeta } from "@/utils/getPostsMeta";
import Link from "next/link";

export default function Home() {
  const posts = getPostsMeta();

  return (
    <main>
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
}
