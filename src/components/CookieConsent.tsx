"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "equive-cookies";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    } else {
      // Restore consent state for scripts that check on load
      (window as any).__cookieConsent = stored;
      if (stored === "accepted") {
        window.dispatchEvent(new Event("cookie-consent-granted"));
      }
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    (window as any).__cookieConsent = "accepted";
    window.dispatchEvent(new Event("cookie-consent-granted"));
    setVisible(false);
  }

  function handleReject() {
    localStorage.setItem(STORAGE_KEY, "rejected");
    (window as any).__cookieConsent = "rejected";
    window.dispatchEvent(new Event("cookie-consent-rejected"));
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[60] bg-black/95 backdrop-blur-xl"
        >
          <div className="w-full px-5 md:px-12 py-5 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <p className="font-sans text-[15px] sm:text-sm text-off-white/70">
                Wij gebruiken cookies om je ervaring te verbeteren.
              </p>
              <a
                href="/privacybeleid"
                className="font-sans text-[15px] sm:text-sm text-off-white/60 hover:text-off-white/80 transition-colors underline underline-offset-2 min-h-[44px] flex items-center"
              >
                Privacybeleid
              </a>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={handleReject}
                className="flex-1 sm:flex-none px-5 py-3 sm:py-2 rounded-full border border-white/10 font-sans text-[15px] sm:text-sm text-off-white/50 hover:text-off-white hover:border-white/25 transition-colors cursor-pointer min-h-[48px] sm:min-h-0"
              >
                Weigeren
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 sm:flex-none px-5 py-3 sm:py-2 rounded-full bg-taupe font-sans text-[15px] sm:text-sm text-black hover:bg-taupe-light transition-colors cursor-pointer min-h-[48px] sm:min-h-0"
              >
                Accepteren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
