import type { Metadata } from "next";
import Duurzaamheid from "@/components/Duurzaamheid";

export const metadata: Metadata = {
  title: "Duurzaamheid | EQUIVE",
  description:
    "Ontdek hoe EQUIVE werkt aan duurzame rijkleding. Eerlijke productie, hoogwaardige materialen, recyclebare verpakkingen en klimaatneutrale verzending.",
  alternates: { canonical: "/duurzaamheid" },
  openGraph: {
    title: "Duurzaamheid | EQUIVE",
    description:
      "Ontdek hoe EQUIVE werkt aan duurzame rijkleding. Eerlijke productie, hoogwaardige materialen, recyclebare verpakkingen en klimaatneutrale verzending.",
    url: "https://www.equive.shop/duurzaamheid",
    siteName: "EQUIVE",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EQUIVE - Duurzaamheid",
      },
    ],
  },
};

export default function DuurzaamheidPage() {
  return <Duurzaamheid />;
}
