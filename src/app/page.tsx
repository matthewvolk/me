import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { BigExec } from "@/app/(oss)/bigexec";
import { BigRequest } from "@/app/(oss)/bigrequest";
import { NavBar } from "@/components/navbar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { languages } from "@/lib/languages";

const OSSCardLoading = () => (
  <li className="h-56 w-full rounded-lg border border-neutral-300 p-4 dark:border-neutral-800 md:h-[12.9rem]">
    <div className="flex items-center justify-between">
      <Skeleton className="h-6 w-36" />
      <div className="flex gap-6">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
    <Skeleton className="my-4 h-24 w-full md:h-20" />
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
    </div>
  </li>
);

const Home = async () => {
  const { total, langs } = await languages();
  return (
    <>
      <NavBar />
      <main className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 pb-4 pt-12 lg:pt-16">
        <section className="col-span-2 grid place-items-center">
          <Image
            src="/sillygoose.gif"
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
            <Suspense fallback={<OSSCardLoading />}>
              <BigRequest />
            </Suspense>
            <Suspense fallback={<OSSCardLoading />}>
              <BigExec />
            </Suspense>
          </ul>
        </section>

        <section className="col-span-2">
          <h2 className="mb-8 text-2xl font-bold tracking-tight">
            Public GitHub Stats
          </h2>
          <div className="flex overflow-hidden rounded-lg">
            {langs.map((lang) => (
              <TooltipProvider key={lang.lang} delayDuration={0}>
                <Dialog>
                  <Tooltip>
                    <DialogTrigger asChild>
                      <TooltipTrigger
                        className="h-12 brightness-125 transition-all hover:brightness-200 focus:brightness-200"
                        style={{
                          backgroundColor: lang.color || "white",
                          width: `${lang.percent_of_total}%`,
                        }}
                      ></TooltipTrigger>
                    </DialogTrigger>
                    <TooltipContent className="m-1 flex flex-col gap-1">
                      <h3 className="font-medium">{lang.lang}</h3>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        {lang.bytes} bytes
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        {lang.percent_of_total}%
                      </p>
                    </TooltipContent>
                  </Tooltip>
                  <DialogContent>
                    <h3 className="text-lg font-medium">
                      {lang.lang} Statistics
                    </h3>
                    <p className="leading-6 text-neutral-600 dark:text-neutral-400">
                      Found{" "}
                      <span className="font-medium text-black dark:text-white">
                        {lang.bytes}
                      </span>{" "}
                      bytes of {lang.lang} code across{" "}
                      <span className="font-mono text-sm">matthewvolk</span>
                      &apos;s{" "}
                      <Link
                        href="https://github.com/matthewvolk?tab=repositories"
                        target="_blank"
                        rel="noreferrer"
                        className="text-black underline decoration-1 underline-offset-2 dark:text-white"
                      >
                        public repositories
                      </Link>
                      .
                    </p>
                    <p className="leading-6 text-neutral-600 dark:text-neutral-400">
                      {lang.lang} accounts for{" "}
                      <span className="font-medium text-black dark:text-white">
                        {lang.percent_of_total}%
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-black dark:text-white">
                        {total}
                      </span>{" "}
                      total bytes of code found in{" "}
                      <span className="font-mono text-sm">matthewvolk</span>
                      &apos;s public repositories.
                    </p>
                  </DialogContent>
                </Dialog>
              </TooltipProvider>
            ))}
          </div>
        </section>

        <footer className="col-span-2 py-4 text-center">
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            &copy; {new Date().getFullYear()} volk.dev
          </p>
        </footer>
      </main>
    </>
  );
};

export default Home;
