"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Card,
  CardMedia,
  Button,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import withAuth from "@/utils/withAuth";

interface Order {
  id: number;
  orderDate: string;
  status: string;
  totalPrice: number;
  items: {
    productName: string;
    image: string;
  }[];
}

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mis Órdenes
      </Typography>
      <Box>
        {orders.map((order) => (
          <Card
            key={order.id}
            elevation={1}
            sx={{
              mb: 3,
              borderRadius: 2,
              p: 2,
              display: "flex",
              alignItems: "flex-start",
              backgroundColor: "#fff",
            }}
          >
            {/* Imagen del producto principal */}
            <CardMedia
              component="img"
              image={order.items[0]?.image || "https://via.placeholder.com/100"}
              alt={order.items[0]?.productName || "Producto"}
              sx={{
                width: 120,
                height: 120,
                objectFit: "cover",
                borderRadius: 1,
                mr: 3,
              }}
            />

            {/* Detalles de la orden */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Orden #{order.id}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Fecha: {new Date(order.orderDate).toLocaleDateString()}
              </Typography>
              <Typography
                sx={{
                  backgroundColor:
                    order.status === "PENDING"
                      ? "#FFE082"
                      : order.status === "COMPLETED"
                      ? "#C8E6C9"
                      : "#FFCDD2",
                  color: "#000",
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  borderRadius: 1,
                  p: "4px 8px",
                  display: "inline-block",
                  mt: 1,
                }}
              >
                {order.status}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2">
                Total: <strong>${order.totalPrice.toFixed(2)}</strong>
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                sx={{ mt: 2 }}
                onClick={() => router.push(`/orders/${order.id}`)}
              >
                Ver Detalles
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

export default withAuth(OrdersPage) 