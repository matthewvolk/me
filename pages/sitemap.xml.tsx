import { GetServerSidePropsContext } from "next";
import fs from "fs";
import path from "path";

const Sitemap = () => {};

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const baseUrl = {
    development: "http://localhost:3000",
    production: "https://volk.dev",
    test: "http://localhost:3000",
  }[process.env.NODE_ENV];

  const blogDirectory = path.join(process.cwd(), "_posts");
  let blogFileNames = fs.readdirSync(blogDirectory);

  const blogPaths = blogFileNames.map(
    (fileName) => `${baseUrl}/blog/` + fileName
  );

  const staticPages = fs
    .readdirSync(
      {
        development: "pages",
        production: "./",
        test: "pages",
      }[process.env.NODE_ENV]
    )
    .filter((staticPage) => {
      return ![
        "_app.tsx",
        "_document.tsx",
        "_error.tsx",
        "sitemap.xml.tsx",
        "api",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath}`;
    })
    .sort((a, b) => b.length - a.length);

  blogPaths.forEach((blogPath) => staticPages.push(blogPath));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          if (url.includes(".tsx") || url.includes(".mdx"))
            return `
            <url>
              <loc>${
                url.includes("index") ? url.slice(0, -10) : url.slice(0, -4)
              }</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
