"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ProductCarousel from "../../components/ProductCarousel";
import { Product } from "@/types/product";
import SearchBar from "@/components/SearchBar";
import { Box, Typography } from "@mui/material";
import FeaturedCategories from "@/components/FeaturedCategories";
import EcommerceBenefits from "@/components/EcinnerceBenefits";
import PromotionalBanner from "@/components/PromotionalBanner";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/products") // Ajusta la URL según tu backend
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleSearch = (searchTerm: string) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryClick = (category: string) => {
    const filtered = products.filter((product) =>
      product.category.toLowerCase() === category.toLowerCase()
    );
    setFilteredProducts(filtered);
  };

  return (
  
  
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", p: 3 }}>
      
      {/* Barra de búsqueda */}
      <SearchBar onSearch={handleSearch} />

      {/* Sección de todos los productos */}
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mt: 4, mb: 2, textAlign: "center", color: "#1e293b" }}
      >
        All Products
      </Typography>
      <FeaturedCategories onCategoryClick={handleCategoryClick} />
      <ProductCarousel products={filteredProducts} />
      <EcommerceBenefits />
    </Box>

  );
};

export default ProductsPage;