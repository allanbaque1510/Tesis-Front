import axios from "../axios";

const registrarDatosExcel = (data) => {
  return axios.post(`/registrarDatosExcel`, data);
};

const ExcelService = {
  registrarDatosExcel,
};

export default ExcelService;
