import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";
import { Home } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import * as React from "react";

import "./globals.css";

import { GoogleAnalytics } from "@/components/google-analytics";

export const metadata: Metadata = {
  title: {
    default: "Matthew Volk - Software Engineer",
    template: "%s | Matthew Volk - Software Engineer",
  },
  description:
    "Matthew Volk is a Software Engineer based in Austin, TX building tools and products in Typescript on Node.js.",
  keywords: [
    "Matthew",
    "Volk",
    "Software",
    "Engineer",
    "Typescript",
    "Node.js",
  ],
  metadataBase: new URL("https://volk.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://volk.dev",
    title: "Matthew Volk - Software Engineer",
    description:
      "Matthew Volk is a Software Engineer based in Austin, TX building tools and products in Typescript on Node.js.",
    siteName: "Matthew Volk - Software Engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matthew Volk - Software Engineer",
    description:
      "Matthew Volk is a Software Engineer based in Austin, TX building tools and products in Typescript on Node.js.",
    images: ["https://volk.dev/og.png"],
    creator: "@mttvlk",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "https://volk.dev/site.webmanifest",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body
        className={`container mx-auto flex min-h-screen max-w-2xl flex-col gap-12 px-8 font-sans antialiased ${GeistSans.variable}`}
      >
        <header>
          <a
            className="absolute -top-full left-16 z-50 rounded-md bg-black px-3 py-2 font-semibold text-white transition-all focus:top-4"
            href="#main-content"
          >
            Skip to content
          </a>

          <nav className="-mx-2 flex items-center justify-between pt-8 font-semibold md:pt-12">
            <Link
              aria-label="Home"
              className="rounded-md p-2 md:hover:bg-gray-200/75"
              href="/"
              title="Home"
            >
              <Home size={20} />
            </Link>

            <ul>
              <li>
                <Link
                  className="rounded-md p-2 md:hover:bg-gray-200/75"
                  href="/blog"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="flex flex-1 flex-col gap-12">{children}</main>

        <footer className="flex items-center justify-between pb-8 md:pb-12">
          <Link className="text-sm font-medium" href="/">
            &copy; {new Date().getFullYear()}, Matthew Volk
          </Link>
          <Link
            aria-label="Home"
            className="-mx-2 rounded-md p-2 hover:bg-gray-200/75"
            href="/"
            title="Home"
          >
            <Home size={20} />
          </Link>
        </footer>

        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
