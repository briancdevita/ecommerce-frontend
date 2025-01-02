"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { Tv, Shirt, Home, Dumbbell } from "lucide-react";

const FeaturedCategories = () => {
  const categories = [
    { name: "Electrónica", icon: <Tv size={24} color="#1e293b" /> },
    { name: "Indumentaria", icon: <Shirt size={24} color="#1e293b" /> },
    { name: "Hogar", icon: <Home size={24} color="#1e293b" /> },
    { name: "Deportes", icon: <Dumbbell size={24} color="#1e293b" /> },
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
