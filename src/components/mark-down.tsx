import { Code } from "bright";
import { MDXRemote } from "next-mdx-remote/rsc";

import { CopyButton } from "@/components/copy-button";

Code.theme = "github-dark";
Code.lineNumbers = true;

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

  pre: ({ children, ...props }: any) => (
    <div className="relative mb-6">
      <Code className="[&>pre]:rounded-md" {...props}>
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
