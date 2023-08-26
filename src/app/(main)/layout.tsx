import * as React from "react";

import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";

const MarketingLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40">
        <MainNav />
      </header>
      <main className="flex-1">{children}</main>
      <footer>
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
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
          <ThemeToggle />
        </div>
      </footer>
    </div>
  );
};

export default MarketingLayout;
