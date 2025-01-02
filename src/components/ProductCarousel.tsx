"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const router = useRouter();

  const handleProductClick = (id: number) => {
    router.push(`/products/${id}`);
  };

  const settings = {
    dots: true, // Mostrar puntos de navegación
    infinite: false, // No repetir al final
    speed: 500, // Velocidad de transición
    slidesToShow: 4, // Mostrar 4 productos por fila
    slidesToScroll: 1, // Deslizar de uno en uno
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", my: 4 }}>
      <Slider {...settings}>
        {products.map((product) => (
          <Box key={product.id} sx={{ px: 1 }} onClick={() => handleProductClick(product.id)}>
            <ProductCard product={product} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ProductCarousel;