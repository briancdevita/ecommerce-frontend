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
  Card,
  CardContent,

  Alert,
  InputAdornment,
} from "@mui/material";
import { Login as LoginIcon, PersonAdd as RegisterIcon } from "@mui/icons-material";
import axiosInstance from "@/utils/axiosInstance";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import { jwtDecode } from "jwt-decode";


interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

interface DecodedToken {
  id: number;
  sub: string;
  email: string;
  roles: { authority: string }[];
  address: string;
  exp: number;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "", address: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Limpiar errores específicos al cambiar el valor
    setErrors({ ...errors, [e.target.name]: "" });
    setGeneralError("");
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = "El nombre de usuario es requerido.";
    }

    if (!isLogin) {
      if (!formData.email.trim()) {
        newErrors.email = "El correo electrónico es requerido.";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Ingresa un correo electrónico válido.";
      }

      if (!formData.address.trim()) {
        newErrors.address = "La dirección es requerida.";
      }
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida.";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const endpoint = isLogin ? "/auth/authenticate" : "/auth/register";
      const payload = isLogin
        ? { username: formData.username, password: formData.password }
        : { username: formData.username, email: formData.email, password: formData.password, address: formData.address };

      const response = await axiosInstance.post(endpoint, payload);

      if (isLogin) {
        const token = response.data.token;
        const decoded: DecodedToken = jwtDecode(token);

        dispatch(
          login({
            token: token,
            user: {
              id: decoded.id,
              username: decoded.sub,
              email: decoded.email,
              roles: decoded.roles.map((role) => role.authority),
              address: decoded.address,
            },
          })
        );
        localStorage.setItem("token", token);
        toast.success(`¡Bienvenido ${decoded.sub}!`);
        onClose();
      } else {
        toast.success("Registro exitoso. Ahora puedes iniciar sesión.");
        setIsLogin(true);
        setFormData({ username: "", email: "", password: "", address: "" });
      }
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401 || status === 403) {
          setGeneralError("Nombre de usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
        } else if (status === 400 && data.message) {
          setGeneralError(data.message);
        } else {
          setGeneralError("Ocurrió un error inesperado. Por favor, inténtalo más tarde.");
        }
      } else {
        setGeneralError("No se pudo conectar con el servidor. Verifica tu conexión a Internet.");
      }
      toast.error("Hubo un problema.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Card>
        <CardContent>
          <DialogTitle>
            <Box display="flex" alignItems="center">
              {isLogin ? <LoginIcon sx={{ mr: 1 }} /> : <RegisterIcon sx={{ mr: 1 }} />}
              {isLogin ? "Iniciar Sesión" : "Registro"}
            </Box>
          </DialogTitle>
          <DialogContent>
            <Tabs
              value={isLogin ? 0 : 1}
              onChange={(_, value) => {
                setIsLogin(value === 0);
                setErrors({});
                setGeneralError("");
              }}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Iniciar Sesión" icon={<LoginIcon />} iconPosition="start" />
              <Tab label="Registro" icon={<RegisterIcon />} iconPosition="start" />
            </Tabs>

            {generalError && (
              <Box mt={2}>
                <Alert severity="error">{generalError}</Alert>
              </Box>
            )}

            <Box mt={2}>
              {!isLogin && (
                <TextField
                  label="Correo Electrónico"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <RegisterIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              <TextField
                label="Nombre de Usuario"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={!!errors.username}
                helperText={errors.username}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LoginIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Contraseña"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LoginIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {!isLogin && (
                <TextField
                  label="Dirección"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={!!errors.address}
                  helperText={errors.address}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <RegisterIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth
                sx={{ mt: 3, py: 1.5 }}
              >
                {isLogin ? "Iniciar Sesión" : "Registrarse"}
              </Button>
            </Box>
          </DialogContent>
        </CardContent>
      </Card>
    </Dialog>
  );
}
