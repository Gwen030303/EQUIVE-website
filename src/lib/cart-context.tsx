"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { createCart, addToCart, type ShopifyCart } from "./shopify";

interface CartContextType {
  cart: ShopifyCart | null;
  isLoading: boolean;
  isDrawerOpen: boolean;
  addItem: (variantId: string) => Promise<void>;
  goToCheckout: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextType>({
  cart: null,
  isLoading: false,
  isDrawerOpen: false,
  addItem: async () => {},
  goToCheckout: () => {},
  openDrawer: () => {},
  closeDrawer: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const addItem = useCallback(
    async (variantId: string) => {
      setIsLoading(true);
      try {
        if (cart) {
          const updated = await addToCart(cart.id, variantId);
          setCart(updated);
        } else {
          const newCart = await createCart(variantId);
          setCart(newCart);
        }
        setIsDrawerOpen(true);
      } catch (err) {
        console.error("Fout bij toevoegen aan winkelwagen:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const goToCheckout = useCallback(() => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        isDrawerOpen,
        addItem,
        goToCheckout,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
