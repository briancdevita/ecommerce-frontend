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
  Divider,
} from "@mui/material";
import { Menu, ShoppingCart, Users, Clipboard, Home, LogOut, LucideLayoutDashboard } from "lucide-react";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "@/redux/slices/authSlice";
import { clearCart } from "@/redux/slices/cartSlice";
import { Dashboard } from "@mui/icons-material";

const drawerWidth = 280;

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }

    if (user) {
      const isAdmin = user.roles.includes("ADMIN");
      if (!isAdmin) {
        router.push("/");
      }
    }
  }, [user, token, router]);

  if (!token || !user) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f4f6f8"
      >
        <Typography variant="h5" color="textSecondary">
          Cargando...
        </Typography>
      </Box>
    );
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    dispatch(clearCart())
  };

  const drawer = (
    <Box sx={{ bgcolor: "#1e293b", height: "100%", color: "#e2e8f0" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#38bdf8" }}
        >
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider sx={{ bgcolor: "#475569" }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => router.push("/admin/products")}
            sx={{
              "&:hover": { bgcolor: "#334155" },
            }}
          >
            <ListItemIcon>
              <ShoppingCart size={20} color="#38bdf8" />
            </ListItemIcon>
            <ListItemText primary="Productos" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => router.push("/admin/users")}
            sx={{
              "&:hover": { bgcolor: "#334155" },
            }}
          >
            <ListItemIcon>
              <Users size={20} color="#38bdf8" />
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => router.push("/admin/orders")}
            sx={{
              "&:hover": { bgcolor: "#334155" },
            }}
          >
            <ListItemIcon>
              <Clipboard size={20} color="#38bdf8" />
            </ListItemIcon>
            <ListItemText primary="Órdenes" />
          </ListItemButton>

          
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => router.push("/admin/dashboard")}
            sx={{
              "&:hover": { bgcolor: "#334155" },
            }}
          >
            <ListItemIcon>
              <LucideLayoutDashboard size={20} color="#38bdf8" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          
        </ListItem>
      </List>

      

      <Divider sx={{ bgcolor: "#475569", my: 1 }} />

      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => router.push("/")}
            sx={{
              "&:hover": { bgcolor: "#334155" },
            }}
          >
            <ListItemIcon>
              <Home size={20} color="#38bdf8" />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              "&:hover": { bgcolor: "#334155" },
            }}
          >
            <ListItemIcon>
              <LogOut size={20} color="#38bdf8" />
            </ListItemIcon>
            <ListItemText primary="Salir" />
          </ListItemButton>
        </ListItem>

        
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", bgcolor: "#f4f6f8" }}>
      <CssBaseline />
      
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "#0f172a",
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
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div" color="#38bdf8">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          bgcolor: "#1e293b",
        }}
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
          bgcolor: "#f8fafc",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
