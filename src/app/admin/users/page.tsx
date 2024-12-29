// admin/users/page.tsx
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
} from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface User {
  id: number;
  username: string;
  email: string;
  roles: { name: string }[]; // Roles con nombres
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
    if (confirm("¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.")) {
      axiosInstance
        .delete(`/admin/user/${userId}`)
        .then(() => {
          alert("Usuario eliminado con éxito");
          fetchUsers();
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          alert("Hubo un problema al intentar eliminar al usuario.");
        });
    }
  };

  const handleSave = () => {
    if (!editingUser) return;

    axiosInstance
      .put(`/admin/user/${editingUser.id}`, {
        username: editingUser.username,
        email: editingUser.email,
        roles: editingUser.roles.map((role) => role.name), // Asegura el formato de roles
      })
      .then(() => {
        alert("Usuario actualizado con éxito");
        setOpenEditDialog(false);
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        alert("Hubo un problema al intentar actualizar al usuario.");
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
        <Typography variant="h4" mb={3}>
          Gestión de Usuarios
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Usuario</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.roles.map((role) => role.name).join(", ")}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(user)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(user.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Modal para Editar Usuario */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
      >
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          <TextField
            label="Usuario"
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
  value={editingUser?.roles?.map((role) => role.name).join(", ") || ""} // Extrae los nombres y convierte a string
  onChange={(e) =>
    setEditingUser((prev) =>
      prev
        ? {
            ...prev,
            roles: e.target.value.split(",").map((role) => ({ name: role.trim() })), // Convierte string a array de objetos
          }
        : null
    )
  }
/>


        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}
