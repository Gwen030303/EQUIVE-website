"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWaitlist } from "@/lib/waitlist-context";
import { useCart } from "@/lib/cart-context";
import { Truck } from "@phosphor-icons/react/dist/ssr/Truck";
import { ArrowCounterClockwise } from "@phosphor-icons/react/dist/ssr/ArrowCounterClockwise";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import type { ShopifyProduct } from "@/lib/shopify";

interface ProductDetailProps {
  product: ShopifyProduct;
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

export default function ProductDetail({ product }: ProductDetailProps) {
  const { openWaitlist } = useWaitlist();
  const { addItem, isLoading } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  // Bouw option groups (bv. { Maat: ["XS","S","M"], Kleur: ["Zwart"] })
  const optionGroups = useMemo(() => {
    const groups: Record<string, string[]> = {};
    for (const edge of product.variants.edges) {
      for (const opt of edge.node.selectedOptions) {
        if (!groups[opt.name]) groups[opt.name] = [];
        if (!groups[opt.name].includes(opt.value)) {
          groups[opt.name].push(opt.value);
        }
      }
    }
    return groups;
  }, [product]);

  // Skip "Title / Default Title" als enige optie (Shopify default voor producten zonder varianten)
  const hasRealOptions = useMemo(() => {
    const names = Object.keys(optionGroups);
    if (names.length === 0) return false;
    if (names.length === 1 && names[0] === "Title") return false;
    return true;
  }, [optionGroups]);

  // Vind de matchende variant op basis van geselecteerde opties
  const selectedVariant = useMemo(() => {
    if (!hasRealOptions) {
      return product.variants.edges[0]?.node ?? null;
    }
    return (
      product.variants.edges.find((edge) =>
        edge.node.selectedOptions.every(
          (opt) => selectedOptions[opt.name] === opt.value
        )
      )?.node ?? null
    );
  }, [product, selectedOptions, hasRealOptions]);

  const allOptionsSelected = useMemo(() => {
    if (!hasRealOptions) return true;
    return Object.keys(optionGroups).every((name) => Boolean(selectedOptions[name]));
  }, [optionGroups, selectedOptions, hasRealOptions]);

  // Check of een optie-waarde leidt tot een beschikbare variant (gegeven huidige selectie)
  const isOptionAvailable = (optionName: string, value: string) => {
    return product.variants.edges.some((edge) => {
      const matchesThis = edge.node.selectedOptions.some(
        (o) => o.name === optionName && o.value === value
      );
      if (!matchesThis) return false;
      const matchesOthers = edge.node.selectedOptions.every((o) => {
        if (o.name === optionName) return true;
        const sel = selectedOptions[o.name];
        return !sel || sel === o.value;
      });
      return matchesThis && matchesOthers && edge.node.availableForSale;
    });
  };

  // Heeft dit product überhaupt verkoopbare varianten? (Zo nee → waitlist-flow)
  const hasAnyBuyableVariant = useMemo(
    () => product.variants.edges.some((e) => e.node.availableForSale),
    [product]
  );

  const canBuy =
    hasAnyBuyableVariant &&
    allOptionsSelected &&
    !!selectedVariant?.availableForSale;

  const handleBuy = async () => {
    if (!selectedVariant) return;
    await addItem(selectedVariant.id);
  };

  const handleWaitlist = () => {
    openWaitlist();
  };

  const images = product.images.edges;
  const currentImage = images[selectedImage]?.node;
  const displayPrice = selectedVariant
    ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)
    : formatPrice(
        product.priceRange.minVariantPrice.amount,
        product.priceRange.minVariantPrice.currencyCode
      );

  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-24 bg-white">
      <div className="max-w-[1880px] mx-auto px-5 md:px-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 font-sans text-[15px] md:text-sm text-black/60 whitespace-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <li>
              <Link href="/" className="hover:text-black transition-colors min-h-[44px] inline-flex items-center">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/shop" className="hover:text-black transition-colors min-h-[44px] inline-flex items-center">
                Shop
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-black truncate" aria-current="page">
              {product.title}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* ── Image gallery ── */}
          <div className="md:col-span-7">
            <div className="flex flex-col-reverse md:flex-row gap-3">
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {images.map((edge, i) => (
                    <button
                      key={edge.node.url}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-[60px] h-[72px] md:w-20 md:h-24 overflow-hidden rounded-md border-2 transition-all duration-300 flex-shrink-0 ${
                        selectedImage === i
                          ? "border-black"
                          : "border-transparent hover:border-black/10"
                      }`}
                    >
                      <Image
                        src={edge.node.url}
                        alt={edge.node.altText ?? product.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-off-white rounded-lg flex-1">
                {currentImage && (
                  <Image
                    src={currentImage.url}
                    alt={currentImage.altText ?? product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="object-contain object-center"
                    priority
                  />
                )}
              </div>
            </div>
          </div>

          {/* ── Product info ── */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32 flex flex-col gap-6">
              {/* Title */}
              <div>
                <h1 className="font-headline font-bold text-4xl sm:text-5xl text-black leading-[1.05] tracking-[-0.01em]">
                  {product.title}
                </h1>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-headline font-bold text-3xl text-black">
                  {displayPrice}
                </span>
                {selectedVariant && !selectedVariant.availableForSale && (
                  <span className="font-sans text-[13px] text-red-600 uppercase tracking-wider">
                    Niet beschikbaar
                  </span>
                )}
              </div>

              {/* Variant options */}
              {hasRealOptions &&
                Object.entries(optionGroups).map(([optionName, values]) => (
                  <div key={optionName}>
                    <p className="font-sans text-[15px] md:text-sm font-medium text-black mb-3">
                      {optionName}
                      {selectedOptions[optionName] && (
                        <span className="text-black/50 font-normal ml-2">
                          &mdash; {selectedOptions[optionName]}
                        </span>
                      )}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {values.map((value) => {
                        const available = isOptionAvailable(optionName, value);
                        const isSelected = selectedOptions[optionName] === value;
                        return (
                          <button
                            key={value}
                            onClick={() =>
                              available &&
                              setSelectedOptions((prev) => ({
                                ...prev,
                                [optionName]: value,
                              }))
                            }
                            disabled={!available}
                            aria-label={available ? `${optionName} ${value}` : `${optionName} ${value} niet beschikbaar`}
                            className={`min-w-12 h-14 md:h-12 px-4 rounded-lg font-sans text-base md:text-sm font-medium transition-all duration-300 ${
                              !available
                                ? "bg-off-white text-black/30 line-through cursor-not-allowed border border-black/[0.04]"
                                : isSelected
                                ? "bg-black text-white"
                                : "bg-off-white text-black hover:bg-black/[0.06] border border-black/[0.08]"
                            }`}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

              {/* CTA: koop-knop als variant beschikbaar, anders waitlist */}
              {hasAnyBuyableVariant ? (
                <button
                  onClick={handleBuy}
                  disabled={!canBuy || isLoading}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[56px] rounded-full font-sans text-[15px] font-medium transition-all duration-300 active:scale-[0.98] w-full ${
                    canBuy && !isLoading
                      ? "bg-black text-white hover:bg-taupe cursor-pointer"
                      : "bg-sand text-black/50 cursor-not-allowed"
                  }`}
                >
                  {isLoading
                    ? "Bezig..."
                    : !allOptionsSelected
                      ? "Kies een maat"
                      : !selectedVariant?.availableForSale
                        ? "Uitverkocht"
                        : `In winkelmandje — ${displayPrice}`}
                </button>
              ) : (
                <button
                  onClick={handleWaitlist}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[56px] rounded-full font-sans text-[15px] font-medium transition-all duration-300 active:scale-[0.98] w-full bg-black text-white hover:bg-taupe cursor-pointer"
                >
                  Meld je aan voor early access
                </button>
              )}

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 py-2 flex-wrap">
                {[
                  { Icon: Truck, label: "Gratis verzending" },
                  { Icon: ArrowCounterClockwise, label: "30 dagen retour" },
                  { Icon: ShieldCheck, label: "Veilig betalen" },
                ].map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <Icon size={16} weight="light" className="text-black/60" />
                    <span className="font-sans text-[13px] text-black/70">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Description */}
              {product.description && (
                <div className="pt-4 border-t border-black/[0.06]">
                  <p className="font-sans text-[15px] text-black/75 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
