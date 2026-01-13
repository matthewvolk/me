import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="pt-8">
      <nav className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-semibold">
          <Button variant="ghost" size="icon" className="-ml-2">
            <HomeIcon className="size-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost">
            <Link href="/blog">Blog</Link>
          </Button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
