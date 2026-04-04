import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  model: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
  hasExtraBand: boolean;
}

interface CartContextType {
  cartItems: CartItem[];
  cartTotal: number;
  isCartOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const addToCart = (newItem: CartItem) => {
    setCartItems(prev => {
      // Check if exact same config already exists
      const existing = prev.find(item => 
        item.id === newItem.id && 
        item.model === newItem.model && 
        item.color === newItem.color && 
        item.hasExtraBand === newItem.hasExtraBand
      );
      
      if (existing) {
        return prev.map(item => 
          item === existing ? { ...item, quantity: item.quantity + newItem.quantity } : item
        );
      }
      return [...prev, newItem];
    });
    // Open drawer automatically
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      cartTotal,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleCart
    }}>
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
