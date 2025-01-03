"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import axiosInstance from "@/utils/axiosInstance";

import { redirect } from "next/navigation";

interface Order {
  id: number;
  username: string;
  orderDate: string;
  status: string;
  finalAmount: number;
  receiptUrl?: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const handleReceipt = (receipUrl: string) => {
    redirect(receipUrl);
  }
  

  useEffect(() => {
    axiosInstance
      .get("/orders/admin/filters")
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleStatusChange = (orderId: number, newStatus: string) => {
    axiosInstance
      .patch(`/orders/${orderId}/status?orderStatus=${newStatus}`)
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };

  if (loading) {
    return (
      <AdminLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "warning";
      case "COMPLETED":
        return "success";
      case "CANCELLED":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <AdminLayout>
      <Box>
        <Typography variant="h4" fontWeight="bold" mb={2}>
        Order Management
        </Typography>
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ bgcolor: "#f4f6f8" }}>
              <TableRow>
              <TableCell># Order</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>
                    <Typography fontWeight="bold">{order.id}</Typography>
                  </TableCell>
                  <TableCell>{order.username}</TableCell>
                  <TableCell>
                    {new Date(order.orderDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={getStatusColor(order.status)}
                      variant="outlined"
                    />
                    <Select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      size="small"
                      sx={{ ml: 2 }}
                    >
                      <MenuItem value="PENDING">PENDING</MenuItem>
                      <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                      <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold" color="success.main">
                      ${order.finalAmount.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ textTransform: "none" }}
                      onClick={() => handleReceipt(order.receiptUrl)}
                    >
                      Download Receipt

                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </AdminLayout>
  );
};

export default OrdersPage;
