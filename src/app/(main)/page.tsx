import {
  ChevronRight,
  DownloadIcon,
  ExternalLink,
  StarIcon,
} from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cs } from "@/lib/cs";
import { descending, formatDate } from "@/lib/date";
import { env } from "@/lib/env.mjs";

import { allBlogs } from "contentlayer/generated";

const Home = async () => {
  const bigRequestStars = async () => {
    const response = await fetch(
      "https://api.github.com/repos/matthewvolk/bigrequest",
      {
        headers: { authorization: `bearer ${env.GITHUB_PAT}` },
        cache: "no-store",
      },
    );
    const data = await response.json();
    return data.stargazers_count as number;
  };

  const bigRequestDownloads = async () => {
    const response = await fetch(
      "https://api.npmjs.org/downloads/point/last-year/bigrequest",
      { cache: "no-store" },
    );
    const data = await response.json();
    return data.downloads as number;
  };

  const bigExecDownloads = async () => {
    const response = await fetch(
      "https://api.npmjs.org/downloads/point/last-year/bigexec",
      { cache: "no-store" },
    );
    const data = await response.json();
    return data.downloads as number;
  };

  const posts = allBlogs.sort(descending).slice(0, 2);

  return (
    <>
      <section className="space-y-6 pb-24 pt-12 md:pb-14 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href="https://www.npmjs.com/package/bigrequest"
            target="_blank"
            rel="noreferrer"
            className="flex items-center rounded-2xl bg-slate-100 px-4 py-1.5 text-xs font-medium dark:bg-slate-800 md:text-sm"
          >
            <span className="mr-1">🎉</span> BigRequest v0.0.9 released{" "}
            <ExternalLink height={14} />
          </Link>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl">
            Software Engineering for Online Commerce
          </h1>
          <p className="max-w-3xl leading-normal text-slate-500 dark:text-slate-400 sm:text-xl sm:leading-8">
            Matthew Volk is a Software Engineer based in Austin, TX creating
            solutions that enable e-commerce retailers to sell more effectively.
          </p>
          <div className="space-x-4">
            <Link
              href="/#products"
              className={cs(buttonVariants({ size: "lg" }))}
            >
              View Products
            </Link>
            <Link
              href={
                siteConfig.links.find((link) => link.title === "GitHub")
                  ?.href || ""
              }
              target="_blank"
              rel="noopener noreferrer"
              className={cs(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>

      <section
        id="products"
        className="container space-y-6 bg-slate-100/60 pb-10 pt-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto mb-6 flex max-w-4xl flex-col items-center space-y-4 text-center md:mb-12">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Open Source Software
          </h2>
          <p className="max-w-[85%] leading-normal text-slate-500 dark:text-slate-400 sm:text-lg sm:leading-7">
            Open source software fosters collaboration, accelerates innovation,
            and empowers collective problem-solving within the industry.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem]">
          <div className="relative overflow-hidden rounded-lg border bg-white p-4 dark:border-slate-800 dark:bg-transparent">
            <div className="space-y-3">
              <div className="flex flex-col items-center justify-between lg:flex-row">
                <h3 className="mb-1.5 font-bold">matthewvolk/bigrequest</h3>
                <div className="flex gap-2">
                  <Link
                    href="https://github.com/matthewvolk/bigrequest/tree/main/packages/bigrequest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cs(
                      buttonVariants({ size: "sm", variant: "ghost" }),
                      "flex items-center gap-1",
                    )}
                  >
                    <StarIcon height={14} />
                    <span>{await bigRequestStars()} Stars</span>
                  </Link>
                  <Link
                    href="https://www.npmjs.com/package/bigrequest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cs(
                      buttonVariants({ size: "sm", variant: "ghost" }),
                      "flex items-center gap-1",
                    )}
                  >
                    <DownloadIcon height={14} />
                    <span>{await bigRequestDownloads()} Downloads</span>
                  </Link>
                </div>
              </div>
              <p className="text-muted-foreground text-center text-sm lg:text-left">
                Typesafe BigCommerce HTTP request client for the REST management
                API and OAuth2 flows.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-white p-4 dark:border-slate-800 dark:bg-transparent">
            <div className="space-y-3">
              <div className="flex flex-col items-center justify-between lg:flex-row">
                <h3 className="mb-1.5 font-bold">matthewvolk/bigexec</h3>
                <div className="flex gap-2">
                  <Link
                    href="https://github.com/matthewvolk/bigrequest/tree/main/packages/bigexec"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cs(
                      buttonVariants({ size: "sm", variant: "ghost" }),
                      "flex items-center gap-1",
                    )}
                  >
                    <StarIcon height={14} />
                    <span>{await bigRequestStars()} Stars</span>
                  </Link>
                  <Link
                    href="https://www.npmjs.com/package/bigexec"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cs(
                      buttonVariants({ size: "sm", variant: "ghost" }),
                      "flex items-center gap-1",
                    )}
                  >
                    <DownloadIcon height={14} />
                    <span>{await bigExecDownloads()} Downloads</span>
                  </Link>
                </div>
              </div>
              <p className="text-muted-foreground text-center text-sm lg:text-left">
                Node.js CLI used to execute simple tasks against a store using
                the BigCommerce API.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Changelog */}

      {/* Public GitHub Stats */}

      <section className="space-y-6 pb-8 pt-14 md:container md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Latest Articles
          </h2>
        </div>
        <div className="container grid max-w-4xl gap-10 pt-2 sm:grid-cols-2 lg:pt-10">
          {posts.slice(0, 2).map((post) => (
            <article
              key={post.slugAsParams}
              className="group relative flex flex-col space-y-2 p-4"
            >
              <h2 className="text-xl font-bold md:text-2xl">{post.title}</h2>
              <p className="text-slate-500 dark:text-slate-400">
                {post.description}
              </p>
              {post.updated ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {formatDate(post.updated)}
                </p>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {formatDate(post.published)}
                </p>
              )}
              <Link href={post.slug} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
        <div className="flex justify-center pt-6 lg:pt-10">
          <Link
            href="/blog"
            className={cs(buttonVariants({ variant: "ghost" }))}
          >
            See all articles <ChevronRight height={18} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Interesting Reads */}
    </>
  );
};

export default Home;
