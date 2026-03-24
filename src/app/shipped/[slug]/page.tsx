"use cache";

import { ExternalLink, Github, Star } from "lucide-react";
import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getAllShippedSlugs,
  getReadmeContent,
  getShippedProject,
} from "@/lib/github";
import { renderMarkdown } from "@/lib/markdown";
import { useMDXComponents } from "../../../mdx-components";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllShippedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getShippedProject(slug);

  if (!project) return {};

  return {
    title: project.name,
    description: project.description,
    authors: [{ name: "Matthew Volk", url: "https://volk.dev" }],
  };
}

export default async function ShippedProjectPage({ params }: Props) {
  cacheLife("hours");

  const { slug } = await params;
  const project = await getShippedProject(slug);

  if (!project) notFound();

  let Content: Awaited<ReturnType<typeof renderMarkdown>> | null = null;
  try {
    const readme = await getReadmeContent(
      project.fullName,
      project.defaultBranch,
    );
    Content = await renderMarkdown(readme, {
      owner: project.fullName.split("/")[0],
      repo: project.fullName.split("/")[1],
      branch: project.defaultBranch,
    });
  } catch {
    // README may not exist — render page without it
  }

  const components = useMDXComponents({});

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
        {project.description && (
          <p className="mt-2 text-muted-foreground">{project.description}</p>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href={project.url} target="_blank">
              <Github className="size-4" />
              View on GitHub
            </Link>
          </Button>
          {project.homepage && (
            <Button variant="outline" size="sm" asChild>
              <Link href={project.homepage} target="_blank">
                <ExternalLink className="size-4" />
                Visit Site
              </Link>
            </Button>
          )}
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="size-4" />
            {project.stars}
          </span>
          {project.language && (
            <Badge variant="secondary">{project.language}</Badge>
          )}
        </div>
        {project.topics.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {project.topics.map((topic) => (
              <Badge key={topic} variant="outline">
                {topic}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {Content && (
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <Content components={components} />
        </div>
      )}
    </article>
  );
}
