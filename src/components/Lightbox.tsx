"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr/CaretLeft";
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight";
import { X } from "@phosphor-icons/react/dist/ssr/X";

interface LightboxProps {
  images: { src: string; alt: string }[];
  initialIndex: number;
  onClose: () => void;
}

const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGPYsaQHAAQAAenV6sPyAAAAAElFTkSuQmCC";

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev));
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  /* Keyboard navigation */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goNext, goPrev]);

  /* Lock body scroll while lightbox is open */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  /* Swipe support for mobile */
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(diff) > 60) {
      if (diff < 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-off-white/80 hover:text-off-white hover:bg-white/10 transition-all duration-300"
        aria-label="Sluiten"
      >
        <X size={20} weight="light" />
      </button>

      {/* Left arrow */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 text-off-white/70 hover:text-off-white hover:bg-white/10 transition-all duration-300"
          aria-label="Vorige afbeelding"
        >
          <CaretLeft size={22} weight="light" />
        </button>
      )}

      {/* Right arrow */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 text-off-white/70 hover:text-off-white hover:bg-white/10 transition-all duration-300"
          aria-label="Volgende afbeelding"
        >
          <CaretRight size={22} weight="light" />
        </button>
      )}

      {/* Main image */}
      <motion.div
        key={currentIndex}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-5xl mx-auto flex-1 min-h-0 px-4 py-16 md:px-12 md:py-20"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-full">
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            sizes="(max-width: 768px) 95vw, 80vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* Image counter */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
        <span className="font-sans text-sm text-off-white/50 tracking-wide">
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnail strip */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center gap-2 px-4 py-4 md:py-5 bg-gradient-to-t from-black/60 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setCurrentIndex(i)}
              className={`relative w-12 h-16 md:w-16 md:h-20 overflow-hidden flex-shrink-0 border transition-all duration-300 ${
                currentIndex === i
                  ? "border-taupe opacity-100"
                  : "border-white/10 opacity-50 hover:opacity-80"
              }`}
              aria-label={`Afbeelding ${i + 1}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="64px"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
