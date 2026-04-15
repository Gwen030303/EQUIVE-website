"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, AnimatePresence } from "framer-motion";
import FadeIn from "./FadeIn";
import Link from "next/link";
import { useWaitlist } from "@/lib/waitlist-context";
import { Minus } from "@phosphor-icons/react/dist/ssr/Minus";
import { Plus } from "@phosphor-icons/react/dist/ssr/Plus";
import { Truck } from "@phosphor-icons/react/dist/ssr/Truck";
import { ArrowCounterClockwise } from "@phosphor-icons/react/dist/ssr/ArrowCounterClockwise";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { Horse } from "@phosphor-icons/react/dist/ssr/Horse";
import { ArrowsOut } from "@phosphor-icons/react/dist/ssr/ArrowsOut";
import { Drop } from "@phosphor-icons/react/dist/ssr/Drop";
import { MagnifyingGlassPlus } from "@phosphor-icons/react/dist/ssr/MagnifyingGlassPlus";
import SizeGuide from "./SizeGuide";
import Lightbox from "./Lightbox";
import { SIZES } from "@/lib/constants";

const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGPYsaQHAAQAAenV6sPyAAAAAElFTkSuQmCC";

const images = [
  { src: "/sig-v2-front.webp", alt: "EQUIVE The Signature rijbroek - vooraanzicht zwart" },
  { src: "/sig-v2-back.webp", alt: "EQUIVE The Signature rijbroek - achteraanzicht full-seat grip" },
  { src: "/sig-v2-side.webp", alt: "EQUIVE The Signature rijbroek - zijaanzicht profiel" },
  { src: "/sig-grip-detail.webp", alt: "EQUIVE siliconen grip patroon close-up detail" },
  { src: "/sig-pose.webp", alt: "EQUIVE The Signature rijbroek - model pose achteraanzicht" },
];

const highlights = [
  { icon: Horse, label: "Full-seat grip" },
  { icon: ArrowsOut, label: "4-way stretch" },
  { icon: Drop, label: "Vochtregulering" },
];

const accordionData = [
  {
    title: "Productdetails & Materiaal",
    content: [
      "78% polyamide, 22% elastaan",
      "Full-seat siliconen grip met cirkelpatroon",
      "4-way stretch performance stof",
      "Vochtregulerende technologie",
      "Middelhoge taille met riemlussen",
      "Achterzak met klepje en glitter biesje",
      "Niet-doorschijnend",
    ],
  },
  {
    title: "Verzending & Retour",
    content: [
      "Gratis verzending in Nederland",
      "Verzending binnen 1\u20132 werkdagen",
      "30 dagen bedenktijd",
      "Gratis retourneren via PostNL",
      "Levering ook in Belgi\u00EB mogelijk",
    ],
  },
  {
    title: "Verzorging",
    content: [
      "Wassen op 30\u00B0C",
      "Niet in de droger",
      "Geen bleekmiddel gebruiken",
      "Niet strijken",
      "Binnenstebuiten wassen voor langere levensduur",
    ],
  },
];

const PAYMENT_METHODS = ["iDEAL", "Visa", "Mastercard", "Klarna", "PayPal"];

