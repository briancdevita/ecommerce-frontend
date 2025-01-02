'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Avatar,
  Tooltip,
  Button,
  Divider,
} from '@mui/material';
import { Download as DownloadIcon, TrendingUp as TrendingUpIcon, AttachMoney as AttachMoneyIcon } from '@mui/icons-material';
import axios from 'axios';

// Interface for product data
interface TopSellingProduct {
  productId: number;
  productName: string;
  totalSold: number;
  totalRevenue: number;
}

export default function TopSelling() {
  const [products, setProducts] = useState<TopSellingProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:8080/products/top-selling?limit=5', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching top-selling products:', error);
        setLoading(false);
      });
  }, []);

  const downloadCSV = () => {
    const headers = ['Product', 'Units Sold', 'Revenue Generated'];
    const rows = products.map((product) => [
      product.productName,
      product.totalSold,
      product.totalRevenue.toFixed(2),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'top_selling_products.csv';
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" color="primary.main" gutterBottom>
        Sales Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Monitor your key metrics and top-selling products.
      </Typography>
      <Divider sx={{ my: 3 }} />

      {/* Quick Metrics */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 4, borderRadius: 4, bgcolor: 'primary.light' }}>
            <CardContent>
              <Typography variant="h6" color="white">
                Total Sales
              </Typography>
              <Typography variant="h4" color="white" fontWeight="bold" sx={{ mt: 2 }}>
                {products.reduce((acc, product) => acc + product.totalSold, 0)} units
              </Typography>
              <TrendingUpIcon fontSize="large" sx={{ color: 'white', mt: 2 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 4, borderRadius: 4, bgcolor: 'secondary.light' }}>
            <CardContent>
              <Typography variant="h6" color="white">
                Total Revenue
              </Typography>
              <Typography variant="h4" color="white" fontWeight="bold" sx={{ mt: 2 }}>
                $
                {products
                  .reduce((acc, product) => acc + product.totalRevenue, 0)
                  .toLocaleString()}
              </Typography>
              <AttachMoneyIcon fontSize="large" sx={{ color: 'white', mt: 2 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={downloadCSV}
            sx={{ height: 56, borderRadius: 3, px: 4 }}
          >
            Download CSV
          </Button>
        </Grid>
      </Grid>

      {/* Table */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Top-Selling Products
        </Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ bgcolor: 'primary.main' }}>
              <TableRow>
                <TableCell>
                  <Typography color="white" fontWeight="bold">Product</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography color="white" fontWeight="bold">Units Sold</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography color="white" fontWeight="bold">Revenue Generated</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'secondary.main', color: 'white' }}>
                        {product.productName.charAt(0).toUpperCase()}
                      </Avatar>
                      <Tooltip title={`Product ID: ${product.productId}`}>
                        <Typography>{product.productName}</Typography>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell align="center">{product.totalSold}</TableCell>
                  <TableCell align="center">${product.totalRevenue.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
