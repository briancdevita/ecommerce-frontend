"use client";

import React from "react";
import { Box, Typography, Avatar, Paper, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Container>
      {/* Información del Usuario */}
      <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: "center" }}>
        {/* Avatar del Usuario */}
        <Avatar
          sx={{
            width: 100,
            height: 100,
            margin: "0 auto 16px",
            bgcolor: "primary.main",
          }}
          src={user?.avatar || "https://via.placeholder.com/150"}
          alt={user?.username}
        >
          {user?.username?.charAt(0).toUpperCase()}
        </Avatar>

        {/* Nombre y Email */}
        <Typography variant="h5" gutterBottom>
          {user?.username}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {user?.email}
        </Typography>

        {/* Botón para "Mis Pedidos" */}
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={() => router.push("/orders")}
        >
          Mis Pedidos
        </Button>
      </Paper>
    </Container>
  );
};

export default ProfilePage;