import { createAsyncThunk } from "@reduxjs/toolkit";

import { Product } from "@/types/product";
import axiosInstance from "@/utils/axiosInstance";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  discountPercentage: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  items: [],
  couponCode: null,
  discountPercentage: 0,
  status: 'idle',
  error: null,
};

// Thunk para aplicar un cupón
export const applyCoupon = createAsyncThunk<
  { code: string; discountPercentage: number },
  string,
  { rejectValue: string }
>(
  'cart/applyCoupon',
  async (code, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/coupon/validate', { code });
      // Asumiendo que la respuesta contiene el porcentaje de descuento
      return { code, discountPercentage: response.data.discountPercentage };
    } catch (err: any) {
      // Manejar diferentes tipos de errores
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data.message || 'Error al aplicar el cupón');
      }
      return rejectWithValue('Error al aplicar el cupón');
    }
  }
);
