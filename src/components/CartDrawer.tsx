"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react/dist/ssr/X";
import { Bag } from "@phosphor-icons/react/dist/ssr/Bag";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

function formatPrice(amount: string, currency = "EUR"): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency,
  }).format(parseFloat(amount));
}

export default function CartDrawer() {
  const { cart, isLoading, isDrawerOpen, closeDrawer, goToCheckout } =
    useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const lines = cart?.lines.edges ?? [];
  const itemCount = cart?.totalQuantity ?? 0;

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Focus the close button when drawer opens
  useEffect(() => {
    if (isDrawerOpen) {
      // Small delay to let the animation start before focusing
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isDrawerOpen]);

  // Focus trapping
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isDrawerOpen) return;

      if (e.key === "Escape") {
        closeDrawer();
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [isDrawerOpen, closeDrawer]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[60]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeDrawer}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Winkelwagen"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease }}
            className="absolute top-0 right-0 bottom-0 w-full sm:max-w-[440px] bg-off-white shadow-[-8px_0_30px_rgba(0,0,0,0.12)] flex flex-col sm:rounded-l-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-8 py-5 border-b border-black/[0.06]">
              <div className="flex items-center gap-3">
                <Bag size={20} weight="regular" className="text-black" />
                <h2 className="font-headline text-lg sm:text-xl uppercase tracking-wide text-black">
                  Winkelwagen
                </h2>
                {itemCount > 0 && (
                  <span className="font-sans text-xs text-black/50 tracking-wide">
                    ({itemCount})
                  </span>
                )}
              </div>
              <button
                ref={closeButtonRef}
                onClick={closeDrawer}
                className="inline-flex items-center justify-center w-11 h-11 text-black/40 hover:text-black transition-colors duration-300"
                aria-label="Winkelwagen sluiten"
              >
                <X size={20} weight="light" />
              </button>
            </div>

            {/* Content */}
            {lines.length === 0 ? (
              /* Empty state */
              <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5, ease }}
                >
                  <Bag
                    size={56}
                    weight="thin"
                    className="text-taupe/40 mx-auto mb-5"
                  />
                  <h3 className="font-headline text-2xl uppercase text-black mb-2">
                    Je wagen is leeg
                  </h3>
                  <p className="font-sans text-[14px] sm:text-sm text-black/60 leading-relaxed max-w-[28ch] mx-auto mb-8">
                    Ontdek onze rijbroeken en voeg je favorieten toe.
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeDrawer}
                    className="inline-flex items-center gap-2 px-8 py-4 min-h-[48px] bg-black text-off-white font-sans text-[14px] sm:text-[13px] tracking-[0.18em] uppercase rounded-full hover:bg-warm-dark transition-all duration-500 active:scale-[0.98]"
                  >
                    Bekijk collectie
                    <ArrowRight size={14} weight="bold" />
                  </Link>
                </motion.div>
              </div>
            ) : (
              <>
                {/* Cart items */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-5">
                  <ul className="flex flex-col gap-5">
                    {lines.map(({ node }, index) => {
                      const { merchandise, quantity } = node;
                      const productTitle = merchandise.product.title;
                      const variantTitle =
                        merchandise.title !== "Default Title"
                          ? merchandise.title
                          : null;
                      const price = formatPrice(
                        merchandise.price.amount,
                        merchandise.price.currencyCode
                      );
                      const imageUrl = merchandise.image?.url;

                      return (
                        <motion.li
                          key={node.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: index * 0.06,
                            duration: 0.4,
                            ease,
                          }}
                          className="flex gap-4 pb-5 border-b border-black/[0.04] last:border-0"
                        >
                          {/* Product image */}
                          <div className="relative w-[88px] h-[108px] sm:w-24 sm:h-28 flex-shrink-0 bg-off-white overflow-hidden">
                            {imageUrl ? (
                              <Image
                                src={imageUrl}
                                alt={productTitle}
                                fill
                                sizes="96px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Bag
                                  size={24}
                                  weight="thin"
                                  className="text-taupe/30"
                                />
                              </div>
                            )}
                          </div>

                          {/* Product info */}
                          <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
                            <div>
                              <h4 className="font-sans text-[15px] sm:text-sm font-medium text-black leading-snug truncate">
                                {productTitle}
                              </h4>
                              {variantTitle && (
                                <p className="font-sans text-[13px] sm:text-xs text-black/50 mt-0.5">
                                  {variantTitle}
                                </p>
                              )}
                            </div>
                            <div className="flex items-end justify-between mt-2">
                              <span className="font-sans text-[13px] sm:text-xs text-black/40">
                                Aantal: {quantity}
                              </span>
                              <span className="font-sans text-[15px] sm:text-sm font-medium text-black">
                                {price}
                              </span>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>

                {/* Footer with subtotal and checkout */}
                <div className="border-t border-black/[0.06] px-4 sm:px-8 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] space-y-4">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[15px] sm:text-sm tracking-wide uppercase text-black/60">
                      Subtotaal
                    </span>
                    <span className="font-sans text-lg sm:text-base font-medium text-black">
                      {cart?.cost.totalAmount
                        ? formatPrice(
                            cart.cost.totalAmount.amount,
                            cart.cost.totalAmount.currencyCode
                          )
                        : "---"}
                    </span>
                  </div>

                  <p className="font-sans text-[13px] sm:text-xs text-black/40 leading-relaxed">
                    Verzendkosten worden berekend bij het afrekenen.
                  </p>

                  {/* Checkout button */}
                  <button
                    onClick={goToCheckout}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 min-h-[52px] bg-black text-off-white font-sans text-[14px] sm:text-[13px] tracking-[0.18em] uppercase rounded-full hover:bg-warm-dark transition-all duration-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="inline-block w-4 h-4 border-2 border-off-white/30 border-t-off-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Naar checkout
                        <ArrowRight size={14} weight="bold" />
                      </>
                    )}
                  </button>

                  {/* Continue shopping */}
                  <button
                    onClick={closeDrawer}
                    className="w-full py-3 min-h-[44px] font-sans text-[13px] sm:text-xs tracking-wide text-black/50 hover:text-black transition-colors duration-300 text-center"
                  >
                    Verder winkelen
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
