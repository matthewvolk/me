import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Matthew Volk</h1>
        <p className="mt-2 text-muted-foreground">Software Engineer</p>
      </header>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Recent Posts</h2>
        {recentPosts.length > 0 ? (
          <ul className="space-y-4">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <time
                    className="text-sm text-muted-foreground"
                    dateTime={post.metadata.date}
                  >
                    {post.metadata.date}
                  </time>
                  <h3 className="font-medium group-hover:underline">
                    {post.metadata.title}
                  </h3>
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
        {posts.length > 3 && (
          <Link
            href="/blog"
            className="mt-4 inline-block text-sm hover:underline"
          >
            View all posts
          </Link>
        )}
      </section>
    </article>
  );
}
