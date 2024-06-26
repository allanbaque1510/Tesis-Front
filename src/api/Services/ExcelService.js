import axios from "../axios";

const registrarDatosExcel = (data) => {
  return axios.post(`/registrarDatosExcel`, data);
};

const obtenerHistorialPeriodoTasaDesercion = (data) => {
  return axios.post(`/obtenerHistorialPeriodoTasaDesercion`, data);
};

const obtenerHistorialPeriodoTasaTitulacion = (data) => {
  return axios.post(`/obtenerHistorialPeriodoTasaTitulacion`, data);
};

const registrarDatosExcelPeriodoTitulacion = (data) => {
  return axios.post("/registrarDatosExcelPeriodoTitulacion", data);
};
const ExcelService = {
  registrarDatosExcel,
  obtenerHistorialPeriodoTasaDesercion,
  obtenerHistorialPeriodoTasaTitulacion,
  registrarDatosExcelPeriodoTitulacion,
};

export default ExcelService;
