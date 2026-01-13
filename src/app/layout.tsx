import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { Footer } from "@/components/footer";
import { GoogleAnalytics } from "@/components/google-analytics";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased px-8">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="mx-auto w-full max-w-2xl flex-1 py-8">
              {children}
            </main>
            <Suspense>
              <Footer />
            </Suspense>
          </div>
        </ThemeProvider>
      </body>
      <GoogleAnalytics />
      <SpeedInsights />
    </html>
  );
}
