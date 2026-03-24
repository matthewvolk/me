import { evaluate } from "@mdx-js/mdx";
import type { Element, Root } from "hast";
import type { MDXContent } from "mdx/types";
import * as jsxRuntime from "react/jsx-runtime";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";

interface RewriteOptions {
  owner: string;
  repo: string;
  branch: string;
}

function rehypeRewriteUrls(options: RewriteOptions) {
  const { owner, repo, branch } = options;
  const rawBase = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}`;
  const blobBase = `https://github.com/${owner}/${repo}/blob/${branch}`;

  return () => (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "img" && typeof node.properties.src === "string") {
        const src = node.properties.src;
        if (!src.startsWith("http") && !src.startsWith("data:")) {
          node.properties.src = `${rawBase}/${src.replace(/^\.?\//, "")}`;
        }
      }

      if (
        node.tagName === "source" &&
        typeof node.properties.srcSet === "string"
      ) {
        const srcSet = node.properties.srcSet;
        if (!srcSet.startsWith("http")) {
          node.properties.srcSet = `${rawBase}/${srcSet.replace(/^\.?\//, "")}`;
        }
      }

      if (node.tagName === "a" && typeof node.properties.href === "string") {
        const href = node.properties.href;
        if (
          !href.startsWith("http") &&
          !href.startsWith("#") &&
          !href.startsWith("mailto:")
        ) {
          node.properties.href = `${blobBase}/${href.replace(/^\.?\//, "")}`;
        }
      }
    });
  };
}

export async function renderMarkdown(
  markdown: string,
  options: RewriteOptions,
): Promise<MDXContent> {
  const { default: Content } = await evaluate(markdown, {
    format: "md",
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeRaw, rehypeRewriteUrls(options)],
    ...jsxRuntime,
  });

  return Content;
}
