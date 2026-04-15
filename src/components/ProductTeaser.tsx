"use client";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "./FadeIn";
import { Check } from "@phosphor-icons/react/dist/ssr/Check";

const features = [
  "Full-seat siliconen grip",
  "4-way stretch",
  "Vochtregulerende stof",
];

const pressNames = [
  "HORSES.NL",
  "BIT MAGAZINE",
  "DE PAARDENKRANT",
];

/* ────────────────────────────────────────────────────────
   Hover-zoom image card — reusable across the grid
   ──────────────────────────────────────────────────────── */
function ZoomImage({
  src,
  alt,
  aspect,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  aspect: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className={`group/img relative overflow-hidden rounded-lg ${aspect}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/img:scale-[1.05]"
      />
      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/img:opacity-100 pointer-events-none" />
    </div>
  );
}

export default function ProductTeaser() {
  return (
    <section className="relative overflow-hidden bg-off-white pt-8 md:pt-12 pb-16 md:pb-24">
      <div className="glow-blob glow-blob-gold w-[600px] h-[600px] -right-40 top-20 animate-glow-pulse opacity-30" />
      <div className="w-full px-6 md:px-12">
        {/* ── Asymmetric image grid + product card ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* ── Left column — images ── */}
          <div className="md:col-span-7 flex flex-col gap-4">
            {/* Main product image */}
            <FadeIn direction="up" delay={0.1}>
              <ZoomImage
                src="/sig-v2-front.webp"
                alt="EQUIVE The Signature rijbroek - vooraanzicht"
                aspect="aspect-[3/4]"
                sizes="(max-width: 768px) 100vw, 58vw"
                priority
              />
            </FadeIn>

            {/* Detail images row */}
            <div className="grid grid-cols-2 gap-4">
              <FadeIn direction="up" delay={0.25}>
                <ZoomImage
                  src="/sig-v2-back.webp"
                  alt="EQUIVE The Signature - achteraanzicht full-seat grip"
                  aspect="aspect-square"
                  sizes="(max-width: 768px) 50vw, 28vw"
                />
              </FadeIn>
              <FadeIn direction="up" delay={0.35}>
                <ZoomImage
                  src="/sig-grip-detail.webp"
                  alt="EQUIVE The Signature - siliconen grip close-up"
                  aspect="aspect-square"
                  sizes="(max-width: 768px) 50vw, 28vw"
                />
              </FadeIn>
            </div>
          </div>

          {/* ── Right column — product info card ── */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-24">
              <FadeIn direction="right" delay={0.2}>
                <div className="glass-light card-glow shadow-[0_4px_30px_rgba(0,0,0,0.06)] rounded-lg p-6 sm:p-8 md:p-10 lg:p-12">
                  {/* Overline */}
                  <span className="font-sans text-[12px] tracking-[0.3em] uppercase text-taupe">
                    De Eerste Collectie
                  </span>

                  {/* Accent line */}
                  <div className="w-12 h-px bg-taupe/25 mt-4 mb-8" />

                  {/* Product name */}
                  <h2 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black leading-[0.9] tracking-[0.02em]">
                    The
                    <br />
                    Signature
                  </h2>
                  <p className="font-sub font-normal text-lg text-taupe mt-3">
                    Rijbroek
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-4 flex-wrap mt-8">
                    <span className="font-headline font-light text-3xl sm:text-4xl text-black tracking-wide">
                      &euro;79,99
                    </span>
                  </div>

                  {/* Accent separator */}
                  <div className="w-full h-px bg-sand mt-8 mb-8" />

                  {/* Features */}
                  <ul className="flex flex-col gap-3">
                    {features.map((feature, i) => (
                      <FadeIn key={feature} delay={0.3 + i * 0.08} direction="left">
                        <li
                          className="font-sans text-sm text-taupe-dark tracking-wide flex items-center gap-3"
                        >
                          <Check
                            size={14}
                            weight="bold"
                            className="text-taupe shrink-0"
                          />
                          {feature}
                        </li>
                      </FadeIn>
                    ))}
                  </ul>


                  {/* CTA — black fill-sweep */}
                  <div className="mt-10">
                    <Link
                      href="/product/the-signature"
                      className="group/cta relative inline-flex items-center justify-center w-full px-10 py-4 border border-black rounded-lg text-black font-sans text-[13px] tracking-[0.18em] uppercase overflow-hidden transition-all duration-700 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span className="relative z-10 transition-colors duration-700 group-hover/cta:text-off-white group-active/cta:text-off-white">
                        Bekijk Details
                      </span>
                      <span className="absolute inset-0 bg-black transform -translate-x-full group-hover/cta:translate-x-0 group-active/cta:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
                    </Link>
                  </div>

                  {/* Shipping note */}
                  <p className="font-sans text-[13px] text-taupe-dark/55 tracking-wide mt-5 text-center">
                    Gratis verzending &middot; 30 dagen retour
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      {/* ── Press bar ── */}
      <div className="border-t border-sand mt-16 md:mt-24">
        <div className="w-full px-6 md:px-12 py-6">
          <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-14 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="font-sub font-normal text-sm text-taupe-dark/50 mr-4 whitespace-nowrap flex-shrink-0">
              Bekend van
            </span>
            {pressNames.map((name, i, arr) => (
              <Fragment key={name}>
                <FadeIn delay={i * 0.06} direction="up">
                  <span className="font-sans text-[12px] sm:text-sm tracking-[0.25em] uppercase text-taupe-dark/45 whitespace-nowrap flex-shrink-0 hover:text-taupe transition-colors duration-300">
                    {name}
                  </span>
                </FadeIn>
                {i < arr.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="w-px h-3 bg-taupe-dark/10 flex-shrink-0"
                  />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
