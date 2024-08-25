import {
  AtSign,
  Calendar,
  ChevronRight,
  DownloadCloud,
  ExternalLink,
  Github,
  Linkedin,
  MapPin,
  Star,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { blogs, formatDate, latestFirst } from "@/app/blog/blogs";

const BigRequestStars = async () => {
  const response = await fetch(
    "https://api.github.com/repos/matthewvolk/bigrequest",
    {
      headers: { authorization: `bearer ${process.env.GITHUB_PAT}` },
      next: { revalidate: 60 * 60 * 24 },
    },
  );

  const data = await response.json();

  return (
    <div className="flex items-center gap-2 text-sm">
      <Star size={16} />{" "}
      <span>{Intl.NumberFormat().format(data.stargazers_count)}</span>
    </div>
  );
};

const BigRequestDownloads = async () => {
  const response = await fetch(
    "https://api.npmjs.org/downloads/point/last-year/bigrequest",
    { next: { revalidate: 60 * 60 * 24 } },
  );

  const data = await response.json();

  return (
    <div className="flex items-center gap-2 text-sm">
      <DownloadCloud size={16} />{" "}
      <span>{Intl.NumberFormat().format(data.downloads)}</span>
    </div>
  );
};

const BigRequestLatestVersion = async () => {
  const response = await fetch(
    "https://api.github.com/repos/matthewvolk/bigrequest/releases/latest",
    {
      headers: { authorization: `bearer ${process.env.GITHUB_PAT}` },
      next: { revalidate: 60 * 60 * 24 },
    },
  );

  const latest = await response.json();

  console.dir(latest, { depth: null });

  return (
    <div className="-mx-4">
      <Link
        className="flex flex-col rounded-md p-4 md:hover:bg-gray-200/75"
        href="https://www.npmjs.com/package/bigrequest"
        target="_blank"
      >
        <p className="pb-1 text-xs italic">{formatDate(latest.published_at)}</p>
        <div className="flex items-baseline gap-1">
          <div className="flex items-center gap-1 text-sm font-medium">
            <span>🎉</span>
            <span>BigRequest {latest.tag_name} released!</span>
          </div>
          <ExternalLink size={14} strokeWidth={2.25} />
        </div>
      </Link>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2">
          <h1 className="text-2xl font-extrabold">Hi, I&apos;m Matt</h1>
          <div className="flex items-center gap-2">
            <Link
              aria-label="GitHub"
              className="rounded-md p-2 md:hover:bg-gray-200/75"
              href="https://github.com/matthewvolk"
              id="main-content"
              target="_blank"
              title="GitHub"
            >
              <Github size={20} />
            </Link>
            <Link
              aria-label="Twitter"
              className="rounded-md p-2 md:hover:bg-gray-200/75"
              href="https://twitter.com/mttvlk"
              target="_blank"
              title="Twitter"
            >
              <Twitter size={20} />
            </Link>
            <Link
              aria-label="LinkedIn"
              className="rounded-md p-2 md:hover:bg-gray-200/75"
              href="https://linkedin.com/in/mjvolk"
              target="_blank"
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </Link>
            <Link
              aria-label="Email"
              className="rounded-md p-2 md:hover:bg-gray-200/75"
              href="mailto:matt@volk.dev"
              target="_blank"
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

      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold">Changelog</h2>
          <span className="relative flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative left-1 top-1 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
          </span>
        </div>

        <Suspense
          fallback={
            <div className="mt-4 h-[56px] w-full animate-pulse rounded-md bg-gray-200/75" />
          }
        >
          <BigRequestLatestVersion />
        </Suspense>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-2xl font-extrabold">Open Source Projects</h2>

        <Link
          className="-mx-4 rounded-md p-4 md:hover:bg-gray-200/75"
          href="https://github.com/matthewvolk/bigrequest"
          target="_blank"
        >
          <div className="flex items-baseline justify-between">
            <h3 className="pb-1 font-semibold">matthewvolk/bigrequest</h3>
            <div className="flex gap-4">
              <Suspense
                fallback={
                  <div className="h-[18px] w-[32px] animate-pulse rounded-md bg-gray-200/75" />
                }
              >
                <BigRequestStars />
              </Suspense>

              <Suspense
                fallback={
                  <div className="h-[18px] w-[58px] animate-pulse rounded-md bg-gray-200/75" />
                }
              >
                <BigRequestDownloads />
              </Suspense>
            </div>
          </div>
          <p className="text-sm">
            BigRequest is a lightweight, serverless-friendly Node.js API client
            for the BigCommerce API.
          </p>
        </Link>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-2xl font-extrabold">Recent Talks</h2>

        <Link
          className="relative mt-4 flex h-72 items-end rounded-md"
          href="https://www.youtube.com/watch?v=EtjQoxNcnc4"
          target="_blank"
        >
          <Image
            alt="Next.js Conf Stage"
            className="absolute inset-0 -z-20 rounded-md object-cover brightness-[.35]"
            fill
            priority
            src="/nextjs-conf.jpeg"
          />
          <div className="z-10 flex w-full flex-col gap-2 p-6 text-white">
            <p className="flex items-center gap-1.5 text-xs">
              <MapPin size={12} />
              <span>San Francisco, CA</span>
            </p>
            <p className="font-semibold">
              Next.js Conf 2023 - Next.js, BigCommerce, and the Future of
              Performance in E-Commerce
            </p>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-xs">
                <span>Watch on YouTube</span>
                <ExternalLink size={12} />
              </p>
              <p className="flex items-center gap-1.5 text-xs">
                <Calendar size={12} />
                <span>October 26th, 2023</span>
              </p>
            </div>
          </div>
        </Link>

        <Link
          className="relative mt-4 flex h-72 items-end rounded-md"
          href="https://www.youtube.com/watch?v=l3l-5HLjOGo"
          target="_blank"
        >
          <Image
            alt="Next.js Conf Stage"
            className="absolute inset-0 -z-20 rounded-md object-cover brightness-[.25]"
            fill
            priority
            src="/app-extensions.jpg"
          />
          <div className="z-10 flex w-full flex-col gap-2 p-6 text-white">
            <p className="flex items-center gap-1.5 text-xs">
              <MapPin size={12} />
              <span>Remote</span>
            </p>
            <p className="font-semibold">
              Building BigCommerce Apps with App Extensions
            </p>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-xs">
                <span>Watch on YouTube</span>
                <ExternalLink size={12} />
              </p>
              <p className="flex items-center gap-1.5 text-xs">
                <Calendar size={12} />
                <span>August 8th, 2023</span>
              </p>
            </div>
          </div>
        </Link>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-2xl font-extrabold">Featured Posts</h2>

        {blogs
          .sort(latestFirst)
          .filter((blog) => !blog.hidden)
          .slice(0, 2)
          .map((blog) => (
            <Link
              className="-mx-4 rounded-md p-4 md:hover:bg-gray-200/75"
              href={blog.path}
              key={blog.path}
            >
              <h3 className="font-semibold">{blog.title}</h3>
              <p className="flex items-center gap-2 py-2 text-sm">
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

        <div className="flex justify-center pt-6 text-sm">
          <Link
            className="inline-flex items-center gap-1 rounded-md p-2 pl-5 text-sm font-medium hover:bg-gray-200/75"
            href="/blog"
          >
            See all posts <ChevronRight height={14} strokeWidth={3} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
