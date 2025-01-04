// redux/thunks/cartThunks.ts
import { AppDispatch } from "@/redux/store";
import { addItem,  clearCart, setCart } from "../slices/cartSlice";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { Product } from "@/types/product";

// Fetch el contenido inicial del carrito desde el backend
export const fetchCart = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axiosInstance.get("/cart");
    dispatch(setCart(response.data.items)); // Asume que la respuesta del backend tiene un array `items`
  } catch (error) {

    toast.error("Error loading cart");
  }
};

// Agregar un producto al carrito
export const addToCart =
  (product: Product, quantity: number) => async (dispatch: AppDispatch) => {

    try {
      await axiosInstance.post(
        `/cart/add?productId=${product.id}&quantity=${quantity}`
      );
      dispatch(addItem({ product, quantity }));
      toast.success(`${product.name} Added to cart`);
    } catch (error) {

      toast.error("Sign in to add a product");
    }
  };

// Limpiar el carrito (en el backend y Redux)
export const clearCartThunk = () => async (dispatch: AppDispatch) => {
  try {
    await axiosInstance.delete("/cart/clear");
    dispatch(clearCart());
    toast.success("Cart successfully emptied");
  } catch (error) {
    toast.error("Error emptying cart");
  }
};
