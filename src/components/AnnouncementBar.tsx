"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "@phosphor-icons/react/dist/ssr/X";
import { useAnnouncement } from "@/lib/announcement-context";

const messages = [
  "Gratis verzending boven \u20ac50",
  "30 dagen retourgarantie",
  "Veilig betalen met iDEAL, Klarna & meer",
  "Ontworpen in Amsterdam",
  "Klimaatneutraal verzonden",
];

const INTERVAL_MS = 3500;

export default function AnnouncementBar() {
  const { dismissed, dismiss } = useAnnouncement();
  const [index, setIndex] = useState(0);

  const advance = useCallback(() => {
    setIndex((prev) => (prev + 1) % messages.length);
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const id = setInterval(advance, INTERVAL_MS);
    return () => clearInterval(id);
  }, [dismissed, advance]);

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 36, opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-50 bg-black overflow-hidden"
    >
      <div className="relative h-[36px] flex items-center justify-center px-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[11px] tracking-[0.12em] uppercase text-white/70 text-center whitespace-nowrap"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>

        <button
          onClick={dismiss}
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white/70 transition-colors duration-200"
          aria-label="Sluit bericht"
        >
          <X size={14} weight="bold" />
        </button>
      </div>
    </motion.div>
  );
}
