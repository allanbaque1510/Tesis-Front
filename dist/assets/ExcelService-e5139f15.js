import{ay as o}from"./index-aff8c025.js";const t=r=>o.post("/registrarDatosExcel",r),a=r=>o.post("/obtenerHistorialPeriodoTasaDesercion",r),e=r=>o.post("/obtenerHistorialPeriodoTasaTitulacion",r),s=r=>o.post("/historialReporteNominaCarreraDocenteMateria",r),i=r=>o.post("/registrarDatosExcelPeriodoTitulacion",r),n=r=>o.post("/eliminarTasaDesercion",r),c=r=>o.post("/eliminarDatosTasaTitulacion",r),l=r=>o.post("/registrarDatosExcelNominaMateriaDocent",r),p=r=>o.post("/descargarFormatoPuntuacion",r,{responseType:"blob"}),u=r=>o.post("/registrarDatosExcelNominaEstudiantesPeriodo",r),d=r=>o.post("/historialReporteNominaGrupoEstudiantes",r),D=r=>o.post("/historialReporteReprobados",r),T=r=>o.post("/registrarDatosExcelReprobados",r),E=r=>o.post("/eliminarDatosArchivo",r),m=r=>o.post("/descargarExcelTasaTitulacion",r,{responseType:"blob"}),b=r=>o.post("/descargarExcelTasaReprobados",r,{responseType:"blob"}),x={descargarExcelTasaReprobados:b,descargarExcelTasaTitulacion:m,eliminarDatosArchivo:E,registrarDatosExcelReprobados:T,historialReporteReprobados:D,historialReporteNominaGrupoEstudiantes:d,registrarDatosExcelNominaEstudiantesPeriodo:u,registrarDatosExcel:t,descargarFormatoPuntuacion:p,obtenerHistorialPeriodoTasaDesercion:a,obtenerHistorialPeriodoTasaTitulacion:e,registrarDatosExcelPeriodoTitulacion:i,eliminarDatosTasaDesercion:n,eliminarDatosTasaTitulacion:c,registrarDatosExcelNominaMateriaDocent:l,historialReporteNominaCarreraDocenteMateria:s};export{x as E};