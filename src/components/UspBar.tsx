"use client";

import FadeIn from "./FadeIn";
import { Truck } from "@phosphor-icons/react/dist/ssr/Truck";
import { ArrowCounterClockwise } from "@phosphor-icons/react/dist/ssr/ArrowCounterClockwise";
import { Horse } from "@phosphor-icons/react/dist/ssr/Horse";
import { MapPin } from "@phosphor-icons/react/dist/ssr/MapPin";

const usps = [
  { label: "Gratis Verzending NL", Icon: Truck },
  { label: "30 Dagen Retour", Icon: ArrowCounterClockwise },
  { label: "Full-Seat Grip", Icon: Horse },
  { label: "Ontworpen in Amsterdam", Icon: MapPin },
];

export default function UspBar() {
  return (
    <div className="bg-off-white py-4 md:py-5">
      <div className="w-full px-6 md:px-12">
        <div className="flex items-center justify-start md:justify-center gap-4 sm:gap-8 md:gap-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {usps.map((usp, i) => (
            <FadeIn key={usp.label} delay={i * 0.08} direction="up">
              <div className="flex items-center shrink-0">
                {/* Separator — visible on md+ between items */}
                {i > 0 && (
                  <div className="hidden md:block w-px h-5 bg-sand mx-8 lg:mx-12 shrink-0" />
                )}

                <div className="flex items-center gap-3">
                  <usp.Icon
                    size={24}
                    weight="light"
                    className="text-taupe shrink-0"
                  />
                  <span className="font-sans text-sm text-black/70 tracking-wide whitespace-nowrap">
                    {usp.label}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
