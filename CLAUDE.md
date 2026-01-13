# Portfolio Project

Next.js 16 portfolio site with App Router.

## Stack

- Next.js 16.1 with cacheComponents enabled
- React 19 with React Compiler
- TypeScript 5.9
- Tailwind CSS 4
- Biome (lint/format)
- Turbopack (dev server)
- pnpm 10.28

## Commands

```bash
pnpm dev        # start dev server (turbopack)
pnpm build      # production build
pnpm start      # start production server
pnpm check      # biome check
pnpm fix        # biome check --write
pnpm typecheck  # tsc --noEmit
```

## Structure

```
src/
  app/
    layout.tsx            # root layout w/ theme provider
    page.tsx              # homepage
    globals.css           # tailwind + shiki styles
    blog/
      page.tsx            # blog listing
      [slug]/page.tsx     # blog detail
  components/
    ui/                   # shadcn components
    mdx/code-block.tsx    # server-side shiki highlighting
    header.tsx            # nav header
    theme-provider.tsx    # next-themes wrapper
    theme-toggle.tsx      # dark/light toggle
  content/blog/           # MDX blog posts
  lib/
    posts.ts              # blog utilities
    utils.ts              # shadcn utils
mdx-components.tsx        # MDX component mapping
```

## Blog

Posts are MDX files in `src/content/blog/`. Export metadata:

```tsx
export const metadata = {
  title: "Post Title",
  description: "Description",
  date: "2026-01-12",
  tags: ["tag1", "tag2"],
};
```

Code blocks use shiki with dual themes (github-light/github-dark-dimmed).

## cacheComponents

With `cacheComponents: true`, data fetching is dynamic by default. Use `"use cache"` directive to opt into caching:

```tsx
"use cache"

export default async function Page() {
  const data = await fetch('...')
  return <div>{data}</div>
}
```

Related APIs: `cacheLife()`, `cacheTag()`, `revalidateTag()`

## MCP Tools

Next.js 16 exposes MCP at `/_next/mcp`. Use `nextjs_index` and `nextjs_call` tools for:
- Route inspection
- Error diagnostics
- Build status
- Cache management
