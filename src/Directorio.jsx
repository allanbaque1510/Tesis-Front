import React, { lazy } from "react";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(()=>import('./pages/Dashboard'))
const SubirDocumento= lazy(()=>import('./pages/SubirDoc'))
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
      path:'subir_documento',
      key:"subir_documento",
      element:SubirDocumento
    }
  ];
}

