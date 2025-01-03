"use client";

import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { Badge, Divider, Menu, MenuItem } from "@mui/material";
import { useCartDrawer } from "@/app/context/CartDrawerContext";
import AuthModal from "./AuthModal";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "@/redux/slices/cartSlice";
import {AddLocationAltOutlined} from "@mui/icons-material";

const Navbar = () => {
  const { openDrawer } = useCartDrawer();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenAuthModal = () => setAuthModalOpen(true);
  const handleCloseAuthModal = () => setAuthModalOpen(false);

  const handleLogout = () => {
    dispatch(logout()); // Actualiza el estado global
    localStorage.removeItem("token"); // Limpia el token almacenado
    dispatch(clearCart());
    handleMenuClose();
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              E-Commerce  
            </Link>
            
          </Typography>
          
          {/* Banner promocional dinámico */}
          <Typography
            variant="body1"
            sx={{
              flexGrow: 4,
              textAlign: "center",
              color: "#ffeb3b",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            {promotion}
          </Typography>

          <Typography
  variant="body1"
  sx={{
    ml: 3,
    display: "flex",
    alignItems: "center",
    color:"#010E21",
    backgroundColor: "#fffbea",
    padding: "4px 12px",
    borderRadius: "8px",
    border: "1px solid #f0c14b",
    fontWeight: "bold",
  
  }}
>
  <AddLocationAltOutlined sx={{ fontSize: 20, color: "#010E21", mr: 1 }} />
  Send to {user?.username || ""}: {user?.address || "Buenos Aires"}
</Typography>


          {/* Botón del carrito */}
          <IconButton color="inherit" onClick={openDrawer}>
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon sx={{ fontSize: "1.8rem" }} />
            </Badge>
          </IconButton>

          {/* Menú desplegable para el usuario */}
          {user ? (
            <>
           
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                sx={{ ml: 2 }}
              >
                <AccountCircleIcon sx={{ fontSize: "1.8rem", color: "white" }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: { mt: 2, bgcolor: "#1e293b", color: "#e2e8f0" },
                }}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Link
                    href="/profile"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      width: "100%",
                    }}
                  >
                    Profile
                  </Link>
                </MenuItem>
                {user.roles.includes("ADMIN") && (
                  <MenuItem onClick={handleMenuClose}>
                    <Link
                      href="/admin/orders"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        width: "100%",
                      }}
                    >
                      Admin Panel
                    </Link>
                  </MenuItem>
                )}
                <Divider sx={{ bgcolor: "#475569" }} />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" onClick={handleOpenAuthModal}>
              <LoginIcon sx={{ fontSize: "1.5rem" }} />
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
