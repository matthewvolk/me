"use cache";

import { Star } from "lucide-react";
import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { getShippedProjects } from "@/lib/github";

export const metadata: Metadata = {
  title: "Shipped",
  description: "Projects I've built and shipped",
};

export default async function ShippedPage() {
  cacheLife("hours");

  const projects = await getShippedProjects();

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Shipped</h1>
      </header>

      {projects.length > 0 ? (
        <ul className="flex flex-col">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/shipped/${project.slug}`}
                className="flex flex-col rounded-md p-4 -mx-4 hover:bg-accent"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">{project.name}</h2>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="size-4" />
                    {project.stars}
                  </span>
                </div>
                {project.language && (
                  <span className="py-1 text-sm text-muted-foreground">
                    {project.language}
                  </span>
                )}
                <p className="text-sm">{project.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">No projects yet.</p>
      )}
    </article>
  );
}
