import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header>
      <nav className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-semibold">
          <Button variant="ghost" size="icon">
            <HomeIcon className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground"
          >
            Blog
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
