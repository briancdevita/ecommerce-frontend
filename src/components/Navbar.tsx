"use client";

import React from "react";
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

const Navbar = () => {
  const { state } = useCart()
  const {openDrawer} = useCartDrawer()
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              E-Commerce
            </Link>
          </Typography>
          <Button color="inherit">
            <Link href="/products" style={{ textDecoration: "none", color: "white" }}>
              Products
            </Link>
          </Button>
          <IconButton color="inherit" onClick={openDrawer} >
            <Badge badgeContent={totalItems} color="error"/>
              <ShoppingCartIcon />
          </IconButton>
          <Button color="inherit">
            <Link href="/login" style={{ textDecoration: "none", color: "white" }}>
              Login
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
