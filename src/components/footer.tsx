import { Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function Footer() {
  "use cache";
  return (
    <footer className="flex items-center justify-between pb-8 md:pb-12">
      <Link className="text-sm font-medium" href="/">
        &copy; {new Date().getFullYear()}, Matthew Volk
      </Link>
      <Button variant="ghost" size="icon" asChild aria-label="Home">
        <Link href="/">
          <Home className="size-5" />
        </Link>
      </Button>
    </footer>
  );
}
