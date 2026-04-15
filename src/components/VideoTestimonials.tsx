"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import FadeIn from "./FadeIn";

const videoCards = [
  {
    name: "Fleur",
    quote: "De grip is onwerkelijk goed",
    thumbnail: "/product-signature.webp",
    duration: "0:32",
  },
  {
    name: "Isabelle",
    quote: "Pasvorm zit als gegoten",
    thumbnail: "/detail-1.webp",
    duration: "0:45",
  },
  {
    name: "Margot",
    quote: "Dit voelt als thuiskomen",
    thumbnail: "/story.webp",
    duration: "0:28",
  },
];

export default function VideoTestimonials() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-16 md:py-24 bg-black">
        <div className="w-full px-6 md:px-12">
          <FadeIn>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-taupe mb-3">
              Echte Ruiters
            </p>
            <h2 className="font-headline text-3xl sm:text-5xl md:text-7xl uppercase leading-[0.85] text-off-white mb-10">
              In Actie
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {videoCards.map((card, i) => (
              <FadeIn key={card.name} delay={i * 0.15}>
                <div
                  className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer"
                  onClick={() => setModalOpen(true)}
                >
                  {/* Thumbnail image */}
                  <Image
                    src={card.thumbnail}
                    alt={`Video review van ${card.name} over de EQUIVE rijbroek`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Dark gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-colors duration-300 group-hover:from-black/70 group-hover:via-black/10" />

                  {/* Duration badge top-right */}
                  <div className="absolute top-3 right-3">
                    <span className="font-sans text-[10px] bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5 text-white/70">
                      {card.duration}
                    </span>
                  </div>

                  {/* Centered play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      {/* CSS triangle play icon */}
                      <div
                        className="w-0 h-0 ml-1"
                        style={{
                          borderTop: "8px solid transparent",
                          borderBottom: "8px solid transparent",
                          borderLeft: "14px solid rgba(255, 255, 255, 0.9)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Bottom text over gradient */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-sans text-sm font-medium text-off-white">
                      {card.name}
                    </p>
                    <p className="font-sub font-normal text-sm text-white/60 mt-1">
                      &ldquo;{card.quote}&rdquo;
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Placeholder modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex items-center justify-center px-4"
          >
            {/* Backdrop — click to close */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-warm-dark rounded-2xl p-8 sm:p-10 max-w-sm w-full text-center shadow-2xl border border-taupe/10"
            >
              {/* Close button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Sluiten"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <line x1="1" y1="1" x2="13" y2="13" />
                  <line x1="13" y1="1" x2="1" y2="13" />
                </svg>
              </button>

              {/* Play icon */}
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-5">
                <div
                  className="w-0 h-0 ml-1"
                  style={{
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderLeft: "16px solid rgba(255, 255, 255, 0.6)",
                  }}
                />
              </div>

              <p className="font-headline text-2xl uppercase text-off-white leading-tight mb-2">
                Binnenkort
              </p>
              <p className="font-sans text-sm text-taupe leading-relaxed">
                Video komt binnenkort beschikbaar
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
