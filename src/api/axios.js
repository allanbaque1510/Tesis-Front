import axios from "axios";
import Cookies from "js-cookie";

const instancia = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

instancia.interceptors.request.use(
  (config) => {
    const cookie = Cookies.get().token;
    if (cookie) {
      config.headers.Authorization = `Bearer ${cookie}`;
    }

    // Agregar el encabezado 'Content-Type' para indicar que se envía un formulario de datos
    config.headers["Content-Type"] = "multipart/form-data";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instancia;
