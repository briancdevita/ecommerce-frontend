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
  TextField,
} from "@mui/material";
import { useCart } from "@/app/context/CartContext";
import { toast } from "react-toastify";


const ProductDetail: React.FC = () => {
  const { id } = useParams(); // Obtén el parámetro dinámico `id` desde la URL
  const { addToCart } = useCart();

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
        .catch((err) => {
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

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success("Product successfully added")
    }
  };

  return (
    <Container>
      <Box display="flex" flexDirection="row" mt={4}>
        <Box flex="1" mr={4}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          ) : (
            <Typography>No image available</Typography>
          )}
        </Box>
        <Box flex="2" display="flex" flexDirection="column">
          <Typography variant="h4" mb={2}>
            {product.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={2}>
            {product.description}
          </Typography>
          <Typography variant="h5" mb={2}>
            Price: ${product.price}
          </Typography>
          <Typography variant="body1" mb={2}>
            Category: {product.category}
          </Typography>
          <TextField
            type="number"
            label="Quantity"
            variant="outlined"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            inputProps={{ min: 1 }}
            sx={{ width: "100px", mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetail;
