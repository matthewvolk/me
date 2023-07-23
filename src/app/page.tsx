import Image from "next/image";
import { Nav } from "@/components/nav";

const Home = () => {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col p-4">
      <Nav />

      <section className="grid grow place-items-center">
        <Image src="/goose.gif" width={250} height={250} alt="walkin goose" />
      </section>

      <footer className="self-center py-4">
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          &copy; {new Date().getFullYear()} volk.dev
        </p>
      </footer>
    </main>
  );
};

export default Home;
