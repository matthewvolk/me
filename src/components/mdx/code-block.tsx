import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from "@shikijs/transformers";
import { connection } from "next/server";
import type { ReactElement } from "react";
import { codeToHtml } from "shiki";

interface PreProps {
  children: ReactElement<{ children: string; className?: string }>;
}

export async function Pre({ children }: PreProps) {
  await connection();

  let code = children.props.children?.trim() || "";
  const className = children.props.className || "";
  const lang = className.replace(/language-/, "") || "text";

  // Extract title from first line if it starts with // @filename:
  let title: string | null = null;
  const titleMatch = code.match(/^\/\/\s*@filename:\s*(.+)\n/);
  if (titleMatch) {
    title = titleMatch[1].trim();
    code = code.replace(titleMatch[0], "");
  }

  const html = await codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark-dimmed",
    },
    transformers: [transformerNotationHighlight(), transformerNotationDiff()],
  });

  const wrapperClasses = title
    ? "overflow-x-auto rounded-b-lg border border-t-0 border-border [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-relaxed"
    : "overflow-x-auto rounded-lg border border-border [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-relaxed";

  return (
    <div className="mb-4">
      {title && <div data-code-title="">{title}</div>}
      <div
        className={wrapperClasses}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: shiki output is safe
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
