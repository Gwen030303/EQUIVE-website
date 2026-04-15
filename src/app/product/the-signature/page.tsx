import type { Metadata } from "next";
import Product from "@/components/Collection";
import Reviews from "@/components/Reviews";
import { getProduct, buildSizeVariantMap } from "@/lib/shopify";

const PRODUCT_HANDLE = "the-signature";

export const metadata: Metadata = {
  title: "The Signature Rijbroek | EQUIVE",
  description: "The Signature rijbroek van EQUIVE: full-seat siliconen grip, 4-way stretch en vochtregulerende stof. Voor dressuur, springen en eventing. Nu €64,95.",
  alternates: { canonical: "/product/the-signature" },
  openGraph: {
    title: "The Signature Rijbroek | EQUIVE",
    description: "The Signature rijbroek van EQUIVE: full-seat siliconen grip, 4-way stretch en vochtregulerende stof. Voor dressuur, springen en eventing. Nu €64,95.",
    url: "https://www.equive.shop/product/the-signature",
    siteName: "EQUIVE",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "EQUIVE - Premium Rijbroeken" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Signature Rijbroek | EQUIVE",
    description: "The Signature rijbroek van EQUIVE: full-seat siliconen grip, 4-way stretch en vochtregulerende stof. Voor dressuur, springen en eventing. Nu €64,95.",
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
        "The Signature rijbroek van EQUIVE: full-seat siliconen grip, 4-way stretch en vochtregulerende stof. Voor dressuur, springen en eventing. Nu €64,95.",
      image: "https://www.equive.shop/product-signature.webp",
      url: "https://www.equive.shop/product/the-signature",
      brand: {
        "@type": "Brand",
        name: "EQUIVE",
      },
      material: "78% Polyamide, 22% Elastaan",
      color: "Zwart",
      category: "Rijkleding > Rijbroeken",
      offers: {
        "@type": "Offer",
        price: 64.95,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: "https://www.equive.shop/product/the-signature",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.equive.shop",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Shop",
          item: "https://www.equive.shop/shop",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "The Signature",
          item: "https://www.equive.shop/product/the-signature",
        },
      ],
    },
  ],
};

export default async function ProductPage() {
  const product = await getProduct(PRODUCT_HANDLE);
  const variantIdsBySize = product ? buildSizeVariantMap(product) : {};

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Product variantIdsBySize={variantIdsBySize} />
      <Reviews />
    </>
  );
}
