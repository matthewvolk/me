import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  ChevronRight,
  DownloadIcon,
  ExternalLink,
  StarIcon,
} from "lucide-react";
import Link from "next/link";

import { blogs } from "@/app/(main)/blog/blogs";
import { BigExecCodeSample } from "@/components/bigexec-code-sample";
import { BigRequestCodeSample } from "@/components/bigrequest-code-sample";
import { CustomIcons } from "@/components/custom-icons";
import { Button } from "@/components/ui/button";
import { formatDate, latestFirst } from "@/lib/date";
import { env } from "@/lib/env.mjs";

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
    return Intl.NumberFormat().format(data.stargazers_count) as string;
  };

  const bigRequestDownloads = async () => {
    const response = await fetch(
      "https://api.npmjs.org/downloads/point/last-year/bigrequest",
      { cache: "no-store" },
    );
    const data = await response.json();
    return Intl.NumberFormat().format(data.downloads) as string;
  };

  const bigExecDownloads = async () => {
    const response = await fetch(
      "https://api.npmjs.org/downloads/point/last-year/bigexec",
      { cache: "no-store" },
    );
    const data = await response.json();
    return Intl.NumberFormat().format(data.downloads) as string;
  };

  return (
    <>
      <section className="space-y-6 pb-24 pt-12 md:pb-14 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <a
            href="https://www.npmjs.com/package/bigrequest"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center rounded-2xl bg-slate-100 px-4 py-1.5 text-xs font-medium dark:bg-slate-800 md:text-sm"
          >
            <span className="mr-1">🎉</span> BigRequest v0.0.17 released{" "}
            <ExternalLink height={14} />
          </a>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl">
            Software Engineering for Online Brands
          </h1>
          <p className="max-w-3xl text-xl leading-normal text-slate-500 dark:text-slate-400 sm:leading-8">
            I&apos;m Matt, a Software Engineer based in Austin, TX creating
            solutions that enable companies to redefine their online presence
            and accelerate business growth.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/#projects">View Projects</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href="https://github.com/matthewvolk"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* TODO - Work Experience */}

      <section
        id="projects"
        className="container space-y-12 pb-10 pt-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto mb-6 flex max-w-4xl flex-col items-center space-y-4 text-center md:mb-[4.5rem]">
          <h2 className="font-heading text-4xl leading-[1.1] md:text-6xl">
            Open Source Software
          </h2>
          <p className="max-w-[85%] text-lg leading-normal text-slate-500 dark:text-slate-400 sm:leading-7 md:text-xl">
            I believe open-source software accelerates innovation, fosters
            collaboration, and empowers collective problem-solving within the
            industry.
          </p>
        </div>
        <div className="flex flex-col gap-20">
          <div className="flex flex-col justify-between gap-12 lg:flex-row">
            <div className="flex w-full max-w-xl items-center justify-center self-center lg:max-w-none">
              <div className="flex flex-col lg:min-w-[29rem] lg:max-w-fit">
                <div className="flex flex-col items-center justify-between md:flex-row">
                  <h2 className="mb-2 text-center text-xl font-bold md:mb-0 md:text-left">
                    matthewvolk/bigrequest
                  </h2>
                  <div className="flex gap-3 text-sm">
                    <a
                      href="https://github.com/matthewvolk/bigrequest"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 underline-offset-2 hover:underline md:py-2"
                    >
                      <StarIcon size={14} />
                      <span>{await bigRequestStars()} Stars</span>
                    </a>
                    <a
                      href="https://www.npmjs.com/package/bigrequest"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 underline-offset-2 hover:underline md:py-2"
                    >
                      <DownloadIcon size={14} />
                      <span>{await bigRequestDownloads()} Downloads</span>
                    </a>
                  </div>
                </div>
                <p className="mb-8 mt-6 w-full text-left lg:max-w-xl">
                  <span className="block text-center md:inline md:text-left">
                    BigRequest is a lightweight Node.js API client for the
                    BigCommerce API.{" "}
                  </span>
                  <span className="hidden md:inline">
                    Written in Typescript, BigRequest features nightly builds
                    via GitHub Actions that regenerate type definitions based on
                    the latest commit found in the{" "}
                    <a
                      href="http://github.com/bigcommerce/api-specs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline underline-offset-4"
                    >
                      bigcommerce/api-specs repository
                    </a>
                    .
                  </span>
                </p>
                <div className="flex justify-center gap-4 md:flex-row lg:justify-normal">
                  <Button asChild className="w-1/2 md:w-fit md:px-5">
                    <a
                      href="https://github.com/matthewvolk/bigrequest"
                      title="View Source Code"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHubLogoIcon className="h-5 w-5 md:hidden" />
                      <span className="hidden md:inline">View Source Code</span>
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-1/2 font-mono md:w-fit md:px-5"
                  >
                    <a
                      href="https://www.npmjs.com/package/bigrequest"
                      title="View on NPM"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CustomIcons.npm className="h-10 w-10 dark:fill-white md:hidden" />
                      <span className="hidden md:inline">
                        $ npm i bigrequest
                      </span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-center drop-shadow-lg md:drop-shadow-2xl lg:w-full lg:max-w-[46.5%]">
              <BigRequestCodeSample />
            </div>
          </div>
          <div className="flex flex-col-reverse justify-between gap-12 lg:flex-row">
            <div className="flex justify-center drop-shadow-lg md:drop-shadow-2xl lg:w-full lg:max-w-[46.5%]">
              <BigExecCodeSample />
            </div>
            <div className="flex w-full max-w-xl items-center justify-center self-center lg:max-w-none">
              <div className="flex flex-col lg:min-w-[29rem] lg:max-w-fit">
                <div className="flex flex-col items-center justify-between md:flex-row">
                  <h2 className="mb-2 text-center text-lg font-bold md:mb-0 md:text-left md:text-xl">
                    matthewvolk/bigexec
                  </h2>
                  <div className="flex gap-3 text-xs">
                    <a
                      href="https://github.com/matthewvolk/bigrequest"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 underline-offset-2 hover:underline md:py-2"
                    >
                      <StarIcon size={14} />
                      <span>{await bigRequestStars()} Stars</span>
                    </a>
                    <a
                      href="https://www.npmjs.com/package/bigexec"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 underline-offset-2 hover:underline md:py-2"
                    >
                      <DownloadIcon size={14} />
                      <span>{await bigExecDownloads()} Downloads</span>
                    </a>
                  </div>
                </div>
                <p className="mb-8 mt-6 w-full text-left lg:max-w-xl">
                  <span className="block text-center md:inline md:text-left">
                    Running BigRequest under the hood, BigExec is a command-line
                    utility for running tasks against the BigCommerce API.{" "}
                  </span>
                  <span className="hidden md:inline">
                    Currently supports headless storefront channel management.
                    Webhook management coming soon.
                  </span>
                </p>
                <div className="flex justify-center gap-4 md:flex-row lg:justify-normal">
                  <Button asChild className="w-1/2 md:w-fit md:px-5">
                    <a
                      href="https://github.com/matthewvolk/bigrequest"
                      title="View Source Code"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHubLogoIcon className="h-5 w-5 md:hidden" />
                      <span className="hidden md:inline">View Source Code</span>
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-1/2 font-mono md:w-fit md:px-5"
                  >
                    <a
                      href="https://www.npmjs.com/package/bigexec"
                      title="View on NPM"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CustomIcons.npm className="h-10 w-10 dark:fill-white md:hidden" />
                      <span className="hidden md:inline">$ npx bigexec</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TODO - Changelog */}

      {/* TODO - Public GitHub Stats */}

      <section className="space-y-6 pb-8 pt-14 md:container md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Latest Articles
          </h2>
        </div>
        <div className="container grid max-w-4xl gap-10 pt-2 sm:grid-cols-2 lg:pt-10">
          {blogs
            .sort(latestFirst)
            .slice(0, 2)
            .map((blog) => (
              <article
                key={blog.slug}
                className="group relative flex flex-col space-y-2 p-4"
              >
                <h2 className="text-xl font-bold md:text-2xl">{blog.title}</h2>
                <p className="text-slate-500 dark:text-slate-400">
                  {blog.description}
                </p>
                {blog.updated ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {formatDate(blog.updated)}
                  </p>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {formatDate(blog.published)}
                  </p>
                )}
                <Link href={blog.path} className="absolute inset-0">
                  <span className="sr-only">View Article</span>
                </Link>
              </article>
            ))}
        </div>
        <div className="flex justify-center pt-6 lg:pt-10">
          <Button asChild variant="ghost">
            <Link href="/blog">
              See all articles <ChevronRight height={18} className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* TODO - Interesting Reads */}
    </>
  );
};

export default Home;
