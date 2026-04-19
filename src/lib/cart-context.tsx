"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import {
  createCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  getCart,
  type ShopifyCart,
} from "./shopify";

interface CartContextType {
  cart: ShopifyCart | null;
  isLoading: boolean;
  isDrawerOpen: boolean;
  addItem: (variantId: string) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  goToCheckout: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextType>({
  cart: null,
  isLoading: false,
  isDrawerOpen: false,
  addItem: async () => {},
  updateItem: async () => {},
  removeItem: async () => {},
  goToCheckout: () => {},
  openDrawer: () => {},
  closeDrawer: () => {},
});

const STORAGE_KEY = "equive-cart-id";

function persistCartId(cart: ShopifyCart | null) {
  if (typeof window === "undefined") return;
  if (cart?.id) {
    window.localStorage.setItem(STORAGE_KEY, cart.id);
  } else {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const storedId = window.localStorage.getItem(STORAGE_KEY);
    if (!storedId) return;
    (async () => {
      const restored = await getCart(storedId);
      if (restored && restored.totalQuantity > 0) {
        setCart(restored);
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    })();
  }, []);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const addItem = useCallback(
    async (variantId: string) => {
      setIsLoading(true);
      try {
        let next: ShopifyCart;
        if (cart) {
          next = await addToCart(cart.id, variantId);
        } else {
          next = await createCart(variantId);
        }
        setCart(next);
        persistCartId(next);
        setIsDrawerOpen(true);
      } catch (err) {
        console.error("Fout bij toevoegen aan winkelwagen:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return;
      setIsLoading(true);
      try {
        const updated = await updateCartItem(cart.id, lineId, quantity);
        setCart(updated);
        persistCartId(updated);
      } catch (err) {
        console.error("Fout bij bijwerken:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart) return;
      setIsLoading(true);
      try {
        const updated = await removeFromCart(cart.id, lineId);
        setCart(updated);
        persistCartId(updated);
      } catch (err) {
        console.error("Fout bij verwijderen:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const goToCheckout = useCallback(() => {
    if (!cart?.checkoutUrl) return;
    // Shopify genereert de URL met het custom domein (shop.equive.shop) dat
    // mogelijk nog niet volledig is geconfigureerd. Rewrite naar de
    // .myshopify.com-domeinnaam die altijd werkt.
    const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    let url = cart.checkoutUrl;
    if (SHOPIFY_DOMAIN) {
      try {
        const parsed = new URL(url);
        parsed.host = SHOPIFY_DOMAIN;
        url = parsed.toString();
      } catch {
        // fallback: use original
      }
    }
    window.location.href = url;
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        isDrawerOpen,
        addItem,
        updateItem,
        removeItem,
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
