"use client";

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { Badge } from "@mui/material";
import { useCartDrawer } from "@/app/context/CartDrawerContext";
import AuthModal from "./AuthModal";
import { useSelector, useDispatch } from "react-redux";

import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import { logout } from "@/features/auth/authSlice";
import { useAuth } from "@/app/context/AuthContext";

const Navbar = () => {
  const { state } = useCart();
  const { openDrawer } = useCartDrawer();
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, logout } = useAuth()
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const handleOpenAuthModal = () => setAuthModalOpen(true);
  const handleCloseAuthModal = () => setAuthModalOpen(false);



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Título y enlace a la página principal */}
          <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              E-Commerce
            </Link>
          </Typography>

          {/* Botón del carrito */}
          <IconButton color="inherit" onClick={openDrawer}>
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Mostrar dependiendo del estado del usuario */}
          {user ? (
            <Box display="flex" alignItems="center" gap={2}>
              
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
              <Typography variant="body1" color="white">Hello, {user.username}</Typography>
            </Box>
            
          ) : (
            <Button color="inherit" onClick={handleOpenAuthModal}>
              Login
            </Button>
          )}
        </Toolbar>

        {/* Modal de autenticación */}
        <AuthModal open={isAuthModalOpen} onClose={handleCloseAuthModal} />
      </AppBar>
    </Box>
  );
};

export default Navbar;
