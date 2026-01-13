import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
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
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  try {
    const { Content, metadata } = await getPostBySlug(slug);

    return (
      <article>
        <header className="mb-8">
          <time
            className="text-sm text-muted-foreground"
            dateTime={metadata.date}
          >
            {metadata.date}
          </time>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {metadata.title}
          </h1>
          <p className="mt-2 text-muted-foreground">{metadata.description}</p>
        </header>
        <Suspense
          fallback={<div className="animate-pulse">Loading content...</div>}
        >
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <Content />
          </div>
        </Suspense>
      </article>
    );
  } catch {
    notFound();
  }
}
