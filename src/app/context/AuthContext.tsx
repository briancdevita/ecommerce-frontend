"use client";
import { jwtDecode } from "jwt-decode";
 // Asegúrate de tener instalada esta librería
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  username: string;
  email: string;
  roles: string[]; // Nuevo campo para los roles
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  console.log(user)

  useEffect(() => {
    // Cargar el token desde localStorage al iniciar
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      handleToken(storedToken);
    }
  }, []);

  const handleToken = (newToken: string) => {
    const decoded: any = jwtDecode(newToken);
    setUser({
      username: decoded.sub, // `sub` generalmente es el username
      email: decoded.email,
      roles: decoded.roles.map((role: any) => role.authority), // Adaptamos los roles
    });
    setToken(newToken);
  };

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    handleToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
