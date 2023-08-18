import Image from "next/image";

import { BigExec } from "@/app/(oss)/bigexec";
import { BigRequest } from "@/app/(oss)/bigrequest";
import { NavBar } from "@/components/navbar";

const Home = () => {
  return (
    <main className="mx-auto grid min-h-screen max-w-7xl grid-cols-2 grid-rows-[min-content_1fr] gap-8 p-4">
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
          <BigRequest />
          <BigExec />
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
