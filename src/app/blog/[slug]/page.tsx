import { Calendar, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { blogs, formatDate } from "@/app/blog/blogs";
import { Markdown } from "@/components/mark-down";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

function getPostFromParams(slug: string) {
  const blog = blogs.find((blog) => blog.slug === slug);

  if (!blog) {
    null;
  }

  return blog;
}

export function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export function generateMetadata({ params }: BlogPostProps) {
  const post = getPostFromParams(params.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    author: {
      name: "Matthew Volk",
    },
  };
}

const BlogPost = ({ params }: BlogPostProps) => {
  const post = getPostFromParams(params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <article className="relative flex flex-col gap-4">
      <Link
        className="absolute left-[-200px] hidden items-center gap-1 rounded-md p-2 pr-5 text-sm font-medium hover:bg-gray-200/75 xl:inline-flex"
        href="/blog"
      >
        <ChevronLeft height={14} strokeWidth={3} /> See all posts
      </Link>

      <h1 className="text-2xl font-extrabold">{post.title}</h1>

      <p className="flex items-center gap-2 text-sm">
        <Calendar size={14} />
        <span>
          {post.updated
            ? `Updated: ${formatDate(post.updated)}`
            : `Published: ${formatDate(post.published)}`}
        </span>
      </p>

      <div
        className="prose dark:prose-invert lg:prose-xl mt-4"
        id="main-content"
      >
        <Markdown source={post.content} />
      </div>

      <div className="flex justify-center py-6 lg:py-10">
        <Link
          className="inline-flex items-center rounded-md p-2 pr-5 font-medium hover:bg-gray-200/75"
          href="/blog"
        >
          <ChevronLeft className="mr-2" height={16} strokeWidth={2.5} /> See all
          posts
        </Link>
      </div>
    </article>
  );
};

export default BlogPost;
