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

    toast.error("Error al cargar el carrito");
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
      toast.success(`${product.name} agregado al carrito`);
    } catch (error) {

      toast.error("Hubo un problema al agregar el producto al carrito.");
    }
  };

// Limpiar el carrito (en el backend y Redux)
export const clearCartThunk = () => async (dispatch: AppDispatch) => {
  try {
    await axiosInstance.delete("/cart/clear");
    dispatch(clearCart());
    toast.success("Carrito vaciado con éxito");
  } catch (error) {
    toast.error("Error al vaciar el carrito");
  }
};