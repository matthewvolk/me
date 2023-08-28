import { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

import { allBlogs } from "contentlayer/generated";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = allBlogs;

  return [
    {
      url: siteConfig.url,
    },
    {
      url: `${siteConfig.url}/blog`,
    },
    ...blogs.map((blog) => ({
      url: `${siteConfig.url}${blog.slug}`,
      lastModified: blog.updated ?? blog.published,
    })),
  ];
}
