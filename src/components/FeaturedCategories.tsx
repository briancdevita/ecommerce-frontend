"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { Tv, Shirt, Home, Dumbbell } from "lucide-react";

interface FeaturedCategoriesProps {
  onCategoryClick: (category: string) => void;
}

const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ onCategoryClick }) => {
  const categories = [
    { name: "Computing", icon: <Tv size={24} color="#1e293b" /> },
    { name: "Accessories", icon: <Shirt size={24} color="#1e293b" /> },
    { name: "Tools", icon: <Home size={24} color="#1e293b" /> },
    { name: "Sports", icon: <Dumbbell size={24} color="#1e293b" /> },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mx: "auto",
        maxWidth: "80%",
        my: 4,
      }}
    >
      {categories.map((category, index) => (
        <Box
          key={index}
          sx={{
            textAlign: "center",
            cursor: "pointer",
            transition: "transform 0.2s",
            "&:hover": { transform: "scale(1.05)" },
          }}
          onClick={() => onCategoryClick(category.name)}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              bgcolor: "#e2e8f0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              mb: 1,
            }}
          >
            {category.icon}
          </Box>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {category.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default FeaturedCategories;