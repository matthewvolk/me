import path from "node:path";
import { readdirSync, readFileSync } from "node:fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { remark } from "remark";
import remarkHtml from "remark-html";

const contentDir = path.join(process.cwd(), "src/content");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  published: string;
  updated?: string;
}

const getPostsMeta = (): PostMeta[] =>
  readdirSync(contentDir)
    .map((fileName) => {
      const meta = matter(
        readFileSync(path.join(contentDir, fileName), "utf-8")
      );

      return {
        slug: fileName.replace(/\.md$/, ""),
        title: meta.data.title,
        description: meta.data.description,
        published: meta.data.published,
        updated: meta.data.updated,
      };
    })
    .sort(
      (a, b) =>
        (b.updated
          ? new Date(b.updated).valueOf()
          : new Date(b.published).valueOf()) -
        (a.updated
          ? new Date(a.updated).valueOf()
          : new Date(a.published).valueOf())
    );

export function generateStaticParams() {
  const posts = getPostsMeta();

  return posts.map((post) => ({ slug: post.slug }));
}

interface PostProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: PostProps) {
  const posts = getPostsMeta();
  const post = posts.find((post) => post.slug === params.slug);

  return {
    title: post ? `${post.title} - Matthew Volk` : "Not Found",
  };
}

const getPost = async (slug: string): Promise<PostMeta & { html: string }> => {
  const meta = matter(
    readFileSync(path.join(contentDir, `${slug}.md`), "utf-8")
  );

  const content = await remark().use(remarkHtml).process(meta.content);
  const html = content.toString();

  return {
    slug,
    title: meta.data.title,
    description: meta.data.description,
    published: meta.data.published,
    updated: meta.data.updated,
    html,
  };
};

const BlogPost = async ({ params }: PostProps) => {
  const posts = getPostsMeta();
  const found = posts.find((post) => post.slug === params.slug);

  if (!found) {
    return notFound();
  }

  const post = await getPost(params.slug);

  return (
    <main className="pt-4">
      <h1>{post.title}</h1>
      {post.updated && <p>Updated: {post.updated}</p>}
      <p>Published: {post.published}</p>
      <article dangerouslySetInnerHTML={{ __html: post.html }}></article>
    </main>
  );
};

export default BlogPost;
