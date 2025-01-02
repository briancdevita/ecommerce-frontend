"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
  Button,
  Collapse,
  Stack,
  Chip,
} from "@mui/material";
import withAuth from "@/utils/withAuth";
import { redirect } from "next/navigation";

interface Order {
  id: number;
  orderDate: string;
  status: string;
  receiptUrl?: string;
  totalPrice: number;
  items: {
    productName: string;
    quantity: number;
    price: number;
    image?: string;
  }[];
}

const statusColors: Record<string, string> = {
  PENDING: "warning",
  COMPLETED: "success",
  CANCELLED: "error",
};

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  console.log(orders)

  const handleReceipt = (receipUrl: string) => {
    redirect(receipUrl)
  }



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
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My orders
      </Typography>


      <Stack spacing={3}>
        {orders.map((order) => (
          <Paper key={order.id} elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            
            <Box
              display="flex"
              justifyContent="space-between"
              flexWrap="wrap"
              alignItems="center"
            >
              <Box mb={{ xs: 2, md: 0 }}>
                <Typography variant="h6" fontWeight="bold">
                  Order #{order.id}
                </Typography>
                <Stack direction="row" spacing={1} mt={1} alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Date:
                  </Typography>
                  <Chip
                    label={new Date(order.orderDate).toLocaleDateString()}
                    size="small"
                    color="default"
                  />
                </Stack>
                
                <Stack direction="row" spacing={1} mt={1} alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Status:
                  </Typography>
                  <Chip
                    label={order.status}
                    size="small"
                    color={statusColors[order.status] || "default"}
                  />
                </Stack>
                <Stack direction="row" spacing={1} mt={1} alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Total:
                  </Typography>
                  <Chip
                    label={`$${order.totalPrice.toFixed(2)}`}
                    size="small"
                    color="primary"
                  />
                </Stack>
              </Box>

              <Button
                variant="contained"
                onClick={() => toggleExpand(order.id)}
                sx={{ whiteSpace: "nowrap" }}
              >
                {expandedOrder === order.id ? "Hide Details" : "See Details"}
              </Button>
              
            </Box>

            <Collapse in={expandedOrder === order.id} unmountOnExit>
              <Box mt={2}>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Order Details
                </Typography>
                {order.items.map((item, index) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    mt={1}
                    sx={{ borderBottom: "1px solid #eee", pb: 1 }}
                  >
                    <img
                      src={item.image || "https://via.placeholder.com/50"}
                      alt={item.productName}
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                        marginRight: 10,
                        borderRadius: 4,
                      }}
                    />
                    
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {item.productName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      Amount: {item.quantity} &bull; Price: ${item.price.toFixed(2)}
                      </Typography>
                    </Box>
                     <Button
                     style={{marginLeft: "auto"}}
                     color="info"
                     variant="contained"
                     onClick={() => handleReceipt(order.receiptUrl)}
                    >
                      See receipt

                    </Button>
                  </Box>
                  
                ))}
              </Box>
                
            </Collapse>
            
          </Paper>
          
        ))}
      </Stack>
      
    </Container>
  );
};

export default withAuth(OrdersPage);
