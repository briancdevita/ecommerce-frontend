"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Grid,
  Paper,
  Button,
  Collapse,
} from "@mui/material";

interface Order {
  id: number;
  orderDate: string;
  status: string;
  totalPrice: number;
  items: {
    productName: string;
    quantity: number;
    price: number;
    image?: string;
  }[];
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  useEffect(() => {
    axiosInstance
      .get("/orders/user")
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (orders.length === 0) {
    return (
      <Container>
        <Typography variant="h5" textAlign="center" mt={4}>
          No tienes órdenes todavía.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Mis Órdenes
      </Typography>
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} key={order.id}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h6">Orden #{order.id}</Typography>
                  <Typography variant="body2">
                    Fecha: {new Date(order.orderDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">Estado: {order.status}</Typography>
                  <Typography variant="body2">
                    Total: ${order.totalPrice.toFixed(2)}
                  </Typography>
                </Box>
                <Button onClick={() => toggleExpand(order.id)}>
                  {expandedOrder === order.id ? "Ocultar Detalles" : "Ver Detalles"}
                </Button>
              </Box>

              <Collapse in={expandedOrder === order.id}>
                <Box mt={2}>
                  <Typography variant="h6">Detalles de la Orden</Typography>
                  {order.items.map((item, index) => (
                    <Box key={index} display="flex" alignItems="center" mt={1}>
                      <img
                        src={item.image || "https://via.placeholder.com/150"}
                        alt={item.productName}
                        style={{ width: 50, height: 50, marginRight: 10 }}
                      />
                      <Typography>
                        {item.productName} - {item.quantity} unidades - ${item.price.toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Collapse>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OrdersPage;
