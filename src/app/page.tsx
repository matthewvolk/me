import {
  AtSign,
  Calendar,
  ChevronRight,
  Github,
  Linkedin,
  MapPin,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import {
  BigRequestDownloads,
  BigRequestLatestVersion,
  BigRequestStars,
} from "@/components/bigrequest";
import { Button } from "@/components/ui/button";
import { formatDate, getAllPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 10);

  return (
    <div className="flex flex-col gap-12">
      {/* Introduction */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2">
          <h1 className="text-2xl font-extrabold">Hi, I&apos;m Matt</h1>
          <div className="flex items-center gap-2">
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
        <p>
          I&apos;m a software engineer based in Austin, TX, currently building
          products and tooling for the next generation of headless commerce at
          BigCommerce.
        </p>
      </section>

      {/* Changelog */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold">Changelog</h2>
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
        <h2 className="text-2xl font-extrabold">Open Source Projects</h2>
        <Link
          className="rounded-md p-4 -mx-4 hover:bg-accent"
          href="https://github.com/matthewvolk/bigrequest"
          target="_blank"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">matthewvolk/bigrequest</h3>
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
          <p className="mt-1 text-sm">
            BigRequest is a lightweight, serverless-friendly Node.js API client
            for the BigCommerce API.
          </p>
        </Link>
      </section>

      {/* Talks */}
      <section className="flex flex-col gap-2">
        <h2 className="text-2xl font-extrabold">Talks</h2>
        <Link
          className="flex flex-col rounded-md p-4 -mx-4 hover:bg-accent"
          href="https://www.youtube.com/watch?v=EtjQoxNcnc4"
          target="_blank"
        >
          <h3 className="font-semibold">
            Next.js Conf 2023 - Next.js, BigCommerce, and the Future of
            Performance in E-Commerce
          </h3>
          <p className="flex items-center gap-2 py-1 text-sm">
            <Calendar size={14} />
            <span>October 26, 2023</span>
            <span>·</span>
            <MapPin size={14} />
            <span>San Francisco, CA</span>
          </p>
        </Link>
        <Link
          className="flex flex-col rounded-md p-4 -mx-4 hover:bg-accent"
          href="https://www.youtube.com/watch?v=l3l-5HLjOGo"
          target="_blank"
        >
          <h3 className="font-semibold">
            Building BigCommerce Apps with App Extensions
          </h3>
          <p className="flex items-center gap-2 py-1 text-sm">
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
        <h2 className="text-2xl font-extrabold">Recent Posts</h2>
        {recentPosts.length > 0 ? (
          <ul className="flex flex-col">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex flex-col rounded-md p-4 -mx-4 hover:bg-accent"
                >
                  <h3 className="font-semibold">{post.metadata.title}</h3>
                  <p className="flex items-center gap-2 py-1 text-sm">
                    <Calendar size={14} />
                    <span>{formatDate(post.metadata.date)}</span>
                  </p>
                  <p className="text-sm">{post.metadata.description}</p>
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
