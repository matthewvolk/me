import { CustomIcons } from "@/components/custom-icons";
import { MainNav } from "@/components/main-nav";

const Loading = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40">
        <MainNav />
      </header>

      <main className="flex min-h-full w-full flex-1 items-center justify-center text-slate-500 dark:text-slate-400">
        <CustomIcons.spinner className="h-8 w-8 animate-spin" />
      </main>
    </div>
  );
};

export default Loading;
