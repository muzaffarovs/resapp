import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import { Toaster } from "@/components/ui/toaster";
import { EdgeStoreProvider } from "@/lib/edgestore";
import BgPattern from "./bg-pattern";
import localFont from "next/font/local";
import SiteFooter from "@/components/site-footer";
import { TabProvider } from "@/contexts/TabContext";

export const metadata: Metadata = {
  title: "maktab230",
  description: "resources app for maktab230",
  other: {
    "google-site-verification": "N9zPh1zG20UeuyDQwGyu52pFggQPhBIFxKXH5vDMDMc",
  },
};

const pacifico = localFont({
  src: "../public/fonts/Pacifico/Pacifico-Regular.ttf",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
      <body className={`antialiased relative ${pacifico.className}`}>
        <TabProvider>
          <EdgeStoreProvider>
            <BgPattern />
            <SiteHeader className={`${pacifico.className} font-sans z-50`} />
            {children}
            <SiteFooter className="z-50" />
            <Toaster />
          </EdgeStoreProvider>
        </TabProvider>
      </body>
    </html>
  );
}
