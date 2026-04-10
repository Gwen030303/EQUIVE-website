import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact | EQUIVE",
  description:
    "Neem contact op met EQUIVE. Vragen over rijbroeken, bestellingen of retour? We helpen je graag.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | EQUIVE",
    description:
      "Neem contact op met EQUIVE. Vragen over rijbroeken, bestellingen of retour? We helpen je graag.",
    url: "https://www.equive.shop/contact",
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
    title: "Contact | EQUIVE",
    description:
      "Neem contact op met EQUIVE. Vragen over rijbroeken, bestellingen of retour? We helpen je graag.",
    images: ["/og-image.jpg"],
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
