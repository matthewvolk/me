"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import * as React from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";
import { cs } from "@/lib/cs";

const navItems = [
  { title: "Projects", href: "/#projects" },
  { title: "Blog", href: "/blog" },
];

const MobileNav = ({
  setShowMobileMenu,
}: {
  setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
      <div className="relative z-20 grid gap-6 rounded-md bg-white p-4 shadow-lg dark:bg-slate-900">
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          <Link
            onClick={() => setShowMobileMenu(false)}
            href="/"
            className="p-2 text-sm font-medium"
          >
            Home
          </Link>
          {navItems.map((item, index) => (
            <Link
              key={index}
              onClick={() => setShowMobileMenu(false)}
              href={item.href}
              className="flex w-full items-center rounded-md p-2 text-sm font-medium"
            >
              {item.title}
            </Link>
          ))}
          {siteConfig.links.map((item, index) => (
            <Link
              key={index}
              onClick={() => setShowMobileMenu(false)}
              href={item.href}
              className="flex w-full items-center rounded-md p-2 text-sm font-medium"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export const MainNav = () => {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className="flex h-20 items-center justify-between py-6">
      <div className="hidden gap-6 md:flex md:gap-10">
        <Link href="/" className="font-bold">
          Matthew Volk
        </Link>
        <nav className="gap-6 md:flex">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cs(
                "flex items-center text-lg font-medium transition-colors hover:text-slate-950/80 hover:dark:text-slate-50/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-slate-950 dark:text-slate-50"
                  : "text-slate-950/60 dark:text-slate-50/60",
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <button
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="flex font-bold md:hidden"
      >
        {showMobileMenu ? "Close" : "Menu"}
      </button>
      <nav className="flex items-center gap-6">
        <div className="hidden gap-6 md:flex">
          {siteConfig.links.map((link, index) => (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              href={link.href}
              className="flex items-center text-lg font-medium text-slate-950/60 transition-colors hover:text-slate-950/80 dark:text-slate-50/60 hover:dark:text-slate-50/80 sm:text-sm"
            >
              {link.title}
            </Link>
          ))}
        </div>
        <ThemeToggle />
      </nav>
      {showMobileMenu && <MobileNav setShowMobileMenu={setShowMobileMenu} />}
    </div>
  );
};
