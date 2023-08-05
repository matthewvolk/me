import Image from "next/image";
import { Icons, Nav } from "@/components/nav";
import { Download, Package, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const Home = async () => {
  const bigRequestDownloads = async () => {
    const response = await fetch(
      "https://api.npmjs.org/downloads/point/last-year/bigrequest"
    );
    const data = await response.json();
    return data.downloads as number;
  };

  const bigExecDownloads = async () => {
    const response = await fetch(
      "https://api.npmjs.org/downloads/point/last-year/bigrequest"
    );
    const data = await response.json();
    return data.downloads as number;
  };

  const bigRequestStars = async () => {
    const response = await fetch(
      "https://api.github.com/repos/matthewvolk/bigrequest"
    );
    const data = await response.json();
    return data.stargazers_count as number;
  };

  return (
    <main className="mx-auto grid min-h-screen max-w-7xl grid-cols-2 grid-rows-[min-content_1fr] gap-8 p-4">
      <Nav />

      <section className="col-span-2 grid grow place-items-center">
        <Image
          src="/goose.gif"
          width={187.5}
          height={187.5}
          alt="walkin goose"
        />
      </section>

      <section className="col-span-2">
        <h2 className="mb-8 text-2xl font-bold tracking-tight">
          Open Source Projects
        </h2>
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <li className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-lg">bigrequest</h3>
              <div className="flex gap-6 text-xs">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Star size={14} />
                  <p>{await bigRequestStars()} Stars</p>
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Download size={14} />
                  <p>{await bigRequestDownloads()} Downloads</p>
                </span>
              </div>
            </div>
            <p className="my-4 text-sm text-muted-foreground">
              A Node.js, Typescript-first, BigCommerce HTTP request client
              generated automatically from public BigCommerce OpenAPI
              specification documents. BigDesign is designed to make it easier
              to implement OAuth2 flows and REST operations against the
              BigCommerce REST Management API.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Link
                href="https://github.com/matthewvolk/bigrequest/tree/main/packages/bigrequest"
                target="_blank"
                className="flex items-center justify-center gap-2"
              >
                <div
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "flex w-full items-center justify-center gap-2"
                  )}
                >
                  <Icons.gitHub className="hidden h-4 w-4 md:block" />
                  <p>View on Github</p>
                </div>
              </Link>
              <Link
                href="https://www.npmjs.com/package/bigrequest"
                target="_blank"
                className="flex items-center justify-center gap-2"
              >
                <div
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "flex w-full items-center justify-center gap-2"
                  )}
                >
                  <Package size={16} className="hidden md:block" />
                  <p>Download on NPM</p>
                </div>
              </Link>
            </div>
          </li>
          <li className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-lg">bigexec</h3>
              <div className="flex gap-6 text-xs">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Star size={14} />
                  <p>{await bigRequestStars()} Stars</p>
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Download size={14} />
                  <p>{await bigExecDownloads()} Downloads</p>
                </span>
              </div>
            </div>
            <p className="my-4 text-sm text-muted-foreground">
              A Node.js CLI utility written in Typescript designed to make it
              easier to run arbitrary tasks against the BigCommerce API. For
              example, creating a new storefront channel intended for use with
              headless storefronts can be a confusing task; simply run{" "}
              <kbd>npx bigexec</kbd> and have the CLI do it for you.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Link
                href="https://github.com/matthewvolk/bigrequest/tree/main/packages/bigexec"
                target="_blank"
                className="flex items-center justify-center gap-2"
              >
                <div
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "flex w-full items-center justify-center gap-2"
                  )}
                >
                  <Icons.gitHub className="hidden h-4 w-4 md:block" />
                  <p>View on Github</p>
                </div>
              </Link>
              <Link
                href="https://www.npmjs.com/package/bigexec"
                target="_blank"
                className="flex items-center justify-center gap-2"
              >
                <div
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "flex w-full items-center justify-center gap-2"
                  )}
                >
                  <Package size={16} className="hidden md:block" />
                  <p>Download on NPM</p>
                </div>
              </Link>
            </div>
          </li>
        </ul>
      </section>

      <footer className="col-span-2 py-4 text-center">
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          &copy; {new Date().getFullYear()} volk.dev
        </p>
      </footer>
    </main>
  );
};

export default Home;
