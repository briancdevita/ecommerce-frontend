"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { Product } from "@/types/product";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Container,
  TextField,

  Divider,
  Rating,
  
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/thunks/cartThunks";
import axiosInstance from "@/utils/axiosInstance";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (id) {
      axiosInstance
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

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
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
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "#ffffff",
              borderRadius: "8px",
              p: 3,
              boxShadow: 2,
            }}
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "400px",
                  borderRadius: "8px",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Typography>No image available</Typography>
            )}
          </Box>
        </Grid>

        {/* Details Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            {product.name}
          </Typography>
          <Rating value={4.5} precision={0.5} readOnly sx={{ mb: 1 }} />
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, fontSize: "1rem", lineHeight: 1.5 }}
          >
            {product.description}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="h5"
            sx={{ color: "primary.main", fontWeight: "bold", mb: 2 }}
          >
            ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
            Category: {product.category}
          </Typography>

          {/* Add to Cart Section */}
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <TextField
              type="number"
              label="Quantity"
              variant="outlined"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              inputProps={{ min: 1 }}
              sx={{ width: "100px" }}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ textTransform: "none", fontWeight: "bold" }}
              onClick={() => dispatch(addToCart(product, quantity))}
            >
              Add to Cart
            </Button>
          </Box>

          {/* Additional Info */}
          <Typography variant="body2" color="text.secondary">
            Free shipping on orders over $50. Secure payments guaranteed.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
