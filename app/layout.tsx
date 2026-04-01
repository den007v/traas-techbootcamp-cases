import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "TechBootcamp Alumni · Банк кейсов",
  description: "Живые кейсы участников TechBootcamp и TraaS — реальные истории применения цифровых инструментов, ИИ и управленческих практик."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800,900&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
