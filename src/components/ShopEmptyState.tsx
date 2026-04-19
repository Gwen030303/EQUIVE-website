"use client";

import { useWaitlist } from "@/lib/waitlist-context";

export default function ShopEmptyState() {
  const { openWaitlist } = useWaitlist();

  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <span className="font-sans text-[12px] tracking-[0.3em] uppercase text-taupe">
        Binnenkort
      </span>
      <div className="w-12 h-px bg-taupe/25 mx-auto mt-4 mb-8" />
      <h2 className="font-headline font-bold text-3xl sm:text-4xl text-black leading-[1.05] tracking-[-0.01em]">
        De collectie wordt voorbereid
      </h2>
      <p className="font-sans text-[15px] text-black/60 leading-relaxed mt-4">
        Onze eerste stukken zijn bijna klaar. Schrijf je in voor early access
        en hoor als eerste wanneer ze beschikbaar zijn.
      </p>
      <button
        type="button"
        onClick={openWaitlist}
        className="mt-8 inline-flex items-center justify-center bg-black text-off-white rounded-full px-8 py-3.5 font-sans text-xs tracking-[0.15em] uppercase hover:bg-warm-dark transition-colors min-h-[48px]"
      >
        Meld je aan voor early access
      </button>
    </div>
  );
}
