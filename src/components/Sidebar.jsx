import React from 'react'
import { useNavigate } from "react-router-dom";
import { Tooltip  } from 'antd'

import {BarChartOutlined,ReconciliationOutlined,ProductOutlined,SettingOutlined,ReadOutlined,RocketOutlined, UploadOutlined,FallOutlined,BookOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
const Sidebar = () => {
  const navigate = useNavigate();

  const items = [
    { icon: <ProductOutlined />, link: '/dashboard', label: 'Dashboard', key: '1' },
    {
       label:<Tooltip title="Tasa de deserción"  placement="left">Tasa de deserción</Tooltip>, icon:<Tooltip title="Tasa de deserción"><FallOutlined /></Tooltip>, key: '2', children: [
        { icon:<Tooltip title="Tasa de deserción - Subir documento"><UploadOutlined /></Tooltip>, link: '/tasa_desercion/subir_documento', label: 'Documentos', key: '2.1' },
        { icon:<Tooltip title="Tasa de deserción - Datos e información"><BarChartOutlined /></Tooltip> , link: '/tasa_desercion/datos', label: 'Datos', key: '2.2' },
      ]
    },
    {
      label:<Tooltip title="Tasa de titulación"  placement="left">Tasa de titulación</Tooltip>,icon:<Tooltip title="Tasa de titulación"><BookOutlined /></Tooltip>, key: '3', children: [
       { icon:<Tooltip title="Tasa de titulación - Subir Documento"><UploadOutlined /></Tooltip> , link: '/tasa_titulacion/subir_documento', label: 'Documentos', key: '3.1' },
       { icon:<Tooltip title="Tasa de titulación - Datos e información"><BarChartOutlined /></Tooltip>, link: '/tasa_titulacion/datos', label: 'Datos', key: '3.2' },
     ]
   },
   {
    label:<Tooltip title="Logros de aprendizaje"  placement="left">Logros de aprendizaje</Tooltip>, icon:<Tooltip title="Logros de aprendizaje"><RocketOutlined /></Tooltip>,key: '4', children: [
     { icon:<Tooltip title="Logros de aprendizaje - Gestionar Logros"><ReconciliationOutlined /></Tooltip>, link: '/logros_aprendizaje/gestion_logros', label: 'Gestionar logros', key: '4.1' },
     { icon:<Tooltip title="Logros de aprendizaje - Puntuación"><BarChartOutlined /></Tooltip>, link: '/logros_aprendizaje/puntuacion', label: 'Puntuación', key: '4.2' },
    //  { icon:<Tooltip title="Logros de aprendizaje - Datos e informacion"><BarChartOutlined /></Tooltip>, link: '/tasa_titulacion/datos', label: 'Datos', key: '4.2' },
    ]
   },
   {
    label:<Tooltip title="Nomina carrera docente materia"  placement="left">Nomina carrera docente materia</Tooltip>, icon:<Tooltip title="Nomina carrera docente materia"><ReadOutlined /></Tooltip>,key: '5', children: [
      { icon:<Tooltip title="Nomina materias - Subir documento"><UploadOutlined /></Tooltip>, link: '/nomina_materias/subir_documento', label: 'Documentos', key: '5.1' },
    //  { icon: <BarChartOutlined />, link: '/tasa_titulacion/datos', label: 'Datos', key: '4.2' },
    ]
   },
   {
    label:<Tooltip title="Nomina de estudiantes por periodo"  placement="left">Nomina estudiantes periodo</Tooltip>, icon:<Tooltip title="Nomina de estudiantes por periodo"><ReadOutlined /></Tooltip>,key: '6', children: [
      { icon:<Tooltip title="Nomina de estudiantes por periodo - Subir documento"><UploadOutlined /></Tooltip>, link: '/nomina_estudiante/subir_documento', label: 'Documentos', key: '6.1' },
    //  { icon: <BarChartOutlined />, link: '/tasa_titulacion/datos', label: 'Datos', key: '4.2' },
    ]
   },


    { icon: <SettingOutlined />, link: '/configuracion', label:<Tooltip title="Configuración"  placement="left">Configuración</Tooltip>, key: '13' },

  ];

  const seleccionado = (data) => {
    navigate(data.item.props.link)
  }

  return (
    <Menu theme="dark" onSelect={seleccionado} mode="inline"  items={items} />
  )
}

export default Sidebar