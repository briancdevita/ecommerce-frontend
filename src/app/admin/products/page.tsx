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
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import axiosInstance from "@/utils/axiosInstance";

interface Product {
  id: number;
  name: string;
  description: string,
  price: number;
  stock: number;
  category: string;
  image: string;
}

const ProductsPage = () => {
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
    setCurrentProduct(product || null); // Si hay producto, lo estamos editando; si no, es nuevo
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentProduct(null);
  };

  const handleSaveProduct = () => {
    if (currentProduct?.id) {
      // Editar producto existente
      axiosInstance
        .put(`/products/${currentProduct.id}`, currentProduct)
        .then(() => {
          setProducts((prev) =>
            prev.map((p) =>
              p.id === currentProduct.id ? currentProduct : p
            )
          );
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    } else {
      // Crear nuevo producto
      axiosInstance
        .post("/products", currentProduct)
        .then((response) => {
          setProducts((prev) => [...prev, response.data]);
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error creating product:", error);
        });
    }
  };

  const handleDeleteProduct = (id: number) => {
    axiosInstance
      .delete(`/products/${id}`)
      .then(() => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  if (loading) {
    return (
      <AdminLayout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box>
        <Typography variant="h4" mb={2}>
          Gestión de Productos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleOpenModal()}
        >
          Nuevo Producto
        </Button>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Imagen</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: 50, height: 50, borderRadius: 5 }}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenModal(product)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteProduct(product.id)}>
                      <Delete />
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
            {currentProduct ? "Editar Producto" : "Nuevo Producto"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Nombre"
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
              label="Precio"
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
              label="Categoría"
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
              Cancelar
            </Button>
            <Button onClick={handleSaveProduct} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default ProductsPage;
