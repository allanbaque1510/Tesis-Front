import React, { lazy } from "react";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(()=>import('./pages/Dashboard'))
const SubirDocumentoTasaDesercion= lazy(()=>import('./pages/TasaDesercion/SubirDocTasaDesercion'))
const VisualizarDatosTD= lazy(()=>import('./pages/TasaDesercion/VisualizarDatosTD'))
const Configuracion=  lazy(()=>import('./pages/Configuracion'))
const VisualizarDatosTT = lazy(()=>import('./pages/TasaTitulacion/VisualizarDatosTT'))
const SubirDocTasaTitulacion = lazy(()=>import('./pages/TasaTitulacion/SubirDocTasaTitulacion'))
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
    }
  ];
}

