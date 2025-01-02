"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ProductCarousel from "../../components/ProductCarousel";
import { Product } from "@/types/product";
import SearchBar from "@/components/SearchBar";
import { Box, Typography } from "@mui/material";
import EcommerceBenefits from "@/components/EcinnerceBenefits";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/products") // Ajusta la URL según tu backend
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", p: 3 }}>
      {/* Barra de búsqueda */}
      <SearchBar />



      {/* Sección de todos los productos */}
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mt: 4, mb: 2, textAlign: "center", color: "#1e293b" }}
      >
        Todos los productos
      </Typography>
      <ProductCarousel products={products} />
      <EcommerceBenefits />
    </Box>
  );
};

export default ProductsPage;
