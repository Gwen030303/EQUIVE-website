import type { Metadata } from "next";
import Product from "@/components/Collection";
import HorizontalScroll from "@/components/HorizontalScroll";
import Reviews from "@/components/Reviews";
import VideoTestimonials from "@/components/VideoTestimonials";
import ReferralBanner from "@/components/ReferralBanner";

export const metadata: Metadata = {
  title: "The Signature Rijbroek | EQUIVE",
  description: "The Signature — de ultieme rijbroek van EQUIVE. Full-seat siliconen grip, 4-way stretch, vochtregulerende stof. Vanaf €79,99.",
  alternates: { canonical: "/product/the-signature" },
  openGraph: {
    title: "The Signature Rijbroek | EQUIVE",
    description: "The Signature — de ultieme rijbroek van EQUIVE. Full-seat siliconen grip, 4-way stretch, vochtregulerende stof. Vanaf €79,99.",
    url: "https://www.equive.nl/product/the-signature",
    siteName: "EQUIVE",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "EQUIVE - Premium Rijbroeken" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Signature Rijbroek | EQUIVE",
    description: "The Signature — de ultieme rijbroek van EQUIVE. Full-seat siliconen grip, 4-way stretch, vochtregulerende stof. Vanaf €79,99.",
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "The Signature Rijbroek",
      description:
        "The Signature — de ultieme rijbroek van EQUIVE. Full-seat siliconen grip, 4-way stretch, vochtregulerende stof. Vanaf €79,99.",
      image: "https://www.equive.nl/product-signature.webp",
      url: "https://www.equive.nl/product/the-signature",
      brand: {
        "@type": "Brand",
        name: "EQUIVE",
      },
      material: "78% Polyamide, 22% Elastaan",
      color: "Zwart",
      category: "Rijkleding > Rijbroeken",
      offers: {
        "@type": "Offer",
        price: 79.95,
        priceCurrency: "EUR",
        availability: "https://schema.org/PreOrder",
        url: "https://www.equive.nl/product/the-signature",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.equive.nl",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Shop",
          item: "https://www.equive.nl/shop",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "The Signature",
          item: "https://www.equive.nl/product/the-signature",
        },
      ],
    },
  ],
};

export default function ProductPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Product />
      <HorizontalScroll />
      <Reviews />
      <VideoTestimonials />
      <ReferralBanner />
    </>
  );
}
