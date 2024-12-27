import { createSlice } from "@reduxjs/toolkit";


interface CartItem {
    id: number;
    name: string;
    price:number;
    quiantity: number;
}

interface CartState {
    items: CartItem[];
}


const initialState: CartState = {
    items: []
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find((item)=> item.id === action.payload.id);
            if (existingItem) {
                existingItem.quiantity += action.payload.quiantity;
            } else {
                state.items.push(action.payload);
            }
        },

        removeItem: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload.id);

        }
    }
});


export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;