import React, { useEffect, useState } from 'react'
import { Select,Form,Col,Row,Alert,Card,Statistic,Typography, Table,Empty  } from 'antd'
import { useDispatch } from 'react-redux';
import {TeamOutlined} from '@ant-design/icons';
import { loadingOn,activarModalResult, loadingOff } from "../../redux/reducer";
import { Line } from '@ant-design/plots';

import UtilService from '../../api/Services/UtilService'
const VisualizarDatosLA = () => {
    const [comboPeriodo, setComboPeriodo] = useState([])
    const [comboCarreras, setComboCarreras] = useState([])
    const [comboMateria, setComboMateria] = useState([])
    
    const [dataSource, setDataSource] = useState([])

  
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const obtenerPeriodos = (id_carrera)=>{
   UtilService.obtenerComboPeriodoLogrosAprendizaje({id_carrera})
   .then(response=>{
        if(response.data.ok){
              setComboPeriodo(response.data.data)
        }
   })
  }

  
  const obtenerComboMateriasLogrosAprendizaje = ()=>{
    const datos = form.getFieldsValue()
    UtilService.obtenerComboMateriasLogrosAprendizaje(datos)
    .then(response=>{
         if(response.data.ok){
          setComboMateria(response.data.data)
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

  const getLogrosPorMateria=()=>{
    dispatch(loadingOn());
    const dataEnviar = form.getFieldsValue()
    UtilService.getLogrosPorMateria(dataEnviar)
    .then(response=>{
      if(response.data.ok){
        setDataSource(response.data.data)
      }
    }) 
    .catch(error=>{
        dispatch(activarModalResult({
          success:false,
          title:"Error al obtener datos",
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
        <h2>Datos logros de aprendizaje</h2>
        <Row>
        <Card style={{width:'100%'}}>
          <Form
              form={form}
              layout="vertical"
          >
            <Row justify={ 'space-around'}>
              <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                <Form.Item
                    label="Carrera"
                    name="carrera"
                    >
                    <Select
                        placeholder="Seleccione una carrera"
                        options={comboCarreras}
                        onChange={(value)=>{
                          obtenerPeriodos(value)
                          form.resetFields(["periodo","materia"])
                          }}
                          />
                </Form.Item>
              </Col>
                  
              <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                <Form.Item
                    label="Periodo"
                    name="periodo"
                    >
                    <Select
                        placeholder="Seleccione un periodo"
                        options={comboPeriodo}
                        onChange={obtenerComboMateriasLogrosAprendizaje}
                          />
                </Form.Item>
              </Col>

              
              <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                <Form.Item
                    label="Materia"
                    name="materia"
                    >
                    <Select
                    showSearch
                        placeholder="Seleccione una materia"
                        options={comboMateria}
                        onChange={getLogrosPorMateria}
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                          />
                </Form.Item>
              </Col>

            </Row>
          </Form>
        </Card>
      </Row>
      
      <Card title="Logros aprendizaje">
        
          {dataSource.map((x,y)=>(
              <Card.Grid style={{width:dataSource.length > 1?'50%':'100%' }}>
                  <Card>
                    <Card.Grid
                      style={{ 
                        width:'100%', 
                        backgroundColor:'#0161DA'
                      }}
                    >
                      <Typography.Title style={{color:'white'}}  level={3}>{x.grupo}</Typography.Title>
                      <Row justify={'space-between'}>
                          <Typography.Title style={{color:'white'}}  level={4}>Cantidad estudiantes: {x.cantidad_estudiantes}</Typography.Title>
                          <Typography.Text style={{color:'white', fontSize: '3em', fontWeight: 'bold' }}><TeamOutlined /></Typography.Text>
                      </Row>
                    </Card.Grid>
                  </Card>
                
                  <Line
                    style={{width:'100%'}}
                    data={x.datos}
                    xField={'logro'}
                    yField={'porcentaje'}
                    title={x.docente}
                  />
              </Card.Grid>
          ))}
      </Card>

    </div>
  )
}

export default VisualizarDatosLA