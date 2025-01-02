"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { Gift } from "lucide-react";

const PromotionalBanner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#facc15", // Fondo amarillo vibrante
        py: 2, // Padding vertical
        px: 3, // Padding horizontal
        borderRadius: "0 0 8px 8px", // Bordes redondeados en la parte inferior
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Sombra sutil
        position: "relative",
        zIndex: 1000, // Asegura que esté encima
      }}
    >
      <Gift size={24} color="#1e293b" style={{ marginRight: "8px" }} />
      <Typography
        variant="body1"
        sx={{
          fontWeight: "bold",
          color: "#1e293b", // Texto oscuro
          fontSize: "1rem", // Tamaño más grande
          textAlign: "center",
        }}
      >
        🎉 10% de descuento en tu primera compra 🎉
      </Typography>
    </Box>
  );
};

export default PromotionalBanner;