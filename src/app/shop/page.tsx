import type { Metadata } from "next";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Shop | EQUIVE",
  description: "Bekijk de collectie premium rijbroeken van EQUIVE. Rijkleding ontworpen in Amsterdam — comfort én stijl, zonder concessies.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop | EQUIVE",
    description: "Bekijk de collectie premium rijbroeken van EQUIVE. Rijkleding ontworpen in Amsterdam — comfort én stijl, zonder concessies.",
    url: "https://www.equive.nl/shop",
    siteName: "EQUIVE",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "EQUIVE - Premium Rijbroeken" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop | EQUIVE",
    description: "Bekijk de collectie premium rijbroeken van EQUIVE. Rijkleding ontworpen in Amsterdam — comfort én stijl, zonder concessies.",
    images: ["/og-image.jpg"],
  },
};

export const revalidate = 60;

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-24 bg-white">
      <div className="max-w-[1880px] mx-auto px-5 md:px-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex items-center gap-2 font-sans text-[15px] md:text-sm text-black/60">
            <li>
              <Link
                href="/"
                className="hover:text-black transition-colors min-h-[48px] md:min-h-[44px] inline-flex items-center"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-black" aria-current="page">
              Shop
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="max-w-3xl mb-14 md:mb-20">
          <span className="font-sans text-[12px] tracking-[0.3em] uppercase text-taupe">
            De Collectie
          </span>
          <div className="w-12 h-px bg-taupe/25 mt-4 mb-6" />
          <h1 className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl text-black leading-[1.02] tracking-[-0.01em]">
            Comfort of stijl?
            <br />
            Allebei.
          </h1>
          <p className="font-sans text-[15px] md:text-base text-black/70 leading-relaxed mt-5 max-w-xl">
            Rijkleding ontworpen in Amsterdam. Eerlijke prijzen, geen
            tussenhandelaren — alleen het beste van comfort en stijl, in elk stuk.
          </p>
        </header>

        {/* Grid */}
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
