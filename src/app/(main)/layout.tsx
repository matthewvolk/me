import Link from "next/link";
import * as React from "react";
import { Suspense } from "react";

import { GitHubAvatar } from "@/components/github-avatar";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config/site";

const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40">
        <MainNav />
      </header>
      <main className="flex-1">{children}</main>
      <footer>
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Link href="/">
              <Suspense
                fallback={
                  <Skeleton className="h-[42px] w-[42px] rounded-full" />
                }
              >
                <GitHubAvatar />
              </Suspense>
            </Link>

            <p className="text-center text-sm leading-loose md:text-left">
              Built by{" "}
              <a
                href={
                  siteConfig.links.find((link) => link.title === "GitHub")?.href
                }
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4"
              >
                matthewvolk
              </a>
              . Inspired by{" "}
              <a
                href="https://tx.shadcn.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Taxonomy
              </a>
              . The source code is available on{" "}
              <a
                href="http://github.com/matthewvolk/me"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
          <ThemeToggle />
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
