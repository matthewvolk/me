import { Code, Extension } from "bright";
import { MDXRemote } from "next-mdx-remote/rsc";

import { CopyButton } from "@/components/copy-button";

Code.theme = "github-dark";
Code.lineNumbers = true;

const highlight: Extension = {
  name: "highlight",
  MultilineAnnotation: ({ children }) => (
    <div className="relative bg-white/5">
      <div className="absolute h-full w-[6px] bg-[#3794FF]"></div>
      {children}
    </div>
  ),
  beforeHighlight: (props, annotations) => {
    if (annotations.length === 0) return props;

    const lineCount = props.code.split("\n").length;

    const ranges = annotations.flatMap((a) => a.ranges);

    let newRanges = [{ fromLineNumber: 1, toLineNumber: lineCount }];

    for (const range of ranges) {
      if (!("fromLineNumber" in range)) continue;

      const { fromLineNumber, toLineNumber } = range;

      // @ts-expect-error @todo
      newRanges = newRanges.flatMap((r) => {
        if (r.fromLineNumber > toLineNumber || r.toLineNumber < fromLineNumber)
          return [r];
        if (
          r.fromLineNumber >= fromLineNumber &&
          r.toLineNumber <= toLineNumber
        )
          return [];
        if (r.fromLineNumber < fromLineNumber && r.toLineNumber > toLineNumber)
          return [
            {
              fromLineNumber: r.fromLineNumber,
              toLineNumber: fromLineNumber - 1,
            },
            {
              fromLineNumber: toLineNumber + 1,
              toLineNumber: r.toLineNumber,
            },
          ];
        if (r.fromLineNumber < fromLineNumber)
          return [
            {
              fromLineNumber: r.fromLineNumber,
              toLineNumber: fromLineNumber - 1,
            },
          ];
        if (r.toLineNumber > toLineNumber)
          return [
            {
              fromLineNumber: toLineNumber + 1,
              toLineNumber: r.toLineNumber,
            },
          ];
      });
    }

    const newAnnotations = props.annotations.filter((a) => a.name !== "focus");
    newAnnotations.push({
      name: "focus",
      ranges: newRanges,
    });

    return { ...props, annotations: newAnnotations };
  },
};

const components = {
  // The only <h1> on post page should be the title, hide <h1> in markdown
  h1: ({ ...props }) => <h1 className="hidden" {...props} />,

  h2: ({ ...props }) => <h2 className="mb-6 text-2xl font-bold" {...props} />,
  h3: ({ ...props }) => <h3 className="mb-6 text-xl font-bold" {...props} />,
  h4: ({ ...props }) => <h4 className="mb-6 text-lg font-bold" {...props} />,
  h5: ({ ...props }) => <h5 className="mb-6 font-bold" {...props} />,

  // Not supported yet
  h6: ({ ...props }) => <h6 className="hidden" {...props} />,

  p: ({ ...props }) => <p className="mb-6 leading-7" {...props} />,

  ul: ({ ...props }) => (
    <ul className="mb-6 list-inside list-disc space-y-1" {...props} />
  ),

  ol: ({ ...props }) => (
    <ol className="mb-6 list-inside list-decimal space-y-1" {...props} />
  ),

  pre: ({ children, ...props }: any) => (
    <div className="relative mb-6">
      <Code className="[&>pre]:rounded-md" {...props} extensions={[highlight]}>
        {children}
      </Code>
      <div className="absolute right-0 top-0">
        <CopyButton text={children.props.children} />
      </div>
    </div>
  ),
};

export const Markdown = ({ source }: { source: string }) => {
  return <MDXRemote components={components} source={source} />;
};
