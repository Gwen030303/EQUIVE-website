import type { Metadata } from "next";
import { Inter, DM_Sans, Outfit } from "next/font/google";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientOverlays from "@/components/ClientOverlays";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.equive.nl"),
  alternates: {
    canonical: "/",
  },
  title: "EQUIVE | Premium Rijbroeken",
  description:
    "EQUIVE — rijbroeken voor ruiters die niet kiezen tussen comfort en stijl. Premium ruiterkleding ontworpen in Amsterdam voor show jumping en dressuur. Ontdek The Signature Breech.",
  keywords: [
    "rijbroeken",
    "rijbroek",
    "ruiterkleding",
    "paardrijden",
    "show jumping",
    "springen",
    "dressuur",
    "premium rijbroek",
    "paardrijkleding",
    "equestrian clothing",
    "riding breeches",
    "horse riding apparel",
    "Dutch equestrian brand",
    "EQUIVE",
    "Amsterdam",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: { icon: "/logo-icon.webp" },
  openGraph: {
    title: "EQUIVE | Premium Rijbroeken",
    description:
      "EQUIVE — rijbroeken voor ruiters die niet kiezen tussen comfort en stijl. Premium ruiterkleding ontworpen in Amsterdam.",
    url: "https://www.equive.nl",
    siteName: "EQUIVE",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EQUIVE - Premium Rijbroeken",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EQUIVE | Premium Rijbroeken",
    description:
      "EQUIVE — rijbroeken voor ruiters die niet kiezen tussen comfort en stijl. Premium ruiterkleding ontworpen in Amsterdam.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${dmSans.variable} ${outfit.variable} antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-yellow focus:text-black focus:rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
        >
          Skip to content
        </a>
        <Providers>
          <ClientOverlays />
          <Navbar />
          <main id="main-content">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </Providers>
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(function(registrations) {
              for (var registration of registrations) {
                registration.unregister();
              }
            });
            caches.keys().then(function(names) {
              for (var name of names) caches.delete(name);
            });
          }
        `}} />
      </body>
    </html>
  );
}
