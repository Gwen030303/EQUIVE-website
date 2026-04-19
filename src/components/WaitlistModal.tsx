"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react/dist/ssr/X";
import { Horse } from "@phosphor-icons/react/dist/ssr/Horse";
import { useWaitlist } from "@/lib/waitlist-context";
import { SIZES } from "@/lib/constants";

const sources = [
  "Instagram",
  "Via een vriendin",
  "TikTok",
  "Google",
  "Anders",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistModal() {
  const { isOpen, openWaitlist, closeWaitlist } = useWaitlist();
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [source, setSource] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const getFocusable = () => dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const timer = setTimeout(() => {
      const focusable = getFocusable();
      focusable[0]?.focus();
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeWaitlist(); return; }
      if (e.key !== "Tab") return;
      const focusable = getFocusable();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => { clearTimeout(timer); document.removeEventListener("keydown", handleKeyDown); };
  }, [isOpen, closeWaitlist, submitted]);

  // Auto-dismiss success message after 4 seconds
  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => {
      setSubmitted(false);
      closeWaitlist();
    }, 4000);
    return () => clearTimeout(timer);
  }, [submitted, closeWaitlist]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !size || loading) return;
    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Vul een geldig e-mailadres in.");
      return;
    }
    setEmailError("");
    setSubmitError("");
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, size, source, type: "waitlist" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Er ging iets mis. Probeer het opnieuw.");
        return;
      }

      localStorage.setItem("equive-waitlist-joined", "true");
      setSubmitted(true);
    } catch {
      setSubmitError("Geen verbinding. Controleer je internet en probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    localStorage.setItem("equive-waitlist-dismissed", "true");
    closeWaitlist();
  };

  const inputClass =
    "w-full px-4 sm:px-5 py-3.5 bg-off-white border border-black/10 rounded-lg text-black placeholder:text-black/40 font-sans text-base sm:text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-taupe focus-visible:outline-offset-2 focus:border-taupe/30 transition-colors duration-500 min-h-[48px]";
  const labelClass =
    "font-sans text-sm text-black/60 tracking-wide uppercase";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center px-0 sm:px-4 py-0 sm:py-8 overflow-y-auto"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Waitlist aanmelding"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-off-white px-5 py-6 sm:p-8 md:p-10 w-full max-h-[95dvh] sm:max-h-none sm:max-w-lg shadow-2xl overflow-y-auto rounded-t-2xl sm:rounded-2xl"
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-2.5 text-taupe-dark/50 hover:text-black transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Sluiten"
            >
              <X size={20} weight="light" />
            </button>

            {submitted ? (
              <div className="text-center py-6">
                <Horse
                  size={48}
                  weight="thin"
                  className="text-taupe mx-auto mb-4"
                />
                <h3 className="font-headline text-3xl sm:text-4xl uppercase text-black mb-2">
                  Je staat op de lijst
                </h3>
                <p className="font-sans text-sm text-black/60 leading-relaxed max-w-[38ch] mx-auto">
                  We mailen je zodra The Signature beschikbaar is.
                  Jouw maat wordt voor je gereserveerd.
                </p>
                <p className="font-sub font-normal text-taupe mt-4">
                  Tot snel in het zadel.
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-5">
                  <Horse
                    size={36}
                    weight="thin"
                    className="text-taupe mx-auto mb-3"
                  />
                  <h3 className="font-headline text-2xl sm:text-3xl uppercase text-black leading-[0.9] mb-2">
                    Sign up for
                    <br />
                    early access
                  </h3>
                  <p className="font-sans text-sm text-black/60 leading-relaxed max-w-[36ch] mx-auto">
                    <span className="font-medium text-black">&euro;64,95</span>
                    <span className="text-black/40 line-through ml-1.5">&euro;79,99</span>
                    <br />
                    Beperkt tot de eerste 100 klanten.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Email + Naam */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="wl-email" className={labelClass}>
                        E-mailadres *
                      </label>
                      <input
                        id="wl-email"
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setEmailError(""); setSubmitError(""); }}
                        placeholder="naam@voorbeeld.nl"
                        required
                        className={`${inputClass} mt-1.5 ${emailError ? "!border-[#C4756E]" : ""}`}
                      />
                      {emailError && (
                        <p className="font-sans text-sm text-[#C4756E] mt-1 ml-1">
                          {emailError}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="wl-name" className={labelClass}>
                        Voornaam
                      </label>
                      <input
                        id="wl-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Je voornaam"
                        className={`${inputClass} mt-1.5`}
                      />
                    </div>
                  </div>

                  {/* Maat */}
                  <div>
                    <p className={labelClass}>Maat *</p>
                    <div className="flex gap-1.5 sm:gap-2 mt-1.5">
                      {SIZES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSize(s)}
                          className={`flex-1 py-3 sm:py-3 font-sans text-sm font-medium rounded-lg transition-all duration-300 min-h-[44px] ${
                            size === s
                              ? "bg-black text-off-white"
                              : "bg-sand text-black hover:bg-taupe/15"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hoe gevonden (optioneel) */}
                  <div>
                    <p className={`${labelClass} flex items-center gap-1`}>
                      Hoe heb je EQUIVE gevonden?
                      <span className="text-black/40 normal-case tracking-normal">(optioneel)</span>
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      {sources.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSource(source === s ? "" : s)}
                          className={`px-4 py-2.5 sm:py-1.5 font-sans text-sm rounded-full transition-all duration-300 min-h-[40px] ${
                            source === s
                              ? "bg-taupe text-black"
                              : "bg-sand text-black/60 hover:bg-taupe/15"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit error */}
                  {submitError && (
                    <p className="font-sans text-sm text-[#C4756E] text-center">
                      {submitError}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!email || !size || loading}
                    className={`w-full px-8 py-4 font-sans text-sm sm:text-[13px] tracking-[0.18em] uppercase rounded-full transition-all duration-500 mt-1 min-h-[52px] ${
                      email && size && !loading
                        ? "bg-black text-off-white hover:bg-warm-dark cursor-pointer active:scale-[0.98]"
                        : "bg-sand text-black/60 cursor-not-allowed"
                    }`}
                  >
                    {loading
                      ? "Bezig met aanmelden..."
                      : size
                        ? `Schrijf me in — Maat ${size}`
                        : "Selecteer een maat"}
                  </button>
                </form>

                <p className="font-sans text-sm text-black/35 text-center mt-3">
                  Geen spam. Alleen een seintje als het zover is.
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
