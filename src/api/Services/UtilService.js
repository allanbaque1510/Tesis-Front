import axios from "../axios";

const obtenerComboPeriodo = (data) => {
  return axios.post(`/obtenerComboPeriodo`, data);
};

const obtenerComboPeriodoTitulacion = (data) => {
  return axios.post(`/obtenerComboPeriodoTitulacion`, data);
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

const saveLogroAprendizaje = (data) => {
  return axios.post("/saveLogroAprendizaje", data);
};
const modificarLogroAprendizaje = (data) => {
  return axios.post("/modificarLogroAprendizaje", data);
};
const obtenerLogrosAprendizaje = () => {
  return axios.get(`/obtenerLogrosAprendizaje`);
};
const obtenerMaterias = (datos) => {
  return axios.get(`/obtenerMaterias/${datos.carrera}/${datos.periodos}`);
};

const obtenerPeriodoNominaCarreraDocenteMateria = (id_carrera) => {
  return axios.get(`/obtenerPeriodoNominaCarreraDocenteMateria/${id_carrera}`);
};

const obtenerPeriodoNominaCarreraDocenteMateriaConEstudiantes = (
  id_carrera
) => {
  return axios.get(
    `/obtenerPeriodoNominaCarreraDocenteMateriaConEstudiantes/${id_carrera}`
  );
};

const asignarLogrosAprendizajeMasivo = (data) => {
  return axios.post("/asignarLogrosAprendizajeMasivo", data);
};
const obtenerLogrosPeriodo = (data) => {
  return axios.post("/obtenerLogrosPeriodo", data);
};
const obtenerMateriasConLogros = (datos) => {
  return axios.get(
    `/obtenerMateriasConLogros/${datos.carrera}/${datos.periodos}`
  );
};
const clonarLogrosPorPeriodo = (data) => {
  return axios.post("/clonarLogrosPorPeriodo", data);
};

const asignarLogrosPorMateria = (data) => {
  return axios.post("/asignarLogrosPorMateria", data);
};
const obtenerMateriasLogrosPeriodo = (data) => {
  return axios.post("/obtenerMateriasLogrosPeriodo", data);
};
const obtenerDocentesPeriodoCarrera = (data) => {
  return axios.post("/obtenerDocentesPeriodoCarrera", data);
};
const subirAsignacionPuntosMasiva = (data) => {
  return axios.post("/subirAsignacionPuntosMasiva", data);
};
const obtenerDocenteMateria = (data) => {
  return axios.post("/obtenerDocenteMateria", data);
};
const obtenerLogrosAprendizajeDocente = (data) => {
  return axios.post("/obtenerLogrosAprendizajeDocente", data);
};

const obtenerGruposDocenteMateria = (data) => {
  return axios.post("/obtenerGruposDocenteMateria", data);
};

const obtenerReprobadosMateria = (data) => {
  return axios.post("/obtenerReprobadosMateria", data);
};

const obtenerComboPeriodoReprobados = (data) => {
  return axios.post("/obtenerComboPeriodoReprobados", data);
};

const obtenerReprobadoMateriaDetalle = (data) => {
  return axios.post("/obtenerReprobadoMateriaDetalle", data);
};

const obtenerComboPeriodoLogrosAprendizaje = (data) => {
  return axios.post("/obtenerComboPeriodoLogrosAprendizaje", data);
};

const obtenerComboMateriasLogrosAprendizaje = (data) => {
  return axios.post("/obtenerComboMateriasLogrosAprendizaje", data);
};

const getLogrosPorMateria = (data) => {
  return axios.post("/getLogrosPorMateria", data);
};

const obtenerReprobadosMateriaPorcentaje = (data) => {
  return axios.post("/obtenerReprobadosMateriaPorcentaje", data);
};

const obtenerReprobadoMateriaDetallePorcentaje = (data) => {
  return axios.post("/obtenerReprobadoMateriaDetallePorcentaje", data);
};

const obtenerDashboardLogros = (data) => {
  return axios.post("/obtenerDashboardLogros", data);
};

const UtilService = {
  obtenerDashboardLogros,
  obtenerPeriodoNominaCarreraDocenteMateriaConEstudiantes,
  obtenerReprobadoMateriaDetallePorcentaje,
  getLogrosPorMateria,
  obtenerReprobadosMateriaPorcentaje,
  obtenerComboMateriasLogrosAprendizaje,
  obtenerComboPeriodoReprobados,
  obtenerComboPeriodoLogrosAprendizaje,
  obtenerReprobadoMateriaDetalle,
  obtenerReprobadosMateria,
  obtenerGruposDocenteMateria,
  obtenerDocenteMateria,
  obtenerLogrosAprendizajeDocente,
  subirAsignacionPuntosMasiva,
  obtenerMateriasLogrosPeriodo,
  obtenerComboPeriodo,
  obtenerDataPeriodo,
  obtenerDataPeriodoTitulacion,
  obtenerDashboard,
  getComboCarreras,
  getConfiguracion,
  saveConfiguration,
  obtenerComboPeriodoTitulacion,
  saveLogroAprendizaje,
  obtenerLogrosAprendizaje,
  modificarLogroAprendizaje,
  obtenerMaterias,
  asignarLogrosAprendizajeMasivo,
  obtenerPeriodoNominaCarreraDocenteMateria,
  obtenerLogrosPeriodo,
  obtenerMateriasConLogros,
  clonarLogrosPorPeriodo,
  asignarLogrosPorMateria,
  obtenerDocentesPeriodoCarrera,
};

export default UtilService;
