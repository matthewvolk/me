import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
}

const SEO = ({ title, description, image }: SEOProps) => {
  const router = useRouter();

  const seo = {
    title: title ? title + " — Matthew Volk" : "Matthew Volk",
    description: description
      ? description
      : "My name is Matt and I'm a software developer living in Austin, TX.",
    image: image ? "https://volk.dev/" + image : "https://volk.dev/cover.png",
    url: "https://volk.dev" + router.asPath,
  };

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:type" content="website" />
      <meta property="og:image:alt" content={seo.description} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#000034" />
      <meta name="theme-color" content="#000034"></meta>
    </Head>
  );
};

export default SEO;
