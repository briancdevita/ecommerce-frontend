"use client";

import {
  Box,
  Drawer,
  Typography,
  IconButton,
  Button,
  Divider,
  List,
  ListItem,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCartDrawer } from "@/app/context/CartDrawerContext";
import { useState } from "react";
import OrderSummaryModal from "./OrderSummaryModal";
import { removeItem } from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CouponInput from "./CouponInput";

export default function CartDrawer() {
  const { isOpen, closeDrawer } = useCartDrawer();
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const dispatch = useDispatch();

  // Seleccionar items y detalles del cupón desde el estado de Redux
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const couponCode = useSelector((state: RootState) => state.cart.couponCode);
  const discountPercentage = useSelector((state: RootState) => state.cart.discountPercentage);
  const couponStatus = useSelector((state: RootState) => state.cart.status);


  // Calcular subtotales y totales
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = (discountPercentage / 100) * subtotal;
  const finalTotal = subtotal - discount;

  return (
    <Drawer anchor="right" open={isOpen} onClose={closeDrawer}>
      <Box width={400} p={3} role="presentation" bgcolor="#f8f9fa">
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold">
            Your Cart
          </Typography>
          <IconButton onClick={closeDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <Box textAlign="center" py={5}>
            <ShoppingCartIcon sx={{ fontSize: 60, color: "#adb5bd" }} />
            <Typography variant="subtitle1" color="text.secondary" mt={2}>
              Your cart is empty.
            </Typography>
          </Box>
        ) : (
          <Box>
            {/* Product List */}
            <List disablePadding>
              {cartItems.map((item) => (
                <ListItem
                  key={item.product.id}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    py: 2,
                    px: 0,
                    borderBottom: "1px solid #e9ecef",
                  }}
                >
                  <Avatar
                    src={item.product.image || "https://via.placeholder.com/50"}
                    alt={item.product.name}
                    sx={{
                      width: 60,
                      height: 60,
                      mr: 2,
                      bgcolor: "#ffffff",
                      border: "1px solid #e9ecef",
                    }}
                  />
                  <Box flex={1}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.product.price.toFixed(2)} x {item.quantity}
                    </Typography>
                    <Button
                      size="small"
                      color="error"
                      sx={{ mt: 1, textTransform: "none" }}
                      onClick={() => dispatch(removeItem(item.product.id))}
                    >
                      Remove
                    </Button>
                  </Box>

                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ color: "#343a40", ml: 2 }}
                  >
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
            </List>

            {/* Total Section */}
            <Box mt={3} py={2} bgcolor="#ffffff" borderRadius={2} px={2} boxShadow={1}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" fontWeight="bold">
                  Subtotal
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                  ${subtotal.toFixed(2)}
                </Typography>
              </Box>
              {/* Mostrar descuento si hay un cupón aplicado */}
              {couponCode && (
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                  <Typography variant="subtitle1" fontWeight="bold" color="secondary.main">
                    Discount ({discountPercentage}%)
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="secondary.main">
                    -${discount.toFixed(2)}
                  </Typography>
                </Box>
              )}
              <Typography variant="body2" color="text.secondary" mt={1}>
                Taxes and shipping calculated at checkout.
              </Typography>
              {/* Mostrar el total final si hay un descuento */}
              {couponCode && (
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Total
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary.main">
                    ${finalTotal.toFixed(2)}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Input de Cupón */}
            <Box mt={3}> 
              <CouponInput />
            </Box>

            {/* Botón de Orden */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
              onClick={() => setShowOrderSummary(true)}
              disabled={cartItems.length === 0 || (couponStatus === 'loading')}
            >
              Proceed to Checkout {couponCode ? `($${finalTotal.toFixed(2)})` : `($${subtotal.toFixed(2)})`}
            </Button>

            {/* Modal de Resumen de Orden */}
            <OrderSummaryModal
              open={showOrderSummary}
              onClose={() => setShowOrderSummary(false)}
            />
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
