"use client";

import {
  Box,
  Drawer,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCartDrawer } from "@/app/context/CartDrawerContext";

import { useState } from "react";
import OrderSummaryModal from "./OrderSummaryModal";

import { removeItem } from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";


export default function CartDrawer() {
  const { isOpen, closeDrawer } = useCartDrawer();
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const cartItems = useSelector((state: RootState)=> state.cart.items)
  const dispatch  = useDispatch()


  return (
    <Drawer anchor="right" open={isOpen} onClose={closeDrawer}>
      <Box width={350} p={2} role="presentation">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={closeDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* Carrito vacío */}
        {cartItems.length === 0 ? (
          <Typography textAlign="center" mt={2}>
            Your cart is empty.
          </Typography>
        ) : (
          <Box>
            {/* Lista de productos */}
            {cartItems.map((item) => (
              <Box key={item.product.id} mb={2}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">{item.product.name}</Typography>
                  <Typography variant="body1">
                    ${item.product.price} x {item.quantity}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    size="small"
                    color="error"
                    onClick={() => dispatch(removeItem(item.product.id))}
                  >
                    Remove
                  </Button>
                </Box>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))}

            {/* Resumen */}
            <Box mt={3}>
              <Typography variant="h6" textAlign="right">
                Total: $
                {cartItems
                  .reduce(
                    (total, item) =>
                      total + item.product.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setShowOrderSummary(true)}
                sx={{ mt: 2 }}
              >
                Order
              </Button>
              <OrderSummaryModal 
              open={showOrderSummary}
              onClose={() => setShowOrderSummary(false)}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
