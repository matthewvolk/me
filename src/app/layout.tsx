import type { Metadata } from "next";
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
          <Header />
          <main className="mx-auto max-w-2xl px-4 py-8">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
