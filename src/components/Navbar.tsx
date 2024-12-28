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

const Navbar = () => {
  const { state } = useCart()
  const {openDrawer} = useCartDrawer()
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const handleOpenAuthModal = () => setAuthModalOpen(true);
  const handleCloseAuthModal = () => setAuthModalOpen(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              E-Commerce
            </Link>
          </Typography>
          <IconButton color="inherit" onClick={openDrawer} >
            <Badge badgeContent={totalItems} color="error"/>
              <ShoppingCartIcon />
              
          </IconButton>
          <Button color="inherit" onClick={handleOpenAuthModal}>
            
              Login
       
          </Button>
        </Toolbar>
        <AuthModal 
        open={isAuthModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        /> {/* Renderiza el modal */}
      </AppBar>
    </Box>
  );
};

export default Navbar;
