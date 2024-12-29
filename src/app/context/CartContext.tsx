"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { Product } from "@/types/product";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

interface CartContextProps {
  state: CartState;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const initialState: CartState = { items: [] };

function cartReducer(state: CartState, action: any): CartState {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.product.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);


  const addToCart = async (product: Product, quantity: number) => {
    try {
     
  
      const token = localStorage.getItem("token");
  
      if (!token) {
        throw new Error("Token no encontrado. Inicia sesión.");
      }
  
      await axiosInstance.post(
        `/cart/add?productId=${product.id}&quantity=${quantity}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Asegúrate de incluir el token
          },
        }
      );
  
      dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });


     
      
  
      // toast.success(`${product.name} agregado al carrito`);
    } catch (error: any) {
      console.error("Error agregando al carrito:", error.response?.data || error.message);
      toast.error("Hubo un problema al agregar el producto al carrito.");
    }
  };
  

  const clearCart = async () => {
    try {
      // await axiosInstance.delete("/cart/clear"); // Si tienes un endpoint para esto
      dispatch({ type: "CLEAR_CART" }); // Acción que vacía el carrito en el frontend
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };
  
  


  const removeFromCart = (productId: number) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });

  const updateQuantity = (productId: number, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });


  return (
    <CartContext.Provider
      value={{ state, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
