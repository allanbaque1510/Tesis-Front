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
const historialReporteNominaCarreraDocenteMateria = (data) => {
  return axios.post(`/historialReporteNominaCarreraDocenteMateria`, data);
};

const registrarDatosExcelPeriodoTitulacion = (data) => {
  return axios.post("/registrarDatosExcelPeriodoTitulacion", data);
};
const eliminarDatosTasaDesercion = (data) => {
  return axios.post("/eliminarTasaDesercion", data);
};
const eliminarDatosTasaTitulacion = (data) => {
  return axios.post("/eliminarDatosTasaTitulacion", data);
};
const registrarDatosExcelNominaMateriaDocent = (data) => {
  return axios.post("/registrarDatosExcelNominaMateriaDocent", data);
};
const descargarFormatoPuntuacion = (data) => {
  return axios.post("/descargarFormatoPuntuacion", data, {
    responseType: "blob",
  });
};
const registrarDatosExcelNominaEstudiantesPeriodo = (data) => {
  return axios.post("/registrarDatosExcelNominaEstudiantesPeriodo", data);
};
const ExcelService = {
  registrarDatosExcelNominaEstudiantesPeriodo,
  registrarDatosExcel,
  descargarFormatoPuntuacion,
  obtenerHistorialPeriodoTasaDesercion,
  obtenerHistorialPeriodoTasaTitulacion,
  registrarDatosExcelPeriodoTitulacion,
  eliminarDatosTasaDesercion,
  eliminarDatosTasaTitulacion,
  registrarDatosExcelNominaMateriaDocent,
  historialReporteNominaCarreraDocenteMateria,
};

export default ExcelService;
