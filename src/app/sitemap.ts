import { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

import { allBlogs } from "contentlayer/generated";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = allBlogs;

  return [
    {
      url: "https://volk.dev",
    },
    {
      url: "https://volk.dev/blog",
    },
    ...blogs.map((blog) => ({
      url: `${siteConfig.url}${blog.slug}`,
      lastModified: blog.updated ?? blog.published,
    })),
  ];
}
