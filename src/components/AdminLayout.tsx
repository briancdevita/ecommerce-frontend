"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import StoreIcon from "@mui/icons-material/Store";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";


const drawerWidth = 240;

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);


  const {user, token } = useSelector((state: RootState)=> state.auth);


  const router = useRouter();

  console.log(user)

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }
  
    if (user) {
      // Verifica si el usuario tiene el rol ADMIN
      const isAdmin = user.roles.some((role) => role.authority === "ADMIN");
      if (!isAdmin) {
        router.push("/");
      }
    }
  }, [user, token, router]);
  
  if (!token || !user) {
    // Muestra una pantalla de carga si los datos aún no están listos
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h5">Cargando...</Typography>
      </Box>
    );
  }
  
  

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/admin/products")}>
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Productos" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/admin/users")}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/admin/orders")}>
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="Órdenes" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        > 
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
