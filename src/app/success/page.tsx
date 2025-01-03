"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axiosInstance from "@/utils/axiosInstance";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [receiptUrl, setReceiptUrl] = useState("");
  const orderId = searchParams.get("orderId"); 



  useEffect(() => {
    if (sessionId) {
      fetch(`/api/stripe?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {

          if (data.receiptUrl) {
            setReceiptUrl(data.receiptUrl);
          }
          
        })
        .catch(console.error);
    }
  }, [sessionId]);





  useEffect(() => {
    if (orderId) {
      const token = localStorage.getItem("token");
     
      axiosInstance
        .patch(
          `/orders/${orderId}/status?orderStatus=COMPLETED`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Asegúrate de incluir el token
            },
          }
        )
        .then(() => {
          if (receiptUrl) {
            axiosInstance
              .post(`/orders/${orderId}/receipt`, { receiptUrl })
              .then(() => {
              })
              .catch((err) => console.error("Error saving receipt URL:", err));
          }
        })
        .catch((err) => console.error("Error updating order status:", err));
    }
  }, [orderId, receiptUrl]);
  
  


  
  


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

        <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={() => {}}>
            Volver al inicio
          </Button>

          {/* Botón para descargar/abrir el recibo en una nueva pestaña */}
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              if (receiptUrl) {
                window.open(receiptUrl, "_blank", "noopener,noreferrer");
              }
            }}
            disabled={!receiptUrl}
          >
            Descargar Recibo
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
