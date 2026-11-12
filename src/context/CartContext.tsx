import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { LabItem, getPatientPrice } from '../data/labTests';
import { LAB_PRICING } from '../config';

const LOCAL_STORAGE_CART_KEY = 'mrmedics_lab_cart_items';

interface CartContextType {
  cart: LabItem[];
  addToCart: (item: LabItem) => void;
  removeFromCart: (id: string) => void;
  toggleCartItem: (item: LabItem) => void;
  isInCart: (id: string) => boolean;
  clearCart: () => void;
  subtotal: number;
  homeFee: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<LabItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Could not read cart from localStorage:', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage:', e);
    }
  }, [cart]);

  const isInCart = (id: string) => cart.some(item => item.id === id);

  const addToCart = (item: LabItem) => {
    if (!isInCart(item.id)) {
      setCart(prev => [...prev, item]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const toggleCartItem = (item: LabItem) => {
    if (isInCart(item.id)) {
      removeFromCart(item.id);
    } else {
      addToCart(item);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + getPatientPrice(item), 0);
  }, [cart]);

  const homeFee = LAB_PRICING.homeCollectionFee || 0;
  const totalPrice = subtotal + homeFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        toggleCartItem,
        isInCart,
        clearCart,
        subtotal,
        homeFee,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        isBookingOpen,
        setIsBookingOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
