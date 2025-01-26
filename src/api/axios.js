import axios from "axios";

const instance = axios.create({
    baseURL: "https://musicappbackend-production.up.railway.app/api",
});

// Interceptor para errores
instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Detén la impresión del error en consola
      return Promise.reject(error);
    }
  );
  
  export default instance;