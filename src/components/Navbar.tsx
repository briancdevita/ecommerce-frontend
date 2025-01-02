"use client";

import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Link from "next/link";
import { Badge } from "@mui/material";
import { useCartDrawer } from "@/app/context/CartDrawerContext";
import AuthModal from "./AuthModal";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "@/redux/slices/cartSlice";
import PromotionalBanner from "./PromotionalBanner";

const Navbar = () => {
  const { openDrawer } = useCartDrawer();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const handleOpenAuthModal = () => setAuthModalOpen(true);
  const handleCloseAuthModal = () => setAuthModalOpen(false);

  const handleLogout = () => {
    dispatch(logout()); // Actualiza el estado global
    localStorage.removeItem("token"); // Limpia el token almacenado
    dispatch(clearCart());
  };

  // Banner promocional dinámico
  const [promotion, setPromotion] = useState(
    "🎉 Free shipping on purchases over $50 🎉"
  );
  const promotions = [
    "🎉 Free shipping on purchases over $50 🎉",
    "🛍️ 10% discount on your first purchase 🛍️",
    "🔥 Exclusive offer: 2x1 on selected products 🔥",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPromotion((prev) =>
        promotions[(promotions.indexOf(prev) + 1) % promotions.length]
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
   
      <AppBar position="static">
 
        <Toolbar>
          {/* Título y enlace a la página principal */}
          <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
            <Link
              href="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              E-Commerce
            </Link>
          </Typography>

          {/* Banner promocional dinámico */}
          <Typography
            variant="body1"
            sx={{
              flexGrow: 600,
              textAlign: "center",
              color: "#ffeb3b",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            {promotion}
          </Typography>
       

          {/* Botón del carrito */}
          <IconButton color="inherit" onClick={openDrawer}>
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
         

          {/* Mostrar dependiendo del estado del usuario */}
          {user ? (
            <>
              <Box display="flex" alignItems="center" gap={2}>
                {/* Ícono de Dashboard solo si el usuario es ADMIN */}
                {user.roles.includes("ADMIN") && (
                  <IconButton color="inherit">
                    <Link
                      href="/admin/orders"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <DashboardIcon sx={{ color: "white" }} />
                    </Link>
                  </IconButton>
                )}

                <Button color="inherit" onClick={handleLogout}>
                  <LogoutIcon />
                </Button>
              </Box>

              <IconButton color="inherit">
                <Link href="/profile">
                  <AccountCircleIcon sx={{ color: "white" }} />
                </Link>
              </IconButton>
            </>
          ) : (
            <Button color="inherit" onClick={handleOpenAuthModal}>
              <LoginIcon />
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
