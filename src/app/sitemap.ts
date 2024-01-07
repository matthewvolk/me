import { MetadataRoute } from "next";

import { blogs } from "@/app/blog/blogs";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://volk.dev",
  },
  {
    url: "https://volk.dev/blog",
  },
  ...blogs.map((blog) => ({
    url: `https://volk.dev${blog.path}`,
    lastModified: blog.updated ?? blog.published,
  })),
];

export default sitemap;
