"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Divider
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

/**
 * Página de Éxito (Hosted Checkout)
 */
export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    // Aquí podrías hacer una llamada a tu backend o a la API de Stripe
    // para obtener más detalles de la sesión, usando sessionId
    console.log("session_id:", sessionId);
  }, [sessionId]);

  // Ejemplo: Volver al home o a otra parte
  function handleGoHome() {
    window.location.href = "/";
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper
        variant="outlined"
        sx={{
          p: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        {/* Ícono grande de éxito */}
        <CheckCircleOutlineIcon
          sx={{ color: "success.main", fontSize: 60, mb: 2 }}
        />

        <Typography variant="h4" gutterBottom>
          ¡Pago Exitoso!
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Tu pago se ha procesado correctamente.
        </Typography>

        {sessionId && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Session ID: <strong>{sessionId}</strong>
            </Typography>
          </>
        )}

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleGoHome}
        >
          Volver al inicio
        </Button>
      </Paper>
    </Container>
  );
}
