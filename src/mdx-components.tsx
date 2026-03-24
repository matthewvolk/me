import { Pre } from "@/components/mdx/code-block";

import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mt-8 mb-4 text-3xl font-bold tracking-tight">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-3 text-2xl font-semibold tracking-tight">{children}</h2>
    ),
    h3: ({ children }) => <h3 className="mt-6 mb-2 text-xl font-semibold">{children}</h3>,
    p: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
    ul: ({ children }) => <ul className="mb-4 ml-6 list-disc">{children}</ul>,
    ol: ({ children }) => <ol className="mb-4 ml-6 list-decimal">{children}</ol>,
    li: ({ children }) => <li className="mt-2">{children}</li>,
    a: ({ href, children }) => (
      <a href={href} className="text-primary underline underline-offset-4 hover:text-primary/80">
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-4 mb-4 border-l-2 border-border pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">{children}</code>
    ),
    table: ({ children }) => (
      <div className="mb-4 overflow-x-auto">
        <table className="w-full border-collapse border border-border text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
    th: ({ children }) => (
      <th className="border border-border px-4 py-2 text-left font-semibold">{children}</th>
    ),
    td: ({ children }) => <td className="border border-border px-4 py-2">{children}</td>,
    tr: ({ children }) => <tr className="even:bg-muted/50">{children}</tr>,
    pre: Pre,
    ...components,
  };
}
