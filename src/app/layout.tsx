"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { theme } from "@/styles/theme";

import {  ThemeProvider } from "@emotion/react";

import { CartDrawerProvider } from "./context/CartDrawerContext";
import CartDrawer from "@/components/CartDrawer";

import { Provider } from "react-redux";

import ToastConfig from "@/utils/ToasConfig";
import { Box, CssBaseline } from "@mui/material";

import AppInitializer from "@/components/AppInitializer";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

            <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            <AppInitializer />
          <ThemeProvider theme={theme}>
 
              <CssBaseline />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100vh", // Ocupa todo el alto de la pantalla
                }}
              >
                <CartDrawerProvider>

                
                <Navbar />

                <Box
                  sx={{
                    flex: 10, // Ocupa el espacio restante entre el Navbar y el Footer
                    py: 2,
                  }}
                >

                  {children}
                  <CartDrawer/>
                </Box>
                <Footer />
                <ToastConfig />
                </CartDrawerProvider>
              </Box>

          </ThemeProvider>
          </PersistGate>
            </Provider>

      
      </body>
    </html>
  );
}
