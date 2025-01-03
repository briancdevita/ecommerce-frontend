import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { applyCoupon } from "../thunks/applyCupon";

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



const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {


    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
        
      );

      
      
    },
    clearCart: (state) => {
      state.items = [];
      state.couponCode = null;
      state.discountPercentage = 0;
      state.status = 'idle';
      state.error = null;
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    clearCoupon: (state) => {
      state.couponCode = null;
      state.discountPercentage = 0;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.couponCode = action.payload.code;
        state.discountPercentage = action.payload.discountPercentage;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'No se pudo aplicar el cupón';
      });
  },
});

export const { addItem, removeItem, clearCart, setCart, clearCoupon } = cartSlice.actions;
export default cartSlice.reducer;
