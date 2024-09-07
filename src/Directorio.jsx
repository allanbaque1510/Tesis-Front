import React, { lazy } from "react";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(()=>import('./pages/Dashboard'))
const SubirDocumentoTasaDesercion= lazy(()=>import('./pages/TasaDesercion/SubirDocTasaDesercion'))
const VisualizarDatosTD= lazy(()=>import('./pages/TasaDesercion/VisualizarDatosTD'))
const Configuracion=  lazy(()=>import('./pages/Configuracion'))
const VisualizarDatosTT = lazy(()=>import('./pages/TasaTitulacion/VisualizarDatosTT'))
const SubirDocTasaTitulacion = lazy(()=>import('./pages/TasaTitulacion/SubirDocTasaTitulacion'))
const GestionLogros = lazy(()=>import('./pages/LogrosAprendizaje/GestionLogros'))
const NominaMateriasDoc = lazy(()=>import('./pages/NominaMaterias/SubirDocMaterias'))
const NominaEstudiantesDoc = lazy(()=>import('./pages/NominaEstudiantesPeriodo/SubirDocEstudiantes'))
const SubirPuntuacion = lazy(()=>import('./pages/LogrosAprendizaje/PuntuacionLogros/CargaMasivaPuntuacion'))
const VisualizarDatosTR= lazy(()=>import('./pages/TasaReprobados/VisualizarDatosTR'))

const VisualizarDatosPorcentajeTR= lazy(()=>import('./pages/TasaReprobados/VisualizarDatosPorcentajeTR'))

const VisualizarDatosLA= lazy(()=>import('./pages/LogrosAprendizaje/VisualizarDatosLA'))
const SubirDocTasaReprobados = lazy(()=>import('./pages/TasaReprobados/SubirDocTasaReprobados'))

export const directorioLogin = () => {
  return[ 
    {
      path:"/login",
      key:"login",
      element:Login
    }
  ];  
};

export const directorioRutasProtegidas=()=>{
  return[ 
    {
      path:"dashboard",
      key:"dashboard",
      element:Dashboard
    },{
      path:'tasa_desercion/subir_documento',
      key:"tasa_desercion/subir_documento",
      element:SubirDocumentoTasaDesercion
    },
    {
      path:'tasa_desercion/datos',
      key:"tasa_desercion/datos",
      element:VisualizarDatosTD
    },
    
    {
      path:'tasa_titulacion/datos',
      key:"tasa_titulacion/datos",
      element:VisualizarDatosTT
    },
    
    {
      path:'tasa_titulacion/subir_documento',
      key:"tasa_titulacion/subir_documento",
      element:SubirDocTasaTitulacion
    },
    {
      path:'configuracion',
      key:"configuracion",
      element:Configuracion
    },
    {
      path:'logros_aprendizaje/gestion_logros',
      key:'logros_aprendizaje/gestion_logros',
      element:GestionLogros
    },
    {
      path:"nomina_materias/subir_documento",
      key:"nomina_materias/subir_documento",
      element:NominaMateriasDoc
    },
    {
      path:"logros_aprendizaje/puntuacion",
      key:"logros_aprendizaje/puntuacion",
      element:SubirPuntuacion
    },
    {
      path:'nomina_estudiante/subir_documento',
      key:"nomina_estudiante/subir_documento",
      element:NominaEstudiantesDoc
    },
    {
      path:'tasa_reprobados/subir_documento',
      key:"tasa_reprobados/subir_documento",
      element:SubirDocTasaReprobados
    },
    {
      path:'tasa_reprobados/datos',
      key:'tasa_reprobados/datos',
      element:VisualizarDatosTR
    },
    {
      path:'tasa_reprobados/datos_porcentaje',
      key:'tasa_reprobados/datos_porcentaje',
      element:VisualizarDatosPorcentajeTR
    },  
    {
      path:'logros_aprendizaje/datos',
      key:'logros_aprendizaje/datos',
      element:VisualizarDatosLA
    }
    
  ];
}

