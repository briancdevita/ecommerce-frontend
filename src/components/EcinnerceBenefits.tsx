"use client";

import { Box, Typography, Grid, Paper } from "@mui/material";
import { Truck, Headphones, ShieldCheck } from "lucide-react";

export default function EcommerceBenefits() {
  const benefits = [
    {
      icon: <Truck size={40} color="#38bdf8" />, // Envío gratuito
      title: "Free shipping",
      description: "Receive your products at no additional cost on selected orders.",
    },
    {
      icon: <Headphones size={40} color="#38bdf8" />, // Soporte 24/7
      title: "Support 24/7",
      description: "Our team is available to help you at any time.",
    },
    {
      icon: <ShieldCheck size={40} color="#38bdf8" />, // Garantía de devolución
      title: "Money back guarantee",
      description: "Buy with confidence, easy and fast returns.",
    },
  ];

  return (
    <Box
      sx={{
        py: 6,
        px: 2,
        textAlign: "center",
        bgcolor: "#f8fafc",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mb: 4, color: "#1e293b" }}
      >
        Benefits of shopping with us
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {benefits.map((benefit, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 2,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
            >
              <Box sx={{ mb: 2 }}>{benefit.icon}</Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#1e293b" }}
              >
                {benefit.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1, color: "#64748b" }}
              >
                {benefit.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
