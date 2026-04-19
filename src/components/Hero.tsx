"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGPYsaQHAAQAAenV6sPyAAAAAElFTkSuQmCC";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Full-width hero image — cinematic aspect ratio */}
      <div className="relative aspect-[1/1] md:aspect-[2.2/1] w-full">
        <Image
          src="/hero-banner.webp"
          alt="Ruiter met EQUIVE rijbroek in het zadel"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover"
        />

        {/* Gradient overlay — bottom half for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content overlay — positioned at bottom-left */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-[1880px] mx-auto px-5 md:px-8 pb-6 md:pb-16 lg:pb-20">
            {/* Premium subtitle — hidden on mobile */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="hidden md:block font-sans text-[12px] tracking-[0.2em] uppercase text-white/60 mb-4"
            >
              Premium rijbroeken &mdash; Amsterdam
            </motion.p>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.5, ease }}
                className="font-headline font-bold text-[28px] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] sm:leading-[1.05] tracking-[-0.01em] text-white"
              >
                Rijbroeken voor ruiters die{" "}
                <br className="hidden sm:block" />
                weigeren te kiezen.
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease }}
              className="flex flex-wrap items-center gap-3 mt-5 md:mt-8"
            >
              <Link
                href="/product/the-signature"
                className="inline-flex items-center justify-center px-8 py-3.5 min-h-[48px] bg-white text-black font-sans text-[13px] font-medium tracking-[0.06em] uppercase rounded-full transition-all duration-300 hover:bg-taupe hover:text-white"
              >
                Shop The Signature
              </Link>
              {/* Vind jouw maat — hidden on mobile */}
              <Link
                href="/maatquiz"
                className="hidden md:inline-flex items-center justify-center px-8 py-3.5 min-h-[48px] border border-white/30 text-white font-sans text-[13px] font-medium tracking-[0.06em] uppercase rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/50"
              >
                Vind jouw maat
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3, ease }}
              className="font-sans text-[12px] text-white/50 mt-4 md:mt-5 tracking-wide"
            >
              Vanaf &euro;79,99 &middot; Gratis verzending &middot; 30 dagen retour
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
