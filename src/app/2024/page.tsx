import {
  AtSign,
  Calendar,
  DownloadCloud,
  ExternalLink,
  Github,
  Home,
  Linkedin,
  Star,
  Twitter,
} from "lucide-react";
import Link from "next/link";

import { formatDate, latestFirst } from "@/lib/date";
import { env } from "@/lib/env.mjs";

import { blogs } from "../(main)/blog/blogs";

const BigRequestStars = async () => {
  const response = await fetch(
    "https://api.github.com/repos/matthewvolk/bigrequest",
    {
      headers: { authorization: `bearer ${env.GITHUB_PAT}` },
      cache: "no-store",
    },
  );

  const data = await response.json();

  return (
    <div className="flex items-center space-x-2 text-sm">
      <Star size={16} />{" "}
      <span>{Intl.NumberFormat().format(data.stargazers_count)}</span>
    </div>
  );
};

const BigRequestDownloads = async () => {
  const response = await fetch(
    "https://api.npmjs.org/downloads/point/last-year/bigrequest",
    { cache: "no-store" },
  );

  const data = await response.json();

  return (
    <div className="flex items-center space-x-2 text-sm">
      <DownloadCloud size={16} />{" "}
      <span>{Intl.NumberFormat().format(data.downloads)}</span>
    </div>
  );
};

const BigRequestLatestVersion = async () => {
  const response = await fetch(
    "https://api.github.com/repos/matthewvolk/bigrequest/releases",
    {
      headers: { authorization: `bearer ${env.GITHUB_PAT}` },
      next: { revalidate: 60 * 60 * 24 },
    },
  );

  const data = await response.json();

  const latest = data.find((release: { name: string }) =>
    release.name.includes("bigrequest"),
  );

  return (
    <div className="-mx-4">
      <Link
        href="https://www.npmjs.com/package/bigrequest"
        target="_blank"
        className="flex flex-col rounded-lg p-4 hover:bg-slate-200/75"
      >
        <p className="pb-1 text-xs italic">{formatDate(latest.published_at)}</p>
        <div className="flex items-baseline space-x-1">
          <div className="flex items-center space-x-1 text-sm font-medium">
            <span>🎉</span>
            <span>BigRequest v{latest.tag_name.split("@")[1]} released!</span>
          </div>
          <ExternalLink size={14} strokeWidth={2.25} />
        </div>
      </Link>
    </div>
  );
};

const New = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="container mx-auto max-w-2xl">
        <a
          href="#main-content"
          className="absolute -top-full left-16 z-50 rounded-lg bg-slate-900 px-3 py-2 font-semibold text-slate-50 transition-all focus:top-4"
        >
          Skip to content
        </a>

        <nav className="-mx-2 flex items-center justify-between py-8 font-semibold md:py-12">
          <Link
            href="/"
            className="rounded-lg p-2 hover:bg-slate-200/75"
            aria-label="Home"
            title="Home"
          >
            <Home size={20} />
          </Link>

          <ul>
            <li>
              <Link
                href="/blog"
                className="rounded-lg p-2 hover:bg-slate-200/75"
              >
                Blog
              </Link>
            </li>
          </ul>
        </nav>

        <section id="main-content" className="flex flex-col space-y-4 pb-12">
          <div className="flex items-center justify-between pb-2">
            <h1 className="text-2xl font-extrabold">Hi, I&apos;m Matt</h1>
            <div className="flex items-center space-x-2">
              <Link
                href="https://github.com/matthewvolk"
                target="_blank"
                className="rounded-lg p-2 hover:bg-slate-200/75"
                aria-label="GitHub"
                title="GitHub"
              >
                <Github size={20} />
              </Link>
              <Link
                href="https://twitter.com/mttvlk"
                target="_blank"
                className="rounded-lg p-2 hover:bg-slate-200/75"
                aria-label="Twitter"
                title="Twitter"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="https://linkedin.com/in/mjvolk"
                target="_blank"
                className="rounded-lg p-2 hover:bg-slate-200/75"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href="mailto:matt@volk.dev"
                target="_blank"
                className="rounded-lg p-2 hover:bg-slate-200/75"
                aria-label="Email"
                title="Email"
              >
                <AtSign size={20} />
              </Link>
            </div>
          </div>
          <p>
            I&apos;m a software engineer based out of Austin, TX, currently
            building products and tooling for the next generation of headless
            commerce at BigCommerce.
          </p>
        </section>

        <section className="flex flex-col space-y-2 pb-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold">Changelog</h2>
            <span className="relative flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative left-1 top-1 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </span>
          </div>

          <BigRequestLatestVersion />
        </section>

        <section className="flex flex-col space-y-4 pb-12">
          <h2 className="text-2xl font-extrabold">Open Source Projects</h2>

          <Link
            href="https://github.com/matthewvolk/bigrequest"
            target="_blank"
            className="-mx-4 rounded-lg p-4 hover:bg-slate-200/75"
          >
            <div className="flex items-baseline justify-between">
              <h3 className="pb-1 font-semibold">matthewvolk/bigrequest</h3>
              <div className="flex space-x-4">
                <BigRequestStars />
                <BigRequestDownloads />
              </div>
            </div>
            <p className="text-sm">
              BigRequest is a lightweight, serverless-friendly Node.js API
              client for the BigCommerce API.
            </p>
          </Link>
        </section>

        <section className="flex flex-col space-y-4 pb-12">
          <h2 className="text-2xl font-extrabold">Featured Posts</h2>

          {blogs
            .sort(latestFirst)
            .slice(0, 2)
            .map((blog) => (
              <Link
                href={blog.path}
                key={blog.path}
                className="-mx-4 rounded-lg p-4 hover:bg-slate-200/75"
              >
                <h3 className="font-semibold">{blog.title}</h3>
                <p className="flex items-center space-x-2 py-2 text-sm">
                  <Calendar size={14} />
                  <span>
                    {blog.updated
                      ? `Updated: ${formatDate(blog.updated)}`
                      : `Published: ${formatDate(blog.published)}`}
                  </span>
                </p>
                <p className="text-sm">{blog.description}</p>
              </Link>
            ))}
        </section>

        <footer className="flex items-center justify-between pb-12 text-slate-600">
          <p className="text-sm font-medium">
            &copy; {new Date().getFullYear()}, Matthew Volk
          </p>
          <Link
            href="/"
            className="-mx-2 rounded-lg p-2 hover:bg-slate-200/75"
            aria-label="Home"
            title="Home"
          >
            <Home size={20} />
          </Link>
        </footer>
      </main>
    </div>
  );
};

export default New;
