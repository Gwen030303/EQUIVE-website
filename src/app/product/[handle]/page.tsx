import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { getProduct, getProducts } from "@/lib/shopify";

interface PageProps {
  params: Promise<{ handle: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    return {
      title: "Product niet gevonden | EQUIVE",
    };
  }

  const ogImage = product.images.edges[0]?.node;
  const description =
    product.description?.slice(0, 160) || `${product.title} — EQUIVE`;
  const url = `https://www.equive.shop/product/${handle}`;

  return {
    title: `${product.title} | EQUIVE`,
    description,
    alternates: { canonical: `/product/${handle}` },
    openGraph: {
      title: `${product.title} | EQUIVE`,
      description,
      url,
      siteName: "EQUIVE",
      locale: "nl_NL",
      type: "website",
      images: ogImage
        ? [
            {
              url: ogImage.url,
              width: ogImage.width,
              height: ogImage.height,
              alt: ogImage.altText ?? product.title,
            },
          ]
        : [
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
      title: `${product.title} | EQUIVE`,
      description,
      images: ogImage ? [ogImage.url] : ["/og-image.jpg"],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.edges.map((edge) => edge.node.url),
    url: `https://www.equive.shop/product/${handle}`,
    brand: {
      "@type": "Brand",
      name: "EQUIVE",
    },
    offers: {
      "@type": "Offer",
      price: Number.parseFloat(product.priceRange.minVariantPrice.amount),
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      availability: product.variants.edges.some((e) => e.node.availableForSale)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://www.equive.shop/product/${handle}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} />
    </>
  );
}
