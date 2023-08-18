import { notFound } from "next/navigation";

import { NavBar } from "@/components/navbar";
import { blog, blogs } from "@/content/generate";

export function generateStaticParams() {
  const posts = blogs();

  return posts.map((post) => ({ slug: post.slug }));
}

interface PostProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: PostProps) {
  const posts = blogs();
  const post = posts.find((post) => post.slug === params.slug);

  return {
    title: post ? `${post.data.title} - Matthew Volk` : "Not Found",
  };
}

const BlogPost = async ({ params }: PostProps) => {
  const posts = blogs();
  const found = posts.find((post) => post.slug === params.slug);

  if (!found) {
    return notFound();
  }

  const post = await blog(params.slug);

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col p-4">
      <NavBar />
      <div className="w-full max-w-3xl self-center">
        <div className="py-4">
          <h1 className="py-4 text-5xl font-bold">{post.data.title}</h1>
          <div className="pt-2 text-sm italic text-neutral-600 dark:text-neutral-200">
            {post.data.updated && <p>Updated: {post.data.updated}</p>}
            <p>Published: {post.data.published}</p>
          </div>
        </div>
        <div className="py-4"></div>
        <article
          className="prose dark:prose-invert lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: post.html }}
        ></article>
      </div>
    </main>
  );
};

export default BlogPost;
