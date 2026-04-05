"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { X } from "@phosphor-icons/react/dist/ssr/X";
import Link from "next/link";

const searchItems = [
  { title: "The Signature", href: "/product/the-signature", category: "Product" },
  { title: "Shop", href: "/shop", category: "Pagina" },
  { title: "Ons Verhaal", href: "/ons-verhaal", category: "Pagina" },
  { title: "Kwaliteit & Technologie", href: "/kwaliteit", category: "Pagina" },
  { title: "Grip Guide", href: "/grip-guide", category: "Pagina" },
  { title: "Duurzaamheid", href: "/duurzaamheid", category: "Pagina" },
  { title: "FAQ", href: "/faq", category: "Pagina" },
  { title: "Contact", href: "/contact", category: "Pagina" },
  { title: "Maatquiz", href: "/maatquiz", category: "Tool" },
  { title: "Full-seat siliconen grip", href: "/kwaliteit", category: "Feature" },
  { title: "4-way stretch", href: "/kwaliteit", category: "Feature" },
  { title: "Verzending & Retour", href: "/faq", category: "Info" },
  { title: "Maatgids", href: "/maatquiz", category: "Tool" },
];

const ease = [0.16, 1, 0.3, 1] as const;

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? searchItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  /* Lock body scroll */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  /* Auto-focus input when opened */
  useEffect(() => {
    if (isOpen) {
      // Small timeout to let the animation start before focusing
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease }}
          className="fixed inset-0 z-50 bg-white overflow-y-auto"
        >
          {/* Top bar */}
          <div className="max-w-[1880px] mx-auto px-5 md:px-8">
            <div className="flex items-center justify-between h-16 md:h-[76px]">
              <span className="font-sans text-sm tracking-[0.08em] uppercase text-black/40">
                Zoeken
              </span>
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center w-11 h-11 text-black hover:text-black/60 transition-colors"
                aria-label="Sluit zoeken"
              >
                <X size={24} weight="light" />
              </button>
            </div>
          </div>

          {/* Search input */}
          <div className="max-w-[1880px] mx-auto px-5 md:px-8 mt-4 md:mt-8">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-black/30 pointer-events-none">
                <MagnifyingGlass size={22} weight="regular" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Waar ben je naar op zoek?"
                className="w-full h-14 pl-14 pr-5 bg-black/[0.04] rounded-full font-sans text-base text-black placeholder:text-black/35 outline-none focus:ring-2 focus:ring-black/10 transition-shadow"
              />
            </div>
          </div>

          {/* Results */}
          <div className="max-w-[1880px] mx-auto px-5 md:px-8 mt-8 pb-20">
            <div className="max-w-2xl mx-auto">
              {query.trim() && filtered.length === 0 && (
                <p className="font-sans text-sm text-black/40 text-center py-8">
                  Geen resultaten voor &ldquo;{query}&rdquo;
                </p>
              )}

              {filtered.length > 0 && (
                <ul className="flex flex-col">
                  {filtered.map((item, i) => (
                    <motion.li
                      key={item.title + item.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: i * 0.03,
                        duration: 0.3,
                        ease,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center justify-between py-4 border-b border-black/[0.06] group"
                      >
                        <span className="font-sans text-lg text-black group-hover:text-black/70 transition-colors">
                          {item.title}
                        </span>
                        <span className="font-sans text-xs tracking-[0.08em] uppercase text-black/30">
                          {item.category}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              )}

              {!query.trim() && (
                <div className="text-center py-12">
                  <p className="font-sans text-sm text-black/30">
                    Begin met typen om te zoeken
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
