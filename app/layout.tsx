import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import { Toaster } from "@/components/ui/toaster";
import { EdgeStoreProvider } from "@/lib/edgestore";
import BgPattern from "./bg-pattern";

export const metadata: Metadata = {
  title: "resapp",
  description: "resources app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased relative`}>
        <EdgeStoreProvider>
          <BgPattern />
          <SiteHeader className="z-50" />
          {children}
          <Toaster />
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
