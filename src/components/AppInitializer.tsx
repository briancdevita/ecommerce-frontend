
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import { jwtDecode } from "jwt-decode";

const AppInitializer = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token && !user) {
      try {
        // Decodifica el token y establece el usuario
        const decoded: any = jwtDecode(token);
        dispatch(
          login({
            token,
            user: {
              username: decoded.sub,
              email: decoded.email,
              roles: decoded.roles,
            },
          })
        );
      } catch (error) {
        console.error("Error decoding token:", error);
        // Aquí podrías desloguear al usuario si el token es inválido
      }
    }
  }, [token, user, dispatch]);

  return null;
};

export default AppInitializer;
