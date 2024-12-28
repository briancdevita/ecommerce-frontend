// utils/ToastConfig.tsx
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastConfig: React.FC = () => (
  <ToastContainer
    position="top-right"
    autoClose={3000} // Cierra automáticamente en 3 segundos
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored" // Tema predeterminado
  />
);

export default ToastConfig;
