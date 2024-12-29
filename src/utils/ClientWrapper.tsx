import React from "react";
import ClientWrapper from "@/utils/ClientWrapper"; // Ajusta la ruta según tu proyecto

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ClientWrapper requiredRole="ADMIN">
      <div>
        {/* Sidebar y layout principal */}
        {children}
      </div>
    </ClientWrapper>
  );
};

export default AdminLayout;
