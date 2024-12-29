"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { login } from "@/redux/slices/authSlice"; // Importamos la acción de login
import { jwtDecode } from "jwt-decode";


const withAuth = (WrappedComponent: React.FC) => {
  const Wrapper: React.FC = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { token } = useSelector((state: RootState) => state.auth);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const storedToken = localStorage.getItem("token");

      if (storedToken && !token) {
        // Decodificamos el token para obtener el usuario y roles
        const decoded: any = jwtDecode(storedToken);
        const user = { username: decoded.sub, roles: decoded.roles || [] };

        // Sincronizamos el token y el usuario en el estado global
        dispatch(login({ token: storedToken, user }));
        setLoading(false);
      } else if (!storedToken) {
        router.push("/products"); // Redirige si no hay token
      } else {
        setLoading(false); // Finaliza el loading si todo está en orden
      }
    }, [token, dispatch, router]);

    if (loading) {
      return <div>Loading...</div>; // Placeholder mientras se verifica
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
