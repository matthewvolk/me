import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  type?: string;
}

const SEO = ({ title, description, image, imageAlt, type }: SEOProps) => {
  const router = useRouter();

  const seo = {
    title: title
      ? title + ' - Volk'
      : 'Volk - Software that Solves Hard Problems',
    description: description
      ? description
      : "My name is Matt and I'm a software developer living in Austin, TX.",
    image: image ? 'https://volk.dev/' + image : 'https://volk.dev/cover.png',
    url: 'https://volk.dev' + router.asPath,
    type: type ? type : 'website',
    imageAlt: imageAlt ? imageAlt : 'The official logo for Volk.dev',
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
      <meta property="og:type" content={seo.type} />
      <meta property="og:image:alt" content={seo.imageAlt} />
      <meta name="robots" content="index" />
      <link rel="canonical" href={seo.url} />
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
      <meta name="msapplication-TileColor" content="#F8FAFC" />
      <meta name="theme-color" content="#F8FAFC"></meta>
    </Head>
  );
};

export default SEO;
