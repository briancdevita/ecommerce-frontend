import React from "react";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4">¡Bienvenido a E-Commerce App!</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Aquí podrás encontrar productos y realizar tus compras.
      </Typography>
    </Box>
  );
}
