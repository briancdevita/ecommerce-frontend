import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import cartReducer from "../redux/slices/cartSlice";


const store  = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    },
});



export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;