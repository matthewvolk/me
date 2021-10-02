import Head from "next/head";
import React from "react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const SEO = ({ title, description, image, url }: SEOProps) => {
  return (
    <Head>
      <title>{title ? title + " — Matthew Volk" : "Matthew Volk"}</title>
      <meta
        name="description"
        content={
          description
            ? description
            : "My name is Matt and I'm a software developer living in Austin, TX."
        }
      />
      <meta
        name="image"
        content={
          image ? "https://volk.dev/" + image : "https://volk.dev/cover.png"
        }
      />
      <meta
        property="og:title"
        content={title ? title + " — Matthew Volk" : "Matthew Volk"}
      />
      <meta property="og:url" content={url ? url : "https://volk.dev"} />
      <meta
        property="og:description"
        content={
          description
            ? description
            : "My name is Matt and I'm a software developer living in Austin, TX."
        }
      />
      <meta
        property="og:image"
        content={
          image ? "https://volk.dev/" + image : "https://volk.dev/cover.png"
        }
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:image:alt"
        content={
          description
            ? description
            : "My name is Matt and I'm a software developer living in Austin, TX."
        }
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default SEO;
