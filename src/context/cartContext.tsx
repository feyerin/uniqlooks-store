import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartItem } from "../types/types";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string, selectedSize?: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Tambah item ke cart
  const addToCart = (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id && i.selectedSize === item.selectedSize
      );

      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.selectedSize === item.selectedSize
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }

      return [...prev, { ...item, quantity }];
    });
  };

  // Hapus item dari cart
  const removeFromCart = (id: string, selectedSize?: string) => {
    setCartItems((prev) =>
      prev.filter(
        (i) => i.id !== id || (selectedSize !== undefined && i.selectedSize !== selectedSize)
      )
    );
  };

  // Kosongin cart
  const clearCart = () => setCartItems([]);

  // Total item di cart
  const getTotalItems = () => cartItems.reduce((sum, i) => sum + i.quantity, 0);

  // Total harga
  const getTotalPrice = () =>
    cartItems.reduce((sum, i) => sum + i.quantity * i.price, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalItems, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook helper
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};