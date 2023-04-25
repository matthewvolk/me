import Link from "next/link";
import { getGitHubData } from "@/utils/getGitHubData";
import { getPostsMeta } from "@/utils/getPostsMeta";

export default async function Home() {
  const gitHubData = await getGitHubData();
  const posts = getPostsMeta();

  return (
    <main>
      <p className="pt-4">
        Matthew Volk is a software engineer based in Austin, Texas.
      </p>
      <h2 className="font-bold pt-4">GitHub Pinned Repositories</h2>
      {gitHubData.data.viewer.pinnedItems.nodes.map((pinnedItem) => (
        <Link
          href={pinnedItem.url}
          key={pinnedItem.name}
          target="_blank"
          className="pt-2"
        >
          <h3 className="text-sky-700 underline">
            {pinnedItem.owner.login}/{pinnedItem.name}
          </h3>
          <p>{pinnedItem.description}</p>
        </Link>
      ))}
      <h2 className="font-bold pt-4">GitHub Contributions</h2>
      <Link
        href="https://github.com/matthewvolk"
        target="_blank"
        className="text-sky-700 underline"
      >
        {
          gitHubData.data.viewer.contributionsCollection.contributionCalendar
            .totalContributions
        }{" "}
        contributions in the last year
      </Link>
      <h2 className="font-bold pt-4">Blog Posts</h2>
      {posts.map((post) => (
        <Link href={`/blog/${post.slug}`} key={post.slug}>
          <h2>
            <span className="text-sky-700 underline">{post.title}</span>
            <span className="no-underline text-neutral-950 italic">
              {" "}
              — 
              {post.updated ? (
                <span>Updated: {post.updated}</span>
              ) : (
                <span>Published: {post.published}</span>
              )}
            </span>
          </h2>
          <p>{post.description}</p>
        </Link>
      ))}
    </main>
  );
}
