import type { MetadataRoute } from "next";

const BASE_URL = "https://volk.dev";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
};

export default robots;
