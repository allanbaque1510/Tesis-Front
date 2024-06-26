import React, { useEffect,useState } from 'react'
import UtilService from '../api/Services/UtilService'
import { useDispatch,useSelector } from 'react-redux';
import {Row, Select, Col, Form, Alert} from 'antd'
import { loadingOn,activarModalResult, loadingOff } from "../redux/reducer";
import { Tag } from 'antd';
import Medidor from '../components/Medidor';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [dashboard, setDashboard] = useState([])
  const [comboPeriodo, setComboPeriodo] = useState([])
  const [comboCarreras, setComboCarreras] = useState([])
  const [labelDashboard, setLabelDashboard] = useState({carrera:'',periodo:''})
  const [existePeriodo, setExistePeriodo] = useState(true)
  
  const [form] = Form.useForm();
  const obtenerPeriodos = (id_carrera, label)=>{
    setLabelDashboard({...labelDashboard,carrera:label.label})
    UtilService.obtenerComboPeriodo({id_carrera})
    .then(response=>{
         if(response.data.ok){
          if(response.data.data.configuracion === null){
            setExistePeriodo(false)
          }else{
            const periodos =response?.data?.data?.periodo.map((x,y)=>{
              return{
                value:x.value,
                label:x.label,
                disabled:(response?.data?.data?.periodo.length - response.data.data.configuracion.periodos_desercion ) < y ,
              }
            }) 
            setComboPeriodo(periodos)
          }
         }
    })
   }
 

   const getComboCarreras = () =>{
     UtilService.getComboCarreras()
     .then(response=>{
         if(response.data.ok){
             setComboCarreras(response.data.data)
         }
     })
   }

   
  const obtenerDashboard = (value,label) =>{
    setLabelDashboard({...labelDashboard,periodo:label.label})
    const datos = form.getFieldsValue()
    dispatch(loadingOn());
     UtilService.obtenerDashboard(datos)
      .then(response=>{
        if(response.data.ok){
          console.log(response.data.data)
          setDashboard(response.data.data)
        }
      })
      .catch(error=>{
        dispatch(activarModalResult({
          success:false,
          title:"Error al obtener datos del dashboard",
          message:error.response.data.error,
        }))
      })
      .finally(()=>dispatch(loadingOff()))
  }
  useEffect(() => {
    getComboCarreras()
  }, [])


 
  return (
    <div>
      <h1>Dashboard</h1>
        
      <Form
      form={form}
      >
        {!existePeriodo && <Alert message="No existen datos de configuracion" description="Asigne los datos de configuracion para esta carrera antes de continuar" type="warning" showIcon/>}
       <Row style={{marginTop:'20px'}}>
        <Col>
              <Form.Item
                  label="Carrera"
                  name="carrera"
                  >
                  <Select
                      placeholder="Seleccione una carrera"
                      options={comboCarreras}
                      onChange={obtenerPeriodos}
                        />
            </Form.Item>
          </Col>
                  
            <Col>
        <Form.Item
            label="Periodo"
            name="periodo"
            >
            <Select
                placeholder="Seleccione un periodo"
                options={comboPeriodo}
                onChange={obtenerDashboard}
                  />
    </Form.Item>
                  </Col>
                  </Row>
                  </Form>
        {dashboard?.desercion &&
          <Medidor
            target={dashboard?.desercion?.nivelacion - dashboard?.desercion?.actual}
            total={dashboard?.desercion?.nivelacion}
            title='Tasa de deserción'
          />
        }

        {dashboard?.titulacion &&
          <Medidor
            target={ dashboard?.titulacion?.titulados}
            total={dashboard?.titulacion?.nivelacion}
            title='Tasa de Titulacion'
          />
        }
    </div>
  )
}

export default Dashboard