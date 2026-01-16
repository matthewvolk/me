"use cache";

import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { DateChip } from "@/components/date-chip";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { metadata } = await getPostBySlug(slug);
    return {
      title: metadata.title,
      description: metadata.description,
      authors: [{ name: "Matthew Volk", url: "https://volk.dev" }],
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: Props) {
  cacheLife("max");

  const { slug } = await params;

  try {
    const { Content, metadata } = await getPostBySlug(slug);

    return (
      <article>
        <header className="mb-8">
          <DateChip date={metadata.date} className="text-muted-foreground" />
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {metadata.title}
          </h1>
          <p className="mt-2 text-muted-foreground">{metadata.description}</p>
        </header>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <Content />
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
