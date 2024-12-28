"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CartDrawerContextProps {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartDrawerContext = createContext<CartDrawerContextProps | undefined>(
  undefined
);

export const useCartDrawer = (): CartDrawerContextProps => {
  const context = useContext(CartDrawerContext);
  if (!context) {
    throw new Error("useCartDrawer must be used within a CartDrawerProvider");
  }
  return context;
};

export const CartDrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return (
    <CartDrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer }}>
      {children}
    </CartDrawerContext.Provider>
  );
};
