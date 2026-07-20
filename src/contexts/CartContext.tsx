'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { WasteListing } from '@/lib/types';

interface CartItem extends WasteListing {
  cartId: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (listing: WasteListing) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalXP: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Compute total XP to be earned (50 XP per item)
  const totalXP = items.length * 50;

  const addToCart = (listing: WasteListing) => {
    setItems((prev) => [...prev, { ...listing, cartId: Math.random().toString(36).substring(7) }]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, isCartOpen, setIsCartOpen, totalXP }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
