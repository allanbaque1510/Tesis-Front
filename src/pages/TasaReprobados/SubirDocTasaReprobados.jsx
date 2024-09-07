import React, { useEffect, useState } from 'react';
import DraggerComponent from '../../components/DraggerComponent';
import ExcelService from '../../api/Services/ExcelService';
import { activarModalResult } from '../../redux/reducer';
import { useDispatch } from 'react-redux';
import { loadingOn, loadingOff } from "../../redux/reducer";
import { Table,Tooltip,Tabs,Card } from 'antd';
import {setTwoToneColor,DeleteTwoTone} from '@ant-design/icons';

import moment from 'moment';
const SubirDocTasaReprobados = () => {
  const [dataPeriodo, setDataPeriodo] = useState([])
  setTwoToneColor("#FE7072")
  const dispatch = useDispatch();
  const [archivo, setArchivo] = useState(null);

  const columnas = [
    {align:'right',key: 'numero',dataIndex: 'numero',title: '#'},
    {align:'center',key: 'periodo',dataIndex: 'periodo',title: 'Periodo'},
    {align:'center',key: 'carrera',dataIndex: 'carrera',title: 'Carrera'},
    {align:'center',key: 'fecha_creacion',dataIndex: 'fecha_creacion', title: 'Fecha creacion'},
    {align:'center',key: 'accion',dataIndex: 'accion', title: 'Acción'},
  ]
  const eliminarDatos = (id) =>{
    ExcelService.eliminarDatosArchivo({id})
    .then(response=>{
      obtenerPeriodos()
    })
    .catch(error=>{
      dispatch(activarModalResult({
        success:false,
        title:"Error al eliminar los datos",
        message:error.response.data.error,
      }))
    })
  }

  const dataTable = dataPeriodo?.map((x,index)=>{
    return {
      key:index,
      numero:index+1,
      periodo:x.periodo,
      carrera:x.carrera,
      fecha_creacion:moment(x.created_at).format('DD/MM/YYYY'),
      accion:<Tooltip title={"Borrar todos los datos de este periodo"}><DeleteTwoTone onClick={()=>eliminarDatos(x.id)}  style={{fontSize:'25px',cursor:'pointer'}} /></Tooltip>,
    }
  })
  
  
  const obtenerPeriodos = ()=>{
  dispatch(loadingOn());
    ExcelService.historialReporteReprobados()
    .then(response=>{
      if(response.data.ok){
        setDataPeriodo(response.data.data)
      }
    })
    .catch(error=>{
      dispatch(activarModalResult({
        success:false,
        title:"Error al cargar datos del excel",
        message:error.response.data.error,
      }))
    })
    .finally(()=>dispatch(loadingOff()))
  }

  useEffect(() => {
    obtenerPeriodos()
  }, [])
  
  const handleArchivoChange = (nuevoArchivo) => {
    setArchivo(nuevoArchivo);
  };

  const registrarDatosExcel = async () =>{
    dispatch(loadingOn());
      await ExcelService.registrarDatosExcelReprobados({"file":archivo})
      .then((response)=>{
        if(response.data.ok){
          dispatch(activarModalResult({
            success:true,
            title:response.data.message,
            message:"",
          }))
          obtenerPeriodos()
        }
      })
      .catch(error=>{
        dispatch(activarModalResult({
          success:false,
          title:"Error al cargar datos del excel",
          message:error.response.data.error,
        }))
      })
      .finally(()=>{dispatch(loadingOff());
      })
    }

  const items = [
    {
      key: '1',
      label: 'Subir Documento',
      children: <DraggerComponent 
                      onArchivoChange={handleArchivoChange}      
                      funcionEnviarDatos={registrarDatosExcel}
                />,
    },
    {
      key: '2',
      label: 'Archivos subidos',
      children: <Table
      dataSource={dataTable}
      columns={columnas}
      />,
    }
  ]
  return (
    <div>
      <h2>Documentos del indicador tasa de reprobados</h2>
      <Card>
        <Tabs items={items}/>
      </Card>      
      
        
        
    </div>
  )
}

export default SubirDocTasaReprobados