import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
});



axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } 
    return config;
})


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("No autorizado. Redirigiendo al login.");
      window.location.href = "/login"; // Redirige al login si el token es inválido
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;