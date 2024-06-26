import React, { useEffect, useState } from 'react';
import DraggerComponent from '../../components/DraggerComponent';
import ExcelService from '../../api/Services/ExcelService';
import { activarModalResult } from '../../redux/reducer';
import { useDispatch } from 'react-redux';
import { loadingOn, loadingOff } from "../../redux/reducer";
import { Table,Divider,Tabs } from 'antd';
import moment from 'moment';
const SubirDocTasaDesercion = () => {
  const [dataPeriodo, setDataPeriodo] = useState([])
  const dispatch = useDispatch();
  const [archivo, setArchivo] = useState(null);

  const columnas = [
    {align:'right',key: 'numero',dataIndex: 'numero',title: '#'},
    {align:'center',key: 'periodo',dataIndex: 'periodo',title: 'Periodo'},
    {align:'center',key: 'anioInicio',dataIndex: 'anioInicio',title: 'Año Inicial'},
    {align:'center',key: 'anioFin',dataIndex: 'anioFin',title: 'Año Final'},
    {align:'center',key: 'ciclo',dataIndex: 'ciclo',title: 'Ciclo'},
    {align:'center',key: 'fecha_creacion',dataIndex: 'fecha_creacion', title: 'Fecha en que se subio'},
  ]
  const dataTable = dataPeriodo.map((x,index)=>{
    return {
      key:index,
      numero:index+1,
      periodo:x.codigo,
      anioInicio:x.anio_inicio,
      anioFin:x.anio_fin,
      ciclo:x.ciclo,
      fecha_creacion:moment(x.created_at).format('DD/MM/YYYY')
    }
  })
  const obtenerPeriodos = ()=>{
  dispatch(loadingOn());
    ExcelService.obtenerHistorialPeriodoTasaDesercion()
    .then(response=>{
      if(response.data.ok){
        setDataPeriodo(response.data.periodos)
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
      await ExcelService.registrarDatosExcel({"file":archivo})
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
      label: 'Historial de subida',
      children: <Table
      dataSource={dataTable}
      columns={columnas}
      />,
    }
  ]
  return (
    <div>
      <h2>Documentos del indicador tasa de deserción</h2>
      <Tabs items={items}/>
      
        <Divider/>
        
        
    </div>
  )
}

export default SubirDocTasaDesercion