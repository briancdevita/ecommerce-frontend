"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Product } from "@/types/product";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Container,
  Grid,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const ProductDetail: React.FC = () => {
  const { id } = useParams(); // Obtén el parámetro dinámico `id` desde la URL

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/products/${id}`) // Ajusta esta URL a tu backend
        .then((response) => {
          setProduct(response.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Error fetching product details");
          setLoading(false);
        });
    }
  }, [id]);

  const handleQuantityChange = (event: any) => {
    setQuantity(event.target.value);
  };

  if (loading) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container>
        <Typography variant="h5" color="error" textAlign="center">
          {error || "Product not found"}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {/* Columna Izquierda: Imágenes del Producto */}
        <Grid item xs={12} md={6}>
          <Box>
            {/* Imagen Principal */}
            <Box
              sx={{
                width: "100%",
                height: "400px",
                bgcolor: "#f9f9f9",
                borderRadius: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={product.image || "https://via.placeholder.com/400"}
                alt={product.name}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>

            {/* Miniaturas de Imágenes (Placeholder por ahora) */}
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "start",
                gap: 2,
              }}
            >
              {Array(4)
                .fill(product.image || "https://via.placeholder.com/100")
                .map((img, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 2,
                      bgcolor: "#f5f5f5",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      border: "1px solid #ddd",
                    }}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index}`}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                ))}
            </Box>
          </Box>
        </Grid>

        {/* Columna Derecha: Información del Producto */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {product.name}
          </Typography>

          <Typography
            variant="h5"
            color="primary"
            fontWeight="bold"
            gutterBottom
          >
            ${product.price}
          </Typography>

          <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
            {product.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
            Categoría: <strong>{product.category}</strong>
          </Typography>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="quantity-label">Cantidad</InputLabel>
            <Select
              labelId="quantity-label"
              value={quantity}
              onChange={handleQuantityChange}
            >
              {[...Array(10).keys()].map((num) => (
                <MenuItem key={num + 1} value={num + 1}>
                  {num + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="success"
            size="large"
            sx={{
              width: "100%",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              mb: 2,
            }}
          >
            Agregar al carrito
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{
              width: "100%",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Comprar ahora
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
