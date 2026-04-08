import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import type { ShopifyProductSummary } from "@/lib/shopify";

interface ProductGridProps {
  products: ShopifyProductSummary[];
}

function formatPrice(amount: string, currencyCode: string) {
  const value = Number.parseFloat(amount);
  if (Number.isNaN(value)) return "";
  try {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
    }).format(value);
  } catch {
    return `€${value.toFixed(2)}`;
  }
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <span className="font-sans text-[12px] tracking-[0.3em] uppercase text-taupe">
          Binnenkort
        </span>
        <div className="w-12 h-px bg-taupe/25 mx-auto mt-4 mb-8" />
        <h2 className="font-headline font-bold text-3xl sm:text-4xl text-black leading-[1.05] tracking-[-0.01em]">
          De collectie wordt voorbereid
        </h2>
        <p className="font-sans text-[15px] text-black/60 leading-relaxed mt-4">
          Onze eerste stukken zijn bijna klaar. Schrijf je in voor de wachtlijst
          om als eerste te horen wanneer ze beschikbaar zijn.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
      {products.map((product) => {
        const primary = product.images.edges[0]?.node;
        const secondary = product.images.edges[1]?.node ?? primary;
        const price = formatPrice(
          product.priceRange.minVariantPrice.amount,
          product.priceRange.minVariantPrice.currencyCode
        );

        return (
          <Link
            key={product.id}
            href={`/product/${product.handle}`}
            className="group block"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-off-white">
              {primary && (
                <Image
                  src={primary.url}
                  alt={primary.altText ?? product.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:opacity-0 group-hover:scale-[1.03]"
                />
              )}
              {secondary && (
                <Image
                  src={secondary.url}
                  alt={secondary.altText ?? product.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:opacity-100 group-hover:scale-[1.03]"
                />
              )}

              <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm px-4 py-2 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                <span className="font-sans text-[12px] tracking-[0.16em] uppercase text-black">
                  Bekijk
                </span>
                <ArrowRight size={12} weight="bold" className="text-black" />
              </div>
            </div>

            <div className="mt-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-headline font-bold text-base md:text-lg text-black tracking-[-0.005em] leading-tight truncate">
                  {product.title}
                </h3>
                <p className="font-sub font-normal text-[12px] md:text-[13px] text-taupe mt-0.5">
                  Rijbroek
                </p>
              </div>
              <span className="font-headline font-light text-base md:text-lg text-black whitespace-nowrap mt-0.5">
                {price}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
