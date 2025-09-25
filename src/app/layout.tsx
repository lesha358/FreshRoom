import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./shared/Header";
import StructuredData from "./shared/StructuredData";
import YandexMetrica from "./shared/YandexMetrica";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "FreshRoom — Профессиональная уборка в Москве | Клининг квартир и домов",
    template: "%s | FreshRoom — Клининг в Москве"
  },
  description: "Профессиональная уборка квартир, домов и офисов в Москве. Генеральная уборка, уборка после ремонта, клининг. Эко-средства, гарантия 24 часа, страхование до 1 млн ₽. Рейтинг 4.9/5. Звоните: +7(993)258-66-21",
  keywords: [
    "клининг Москва",
    "уборка квартир Москва", 
    "генеральная уборка",
    "уборка после ремонта",
    "клининговая компания",
    "профессиональная уборка",
    "уборка домов Москва",
    "офисная уборка",
    "эко уборка",
    "клининг услуги",
    "уборка недвижимости",
    "клининговая служба",
    "уборка помещений",
    "профессиональный клининг",
    "уборка квартир недорого"
  ],
  authors: [{ name: "FreshRoom" }],
  creator: "FreshRoom",
  publisher: "FreshRoom",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "FreshRoom — Профессиональная уборка в Москве",
    title: "FreshRoom — Профессиональная уборка в Москве | Клининг квартир и домов",
    description: "Профессиональная уборка квартир, домов и офисов в Москве. Генеральная уборка, уборка после ремонта, клининг. Эко-средства, гарантия 24 часа, страхование до 1 млн ₽. Рейтинг 4.9/5.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "FreshRoom — профессиональная уборка в Москве",
        type: "image/png"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FreshRoom — Профессиональная уборка в Москве",
    description: "Профессиональная уборка квартир, домов и офисов в Москве. Эко-средства, гарантия 24 часа, страхование до 1 млн ₽.",
    images: ["/og.png"],
    creator: "@freshroom_cleaning",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#12b8a6" }
    ]
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
  verification: {
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-96x96.png" sizes="96x96" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="preconnect" href="https://mc.yandex.ru" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//mc.yandex.ru" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      </head>
      <body className={`${inter.variable}`}>
        <StructuredData type="WebSite" />
        <StructuredData type="LocalBusiness" />
        <YandexMetrica counterId="104285064" />
        <Header />
        {children}
      </body>
    </html>
  );
}
