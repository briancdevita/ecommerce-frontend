"use client";

import { Dialog, DialogTitle, DialogContent, Box, Typography, Button } from "@mui/material";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearCart, clearCoupon } from "@/redux/slices/cartSlice";

interface OrderSummaryModalProps {
  open: boolean;
  onClose: () => void;
}

export default function OrderSummaryModal({ open, onClose }: OrderSummaryModalProps) {
  // Seleccionar los datos necesarios desde Redux
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const couponCode = useSelector((state: RootState) => state.cart.couponCode);
  const discountPercentage = useSelector((state: RootState) => state.cart.discountPercentage);
  const dispatch = useDispatch();
  const router = useRouter();

  // Calcular subtotal, descuento y total final
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = couponCode ? (discountPercentage / 100) * subtotal : 0;
  const finalTotal = subtotal - discount;

  const handleConfirmOrder = async () => {
    try {
      const response = await axiosInstance.post(
        "/orders",
        {
          couponCode: couponCode, // Enviar el código del cupón si existe
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Envía el token
          },
        }
      );

      toast.success("Order created successfully!");
      dispatch(clearCart());
      dispatch(clearCoupon());
      onClose(); // Cierra el modal
      router.push(`/orders/${response.data.id}`); // Redirige a la página de resumen
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "There was a problem creating the order. Try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Order Summary</DialogTitle>
      <DialogContent>
        <Box>
          {cartItems.map((item) => (
            <Box key={item.product.id} display="flex" justifyContent="space-between" mb={2}>
              <Typography>{item.product.name}</Typography>
              <Typography>{item.quantity} x ${item.product.price.toFixed(2)}</Typography>
            </Box>
          ))}
          {/* Subtotal */}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              Subtotal
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="primary.main">
              ${subtotal.toFixed(2)}
            </Typography>
          </Box>
          {/* Descuento (si aplica) */}
          {couponCode && (
            <>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography variant="subtitle1" fontWeight="bold" color="secondary.main">
                  Descuento ({discountPercentage}%)
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="secondary.main">
                  -${discount.toFixed(2)}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Total
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                  ${finalTotal.toFixed(2)}
                </Typography>
              </Box>
            </>
          )}
          {/* Total sin descuento */}
          {!couponCode && (
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                Total
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="primary.main">
                ${subtotal.toFixed(2)}
              </Typography>
            </Box>
          )}
          {/* Botones de acción */}
          <Box display="flex" justifyContent="space-between" mt={4} gap={2}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleConfirmOrder}>
              Confirm
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