function Accordion({ title, content }: { title: string; content: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/[0.06]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group min-h-[48px]"
      >
        <span className="font-sans text-[15px] font-medium text-black group-hover:text-black/70 transition-colors duration-300">
          {title}
        </span>
        {open ? (
          <Minus size={16} className="text-black/60 flex-shrink-0" />
        ) : (
          <Plus size={16} className="text-black/60 flex-shrink-0" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-2.5">
          {content.map((item) => (
            <li
              key={item}
              className="font-sans text-[15px] text-black/75 flex items-start gap-2.5"
            >
              <span className="w-1 h-1 rounded-full bg-taupe mt-2.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ZoomImage({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const [zoomed, setZoomed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    x.set(px);
    y.set(py);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => { setZoomed(false); x.set(50); y.set(50); }}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 cursor-zoom-in overflow-hidden"
    >
      <motion.div
        animate={{ scale: zoomed ? 2 : 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: `${x.get()}% ${y.get()}%` }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 55vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-contain object-center"
        />
      </motion.div>
    </div>
  );
}

interface ProductProps {
  variantIdsBySize?: Record<string, string>;
}

export default function Product({ variantIdsBySize = {} }: ProductProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { openWaitlist } = useWaitlist();

  const mainImageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const { scrollYProgress: imageScrollProgress } = useScroll({
    target: mainImageRef,
    offset: ["start end", "end start"],
  });
  const imageScale = useTransform(imageScrollProgress, [0, 1], [1.0, 1.08]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (ctaRef.current) observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  const handleWaitlist = () => {
    openWaitlist();
  };

  const handleSwipe = (direction: number) => {
    if (direction > 0 && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    } else if (direction < 0 && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  return (
    <>
      <section id="product" className="pt-32 md:pt-40 pb-16 md:pb-24 bg-white">
        <div className="max-w-[1880px] mx-auto px-5 md:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ol className="flex items-center gap-2 font-sans text-[15px] md:text-sm text-black/60 whitespace-nowrap">
              <li><Link href="/" className="hover:text-black transition-colors min-h-[48px] md:min-h-[44px] inline-flex items-center">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/shop" className="hover:text-black transition-colors min-h-[48px] md:min-h-[44px] inline-flex items-center">Shop</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-black" aria-current="page">The Signature</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            {/* ── Image Gallery ── */}
            <FadeIn direction="left" className="md:col-span-7">
              <div className="flex flex-col-reverse md:flex-row gap-3">
                {/* Thumbnails */}
                <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0 snap-x snap-mandatory md:snap-none">
                  {images.map((img, i) => (
                    <button
                      key={img.src}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-[60px] h-[72px] md:w-20 md:h-24 overflow-hidden flex-shrink-0 rounded-md border-2 transition-all duration-300 snap-start min-h-[48px] ${
                        selectedImage === i
                          ? "border-black"
                          : "border-transparent hover:border-black/10"
                      }`}
                    >
                      <Image src={img.src} alt={img.alt} fill sizes="80px" placeholder="blur" blurDataURL={BLUR_DATA_URL} className="object-cover" />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <motion.div
                  ref={mainImageRef}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (Math.abs(info.offset.x) > 50) handleSwipe(info.offset.x > 0 ? -1 : 1);
                  }}
                  className="relative aspect-[3/4] overflow-hidden bg-off-white rounded-lg flex-1 touch-pan-y w-full md:w-auto"
                >
                  <motion.div style={{ scale: imageScale }} className="absolute inset-0 hidden md:block">
                    <ZoomImage src={images[selectedImage].src} alt={images[selectedImage].alt} />
                  </motion.div>

                  <div className="absolute inset-0 md:hidden">
                    <Image src={images[selectedImage].src} alt={images[selectedImage].alt} fill sizes="100vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} className="object-contain object-center" />
                  </div>

                  <button
                    onClick={() => { setLightboxIndex(selectedImage); setLightboxOpen(true); }}
                    aria-label="Vergroot afbeelding"
                    className="absolute inset-0 z-[5] cursor-zoom-in group/zoom"
                  >
                    <span className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <MagnifyingGlassPlus size={14} weight="light" className="text-white/90" />
                      <span className="font-sans text-[12px] text-white/80 hidden md:inline">Vergroten</span>
                    </span>
                  </button>

                  {/* Dots (mobiel) */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex z-10 md:hidden">
                    {images.map((_, i) => (
                      <button key={i} onClick={() => setSelectedImage(i)} aria-label={`Afbeelding ${i + 1}`} className="inline-flex items-center justify-center w-11 h-11">
                        <span className={`h-1 rounded-sm transition-all duration-300 ${selectedImage === i ? "bg-black w-6" : "bg-black/15 w-1"}`} />
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-0 mt-5 px-1 md:px-2">
                {highlights.map((h) => {
                  const Icon = h.icon;
                  return (
                    <div key={h.label} className="flex items-center gap-2 min-h-[48px] md:min-h-0">
                      <Icon size={16} weight="light" className="text-taupe" />
                      <span className="font-sans text-[15px] md:text-sm text-black/60">{h.label}</span>
                    </div>
                  );
                })}
              </div>
            </FadeIn>

            {/* ── Product Info ── */}
            <FadeIn direction="right" delay={0.15} className="md:col-span-5">
              <div className="flex flex-col gap-6 md:sticky md:top-32">
                {/* Title block */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-taupe/15 rounded-full mb-3">
                    <span className="w-2 h-2 rounded-full bg-taupe animate-pulse" />
                    <span className="font-sans text-[13px] font-medium text-taupe-dark">Early Access — Beperkt tot 100 ruiters</span>
                  </div>
                  <h2 className="font-headline font-bold text-4xl sm:text-5xl text-black leading-[1.05] tracking-[-0.01em]">
                    The Signature
                  </h2>
                  <p className="font-sans text-base text-black/75 leading-relaxed mt-3">
                    Comfort of stijl — die keuze neem je niet meer.
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-center flex-wrap gap-3">
                  <span className="font-headline font-bold text-3xl text-black">
                    &euro;64,95
                  </span>
                  <span className="font-sans text-base text-black/40 line-through">
                    &euro;79,95
                  </span>
                  <span className="font-sans text-[13px] font-medium text-taupe bg-taupe/10 px-2 py-0.5 rounded-full">
                    Early access prijs
                  </span>
                </div>

                <div className="bg-off-white rounded-xl p-4">
                  <p className="font-sans text-[15px] md:text-sm font-medium text-black">
                    Schrijf je in voor early access &mdash; wees er als eerste bij
                  </p>
                  <p className="font-sans text-[13px] text-black/60 mt-1">
                    Gratis verzending &middot; 30 dagen retour na ontvangst
                  </p>
                </div>

                {/* Kleur */}
                <div>
                  <p className="font-sans text-[15px] md:text-sm font-medium text-black mb-3">
                    Kleur &mdash; Zwart
                  </p>
                  <div className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-black border-2 border-black ring-2 ring-black/10 ring-offset-2 ring-offset-white" />
                </div>

                {/* Maat */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-sans text-[15px] md:text-sm font-medium text-black">
                      Maat
                    </p>
                    <SizeGuide />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {SIZES.map((size) => {
                      const available = Boolean(variantIdsBySize[size]);
                      return (
                        <button
                          key={size}
                          onClick={() => available && setSelectedSize(size)}
                          disabled={!available}
                          aria-label={available ? `Maat ${size}` : `Maat ${size} niet beschikbaar`}
                          className={`relative w-14 h-14 md:w-12 md:h-12 rounded-lg font-sans text-base md:text-sm font-medium transition-all duration-300 ${
                            !available
                              ? "bg-off-white text-black/30 line-through cursor-not-allowed border border-black/[0.04]"
                              : selectedSize === size
                              ? "bg-black text-white"
                              : "bg-off-white text-black hover:bg-black/[0.06] border border-black/[0.08]"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                  <Link
                    href="/maatquiz"
                    className="inline-block font-sans text-[13px] text-[#B08D57] underline underline-offset-2 decoration-[#B08D57]/40 hover:decoration-[#B08D57] transition-colors duration-300 mt-2"
                  >
                    Twijfel over je maat? &rarr; Doe de maatquiz
                  </Link>
                </div>

                {/* Waitlist CTA */}
                <button
                  ref={ctaRef}
                  onClick={handleWaitlist}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[56px] rounded-full font-sans text-[15px] font-medium transition-all duration-300 active:scale-[0.98] w-full bg-black text-white hover:bg-taupe cursor-pointer"
                >
                  Sign up for early access
                </button>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-4 sm:gap-6 py-2 flex-wrap">
                  {[
                    { icon: Truck, label: "Gratis verzending" },
                    { icon: ArrowCounterClockwise, label: "30 dagen retour" },
                    { icon: ShieldCheck, label: "Veilig betalen" },
                  ].map(({ icon: Icon, label }, i) => (
                    <motion.div
                      key={label}
                      className="flex items-center gap-1.5 min-h-[48px] md:min-h-0"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Icon size={16} weight="light" className="text-black/60" />
                      <span className="font-sans text-[15px] md:text-[13px] text-black/70">{label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Description */}
                <div className="pt-4 border-t border-black/[0.06]">
                  <p className="font-sans text-[15px] text-black/75 leading-relaxed">
                    Full-seat siliconen grip. 4-way stretch. Vochtregulerende stof.
                    Hoge kwaliteit zonder het hoge prijskaartje
                    &mdash; direct van ons, zonder tussenhandelaren.
                  </p>
                </div>

                {/* Perfect voor */}
                <div className="flex flex-wrap gap-2">
                  {["Dressuur", "Springen", "Eventing", "Recreatief"].map((d) => (
                    <span
                      key={d}
                      className="font-sans text-[15px] md:text-[13px] text-black/60 bg-off-white px-4 py-2 md:px-3 md:py-1.5 rounded-full min-h-[48px] md:min-h-0 inline-flex items-center"
                    >
                      {d}
                    </span>
                  ))}
                </div>

                {/* Accordions */}
                <div>
                  {accordionData.map((item) => (
                    <Accordion key={item.title} title={item.title} content={item.content} />
                  ))}
                </div>

                {/* Payment */}
                <div className="flex items-center gap-2 flex-wrap pb-24 md:pb-0">
                  {PAYMENT_METHODS.map((method, i) => (
                    <motion.span
                      key={method}
                      className="border border-black/[0.08] text-black/60 font-sans text-[15px] md:text-[12px] px-3 py-2 md:py-1.5 rounded-md select-none"
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.07,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {method}
                    </motion.span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={images}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sticky bottom bar — mobiel */}
      <motion.div
        initial={false}
        animate={{
          y: showStickyBar ? 0 : 100,
          opacity: showStickyBar ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-0 left-0 right-0 z-[25] bg-white/95 backdrop-blur-xl border-t border-black/[0.06] px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex-shrink-0">
            <p className="font-headline font-bold text-base text-black leading-tight">
              The Signature
            </p>
            <p className="font-sans text-[15px] text-black/60">
              <span>&euro;64,95</span>
              <span className="text-black/30 line-through ml-2">&euro;79,95</span>
            </p>
          </div>
          <button
            onClick={handleWaitlist}
            className="px-6 py-3.5 min-h-[48px] bg-black text-white font-sans text-[15px] font-medium rounded-full hover:bg-taupe transition-all duration-300 active:scale-[0.98] flex-shrink-0"
          >
            Sign up for early access
          </button>
        </div>
      </motion.div>
    </>
  );
}
