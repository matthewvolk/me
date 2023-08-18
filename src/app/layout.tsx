import { ThemeProvider } from "@/context/theme";
import "./globals.css";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@/components/google-analytics";

export const metadata: Metadata = {
  title: "volk.dev",
  description: "Software Engineer",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
