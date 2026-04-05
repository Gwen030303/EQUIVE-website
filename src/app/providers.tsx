"use client";

import { CartProvider } from "@/lib/cart-context";
import { WaitlistProvider } from "@/lib/waitlist-context";
import { AnnouncementProvider } from "@/lib/announcement-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AnnouncementProvider>
      <CartProvider>
        <WaitlistProvider>{children}</WaitlistProvider>
      </CartProvider>
    </AnnouncementProvider>
  );
}
