import { Calendar } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { blogs, formatDate, latestFirst } from "@/app/blog/blogs";

export const metadata: Metadata = {
  title: "Blog",
};

const Blog = () => (
  <>
    <section className="flex flex-col gap-2">
      <h1 className="text-2xl font-extrabold">Blog</h1>

      {blogs.sort(latestFirst).map((blog, i) => (
        <Link
          className="-mx-4 rounded-md p-4 hover:bg-gray-200/75"
          href={blog.path}
          id={i === 0 ? "main-content" : ""}
          key={blog.path}
        >
          <h2 className="font-semibold">{blog.title}</h2>
          <p className="flex items-center gap-2 py-2 text-sm">
            <Calendar size={14} />
            <span>
              {blog.updated
                ? `Updated: ${formatDate(blog.updated)}`
                : `Published: ${formatDate(blog.published)}`}
            </span>
          </p>
          <p className="text-sm">{blog.description}</p>
        </Link>
      ))}
    </section>
  </>
);

export default Blog;
