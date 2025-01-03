"use client";

import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';

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
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  CircularProgress,
  Chip,
} from "@mui/material";
import { Plus, Edit, Trash } from "lucide-react"; // Usamos Lucide para los iconos
import axiosInstance from "@/utils/axiosInstance";
import AdminLayout from "@/components/AdminLayout";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleOpenModal = (product?: Product) => {
    setCurrentProduct(product || null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentProduct(null);
  };

  
  const handleSaveProduct = () => {
    // Cerrar el modal antes de mostrar el SweetAlert
    handleCloseModal();
  
    Swal.fire({
      title: 'Are you sure?',
      text: currentProduct?.id
        ? 'Do you want to update this product?'
        : 'Do you want to create this product?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: currentProduct?.id ? 'Yes, update it!' : 'Yes, create it!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (currentProduct?.id) {
          // Update product
          axiosInstance
            .put(`/products/${currentProduct.id}`, currentProduct)
            .then(() => {
              setProducts((prev) =>
                prev.map((p) => (p.id === currentProduct.id ? currentProduct : p))
              );
              Swal.fire('Updated!', 'The product has been updated.', 'success');
            })
            .catch((error) => {
              console.error('Error updating product:', error);
              Swal.fire('Error!', 'There was a problem updating the product.', 'error');
            });
        } else {
          // Create product
          axiosInstance
            .post('/products', currentProduct)
            .then((response) => {
              setProducts((prev) => [...prev, response.data]);
              Swal.fire('Created!', 'The product has been created.', 'success');
            })
            .catch((error) => {
              console.error('Error creating product:', error);
              Swal.fire('Error!', 'There was a problem creating the product.', 'error');
            });
        }
      } else {
        // Reabrir el modal si la acción fue cancelada
        handleOpenModal();
      }
    });
  };
  
  

  
  const handleDeleteProduct = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma la acción, procede con la eliminación
        axiosInstance
          .delete(`/products/${id}`)
          .then(() => {
            setProducts((prev) => prev.filter((p) => p.id !== id));
            Swal.fire(
              'Deleted!',
              'The product has been deleted.',
              'success'
            );
          })
          .catch((error) => {
            console.error('Error deleting product:', error);
            Swal.fire(
              'Error!',
              'There was a problem deleting the product.',
              'error'
            );
          });
      }
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

  return (
    <AdminLayout>
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4" fontWeight="bold">
          Product Management

          </Typography>
          <Button
            variant="contained"
            startIcon={<Plus size={20} />}
            onClick={() => handleOpenModal()}
          >
            New Product
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead sx={{ bgcolor: "#f4f6f8" }}>
            <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>

            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 5,
                        objectFit: "cover",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">{product.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="success.main">
                      ${product.price.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color={
                        product.stock > 10 ? "success.main" : "error.main"
                      }
                    >
                      {product.stock}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.category}
                      color="primary"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenModal(product)}
                    >
                      <Edit size={18} />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal para Crear/Editar Producto */}
        <Dialog open={modalOpen} onClose={handleCloseModal}>
          <DialogTitle>
            {currentProduct ? "Edit Product" : "New Product"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={currentProduct?.name || ""}
              onChange={(e) =>
                setCurrentProduct((prev) => ({
                  ...prev!,
                  name: e.target.value,
                }))
              }
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              value={currentProduct?.description || ""}
              onChange={(e) =>
                setCurrentProduct((prev) => ({
                  ...prev!,
                  description: e.target.value,
                }))
              }
            />
            <TextField
              label="Price"
              fullWidth
              margin="normal"
              type="number"
              value={currentProduct?.price || ""}
              onChange={(e) =>
                setCurrentProduct((prev) => ({
                  ...prev!,
                  price: parseFloat(e.target.value),
                }))
              }
            />
            <TextField
              label="Stock"
              fullWidth
              margin="normal"
              type="number"
              value={currentProduct?.stock || ""}
              onChange={(e) =>
                setCurrentProduct((prev) => ({
                  ...prev!,
                  stock: parseInt(e.target.value),
                }))
              }
            />
            <TextField
              label="Category"
              fullWidth
              margin="normal"
              value={currentProduct?.category || ""}
              onChange={(e) =>
                setCurrentProduct((prev) => ({
                  ...prev!,
                  category: e.target.value,
                }))
              }
            />
            <TextField
              label="Imagen (URL)"
              fullWidth
              margin="normal"
              value={currentProduct?.image || ""}
              onChange={(e) =>
                setCurrentProduct((prev) => ({
                  ...prev!,
                  image: e.target.value,
                }))
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSaveProduct} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default ProductsPage;
