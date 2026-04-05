"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react/dist/ssr/X";

const SESSION_KEY = "equive_exit_intent_shown";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_TIME_ON_PAGE = 10_000; // 10 seconds
const MOBILE_INACTIVITY_MS = 45_000; // 45 seconds

export default function ExitIntent() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const pageLoadTime = useRef(Date.now());
  const hasTriggered = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const canShow = useCallback(() => {
    if (hasTriggered.current) return false;
    if (typeof window === "undefined") return false;
    if (sessionStorage.getItem(SESSION_KEY)) return false;
    if (Date.now() - pageLoadTime.current < MIN_TIME_ON_PAGE) return false;
    return true;
  }, []);

  const trigger = useCallback(() => {
    if (!canShow()) return;
    hasTriggered.current = true;
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(true);
  }, [canShow]);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  // Desktop: detect mouse leaving viewport at the top
  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY < 0) trigger();
    };
    document.addEventListener("mouseout", handleMouseOut);
    return () => document.removeEventListener("mouseout", handleMouseOut);
  }, [trigger]);

  // Mobile: inactivity timer (45s no scroll/touch) + fast scroll-up detection
  useEffect(() => {
    let inactivityTimer: ReturnType<typeof setTimeout> | null = null;
    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();

    const resetInactivityTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        trigger();
      }, MOBILE_INACTIVITY_MS);
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const now = Date.now();
      const dt = now - lastScrollTime;
      const dy = lastScrollY - currentY; // positive = scrolling up

      // Fast scroll-up: more than 300px up within 300ms
      if (dy > 300 && dt < 300 && canShow()) {
        trigger();
      }

      lastScrollY = currentY;
      lastScrollTime = now;
      resetInactivityTimer();
    };

    const handleTouch = () => {
      resetInactivityTimer();
    };

    resetInactivityTimer();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });

    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, [trigger, canShow]);

  // Focus trap + Escape key
  useEffect(() => {
    if (!visible) return;
    const dialog = dialogRef.current;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { close(); return; }
      if (e.key !== "Tab" || !dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };

    const timer = setTimeout(() => {
      dialog?.querySelector<HTMLElement>("input, button")?.focus();
    }, 100);

    document.addEventListener("keydown", handleKeyDown);
    return () => { clearTimeout(timer); document.removeEventListener("keydown", handleKeyDown); };
  }, [visible, close]);

  // Auto-close after submit success
  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => close(), 3000);
    return () => clearTimeout(timer);
  }, [submitted, close]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !EMAIL_REGEX.test(email)) return;
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "newsletter" }),
      });
    } catch {
      // Fallback silently
    }
    setSubmitted(true);
    setEmail("");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={close}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Korting voor nieuwe ruiters"
            className="relative max-w-md w-full bg-warm-dark rounded-2xl p-8 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 text-off-white/50 hover:text-off-white transition-colors"
              aria-label="Sluiten"
            >
              <X size={20} weight="bold" />
            </button>

            {submitted ? (
              <div className="py-8">
                <p className="font-sub font-normal text-2xl text-off-white">
                  Je bent erbij!
                </p>
                <p className="font-sans text-sm text-off-white/60 mt-2">
                  Check je inbox voor je persoonlijke code.
                </p>
              </div>
            ) : (
              <>
                <p className="font-sans text-xs tracking-[0.3em] uppercase text-taupe mb-2">
                  Nog even dit
                </p>

                <h2 className="font-headline text-4xl sm:text-5xl uppercase text-off-white leading-none">
                  10% korting
                </h2>

                <p className="font-sub font-normal text-lg text-taupe mt-2">
                  Op je eerste bestelling
                </p>

                <p className="font-sans text-sm text-off-white/60 mt-4 leading-relaxed">
                  Meld je aan en ontvang als eerste toegang tot nieuwe collecties
                  en een persoonlijke kortingscode.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                  <label htmlFor="exit-intent-email" className="sr-only">
                    E-mailadres
                  </label>
                  <input
                    id="exit-intent-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Je e-mailadres"
                    required
                    className="w-full px-5 py-3.5 bg-transparent border border-taupe/30 rounded-full text-off-white placeholder:text-off-white/40 font-sans text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-taupe focus-visible:outline-offset-2 focus:border-taupe transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full px-8 py-3.5 bg-taupe text-black font-sans text-xs tracking-[0.15em] uppercase rounded-full hover:bg-taupe-light transition-all duration-300 active:scale-[0.98]"
                  >
                    Ja, ik wil 10% korting
                  </button>
                </form>

                <p className="font-sans text-xs text-off-white/50 mt-4">
                  Geen spam. Je kunt je altijd uitschrijven.
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
