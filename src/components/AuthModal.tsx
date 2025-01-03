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

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import { jwtDecode } from "jwt-decode";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  // 
  const dispatch = useDispatch()
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "", address: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const endpoint = isLogin ? "/auth/authenticate" : "/auth/register";
      const response = await axiosInstance.post(endpoint, formData);
      console.log(formData)
      if (isLogin) {
        const token = response.data.token;
        const decoded: any = jwtDecode(token);
        console.log(decoded)
  
        dispatch(
          login({
            token: token,
            user: {
              id: decoded.id,
              username: decoded.sub,
              email: decoded.email,
              roles: decoded.roles.map((role: { authority: string }) => role.authority),
              address: decoded.address,
            },
          })
        );
        localStorage.setItem("token", token);
        toast.success(`Welcome ${decoded.sub}`);
        onClose();
      } else {
        toast.info("Successful registration. Now log in");
        setIsLogin(true);
      }
    } catch (error: any) {
  
      toast.error("There was an error");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isLogin ? "Login" : "Register"}</DialogTitle>
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
            {isLogin ? "Login" : "Register"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
