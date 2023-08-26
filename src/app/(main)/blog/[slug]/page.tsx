import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { blog, blogs } from "@/content/generate";
import { cs } from "@/lib/cs";
import { env } from "@/lib/env.mjs";

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

  if (!post) {
    return {};
  }

  return {
    title: post.data.title,
    description: post.excerpt,
    author: {
      name: "Matthew Volk",
    },
  };
}

const BlogPost = async ({ params }: PostProps) => {
  const posts = blogs();
  const found = posts.find((post) => post.slug === params.slug);

  if (!found) {
    return notFound();
  }

  const githubAvatar = async () => {
    const response = await fetch("https://api.github.com/users/matthewvolk", {
      headers: { authorization: `bearer ${env.GITHUB_PAT}` },
    });
    const data = await response.json();

    return data.avatar_url as string;
  };

  const post = await blog(params.slug);

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/blog"
        className={cs(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex",
        )}
      >
        <ChevronLeft height={18} className="mr-2" /> See all posts
      </Link>
      <div>
        {post.data.updated ? (
          <time
            dateTime={post.data.updated}
            className="block text-sm text-slate-500 dark:text-slate-400"
          >
            Updated on {post.data.updated}
          </time>
        ) : (
          <time
            dateTime={post.data.published}
            className="block text-sm text-slate-500 dark:text-slate-400"
          >
            Published on {post.data.published}
          </time>
        )}
      </div>
      <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">
        {post.data.title}
      </h1>
      <div className="mt-4 flex space-x-4">
        <Link
          href={
            siteConfig.links.find((link) => link.title === "Twitter")?.href ||
            ""
          }
          target="_blank"
          rel="noopenner noreferrer"
          className="flex items-center space-x-2 text-sm"
        >
          <Image
            src={await githubAvatar()}
            alt="GitHub Profile Picture"
            width={42}
            height={42}
            className="rounded-full bg-white"
          />
          <div className="flex-1 text-left leading-tight">
            <p className="font-medium">Matt</p>
            <p className="text-[12px] text-slate-500 dark:text-slate-400">
              @mttvlk
            </p>
          </div>
        </Link>
      </div>

      <div
        className="prose mt-8 dark:prose-invert lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <hr className="mt-12 dark:border-slate-800" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/blog" className={cs(buttonVariants({ variant: "ghost" }))}>
          <ChevronLeft height={18} className="mr-2" /> See all posts
        </Link>
      </div>
    </article>
  );
};

export default BlogPost;