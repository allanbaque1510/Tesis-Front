import React, { useEffect, useState } from 'react'
import { Tabs, Table,Button,Row,Tooltip,Card,Alert } from 'antd'
import {EditOutlined} from '@ant-design/icons';
import ModalAgregarLogro from './GestionLogroComponent/ModalAgregarLogro'
import UtilService from '../../api/Services/UtilService'
import { useDispatch } from 'react-redux';
import { loadingOff, loadingOn,activarModalResult} from '../../redux/reducer';
import ModalModificarLogro from './GestionLogroComponent/ModalModificarLogro';
import AsignarLogrosAprendizajeMasivo from './GestionLogroComponent/AsignarLogrosAprendizajeMasivo';
import ClonarAsignacion from './GestionLogroComponent/ClonarAsignacion';
import AsignarLogrosMateria from './GestionLogroComponent/AsignarLogrosMateria';
import CargaMasivaPuntos from './PuntuacionLogros/CargaMasivaPuntuacion';
const GestionLogros = () => {
  const [statusModalAgg, setStatusModalAgg] = useState(false)
  const [statusModalMod, setStatusModalMod] = useState(false)
  const [datosModificar, setDatosModificar] = useState({})
  
  const [keyTab , setKeyTab] = useState(1) 
  const [datos , setDatos] = useState([]) 
  const dispatch = useDispatch();

  const columnsLogros = [
    {align:'center',key: 'codigo',dataIndex: 'codigo',title: 'Codigo'},
    {align:'center',key: 'descripcion',dataIndex: 'descripcion',title: 'Descripción'},
    {align:'center',key: 'accion',dataIndex: 'accion',title: 'Acción'},
  ];

  const getData =()=>{
    switch (keyTab) {
        case 1:
            dispatch(loadingOn());
            UtilService.obtenerLogrosAprendizaje()
            .then(response=>{
                if(response.data.ok){
                    setDatos(response.data.data.map((x,y)=>{
                        return{
                            key:y,
                            id_logros:x.id_logros,
                            descripcion:x.descripcion,
                            codigo:x.codigo,
                            accion:<Tooltip title="Modificar descripcion"><EditOutlined  onClick={()=>{setStatusModalMod(true); setDatosModificar(x)}} /></Tooltip>,
                        }
                    }))
                }
            }) 
            .catch(error=>{
                dispatch(activarModalResult({
                    success:false,
                    title:"Error al agregar logro de aprendizaje",
                    message:error.response.data.error,
                  }))
            })
            .finally(()=>{dispatch(loadingOff())})
            
            break;
    
        default:
            break;
    }

  }
  useEffect(() => {
    getData()
  }, [keyTab])

  const tabChange = (data)=>{
    setKeyTab(data)
  }
    const itemsAsignacion = [
      {
        key:'2.1',
        label:'Asignación por materia',
        children:<AsignarLogrosMateria/>,
      },
      {
        key:'2.2',
        label:'Asignación masiva',
        children:<AsignarLogrosAprendizajeMasivo/>,
      },
      {
        key:'2.3',
        label:'Clonar desde periodo',
        children:<ClonarAsignacion/>,
      }
    ]
    // const itemsPuntuacion =[
    //   {
    //     key:'3.1',
    //     label:'Carga Masiva',
    //     children:<CargaMasivaPuntos/>
    //   },
    // ]

    const items = [
    {
        key: '1',
        label: 'Logros aprendizaje',
        children:<>
                    <ModalModificarLogro cerrar={()=>setStatusModalMod(false)} setData={setDatos} data={datosModificar} status={statusModalMod} title="Modificar logro de aprendizaje" />
                    <Row justify={'end'} style={{margin:'10px'}}>
                        <Button type='primary' onClick={()=>setStatusModalAgg(true)}>Agregar Logro </Button>
                    </Row>
                    <ModalAgregarLogro cerrar={()=>setStatusModalAgg(false)} setData={getData} status={statusModalAgg} title={"Agregar logro de aprendizaje"} />
                    <Table columns={columnsLogros} dataSource={datos} />
                </>

      },
      {
        key: '2',
        label: 'Asignar logros por materia',
        children:<Tabs items={itemsAsignacion}/>
      },
      // {
      //   key: '3',
      //   label: 'Asignar puntuacion',
      //   children:<Tabs items={itemsPuntuacion}/>
      // }
  ]
return (
    <div>
        <h2>Gestion de logros de aprendizaje</h2>
        <Card>
        <Alert style={{marginBlock:'10px'}} message={<>Aqui se mostraran los datos de los archivos ingresados en el <b>REPORTE NOMINA CARRERA DOCENTE MATERIA</b></>}  type="info" showIcon closable/>
        <Tabs onChange={tabChange} items={items}/>
        </Card>
    </div>
  )
}

export default GestionLogros