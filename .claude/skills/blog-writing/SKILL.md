---
name: blog-writing
description: Write blog posts for Matt's personal Next.js MDX blog. USE WHEN asked to write, draft, or create blog posts, articles, or technical content for Matt's blog. Handles MDX metadata, code blocks with syntax highlighting, filename annotations, line highlighting, and diff highlighting. Writes in Matt's conversational, practical voice.
---

# Blog Writing Skill

Write blog posts as `.mdx` files for a Next.js blog with custom syntax highlighting features.

## MDX File Structure

Every blog post must include a metadata export at the top:

```mdx
export const metadata = {
  title: 'Post Title Here',
  description: 'A brief description for SEO and previews',
  date: 'YYYY-MM-DD',
  tags: ['tag1', 'tag2', 'tag3'],
};
```

Follow metadata with standard markdown content using `#` for the main title (matching the metadata title), `##` for sections, and `###` for subsections.

## Code Block Features

### Basic Code Blocks

Use triple backticks with a language identifier:

````mdx
```ts
function example(): string {
  return 'hello';
}
```
````

Supported languages: `ts`, `tsx`, `js`, `jsx`, `bash`, `css`, `html`, `json`, `sql`, `python`, and others.

### Filename Annotations

Add `// @filename:` as the first line to display a file path header:

````mdx
```tsx
// @filename: components/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return <button>{children}</button>;
}
```
````

### Line Highlighting

Add `// [!code highlight]` at the end of lines to highlight them:

````mdx
```ts
async function fetchData(url: string) {
  const response = await fetch(url); // [!code highlight]
  return response.json();
}
```
````

### Diff Highlighting

Use `// [!code ++]` for additions and `// [!code --]` for removals:

````mdx
```tsx
export default function Page() {
  const items = data.items; // [!code --]
  const { items, total } = data; // [!code ++]
  return (
    <ul>
      {items.map((i) => (
        <li key={i.id}>{i.title}</li>
      ))}
    </ul>
  );
}
```
````

Combine features as needed—filename annotation with highlighting, diffs within named files, etc.

## Writing Voice & Tone

Write in Matt's established voice with these characteristics:

### Be Conversational and Direct

Open with context or the problem, then get to the solution. Use first person naturally:

- "I was attempting to..." / "The other day I was..."
- "The quick solution here is..."
- "The good news is..."

### Acknowledge Complexity Honestly

Don't oversimplify. Call out when things are hard:

- "User authentication is complicated."
- "Writing X from scratch is even more complicated."
- "This post is still evolving, right now I'm going to admit the code is pretty manual."

### Be Practical and Real-World Focused

Ground explanations in actual scenarios and constraints:

- Reference real tools, versions, and error messages
- Acknowledge that not every team has unlimited resources
- "This is theoretical in nature. In a perfect world, every large e-commerce website would have..."

### Use Light Humor Sparingly

Occasional personality is good, but don't force it:

- "...but we'll just ignore that for now ¯\_(ツ)\_/¯"
- Casual asides that acknowledge shared developer frustrations

### Structure for Scannability

Use clear section headers. Lead with the problem, follow with the solution. End with what's next or a call to action like "Stay tuned!"

## Example Post Structure

````mdx
export const metadata = {
  title: 'Solving X with Y',
  description: 'How to fix the common X problem using Y',
  date: '2026-01-15',
  tags: ['typescript', 'nextjs'],
};

# Solving X with Y

[Opening: context or problem statement in 1-2 paragraphs]

## The Problem

[Describe what went wrong or what's difficult]

## The Solution

[Walk through the fix with code examples]

```ts
// @filename: lib/solution.ts
// actual code here
```

## What's Next

[Brief closing, future topics, or call to action]
````

## Things to Avoid

- Overly formal or corporate tone
- Generic filler content without substance
- Burying the solution under excessive background
- Code examples without context
- Promising comprehensiveness when the post is a focused how-to
