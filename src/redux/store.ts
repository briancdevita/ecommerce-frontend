import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Usamos localStorage
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";

// Configuración de persistencia
const persistConfig = {
  key: "root",
  storage,
};

// Combinamos los reducers
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

// Reducer persistido
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuración del store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Necesario para redux-persist
    }),
});

// Configuramos persistor
const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
