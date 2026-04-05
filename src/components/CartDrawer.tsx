"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react/dist/ssr/X";
import { Bag } from "@phosphor-icons/react/dist/ssr/Bag";
import { Minus } from "@phosphor-icons/react/dist/ssr/Minus";
import { Plus } from "@phosphor-icons/react/dist/ssr/Plus";
import { Trash } from "@phosphor-icons/react/dist/ssr/Trash";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { Truck } from "@phosphor-icons/react/dist/ssr/Truck";
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
  const { cart, isLoading, isDrawerOpen, closeDrawer, goToCheckout, updateItem, removeItem } =
    useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const lines = cart?.lines.edges ?? [];
  const itemCount = cart?.totalQuantity ?? 0;

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isDrawerOpen]);

  useEffect(() => {
    if (isDrawerOpen) {
      const timer = setTimeout(() => closeButtonRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isDrawerOpen]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isDrawerOpen) return;
      if (e.key === "Escape") { closeDrawer(); return; }
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
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
            className="absolute inset-0 bg-black/50"
            onClick={closeDrawer}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Winkelwagen"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease }}
            className="absolute top-0 right-0 bottom-0 w-full sm:max-w-[460px] bg-white shadow-[-8px_0_30px_rgba(0,0,0,0.12)] flex flex-col sm:rounded-l-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-8 py-5 border-b border-black/[0.06]">
              <div className="flex items-center gap-3">
                <Bag size={20} weight="regular" className="text-black" />
                <h2 className="font-headline font-bold text-lg text-black">
                  Winkelwagen
                </h2>
                {itemCount > 0 && (
                  <span className="font-sans text-sm text-black/50">
                    ({itemCount})
                  </span>
                )}
              </div>
              <button
                ref={closeButtonRef}
                onClick={closeDrawer}
                className="inline-flex items-center justify-center w-11 h-11 text-black/40 hover:text-black transition-colors duration-300"
                aria-label="Sluiten"
              >
                <X size={20} weight="light" />
              </button>
            </div>

            {/* Content */}
            {lines.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5, ease }}
                >
                  <Bag size={56} weight="thin" className="text-black/10 mx-auto mb-5" />
                  <h3 className="font-headline font-bold text-2xl text-black mb-2">
                    Je wagen is leeg
                  </h3>
                  <p className="font-sans text-sm text-black/60 leading-relaxed max-w-[28ch] mx-auto mb-8">
                    Ontdek onze rijbroeken en voeg je favorieten toe.
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeDrawer}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white font-sans text-sm font-medium rounded-full hover:bg-taupe transition-all duration-300"
                  >
                    Bekijk collectie
                    <ArrowRight size={14} weight="bold" />
                  </Link>
                </motion.div>
              </div>
            ) : (
              <>
                {/* Cart items */}
                <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6">
                  <ul className="flex flex-col gap-6">
                    {lines.map(({ node }, index) => {
                      const { merchandise, quantity } = node;
                      const productTitle = merchandise.product.title;
                      const variantTitle =
                        merchandise.title !== "Default Title" ? merchandise.title : null;
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
                          transition={{ delay: index * 0.06, duration: 0.4, ease }}
                          className="flex gap-5 pb-6 border-b border-black/[0.06] last:border-0 last:pb-0"
                        >
                          {/* Product image — bigger */}
                          <div className="relative w-[100px] h-[130px] sm:w-[110px] sm:h-[140px] flex-shrink-0 bg-off-white rounded-lg overflow-hidden">
                            {imageUrl ? (
                              <Image
                                src={imageUrl}
                                alt={productTitle}
                                fill
                                sizes="110px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Bag size={28} weight="thin" className="text-black/10" />
                              </div>
                            )}
                          </div>

                          {/* Product info */}
                          <div className="flex-1 flex flex-col justify-between min-w-0 py-1">
                            <div>
                              <h4 className="font-headline font-bold text-[15px] text-black leading-snug">
                                {productTitle}
                              </h4>
                              {variantTitle && (
                                <p className="font-sans text-sm text-black/50 mt-0.5">
                                  Maat {variantTitle}
                                </p>
                              )}
                              <p className="font-headline font-bold text-base text-black mt-2">
                                {price}
                              </p>
                            </div>

                            {/* Quantity + remove */}
                            <div className="flex items-center justify-between mt-3">
                              {/* Quantity controls */}
                              <div className="flex items-center border border-black/10 rounded-full">
                                <button
                                  onClick={() => {
                                    if (quantity > 1) updateItem(node.id, quantity - 1);
                                  }}
                                  disabled={quantity <= 1 || isLoading}
                                  className="inline-flex items-center justify-center w-9 h-9 text-black/50 hover:text-black transition-colors disabled:opacity-30"
                                  aria-label="Minder"
                                >
                                  <Minus size={14} weight="bold" />
                                </button>
                                <span className="font-sans text-sm font-medium text-black w-8 text-center">
                                  {quantity}
                                </span>
                                <button
                                  onClick={() => updateItem(node.id, quantity + 1)}
                                  disabled={isLoading}
                                  className="inline-flex items-center justify-center w-9 h-9 text-black/50 hover:text-black transition-colors disabled:opacity-30"
                                  aria-label="Meer"
                                >
                                  <Plus size={14} weight="bold" />
                                </button>
                              </div>

                              {/* Remove */}
                              <button
                                onClick={() => removeItem(node.id)}
                                disabled={isLoading}
                                className="inline-flex items-center justify-center w-9 h-9 text-black/30 hover:text-red-500 transition-colors disabled:opacity-30"
                                aria-label="Verwijderen"
                              >
                                <Trash size={16} weight="regular" />
                              </button>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>

                {/* Footer */}
                <div className="border-t border-black/[0.06] px-5 sm:px-8 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] space-y-4">
                  {/* Pre-order notice */}
                  <div className="flex items-center gap-3 bg-off-white rounded-lg px-4 py-3">
                    <Truck size={18} weight="regular" className="text-taupe-dark flex-shrink-0" />
                    <p className="font-sans text-[13px] text-black/60 leading-snug">
                      Pre-order &mdash; levertijd 8-10 weken
                    </p>
                  </div>

                  {/* Subtotal */}
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-sm text-black/60">
                      Subtotaal
                    </span>
                    <span className="font-headline font-bold text-lg text-black">
                      {cart?.cost.totalAmount
                        ? formatPrice(
                            cart.cost.totalAmount.amount,
                            cart.cost.totalAmount.currencyCode
                          )
                        : "---"}
                    </span>
                  </div>

                  <p className="font-sans text-[13px] text-black/40">
                    Gratis verzending &middot; Betaal bij checkout
                  </p>

                  {/* Checkout */}
                  <button
                    onClick={goToCheckout}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 min-h-[52px] bg-black text-white font-sans text-sm font-medium rounded-full hover:bg-taupe transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Afrekenen
                        <ArrowRight size={14} weight="bold" />
                      </>
                    )}
                  </button>

                  <button
                    onClick={closeDrawer}
                    className="w-full py-2 min-h-[44px] font-sans text-sm text-black/50 hover:text-black transition-colors duration-300 text-center"
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
