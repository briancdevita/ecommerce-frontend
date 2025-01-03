"use client";

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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Edit2, Trash } from "lucide-react"; // Lucide icons para un diseño moderno.
import Swal from "sweetalert2";

interface User {
  id: number;
  username: string;
  email: string;
  roles: { name: string }[];
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    axiosInstance
      .get("/admin/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setOpenEditDialog(true);
  };

  const handleDelete = (userId: number) => {
    // Mostrar diálogo de confirmación con SweetAlert
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Usuario confirma eliminar
        axiosInstance
          .delete(`/admin/user/${userId}`)
          .then(() => {
            Swal.fire('Deleted!', 'The user has been successfully deleted.', 'success');
            fetchUsers(); // Actualizar la lista de usuarios
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
            Swal.fire('Error!', 'There was a problem deleting the user.', 'error');
          });
      }
    });
  };

  const handleSave = () => {
    if (!editingUser) return;
  
    axiosInstance
      .put(`/admin/user/${editingUser.id}`, {
        username: editingUser.username,
        email: editingUser.email,
        roles: editingUser.roles.map((role) => role.name),
      })
      .then(() => {
        // Mostrar mensaje de éxito con SweetAlert
        Swal.fire({
          title: 'Success!',
          text: 'The user has been successfully updated.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
        setOpenEditDialog(false); // Cerrar el diálogo de edición
        fetchUsers(); // Actualizar la lista de usuarios
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        // Mostrar mensaje de error con SweetAlert
        Swal.fire({
          title: 'Error!',
          text: 'There was a problem updating the user.',
          icon: 'error',
          confirmButtonColor: '#d33',
        });
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
        <Typography variant="h4" fontWeight="bold" mb={3}>
        User Management
        </Typography>
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ bgcolor: "#f4f6f8" }}>
              <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Typography fontWeight="bold">{user.username}</Typography>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.roles.map((role) => (
                      <Chip
                        key={role.name}
                        label={role.name}
                        size="small"
                        color="primary"
                        sx={{ mr: 1 }}
                      />
                    ))}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(user)}
                    >
                      <Edit2 size={18} />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Modal para Editar Usuario */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="User"
            fullWidth
            margin="normal"
            value={editingUser?.username || ""}
            onChange={(e) =>
              setEditingUser((prev) =>
                prev ? { ...prev, username: e.target.value } : null
              )
            }
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={editingUser?.email || ""}
            onChange={(e) =>
              setEditingUser((prev) =>
                prev ? { ...prev, email: e.target.value } : null
              )
            }
          />
          <TextField
            label="Roles"
            fullWidth
            margin="normal"
            value={editingUser?.roles.map((role) => role.name).join(", ") || ""}
            onChange={(e) =>
              setEditingUser((prev) =>
                prev
                  ? {
                      ...prev,
                      roles: e.target.value
                        .split(",")
                        .map((role) => ({ name: role.trim() })),
                    }
                  : null
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}
