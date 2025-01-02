"use client"

import { Dialog, DialogTitle, DialogContent, Box, Typography, Button } from "@mui/material";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearCart } from "@/redux/slices/cartSlice";

interface OrderSummaryModalProps {
  open: boolean;
  onClose: () => void;
}

export default function OrderSummaryModal({ open, onClose }: OrderSummaryModalProps) {

  const cartItems = useSelector((state:RootState)=> state.cart.items)
  const dispatch = useDispatch();
  
  const router = useRouter();

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleConfirmOrder = async () => {
    try {
        const response = await axiosInstance.post("/orders", {}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Envía el token
            },
          });
   

      toast.success("¡Orden creada exitosamente!");
      dispatch(clearCart())
      onClose(); // Cierra el modal
      router.push(`/orders/${response.data.id}`); // Redirige a la página de resumen
    } catch (error) {
      toast.error("Hubo un problema al crear la orden. Intenta nuevamente.");
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
              <Typography>{item.quantity} x ${item.product.price}</Typography>
            </Box>
          ))}
          <Typography variant="h6" mt={2}>Total: ${total.toFixed(2)}</Typography>
          <Box display="flex" justifyContent="space-between" mt={4} gap={2} >
            <Button variant="outlined" onClick={onClose} >Cancel</Button>
            
            <Button variant="contained"  color="primary" onClick={handleConfirmOrder}>Confirm</Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
