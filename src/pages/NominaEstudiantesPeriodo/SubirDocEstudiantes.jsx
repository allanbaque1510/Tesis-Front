import React, { useEffect, useState } from 'react'
import { Tabs, Card ,Table} from 'antd'
import DraggerComponent from '../../components/DraggerComponent'
import { useDispatch } from 'react-redux';
import UtilService from '../../api/Services/UtilService'
import ExcelService from '../../api/Services/ExcelService'
import { loadingOff,loadingOn,activarModalResult } from '../../redux/reducer';
const SubirDocEstudiantes = () => {
    const [archivo, setArchivo] = useState(null)
    const [dataTable, setDataTable] = useState([])
    const dispatch = useDispatch();
    const handleArchivoChange =  (documento) =>{
        setArchivo(documento)
    }
    const columnas = [
        {align:'center',key: 'carrera',dataIndex: 'carrera',title: 'Carrera'},
        {align:'center',key: 'periodo',dataIndex: 'periodo',title: 'Periodo'},
        {align:'center',key: 'fecha',dataIndex: 'fecha', title: 'Fecha creacion'},
        {align:'center',key: 'accion',dataIndex: 'accion', title: 'Acción'},
      ]
    const obtenerHistorial = () =>{
        dispatch(loadingOn())
        ExcelService.historialReporteNominaCarreraDocenteMateria()
        .then(response=>{
            if(response.data.ok){
                setDataTable(response.data.data)
            }
        })
        .catch(error=>{
            console.log(error.response.data)
            dispatch(activarModalResult({
              success:false,
              title:"Error al obtener el historial",
              message:error.response.data.error,
            }))
          })
          .finally(()=>{dispatch(loadingOff());
          })
    }
    useEffect(() => {
      obtenerHistorial()
    }, [])
    
    const registrarDatosExcel = () =>{
        dispatch(loadingOn())
        ExcelService.registrarDatosExcelNominaEstudiantesPeriodo({file:archivo})
        .then(response=>{
            dispatch(activarModalResult({
                success:true,
                title:"Registro subido exitosamente!",
              }))
        })
        .catch(error=>{
          console.log(error)
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
            <h2>Documentos del reporte de nomina de estudiantes por periodo</h2>
            <Card>

            <Tabs
                items={items}
                />
                </Card>
            
        </div>
    )
}

export default SubirDocEstudiantes