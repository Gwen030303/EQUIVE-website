"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const slides = [
  { src: "/lifestyle-gallop.webp", alt: "Ruiter in galop met EQUIVE rijbroek", caption: "In actie" },
  { src: "/sig-grip-detail.webp", alt: "Full-seat siliconen grip close-up", caption: "Grip patroon" },
  { src: "/lifestyle-fullseat.webp", alt: "Twee ruiters met EQUIVE full-seat grip van achteren", caption: "Full-seat grip" },
  { src: "/detail-2.webp", alt: "Achterzak met glitter biesje detail", caption: "Pocket detail" },
  { src: "/sig-v2-front.webp", alt: "The Signature vooraanzicht", caption: "Vooraanzicht" },
  { src: "/product-grip-detail.webp", alt: "Macro close-up siliconen grip patroon", caption: "Grip close-up" },
  { src: "/sig-v2-back.webp", alt: "The Signature achteraanzicht", caption: "Achteraanzicht" },
  { src: "/detail-1.webp", alt: "Detail opname rijbroek", caption: "Stof detail" },
  { src: "/lifestyle-stable.webp", alt: "Ruiter in de stal", caption: "In de stal" },
  { src: "/hero-banner.webp", alt: "EQUIVE rijbroek in het zadel", caption: "In het zadel" },
  { src: "/feat3-moisture.webp", alt: "Ruiter te paard bij zonsondergang", caption: "Golden hour" },
  { src: "/sig-v2-side.webp", alt: "The Signature zijaanzicht", caption: "Zijaanzicht" },
];

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 lg:py-36 bg-off-white overflow-hidden">
      <div className="max-w-[1880px] mx-auto px-5 md:px-8 mb-12 sm:mb-16">
        <p className="font-sans text-[12px] tracking-[0.15em] uppercase text-taupe-dark mb-6">
          Galerij
        </p>
        <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-black leading-[1.1] tracking-[-0.01em]">
          Elk detail telt.
        </h2>
      </div>

      {/* Desktop: scroll-linked horizontal strip */}
      <motion.div
        style={{ x }}
        role="region"
        aria-label="Product detail afbeeldingen"
        className="hidden md:flex gap-5 pl-6 sm:pl-10 lg:pl-20"
      >
        {slides.map((slide) => (
          <div key={slide.caption} className="flex-shrink-0 w-[420px] lg:w-[520px]">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="520px"
                className="object-cover"
              />
            </div>
            <p className="font-sans text-sm text-black/40 mt-4">
              {slide.caption}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Mobile: regular horizontal scroll */}
      <div
        role="region"
        aria-label="Product detail afbeeldingen"
        className="flex md:hidden gap-4 px-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide) => (
          <div key={slide.caption} className="flex-shrink-0 w-[75vw] sm:w-[300px]">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
            <p className="font-sans text-sm text-black/40 mt-4">
              {slide.caption}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
