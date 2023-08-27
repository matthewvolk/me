import { useMDXComponent } from "next-contentlayer/hooks";

import { CopyButton } from "@/components/copy-button";
import { cs } from "@/lib/cs";

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
  pre: ({ children, __raw__, ...props }: any) => (
    <div className="relative">
      <pre {...props} className="dark:border dark:border-slate-800">
        {children}
      </pre>
      <div className="absolute right-0 top-0">
        <CopyButton text={__raw__} />
      </div>
    </div>
  ),
};

export const Markdown = ({ code }: { code: string }) => {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
};
