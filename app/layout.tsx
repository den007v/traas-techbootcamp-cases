import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "TraaS + Tech Bootcamp Cases",
  description: "Кейсы и истории выпускников TraaS и Tech Bootcamp"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <SiteHeader />
        <main className="mx-auto min-h-[70vh] max-w-6xl px-4 py-8 md:py-10">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
