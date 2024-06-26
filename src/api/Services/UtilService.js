import axios from "../axios";

const obtenerComboPeriodo = (data) => {
  return axios.post(`/obtenerComboPeriodo`, data);
};

const obtenerDataPeriodo = (data) => {
  return axios.post(`/obtenerDataPeriodo`, data);
};

const obtenerDataPeriodoTitulacion = (data) => {
  return axios.post(`/obtenerDataPeriodoTitulacion`, data);
};

const obtenerDashboard = (data) => {
  return axios.post("/obtenerDashboard", data);
};

const getComboCarreras = () => {
  return axios.get("/comboCarreras");
};

const getConfiguracion = (id) => {
  return axios.get(`/getConfiguracion/${id}`);
};
const saveConfiguration = (data) => {
  return axios.post("/saveConfiguration", data);
};

const UtilService = {
  obtenerComboPeriodo,
  obtenerDataPeriodo,
  obtenerDataPeriodoTitulacion,
  obtenerDashboard,
  getComboCarreras,
  getConfiguracion,
  saveConfiguration,
};

export default UtilService;
