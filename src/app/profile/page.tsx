'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,

  Avatar,
  IconButton,
} from '@mui/material';
import { Email, LocationOn, Person, Edit } from '@mui/icons-material';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { login } from '@/redux/slices/authSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [address, setAddress] = useState(user?.address || '');
  const [loading, setLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(true); // Controla si el campo es editable
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSaveAddress = () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    axios
      .patch(
        `http://localhost:8080/users/${user.id}/address`,
        { address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.info('Address updated successfully!')
        // Actualiza el estado global del usuario con la nueva dirección
        dispatch(
          login({
            token,
            user: { ...user, address: response.data.address },
          })
        );
        setIsEditable(false); // Bloquea el campo después de guardar
      })
      .catch((error) => {
        console.error('Error updating address:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        backgroundColor: '#f7f9fc',
        padding: 3,
        paddingTop: 10,
      }}
    >
      <Paper
        sx={{
          width: '100%',
          maxWidth: 400,
          padding: 4,
          borderRadius: 3,
          boxShadow: 3,
          textAlign: 'center',
        }}
      >
        {/* Foto del usuario */}
        <Avatar
          alt={user?.username || 'User'}
          src={user?.image || '/default-avatar.png'}
          sx={{ width: 100, height: 100, margin: 'auto', mb: 3 }}
        />

        {/* Campo: Nombre de usuario */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            gap: 1,
          }}
        >
          <Person color="primary" />
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {user?.username || 'Your Name'}
          </Typography>
        </Box>

        {/* Campo: Dirección (editable/bloqueado) */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            gap: 1,
          }}
        >
          <LocationOn color="primary" />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={!isEditable} // Bloquea el input si no es editable
          />
          <IconButton
            color="primary"
            onClick={() => setIsEditable(true)} // Activa la edición
            sx={{
              display: isEditable ? 'none' : 'block', // Muestra solo si está bloqueado
            }}
          >
            <Edit />
          </IconButton>
        </Box>

        {/* Campo: Correo */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 3,
            gap: 1,
          }}
        >
          <Email color="primary" />
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {user?.email || 'your.email@example.com'}
          </Typography>
        </Box>

        {/* Botón: Mis Órdenes */}
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={() => router.push("/orders")}
          sx={{ mb: 2, textTransform: 'none', fontWeight: 'bold' }}
        >
          My orders
        </Button>

        {/* Botón: Guardar Dirección */}
        {isEditable && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSaveAddress}
            disabled={loading}
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Save address'}
          </Button>
        )}
      </Paper>
    </Box>
  );
}
