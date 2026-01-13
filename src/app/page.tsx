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
import { cacheLife } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { formatDate, getAllPosts } from "@/lib/posts";

async function BigRequestStars() {
  "use cache";
  cacheLife("hours");

  const response = await fetch(
    "https://api.github.com/repos/matthewvolk/bigrequest",
    {
      headers: { authorization: `bearer ${process.env.GITHUB_PAT}` },
    },
  );
  const data = await response.json();

  return (
    <div className="flex items-center gap-2 text-sm">
      <Star size={16} />
      <span>{Intl.NumberFormat().format(data.stargazers_count)}</span>
    </div>
  );
}

async function BigRequestDownloads() {
  "use cache";
  cacheLife("hours");

  const response = await fetch(
    "https://api.npmjs.org/downloads/point/last-year/bigrequest",
  );
  const data = await response.json();

  return (
    <div className="flex items-center gap-2 text-sm">
      <DownloadCloud size={16} />
      <span>{Intl.NumberFormat().format(data.downloads)}</span>
    </div>
  );
}

async function BigRequestLatestVersion() {
  "use cache";
  cacheLife("hours");

  const response = await fetch(
    "https://api.github.com/repos/matthewvolk/bigrequest/releases/latest",
    {
      headers: { authorization: `bearer ${process.env.GITHUB_PAT}` },
    },
  );
  const latest = await response.json();

  return (
    <Link
      className="flex flex-col rounded-md p-4 -mx-4 md:hover:bg-accent"
      href="https://www.npmjs.com/package/bigrequest"
      target="_blank"
    >
      <p className="pb-1 text-xs text-muted-foreground">
        {formatDate(latest.published_at)}
      </p>
      <div className="flex items-center gap-2">
        <span className="font-medium">
          BigRequest {latest.tag_name} released
        </span>
        <ExternalLink size={14} />
      </div>
    </Link>
  );
}

export default async function HomePage() {
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 10);

  return (
    <div className="flex flex-col gap-12">
      {/* Introduction */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Hi, I&apos;m Matt</h1>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" asChild aria-label="GitHub">
              <Link href="https://github.com/matthewvolk" target="_blank">
                <Github className="size-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild aria-label="X">
              <Link href="https://x.com/mttvlk" target="_blank">
                <Twitter className="size-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild aria-label="LinkedIn">
              <Link href="https://linkedin.com/in/mjvolk" target="_blank">
                <Linkedin className="size-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild aria-label="Email">
              <Link href="mailto:matt@volk.dev">
                <AtSign className="size-5" />
              </Link>
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">
          I&apos;m a software engineer based in Austin, TX, currently building
          products and tooling for the next generation of headless commerce at
          BigCommerce.
        </p>
      </section>

      {/* Changelog */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Changelog</h2>
          <span className="relative flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative left-1 top-1 inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
        </div>
        <Suspense
          fallback={
            <div className="mt-2 h-16 w-full animate-pulse rounded-md bg-muted" />
          }
        >
          <BigRequestLatestVersion />
        </Suspense>
      </section>

      {/* Open Source Projects */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Open Source Projects</h2>
        <Link
          className="rounded-md p-4 -mx-4 md:hover:bg-accent"
          href="https://github.com/matthewvolk/bigrequest"
          target="_blank"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-medium">matthewvolk/bigrequest</h3>
            <div className="flex gap-4">
              <Suspense
                fallback={
                  <div className="h-5 w-12 animate-pulse rounded-md bg-muted" />
                }
              >
                <BigRequestStars />
              </Suspense>
              <Suspense
                fallback={
                  <div className="h-5 w-16 animate-pulse rounded-md bg-muted" />
                }
              >
                <BigRequestDownloads />
              </Suspense>
            </div>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            BigRequest is a lightweight, serverless-friendly Node.js API client
            for the BigCommerce API.
          </p>
        </Link>
      </section>

      {/* Talks */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Talks</h2>
        <Link
          className="flex flex-col rounded-md p-4 -mx-4 md:hover:bg-accent"
          href="https://www.youtube.com/watch?v=EtjQoxNcnc4"
          target="_blank"
        >
            <h3 className="font-medium">
              Next.js Conf 2023 - Next.js, BigCommerce, and the Future of
              Performance in E-Commerce
            </h3>
          <p className="flex items-center gap-2 py-1 text-sm text-muted-foreground">
            <Calendar size={14} />
            <span>October 26, 2023</span>
            <span>·</span>
            <MapPin size={14} />
            <span>San Francisco, CA</span>
          </p>
        </Link>
        <Link
          className="flex flex-col rounded-md p-4 -mx-4 md:hover:bg-accent"
          href="https://www.youtube.com/watch?v=l3l-5HLjOGo"
          target="_blank"
        >
            <h3 className="font-medium">
              Building BigCommerce Apps with App Extensions
            </h3>
          <p className="flex items-center gap-2 py-1 text-sm text-muted-foreground">
            <Calendar size={14} />
            <span>August 8, 2023</span>
            <span>·</span>
            <MapPin size={14} />
            <span>Remote</span>
          </p>
        </Link>
      </section>

      {/* Recent Posts */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Recent Posts</h2>
        {recentPosts.length > 0 ? (
          <ul className="flex flex-col">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex flex-col rounded-md p-4 -mx-4 md:hover:bg-accent"
                >
                  <h3 className="font-medium">{post.metadata.title}</h3>
                  <p className="flex items-center gap-2 py-1 text-sm text-muted-foreground">
                    <Calendar size={14} />
                    <span>{formatDate(post.metadata.date)}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {post.metadata.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No posts yet.</p>
        )}
        <div className="flex justify-center pt-4">
          <Button variant="ghost" asChild>
            <Link href="/blog">
              See all posts
              <ChevronRight className="size-4" strokeWidth={3} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
