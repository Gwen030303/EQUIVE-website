import type { Metadata } from "next";
import Image from "next/image";
import ProductGrid from "@/components/ProductGrid";
import TextScramble from "@/components/TextScramble";
import { getProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Shop | EQUIVE",
  description: "Shop de EQUIVE collectie: rijbroeken met siliconen grip voor dressuur en springen. Gratis verzending in Nederland, 30 dagen retour.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop | EQUIVE",
    description: "Shop de EQUIVE collectie: rijbroeken met siliconen grip voor dressuur en springen. Gratis verzending in Nederland, 30 dagen retour.",
    url: "https://www.equive.shop/shop",
    siteName: "EQUIVE",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "EQUIVE - Premium Rijbroeken" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop | EQUIVE",
    description: "Shop de EQUIVE collectie: rijbroeken met siliconen grip voor dressuur en springen. Gratis verzending in Nederland, 30 dagen retour.",
    images: ["/og-image.jpg"],
  },
};

export const revalidate = 60;

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[52vh] min-h-[380px] md:h-[60vh] md:min-h-[460px] w-full overflow-hidden">
        <Image
          src="/shop-hero.webp"
          alt="EQUIVE Collectie"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        {/* Subtle gradient — top + bottom darker so tekst leesbaar blijft */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/55" />

        {/* Editorial composition */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-white text-center">
          {/* Main headline */}
          <h1 className="font-headline font-bold leading-[0.85] tracking-[-0.02em] drop-shadow-[0_2px_30px_rgba(0,0,0,0.45)]">
            <TextScramble
              text="COLLECTIE"
              className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl"
            />
          </h1>

          {/* Subtitle */}
          <div className="flex items-center gap-4 md:gap-5 mt-7 md:mt-12 opacity-85">
            <span aria-hidden="true" className="block w-8 md:w-12 h-px bg-white/50" />
            <span className="font-sans text-[11px] md:text-[13px] tracking-[0.32em] uppercase">
              Lente &mdash; Zomer 2026
            </span>
            <span aria-hidden="true" className="block w-8 md:w-12 h-px bg-white/50" />
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="pt-16 md:pt-24 pb-16 md:pb-24 bg-white">
        <div className="max-w-[1880px] mx-auto px-5 md:px-8">
          <ProductGrid products={products} />
        </div>
      </section>
    </>
  );
}
