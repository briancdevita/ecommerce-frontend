"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Card,
  CardMedia,
  Button,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import withAuth from "@/utils/withAuth";

interface Order {
  id: number;
  orderDate: string;
  status: string;
  totalPrice: number;
  items: {
    productName: string;
    image: string;
  }[];
}

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axiosInstance
      .get("/orders/user")
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  /** 
   * handlePay:
   * - Llama a la ruta "/api/stripe" para crear la Checkout Session o PaymentIntent (según tu backend).
   * - En este ejemplo, enviamos lineItems para un Checkout Session; ajusta a tu caso.
   */
  async function handlePay(orderId: number, totalPrice: number) {
    try {
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lineItems: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: `Orden #${orderId}`,
                },
                // 1000 = 10.00 USD en centavos, ajusta según tu lógica
                unit_amount: totalPrice,
              },
              // Aquí interpretamos `totalPrice` como la cantidad de ítems;
              // si más bien querías "monto total en centavos", debes ajustar la lógica.
              quantity: 2
            },
          ],
        }),
      });

      const data = await response.json();
      if (data.error) {
        console.error("Error al crear PaymentIntent o Checkout Session:", data.error);
        return;
      }

      // Dependiendo de si tu backend crea un PaymentIntent o una Checkout Session,
      // la respuesta será distinta. Ajusta este código a lo que devuelves.
      if (data.url) {
        // Por ejemplo, si es una Checkout Session:
        // Rediriges a la URL de Stripe Checkout:
        window.location.href = data.url;
      } else {
        // O, si es un PaymentIntent, podrías redirigir a tu /checkout/[orderId]
        // donde usas <CardElement> y confirmas el pago en tu sitio.
        console.log("PaymentIntent creado:", data.paymentIntentId);
        console.log("ClientSecret:", data.clientSecret);
        router.push(`/checkout/${orderId}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Mientras cargan las órdenes, muestra un spinner
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  // Si no hay órdenes, muestra un mensaje
  if (orders.length === 0) {
    return (
      <Container>
        <Typography variant="h5" textAlign="center" mt={4}>
          No tienes órdenes todavía.
        </Typography>
      </Container>
    );
  }

  // Renderiza la lista de órdenes
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mis Órdenes
      </Typography>
      <Box>
        {orders.map((order) => (
          <Card
            key={order.id}
            elevation={1}
            sx={{
              mb: 3,
              borderRadius: 2,
              p: 2,
              display: "flex",
              alignItems: "flex-start",
              backgroundColor: "#fff",
            }}
          >
            {/* Imagen del primer producto de la orden */}
            <CardMedia
              component="img"
              image={order.items[0]?.image || "https://via.placeholder.com/100"}
              alt={order.items[0]?.productName || "Producto"}
              sx={{
                width: 120,
                height: 120,
                objectFit: "cover",
                borderRadius: 1,
                mr: 3,
              }}
            />

            {/* Detalles de la orden */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Orden #{order.id}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Fecha: {new Date(order.orderDate).toLocaleDateString()}
              </Typography>
              <Typography
                sx={{
                  backgroundColor:
                    order.status === "PENDING"
                      ? "#FFE082"
                      : order.status === "COMPLETED"
                      ? "#C8E6C9"
                      : "#FFCDD2",
                  color: "#000",
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  borderRadius: 1,
                  p: "4px 8px",
                  display: "inline-block",
                  mt: 1,
                }}
              >
                {order.status}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2">
                Total: <strong>${order.totalPrice.toFixed(2)}</strong>
              </Typography>
              <Button
                variant="contained"
                color="success"
                size="small"
                sx={{ mt: 2 }}
                onClick={() => handlePay(order.id, order.totalPrice)}
              >
                Pagar
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

export default withAuth(OrdersPage);
