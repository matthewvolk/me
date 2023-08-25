import Image from "next/image";
import { Suspense } from "react";

import { BigExec } from "@/app/(oss)/bigexec";
import { BigRequest } from "@/app/(oss)/bigrequest";
import { LanguageChart } from "@/components/language-chart";
import { NavBar } from "@/components/navbar";
import { OSSCardLoading } from "@/components/oss-card-loading";

const Home = async () => (
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
        <LanguageChart />
      </section>

      <footer className="col-span-2 py-4 text-center">
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          &copy; {new Date().getFullYear()} volk.dev
        </p>
      </footer>
    </main>
  </>
);

export default Home;
