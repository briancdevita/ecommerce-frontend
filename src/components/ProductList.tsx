
"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { Box } from "@mui/material";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";


interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const router = useRouter();


  const handleProductClick = (id: number) => {
    router.push(`/products/${id}`);
  };
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
        onClick={() => handleProductClick(product.id)} 
        />
      ))}
    </Box>
  );
};

export default ProductList;
