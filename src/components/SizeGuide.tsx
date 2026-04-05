"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react/dist/ssr/X";
import { Ruler } from "@phosphor-icons/react/dist/ssr/Ruler";
import Link from "next/link";

const sizeData = [
  { size: "XS", eu: "32-34", waist: "62-66", hip: "86-90", inseam: "76" },
  { size: "S", eu: "36-38", waist: "67-71", hip: "91-95", inseam: "78" },
  { size: "M", eu: "38-40", waist: "72-76", hip: "96-100", inseam: "80" },
  { size: "L", eu: "40-42", waist: "77-81", hip: "101-105", inseam: "82" },
  { size: "XL", eu: "42-44", waist: "82-86", hip: "106-110", inseam: "82" },
];

const howToMeasure = [
  { label: "Taille", description: "Meet rond het smalste deel van je taille, net boven je navel." },
  { label: "Heup", description: "Meet rond het breedste deel van je heupen." },
  { label: "Binnenbeenlengte", description: "Meet van je kruis tot de onderkant van je enkel." },
];

export default function SizeGuide() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="font-sans text-sm text-black/60 underline underline-offset-2 hover:text-black transition-colors flex items-center gap-1.5 min-h-[44px] py-2"
      >
        <Ruler size={16} weight="light" />
        Maatgids
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-24 sm:py-8 overflow-y-auto"
          >
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setOpen(false)}
            />

            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Maatgids"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white rounded-2xl p-5 sm:p-8 max-w-lg w-full shadow-2xl my-auto"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 p-2.5 text-black/40 hover:text-black transition-colors min-w-[44px] min-h-[44px] inline-flex items-center justify-center"
                aria-label="Sluiten"
              >
                <X size={20} weight="light" />
              </button>

              <p className="font-sans text-[13px] tracking-[0.12em] uppercase text-taupe-dark mb-2">
                Maatgids
              </p>
              <h3 className="font-headline font-bold text-2xl sm:text-3xl text-black mb-6">
                Vind jouw maat
              </h3>

              {/* Size table */}
              <div className="overflow-x-auto -mx-5 px-5 sm:-mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <table className="w-full text-left min-w-[340px]">
                  <thead>
                    <tr className="border-b border-black/[0.08]">
                      <th className="font-sans text-[13px] font-medium text-black/50 uppercase tracking-[0.06em] pb-3 pr-4">Maat</th>
                      <th className="font-sans text-[13px] font-medium text-black/50 uppercase tracking-[0.06em] pb-3 pr-4">EU</th>
                      <th className="font-sans text-[13px] font-medium text-black/50 uppercase tracking-[0.06em] pb-3 pr-4">Taille</th>
                      <th className="font-sans text-[13px] font-medium text-black/50 uppercase tracking-[0.06em] pb-3 pr-4">Heup</th>
                      <th className="font-sans text-[13px] font-medium text-black/50 uppercase tracking-[0.06em] pb-3">Binnenb.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeData.map((row) => (
                      <tr key={row.size} className="border-b border-black/[0.04]">
                        <td className="font-headline font-bold text-lg text-black py-3 pr-4">{row.size}</td>
                        <td className="font-sans text-sm text-black/60 py-3 pr-4">{row.eu}</td>
                        <td className="font-sans text-sm text-black py-3 pr-4">{row.waist} cm</td>
                        <td className="font-sans text-sm text-black py-3 pr-4">{row.hip} cm</td>
                        <td className="font-sans text-sm text-black py-3">{row.inseam} cm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* How to measure */}
              <div className="mt-6 pt-6 border-t border-black/[0.06]">
                <p className="font-sans text-[13px] font-medium text-black/50 uppercase tracking-[0.06em] mb-4">
                  Hoe meet je?
                </p>
                <div className="flex flex-col gap-3">
                  {howToMeasure.map((item) => (
                    <div key={item.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                      <span className="font-sans text-sm font-medium text-black sm:w-28 flex-shrink-0">
                        {item.label}
                      </span>
                      <span className="font-sans text-sm text-black/65 leading-relaxed">
                        {item.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tip */}
              <div className="mt-6 bg-off-white rounded-xl p-4">
                <p className="font-sans text-sm text-black/70 leading-relaxed">
                  <span className="font-medium text-black">Tip:</span> Twijfel je tussen twee maten? Kies de grotere maat. The Signature heeft 4-way stretch en past zich aan je lichaam aan.
                </p>
              </div>

              {/* Maatquiz link */}
              <div className="mt-5 text-center">
                <Link
                  href="/maatquiz"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 font-sans text-sm text-black/60 hover:text-black transition-colors underline underline-offset-2 min-h-[44px] py-2"
                >
                  Niet zeker? Doe de maatquiz &rarr;
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
