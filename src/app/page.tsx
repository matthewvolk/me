import Image from "next/image";
import { Suspense } from "react";

import { BigExec } from "@/app/(oss)/bigexec";
import { BigRequest } from "@/app/(oss)/bigrequest";
import { NavBar } from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";

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

const Home = () => {
  return (
    <main className="mx-auto grid min-h-screen max-w-7xl grid-cols-2 grid-rows-[min-content_1fr] gap-8 px-4 pb-4">
      <NavBar />

      <section className="col-span-2 grid grow place-items-center">
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

      <footer className="col-span-2 py-4 text-center">
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          &copy; {new Date().getFullYear()} volk.dev
        </p>
      </footer>
    </main>
  );
};

export default Home;
