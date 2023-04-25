import { notFound } from "next/navigation";
import { getPost } from "@/utils/getPost";
import { getPostsMeta } from "@/utils/getPostsMeta";

interface PostProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const posts = getPostsMeta();

  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PostProps) {
  const posts = getPostsMeta();
  const post = posts.find((post) => post.slug === params.slug);

  return {
    title: post ? `${post.title} - Matthew Volk` : "Not Found",
  };
}

export default async function Post({ params }: PostProps) {
  const posts = getPostsMeta();
  const found = posts.find((post) => post.slug === params.slug);

  if (!found) {
    return notFound();
  }

  const post = await getPost(params.slug);

  return (
    <main className="pt-4">
      <h1>{post.title}</h1>
      {post.updated && <p>Updated: {post.updated}</p>}
      <p>Published: {post.published}</p>
      <article dangerouslySetInnerHTML={{ __html: post.html }}></article>
    </main>
  );
}
