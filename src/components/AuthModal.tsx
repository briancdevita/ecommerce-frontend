// components/AuthModal.tsx
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
} from "@mui/material";
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/app/context/AuthContext";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState(0); // 0 = Login, 1 = Register
  const { setToken } = useAuth();
  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const endpoint = isLogin ? "/auth/authenticate" : "/auth/register";
      const response = await axiosInstance.post(endpoint, formData);
      if (isLogin) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        alert("Inicio de sesión exitoso");
        onClose();
      } else {
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        setIsLogin(true); // Cambiamos al formulario de login
      }
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      alert("Hubo un error, intenta nuevamente.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
    <DialogTitle>{isLogin ? "Iniciar Sesión" : "Registrarse"}</DialogTitle>
    <DialogContent>
      <Tabs
        value={isLogin ? 0 : 1}
        onChange={(_, value) => setIsLogin(value === 0)}
      >
        <Tab label="Login" />
        <Tab label="Registro" />
      </Tabs>

      <Box mt={2}>
        {!isLogin && (
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        )}
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          sx={{ mt: 2 }}
        >
          {isLogin ? "Login" : "Registrar"}
        </Button>
      </Box>
    </DialogContent>
  </Dialog>
  );
}
