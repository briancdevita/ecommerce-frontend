"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { theme } from "@/styles/theme";
import { createEmotionCache } from "@/utils/emotionCache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Box } from "@mui/material";

const clientSideEmotionCache = createEmotionCache();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CacheProvider value={clientSideEmotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh", // Ocupa todo el alto de la pantalla
              }}
              
            >

              <Navbar  />

              <Box
                sx={{
                  flex: 10, // Ocupa el espacio restante entre el Navbar y el Footer
                  py: 2,
                }}
              >
                {children}
              </Box>
              <Footer />
            </Box>
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
