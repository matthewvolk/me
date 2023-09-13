import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";
import { env } from "@/lib/env.mjs";

const MainLayout = async ({ children }: React.PropsWithChildren) => {
  const githubAvatar = async () => {
    const response = await fetch("https://api.github.com/users/matthewvolk", {
      headers: { authorization: `bearer ${env.GITHUB_PAT}` },
    });
    const data = await response.json();

    return data.avatar_url as string;
  };

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
              <Image
                src={await githubAvatar()}
                alt="GitHub Profile Picture"
                width={40}
                height={40}
                className="mb-12 rounded-full bg-white md:mb-0 md:mr-2"
              />
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
