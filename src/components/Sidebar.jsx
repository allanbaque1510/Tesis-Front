import React from 'react'
import { useNavigate } from "react-router-dom";
import {BarChartOutlined,ProductOutlined,SettingOutlined, UploadOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
const Sidebar = () => {
  const navigate = useNavigate();

  const items = [
    { icon: <ProductOutlined />, link: '/dashboard', label: 'Dashboard', key: '1' },
    {
       label: 'Tasa de deserción', key: '2', children: [
        { icon: <UploadOutlined />, link: '/tasa_desercion/subir_documento', label: 'Subir documento', key: '2.1' },
        { icon: <BarChartOutlined />, link: '/tasa_desercion/datos', label: 'Visualizar Datos', key: '2.2' },
      ]
    },
    {
      label: 'Tasa de Titulación', key: '3', children: [
       { icon: <UploadOutlined />, link: '/tasa_titulacion/subir_documento', label: 'Subir documento', key: '3.1' },
       { icon: <BarChartOutlined />, link: '/tasa_titulacion/datos', label: 'Visualizar Datos', key: '3.2' },
     ]
   },
    { icon: <SettingOutlined />, link: '/configuracion', label: 'Configuracion', key: '13' },

  ];

  const seleccionado = (data) => {
    navigate(data.item.props.link)
  }

  return (
    <Menu theme="dark" onSelect={seleccionado} mode="inline"  items={items} />
  )
}

export default Sidebar