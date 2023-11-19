import { MetadataRoute } from "next";

import { blogs } from "@/app/(main)/blog/blogs";
import { siteConfig } from "@/config/site";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: siteConfig.url,
  },
  {
    url: `${siteConfig.url}/blog`,
  },
  ...blogs.map((blog) => ({
    url: `${siteConfig.url}${blog.path}`,
    lastModified: blog.updated ?? blog.published,
  })),
];

export default sitemap;
