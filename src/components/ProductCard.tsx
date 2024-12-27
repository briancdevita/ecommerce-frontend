import { Box, Typography, Button, Chip, CircularProgress } from "@mui/material";

export default function ProductCard({
  product,
}: {
  product: {
    id: number;
    name: string;
    price: string;
    description: string;
    category: string;
    image?: string;
    discount?: number; // Campo opcional para descuento
    claimedPercentage?: number; // Simula el % reclamado
  };
}) {
  return (
    <Box
      sx={{
        maxWidth: 250,
        minWidth: 250,
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3,
        position: "relative",
        bgcolor: "#fff",
        m: 1,
      }}
    >
      {/* Descuento */}
      {product.discount && (
        <Chip
          label={`-${product.discount}%`}
          color="error"
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 1,
            fontWeight: "bold",
          }}
        />
      )}

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

        {/* Precio y Categoría */}
        <Typography
          variant="h6"
          color="primary"
          sx={{ mt: 1, fontWeight: "bold" }}
        >
          ${product.price}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {product.category}
        </Typography>

        {/* Indicador de porcentaje reclamado */}
        {product.claimedPercentage && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="error">
              {product.claimedPercentage}% reclamado
            </Typography>
            <CircularProgress
              variant="determinate"
              value={product.claimedPercentage}
              size={40}
              thickness={5}
              sx={{ ml: 1, color: "error.main" }}
            />
          </Box>
        )}

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
