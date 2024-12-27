
"use client";
import { Box, Typography, Button } from "@mui/material";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onClick?: () => void; // `onClick` opcional
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Box
      onClick={onClick} // Agregamos `onClick` si está definido
      sx={{
        maxWidth: 250,
        minWidth: 250,
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3,
        position: "relative",
        bgcolor: "#fff",
        m: 1,
        cursor: onClick ? "pointer" : "default", // Cambia el cursor si es clickeable
      }}
    >
      {/* Imagen del producto */}
      <Box
        component="img"
        src={product.image || "https://via.placeholder.com/200"}
        alt={product.name}
        sx={{
          width: "100%",
          height: 150,
          objectFit: "contain",
          bgcolor: "#f5f5f5",
        }}
      />

      <Box sx={{ p: 2 }}>
        {/* Nombre del Producto */}
        <Typography variant="h6" component="h2" noWrap>
          {product.name}
        </Typography>

        {/* Descripción */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "0.9rem" }}
          noWrap
        >
          {product.description}
        </Typography>

        {/* Precio */}
        <Typography
          variant="h6"
          color="primary"
          sx={{ mt: 1, fontWeight: "bold" }}
        >
          ${product.price}
        </Typography>

        {/* Categoría */}
        <Typography variant="caption" color="text.secondary">
          {product.category}
        </Typography>

        {/* Botón */}
        <Button
          variant="contained"
          size="small"
          color="success"
          sx={{ mt: 2, width: "100%" }}
        >
          Agregar al carrito
        </Button>
      </Box>
    </Box>
  );
}
