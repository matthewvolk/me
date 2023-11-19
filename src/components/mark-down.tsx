import { Code } from "bright";
import { MDXRemote } from "next-mdx-remote/rsc";

import { CopyButton } from "@/components/copy-button";
import { cs } from "@/lib/cs";

Code.theme = "github-dark";
Code.lineNumbers = true;

const components = {
  h1: ({ className, ...props }: { className?: string }) => (
    <h1
      className={cs(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: { className?: string }) => (
    <h2
      className={cs(
        "mt-10 scroll-m-20 pb-1 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: { className?: string }) => (
    <h3
      className={cs(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: { className?: string }) => (
    <h4
      className={cs(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: { className?: string }) => (
    <h5
      className={cs(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: { className?: string }) => (
    <h6
      className={cs(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: { className?: string }) => (
    <p
      className={cs("leading-8 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  pre: ({ children, ...props }: any) => (
    <div className="relative">
      <Code {...props}>{children}</Code>
      <div className="absolute right-0 top-0">
        <CopyButton text={children.props.children} />
      </div>
    </div>
  ),
};

export const Markdown = ({ source }: { source: string }) => {
  return <MDXRemote components={components} source={source} />;
};
