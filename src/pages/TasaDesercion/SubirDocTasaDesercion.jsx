import React, { useEffect, useState } from 'react';
import DraggerComponent from '../../components/DraggerComponent';
import ExcelService from '../../api/Services/ExcelService';
import { activarModalResult } from '../../redux/reducer';
import { useDispatch } from 'react-redux';
import { loadingOn, loadingOff } from "../../redux/reducer";
import { Table,Tooltip,Tabs,Card } from 'antd';
import {setTwoToneColor,DeleteTwoTone} from '@ant-design/icons';
import moment from 'moment';
const SubirDocTasaDesercion = () => {
  const [dataPeriodo, setDataPeriodo] = useState([])
  const dispatch = useDispatch();
  const [archivo, setArchivo] = useState(null);
  setTwoToneColor("#FE7072")
  const columnas = [
    {align:'right',key: 'numero',dataIndex: 'numero',title: '#'},
    {align:'center',key: 'periodo',dataIndex: 'periodo',title: 'Periodo'},
    {align:'center',key: 'carrera',dataIndex: 'carrera',title: 'Carrera'},
    {align:'center',key: 'fecha_creacion',dataIndex: 'fecha_creacion', title: 'Fecha creacion'},
    {align:'center',key: 'accion',dataIndex: 'accion', title: 'Acción'},
  ]
  const eliminarDatos = (data,id_carrera) =>{
    ExcelService.eliminarDatosTasaDesercion({id:data,id_carrera})
    .then(response=>{
      console.log(response)
      obtenerPeriodos()
    })
    .catch(error=>{
      console.log(error)
    })
  }
  const dataTable = dataPeriodo.map((x,index)=>{
    return {
      key:index,
      numero:index+1,
      periodo:x.codigo,
      carrera:x.carrera,
      fecha_creacion:moment(x.created_at).format('DD/MM/YYYY'),
      accion:<Tooltip title={"Borrar todos los datos de este periodo"}><DeleteTwoTone onClick={()=>eliminarDatos(x.id,x.id_carrera)}  style={{fontSize:'25px',cursor:'pointer'}} /></Tooltip>,
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
      label: 'Archivos subidos',
      children: <Table
      dataSource={dataTable}
      columns={columnas}
      />,
    }
  ]
  return (
    <div>
      <h2>Documentos del indicador tasa de deserción</h2>
      <Card>
        <Tabs items={items}/>
      </Card>
    </div>
  )
}

export default SubirDocTasaDesercion