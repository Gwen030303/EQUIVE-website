"use client";

import { useCart } from "@/lib/cart-context";
import { motion, AnimatePresence } from "framer-motion";

const FREE_SHIPPING_THRESHOLD = 50;

export default function ShippingProgress() {
  const { cart } = useCart();

  const itemCount = cart?.totalQuantity ?? 0;
  const total = cart ? parseFloat(cart.cost.totalAmount.amount) : 0;
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - total, 0);
  const percentage = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const hasFreeShipping = remaining === 0;

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-30 max-w-sm w-full mx-4 bg-white/95 backdrop-blur-xl rounded-full px-5 py-2.5 border border-taupe/10 shadow-lg"
        >
          <p className="font-sans text-xs text-taupe-dark mb-1 text-center">
            {hasFreeShipping
              ? "Je hebt gratis verzending! 🎉"
              : `Nog €${remaining.toFixed(2).replace(".", ",")} voor gratis verzending`}
          </p>
          <div className="h-1 w-full rounded-full bg-taupe/20 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-taupe"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
