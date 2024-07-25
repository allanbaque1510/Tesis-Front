import React, { useEffect, useState } from 'react'
import { Select,Form,Col,Row,Alert,Card,Statistic,Typography  } from 'antd'
import { useDispatch } from 'react-redux';
import {TeamOutlined,DashboardOutlined} from '@ant-design/icons';
import { loadingOn,activarModalResult, loadingOff } from "../../redux/reducer";
import { Line,Bar,Pie } from '@ant-design/plots';
import { Liquid } from '@ant-design/charts';

import UtilService from '../../api/Services/UtilService'
const VisualizarDatosTT = () => {
    const [comboPeriodo, setComboPeriodo] = useState([])
    const [comboCarreras, setComboCarreras] = useState([])
    const [comboTipoGrafico, setComboTipoGrafico] = useState([])
    const [tipoGrafico, setTipoGrafico] = useState(0)
    const [existeConfigCarrera, setExisteConfigCarrera] = useState(true)
    const [dataReferencia, setDataReferencia] = useState([])

    const [dataEstudiantesPeriodo, setDataEstudiantesPeriodo] = useState([])
  
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const obtenerPeriodos = (id_carrera)=>{
   UtilService.obtenerComboPeriodoTitulacion({id_carrera})
   .then(response=>{
        if(response.data.ok){
            if(response.data.data.configuracion === null){
              setExisteConfigCarrera(false)
            }else{
              setComboPeriodo(response.data.data.periodo)
              setComboTipoGrafico(response?.data?.data?.tipo_grafico)
            }
        }
   })
  }
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
        props.despuesCargar()
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

  const getComboCarreras = () =>{
    UtilService.getComboCarreras()
    .then(response=>{
        if(response.data.ok){
            setComboCarreras(response.data.data)
        }
    })
  }

  const obtenerDataPeriod=(data)=>{
    dispatch(loadingOn());
    const dataEnviar = form.getFieldsValue()
    UtilService.obtenerDataPeriodoTitulacion(dataEnviar)
    .then(response=>{
        setDataReferencia(response.data.data)
        setDataEstudiantesPeriodo(response.data.data.titulados_nivelacion)
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
  const data = dataEstudiantesPeriodo?.map((x)=>{
    return{
        codigo:x?.label,
        cantidad_estudiantes:x?.value,
    }
  })
  
  const tiposDeGraficos = [
    {
      id:1, 
      graphic:<Line 
              data={data}
              xField= 'codigo'
              yField= 'cantidad_estudiantes'
              point={{
                shapeField: 'square',
                sizeField: 4,}
              }
              interaction={{
                tooltip: {
                  marker: false,
                },}
              }
              style= {
              { lineWidth: 2}
              } 
            /> 
      },
      {
        id:2, 
        graphic:<Bar 
                data={data}
                xField= 'codigo'
                yField= 'cantidad_estudiantes'
                paddingRight= {80}
                style= {{
                  maxWidth: 25,
                }}
                markBackground= {{
                  label: {
                    text: ({ originData }) => {
                      console.log(originData)
                      return `${((originData?.cantidad_estudiantes/data[0]?.cantidad_estudiantes) * 100).toFixed(2)}% | ${originData?.cantidad_estudiantes}`;
                    },
                    position: 'right',
                    dx: 80,
                    
                  },
                }}
                scale= {{
                  y:{
                    domain: [0, data[0]?.cantidad_estudiantes],
                  },
                }}

                interaction={{
                  elementHighlightByColor: false,
                }}
              /> 
        },
        {
          id:3, 
          graphic:<Pie 
                  data={data}
                  colorField= 'codigo'
                  angleField= 'cantidad_estudiantes'
                  label= {{
                    text: 'codigo',
                    style: {
                      fontWeight: 'bold',
                    },
                  }}
                  legend= {{
                    color: {
                      title: false,
                      position: 'right',
                      rowPadding: 5,
                    },
                  }}
                /> 
          },
  ]

  const objetoConId3 = tiposDeGraficos.find(item => item.id === tipoGrafico);
  console.log(dataEstudiantesPeriodo)
  return (
    <div>
        <h2>Indicador Tasa de Titulación</h2>
        <Row>
        <Card style={{width:'100%'}}>
          <Form
              form={form}
              layout="vertical"
          >
        {!existeConfigCarrera && <Alert message="No existen datos de configuracion" description="Asigne los datos de configuracion para esta carrera antes de continuar" type="warning" showIcon/>}
            <Row justify={ 'space-around'}>
              <Col xs={24} sm={24} md={7} lg={7} xl={8}>
                <Form.Item
                    label="Carrera"
                    name="carrera"
                    >
                    <Select
                        placeholder="Seleccione una carrera"
                        options={comboCarreras}
                        onChange={(value)=>{
                          obtenerPeriodos(value)
                          }}
                          />
                </Form.Item>
              </Col>
                  
              <Col xs={24} sm={24} md={7} lg={7} xl={8}>
                <Form.Item
                    label="Periodo"
                    name="periodo"
                    >
                    <Select
                        placeholder="Seleccione un periodo"
                        options={comboPeriodo}
                        onChange={(value)=>{
                          obtenerDataPeriod(value)
                          }}
                          />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Row>
      {dataEstudiantesPeriodo.length > 0 && 
      <Card >
      <Row>
        <Col>
          <Card
            style={{ 
              width: 300, 
              borderRadius: '10px', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
              backgroundColor:'#0161DA',
            }}
            >
          <Typography.Title style={{color:'white'}}  level={3}>Total de estudiantes titulados</Typography.Title>
            <Row justify={'space-between'}>
              <Typography.Text style={{color:'white', fontSize: '3em', fontWeight: 'bold' }}>{dataReferencia.total_titulados.value} </Typography.Text>
              <Typography.Text style={{color:'white', fontSize: '3em', fontWeight: 'bold' }}><TeamOutlined /></Typography.Text>
            </Row>
          </Card>
        </Col>
        {dataEstudiantesPeriodo.map((x,y)=>(
        <Col key={y} >
          
          <Card
            style={{ 
              width: 300, 
              borderRadius: '10px', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
              backgroundColor:'white',
            }}
            >
          <Typography.Title style={{color:'#0161DA'}}  level={3}>{x.label}</Typography.Title>
            <Row justify={'space-between'} align={'middle'}>
              <Typography.Text style={{color:'#0161DA', fontSize: '2em', fontWeight: 'bold' }}>{x.value} </Typography.Text>
              <Typography.Text style={{color:'#0161DA', fontSize: '3em', fontWeight: 'bold' }}><TeamOutlined/></Typography.Text>
            </Row>
            <Row justify={'space-between'} align={'middle'}>
              <Typography.Text style={{color:'#0161DA', fontSize: '2em', fontWeight: 'bold' }}>{parseFloat(x.value/dataReferencia.total_titulados.value * 100).toFixed(2)}% </Typography.Text>
              <Typography.Text style={{color:'#0161DA', fontSize: '3em', fontWeight: 'bold' }}><DashboardOutlined /> </Typography.Text>
            </Row>
          </Card>
        </Col>
      ))}
      </Row>
    </Card>
    }
    </div>
  )
}

export default VisualizarDatosTT