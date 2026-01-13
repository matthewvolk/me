import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Matthew Volk",
    template: "%s | Matthew Volk",
  },
  description: "Software engineer portfolio and blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">{children}</main>
            <Suspense>
              <Footer />
            </Suspense>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
