import FadeIn from "./FadeIn";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr/InstagramLogo";
import { TiktokLogo } from "@phosphor-icons/react/dist/ssr/TiktokLogo";
import { PinterestLogo } from "@phosphor-icons/react/dist/ssr/PinterestLogo";
import Image from "next/image";
import Link from "next/link";

const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
  "https://instagram.com/equiveequestrian";
const TIKTOK_URL =
  process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@equive.shop";
const PINTEREST_URL =
  process.env.NEXT_PUBLIC_PINTEREST_URL ||
  "https://www.pinterest.com/equive/";

const footerLinks = {
  Shop: [
    { label: "The Signature", href: "/product/the-signature" },
    { label: "Maatgids", href: "/maatquiz" },
    { label: "Nieuwe Collecties", href: "/shop" },
  ],
  Over: [
    { label: "Ons Verhaal", href: "/ons-verhaal" },
    { label: "Kwaliteit", href: "/kwaliteit" },
    { label: "Grip Guide", href: "/grip-guide" },
    { label: "Duurzaamheid", href: "/duurzaamheid" },
  ],
  Help: [
    { label: "Verzending & Retour", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
};

const socialLinks = [
  { href: INSTAGRAM_URL, label: "Instagram", icon: InstagramLogo },
  { href: TIKTOK_URL, label: "TikTok", icon: TiktokLogo },
  { href: PINTEREST_URL, label: "Pinterest", icon: PinterestLogo },
];

export default function Footer() {
  return (
    <footer className="bg-black pt-16 md:pt-20 pb-10">
      <div className="max-w-[1880px] mx-auto px-5 md:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-8 pb-14">
          {/* Brand column */}
          <FadeIn delay={0.1} className="col-span-1 sm:col-span-2 md:col-span-4">
            <div className="relative h-[90px] sm:h-[100px] md:h-[110px] w-[120px] sm:w-[130px] md:w-[140px]">
              <Image
                src="/logo.webp"
                alt="EQUIVE"
                fill
                sizes="140px"
                className="object-contain object-left invert"
              />
            </div>
            <p className="font-sans text-sm text-white/50 leading-relaxed mt-5 max-w-[30ch]">
              Premium rijbroeken, ontworpen in Amsterdam. Van ruiter, voor ruiter.
            </p>

            {/* Social links */}
            <div className="flex gap-1 -ml-2.5 mt-6">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={label}
                  className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 text-white/50 hover:text-taupe transition-colors duration-300"
                >
                  <Icon size={22} weight="regular" />
                </a>
              ))}
            </div>
          </FadeIn>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links], i) => (
            <FadeIn key={title} delay={0.2 + i * 0.1} className="md:col-span-2">
              <h4 className="font-sans text-[12px] tracking-[0.12em] uppercase text-white/30 mb-4">
                {title}
              </h4>
              <ul className="flex flex-col gap-1 sm:gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-white/60 hover:text-white transition-colors duration-300 inline-flex items-center min-h-[44px] sm:min-h-0"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06]" />

        {/* Sub-footer */}
        <FadeIn delay={0.5}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 pt-8">
            <p className="font-sans text-[13px] text-white/30">
              &copy; 2024&ndash;2026 EQUIVE. Alle rechten voorbehouden.
            </p>
            <div className="flex items-center gap-5">
              <Link
                href="/privacybeleid"
                className="font-sans text-[13px] text-white/30 hover:text-white/60 transition-colors duration-300 inline-flex items-center min-h-[44px] sm:min-h-0"
              >
                Privacybeleid
              </Link>
              <Link
                href="/algemene-voorwaarden"
                className="font-sans text-[13px] text-white/30 hover:text-white/60 transition-colors duration-300 inline-flex items-center min-h-[44px] sm:min-h-0"
              >
                Algemene Voorwaarden
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* Payment methods */}
        <FadeIn delay={0.6}>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 px-2 sm:px-0">
            {["iDEAL", "Visa", "Mastercard", "Klarna", "PayPal"].map(
              (method) => (
                <span
                  key={method}
                  className="text-[12px] tracking-[0.06em] uppercase font-sans text-white/25 border border-white/[0.06] px-3 py-1.5 rounded-md"
                >
                  {method}
                </span>
              )
            )}
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
