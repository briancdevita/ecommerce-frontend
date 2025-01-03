"use client";

import React, { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";

export default function CheckoutPageWrapper() {
  return <CheckoutPage />;
}

function CheckoutPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const orderId = searchParams.get("orderId");
  const productImage = searchParams.get("images");
  const totalPrice = searchParams.get("totalPrice") // Convertir a número
  const productName = searchParams.get("productName");

 


  async function handleCheckout() {
    setLoading(true);
    try {

      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lineItems: [

            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: productName,
                  images: [productImage],
                  
                },
                unit_amount: totalPrice,
              },
              quantity:cartItems.quantity,
            },
          ],
          orderId: orderId
        }),
      });

      const data = await res.json();
      if (data.error) {
        console.error("Error al crear la Checkout Session:", data.error);
        setLoading(false);
        return;
      }

      // 2. Redirigimos a la URL que devuelve Stripe
      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "40px auto",
        padding: 2,
      }}
    >
      <Typography variant="h4" textAlign="center" mb={3}>
        Checkout (Hosted) - Orden #{orderId}
      </Typography>


      <Card variant="outlined">
        <CardContent>
          <Typography variant="body1" mb={2}>
            Haz clic en “Pagar” para ir al formulario de Stripe Checkout.
          </Typography>

          <Paper
            variant="outlined"
            sx={{ p: 2, mb: 2, borderRadius: 2, backgroundColor: "#f9f9f9" }}
          >
            <Typography variant="subtitle2">
              Monto simulado: <strong>{cartItems.price}</strong>
            </Typography>
          </Paper>

          <Box sx={{ textAlign: "right" }}>
            <Button
              onClick={handleCheckout}
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={22} /> : "Pagar"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
