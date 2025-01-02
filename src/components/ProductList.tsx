
"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { Box } from "@mui/material";
import { Product } from "@/types/product";



interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {




  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "16px",
        padding: "16px",
      }}
    >
      {products.map((product) => (
        <ProductCard 
        key={product.id} 
        product={product}
        />
      ))}
    </Box>
  );
};

export default ProductList;
