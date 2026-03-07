import type { MetadataRoute } from "next";
import { getShippedProjects } from "@/lib/github";
import { getAllPosts } from "@/lib/posts";

const BASE_URL = "https://volk.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([getAllPosts(), getShippedProjects()]);

  const blogPosts = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.date),
    priority: 0.7,
  }));

  const shippedProjects = projects.map((project) => ({
    url: `${BASE_URL}/shipped/${project.slug}`,
    lastModified: new Date(project.pushedAt),
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/shipped`,
      lastModified: new Date(),
      priority: 0.8,
    },
    ...blogPosts,
    ...shippedProjects,
  ];
}
