import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import * as React from "react";

import { GoogleAnalytics } from "@/components/google-analytics";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/context/theme";
import { cs } from "@/lib/cs";

import "./globals.css";

import type { Metadata } from "next";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Matthew",
    "Volk",
    "Software",
    "Engineer",
    "Typescript",
    "Node.js",
  ],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
      </head>
      <body
        className={cs(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
