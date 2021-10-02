import { GetServerSidePropsContext } from "next";

const Sitemap = () => {};

export const getServerSideProps = ({ res }: GetServerSidePropsContext) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
              http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->
  
  
  <url>
    <loc>https://volk.dev/</loc>
    <lastmod>2021-10-02T21:04:45+00:00</lastmod>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>https://volk.dev/blog/product-management-and-ecommerce-platform-migrations</loc>
    <lastmod>2021-10-02T21:04:45+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://volk.dev/blog/delete-facebook-posts-with-javascript</loc>
    <lastmod>2021-10-02T21:04:45+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://volk.dev/blog/implement-multiple-local-user-authentication-strategies-in-passport-js</loc>
    <lastmod>2021-10-02T21:04:45+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://volk.dev/blog/bug-identified-in-magento-2-2-4-installation-phase</loc>
    <lastmod>2021-10-02T21:04:45+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://volk.dev/blog/user-auth</loc>
    <lastmod>2021-10-02T21:04:45+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  
  
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
