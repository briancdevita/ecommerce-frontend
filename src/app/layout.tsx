"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { theme } from "@/styles/theme";

import {  ThemeProvider } from "@emotion/react";

import { CartProvider } from "./context/CartContext";
import { CartDrawerProvider } from "./context/CartDrawerContext";
import CartDrawer from "@/components/CartDrawer";

import { Provider } from "react-redux";

import ToastConfig from "@/utils/ToasConfig";
import { Box, CssBaseline } from "@mui/material";
import store from "@/redux/store";
import AppInitializer from "@/components/AppInitializer";




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

            <Provider store={store}>
            <AppInitializer />
          <ThemeProvider theme={theme}>
            <CartProvider>
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
            </CartProvider>
          </ThemeProvider>
    
            </Provider>

      
      </body>
    </html>
  );
}
