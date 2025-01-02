"use client";
import { Box, Typography, Button } from "@mui/material";
import { Product } from "@/types/product";


interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {

  return (
    <Box

      sx={{
        maxWidth: 250,
        minWidth: 250,
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 2,
        position: "relative",
        bgcolor: "#ffffff",
        m: 1,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      {/* Contenedor para manejar la imagen */}
      <Box
        sx={{
          width: "100%",
          height: 150,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#ffffff",
          borderRadius: "4px 4px 0 0", // Bordes redondeados superiores
          overflow: "hidden", // Asegura que nada sobresalga
        }}
      >
        <Box
          component="img"
          src={product.image || "https://via.placeholder.com/200"}
          alt={product.name}
          sx={{
            width: "auto",
            height: "100%", // Mantiene el alto al máximo
            maxHeight: "100%",
            maxWidth: "100%", // Evita que se deforme
          }}
        />
      </Box>

      <Box sx={{ p: 2 }}>
        {/* Nombre del Producto */}
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
            color: "#1e293b",
            lineHeight: 1.2,
            mb: 1,
          }}
        >
          {product.name}
        </Typography>

        {/* Descripción */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: "0.85rem",
            lineHeight: 1.4,
            mb: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2, // Muestra hasta 2 líneas
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description}
        </Typography>

        {/* Precio */}
        <Typography
          variant="h6"
          color="primary"
          sx={{
            mt: 1,
            fontWeight: "bold",
            fontSize: "1.1rem",
          }}
        >
          ${product.price.toFixed(2)}
        </Typography>

        {/* Categoría */}
        <Typography
          variant="caption"
          sx={{
            display: "inline-block",
            mt: 1,
            borderRadius: 1,
            bgcolor: "#e2e8f0",
            px: 1.5,
            py: 0.5,
            fontSize: "0.75rem",
            color: "#475569",
          }}
        >
          {product.category}
        </Typography>

        {/* Botón */}
        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{
            mt: 2,
            width: "100%",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Ver detalles
        </Button>
      </Box>
    </Box>
  );
}
