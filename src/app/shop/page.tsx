import type { Metadata } from "next";
import Product from "@/components/Collection";

export const metadata: Metadata = {
  title: "Shop | EQUIVE",
  description: "Bekijk de collectie premium rijbroeken van EQUIVE. The Signature rijbroek — rijkleding ontworpen in Amsterdam.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop | EQUIVE",
    description: "Bekijk de collectie premium rijbroeken van EQUIVE. The Signature rijbroek — rijkleding ontworpen in Amsterdam.",
    url: "https://www.equive.nl/shop",
    siteName: "EQUIVE",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "EQUIVE - Premium Rijbroeken" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop | EQUIVE",
    description: "Bekijk de collectie premium rijbroeken van EQUIVE. The Signature rijbroek — rijkleding ontworpen in Amsterdam.",
    images: ["/og-image.jpg"],
  },
};

export default function ShopPage() {
  return <Product />;
}
