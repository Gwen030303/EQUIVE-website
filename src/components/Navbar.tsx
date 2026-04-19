"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr/EnvelopeSimple";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { X } from "@phosphor-icons/react/dist/ssr/X";
import { useWaitlist } from "@/lib/waitlist-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchModal from "@/components/SearchModal";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Ons Verhaal", href: "/ons-verhaal" },
  { label: "Kwaliteit", href: "/kwaliteit" },
  { label: "Grip Guide", href: "/grip-guide" },
  { label: "Duurzaamheid", href: "/duurzaamheid" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { openWaitlist } = useWaitlist();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isTransparent = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isTransparent
            ? "bg-gradient-to-b from-black/50 to-transparent"
            : "bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)]"
        }`}
      >
        {/* ── Row 1: Logo center, icons flanking ── */}
        <div className="max-w-[1880px] mx-auto px-5 md:px-8">
          <div className="flex items-center justify-between h-14 md:h-[60px]">
            {/* Left: hamburger (mobile) / search (desktop) */}
            <div className="flex items-center gap-2 w-[160px]">
              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className={`md:hidden inline-flex items-center justify-center w-12 h-12 -ml-1 ${
                  isTransparent ? "text-white" : "text-black"
                }`}
                aria-label="Open menu"
              >
                <div className="flex flex-col gap-[5px]">
                  <span className={`block h-[2px] w-[24px] rounded-full ${isTransparent ? "bg-white" : "bg-black"}`} />
                  <span className={`block h-[2px] w-[17px] rounded-full ${isTransparent ? "bg-white" : "bg-black"}`} />
                  <span className={`block h-[2px] w-[11px] rounded-full ${isTransparent ? "bg-white" : "bg-black"}`} />
                </div>
              </button>

              {/* Desktop search */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`hidden md:inline-flex items-center justify-center w-11 h-11 transition-colors duration-300 ${
                  isTransparent
                    ? "text-white hover:text-white/70"
                    : "text-black hover:text-black/60"
                }`}
                aria-label="Zoeken"
              >
                <MagnifyingGlass size={22} weight="regular" />
              </button>
            </div>

            {/* Center: Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 z-10"
              aria-label="EQUIVE - Ga naar homepagina"
            >
              <img
                src="/logo.webp"
                alt="EQUIVE"
                className={`h-16 md:h-20 lg:h-24 w-auto transition-all duration-500 ${
                  isTransparent
                    ? "invert brightness-200 contrast-125"
                    : "brightness-0"
                }`}
              />
            </Link>

            {/* Right: waitlist CTA */}
            <div className="flex items-center gap-3 w-[160px] justify-end">
              <button
                onClick={openWaitlist}
                className={`hidden md:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isTransparent
                    ? "bg-white text-black hover:bg-white/85"
                    : "bg-black text-white hover:bg-taupe"
                }`}
              >
                <EnvelopeSimple size={16} weight="bold" />
                Early Access
              </button>
              <button
                onClick={openWaitlist}
                className={`md:hidden relative inline-flex items-center justify-center w-11 h-11 transition-colors duration-300 ${
                  isTransparent
                    ? "text-white hover:text-white/70"
                    : "text-black hover:text-black/60"
                }`}
                aria-label="Aanmelden voor early access"
              >
                <EnvelopeSimple size={24} weight="regular" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Row 2: Navigation (desktop only) ── */}
        <nav
          aria-label="Hoofdnavigatie"
          className={`hidden md:block border-t transition-colors duration-500 ${
            isTransparent ? "border-white/15" : "border-black/[0.06]"
          }`}
        >
          <div className="max-w-[1880px] mx-auto px-5 md:px-8">
            <div className="flex items-center justify-center gap-14 h-10">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`relative font-sans text-[15px] tracking-[0.04em] uppercase py-1 group transition-colors duration-300 ${
                      isTransparent
                        ? isActive
                          ? "text-white font-medium"
                          : "text-white/90 hover:text-white font-normal"
                        : isActive
                        ? "text-black font-medium"
                        : "text-black/70 hover:text-black font-normal"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ${
                        isTransparent ? "bg-white" : "bg-taupe"
                      } ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </header>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="fixed inset-0 z-50 bg-white md:hidden"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 h-16">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                aria-label="EQUIVE"
              >
                <img
                  src="/logo.webp"
                  alt="EQUIVE"
                  className="h-14 w-auto brightness-0"
                />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center w-12 h-12 text-black hover:text-black/60 transition-colors"
                aria-label="Sluit menu"
              >
                <X size={24} weight="light" />
              </button>
            </div>

            {/* Navigation links */}
            <nav
              aria-label="Mobiel menu"
              className="flex flex-col px-6 mt-6"
            >
              {navLinks.map((link, i) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.45, ease }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between py-5 border-b border-black/[0.06] group ${
                        isActive ? "text-black" : "text-black/75"
                      }`}
                    >
                      <span className="font-headline text-[32px] sm:text-[36px] font-medium tracking-[-0.01em]">
                        {link.label}
                      </span>
                      <span className={`font-sans text-xs tracking-[0.1em] uppercase transition-opacity ${
                        isActive ? "text-taupe opacity-100" : "text-black/25 opacity-0 group-hover:opacity-100"
                      }`}>
                        {isActive ? "Hier" : "→"}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4, ease }}
              className="absolute bottom-0 left-0 right-0 px-6 pb-[max(2rem,env(safe-area-inset-bottom))]"
            >
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openWaitlist();
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 min-h-[52px] bg-black text-white font-sans text-sm font-medium rounded-full"
                >
                  <EnvelopeSimple size={16} weight="bold" />
                  Meld je aan voor early access
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-black/35">
                <span>Premium Rijkleding</span>
                <span>Amsterdam, NL</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
