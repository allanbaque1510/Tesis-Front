import axios from "axios";
import Cookies from "js-cookie";

const instancia = axios.create({
  baseURL: "http://localhost:8000/api",
  // baseURL: "https://tesis.siglotecnologico.com/api",
  withCredentials: true,
});

instancia.interceptors.request.use((config) => {
  const cookie = Cookies.get().token;
  if (cookie) {
    config.headers.Authorization = `Bearer ${cookie}`;
  }
  config.headers["Content-Type"] = "multipart/form-data";
  return config;
});

export default instancia;
