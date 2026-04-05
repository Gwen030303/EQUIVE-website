"use client";

import { useState, useEffect } from "react";
import FadeIn from "./FadeIn";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => setSubmitted(false), 5000);
    return () => clearTimeout(timer);
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Vul een geldig e-mailadres in.");
      return;
    }
    setEmailError("");
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "newsletter" }),
      });
    } catch {
      // Sla lokaal op als fallback
    }
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="relative bg-off-white py-16 md:py-24 overflow-hidden">
      <div className="glow-blob glow-blob-warm w-[400px] h-[400px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-40" />

      <div className="relative z-10 w-full px-6 md:px-12 text-center">
        <FadeIn>
          <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-taupe mb-3">
            Blijf op de hoogte
          </p>
          <h2 className="font-headline font-bold text-3xl md:text-4xl text-black leading-[1.1]">
            Mis niks
          </h2>
          <p className="font-sub font-normal text-base md:text-lg text-taupe-dark mt-3 max-w-lg mx-auto">
            Schrijf je in en weet als eerste wanneer er nieuwe collecties,
            early bird prijzen en behind-the-scenes updates zijn.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-taupe" />
              <span className="font-sans text-sm text-taupe-dark">24u early access</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-taupe" />
              <span className="font-sans text-sm text-taupe-dark">Persoonlijke kortingen</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-taupe" />
              <span className="font-sans text-sm text-taupe-dark">Behind the scenes</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          {submitted ? (
            <div className="mt-8">
              <p className="font-sub font-normal text-xl text-black">
                Je bent erbij!
              </p>
              <p className="font-sans text-sm text-taupe-dark mt-2">
                We nemen binnenkort contact met je op.
              </p>
            </div>
          ) : (
            <div className="mt-8 max-w-lg mx-auto">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    E-mailadres
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                    placeholder="Je e-mailadres"
                    required
                    className={`w-full px-5 py-4 sm:py-3.5 bg-white border rounded-lg text-black placeholder:text-black/40 font-sans text-base sm:text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-taupe focus-visible:outline-offset-2 transition-all duration-500 ${
                      emailError
                        ? "border-[#C4756E]"
                        : "border-black/[0.08] focus:border-taupe/40"
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 sm:py-3.5 border border-black text-black font-sans text-[13px] tracking-[0.18em] uppercase overflow-hidden rounded-lg transition-all duration-700 hover:scale-[1.02] active:scale-[0.98] flex-shrink-0"
                >
                  <span className="relative z-10 transition-colors duration-700 group-hover:text-off-white group-active:text-off-white">
                    Aanmelden
                  </span>
                  <span className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 group-active:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </button>
              </form>
              {emailError && (
                <p className="font-sans text-sm text-[#C4756E] mt-2">
                  {emailError}
                </p>
              )}
              <p className="font-sans text-[12px] text-taupe-dark/50 mt-5 tracking-wide">
                Geen spam, nooit &middot; Op elk moment uitschrijven
              </p>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
