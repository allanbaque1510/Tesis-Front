import React, { useEffect, useState } from 'react'
import { Select,Form,Col,Row,Alert,Card,Statistic  } from 'antd'
import { useDispatch } from 'react-redux';
import { loadingOn,activarModalResult, loadingOff } from "../../redux/reducer";
import { Line,Bar,Pie,Area} from '@ant-design/plots';
import { Liquid } from '@ant-design/charts';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

import UtilService from '../../api/Services/UtilService'
const VisualizarDatosTD = () => {
    const [comboPeriodo, setComboPeriodo] = useState([])
    const [comboCarreras, setComboCarreras] = useState([])
    const [existeConfigCarrera, setExisteConfigCarrera] = useState(true)
    const [totalEstudiantes,setTotalEstudiantes]= useState(0)

    const [dataEstudiantesPeriodo, setDataEstudiantesPeriodo] = useState([])
  
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const obtenerPeriodos = (id_carrera)=>{
   UtilService.obtenerComboPeriodo({id_carrera})
   .then(response=>{
        if(response.data.ok){
            if(response.data.data.configuracion === null){
              setExisteConfigCarrera(false)
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
        message:error.response.data.message,
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
    UtilService.obtenerDataPeriodo(dataEnviar)
    .then(response=>{
        setTotalEstudiantes(response.data.total)
        const dataEstudiante = response.data.data.sort((a, b) => b.row - a.row);
        setDataEstudiantesPeriodo(dataEstudiante)
    }) 
    .catch(error=>{
        dispatch(activarModalResult({
          success:false,
          title:"Error al obtener datos",
          message:error.response.data.message,
        }))
      })
    .finally(()=>dispatch(loadingOff()))
  }
  useEffect(() => {
    getComboCarreras()
  }, [])
  const data = dataEstudiantesPeriodo.map((x)=>{
    return{
        codigo:x?.codigo,
        cantidad_estudiantes:x?.total_estudiantes,
    }
  })
  
  console.log(dataEstudiantesPeriodo)
  
  const tiposDeGraficos = [
    {
      id:1, 
      graphic:<Line 
              data={data}
              xField= 'codigo'
              yField= 'cantidad_estudiantes'
              // autoFit={true}
              width={450}
              height={350}
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
                width={450}
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
                  width={450}
                  height={350}
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

  // const objetoConId3 = tiposDeGraficos.find(item => item.id === tipoGrafico);
  
  return (
    <div>
        <h2>Indicador Tasa de Desercion</h2>
        <Row>
          <Card
            style={{width:'100%'}}
          >
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
        <Row justify={'space-around'}>
          {dataEstudiantesPeriodo.map((x,y)=>{
            return (
                  <Col key={y} xs={12} sm={12} md={12} lg={10} xl={4} >
                    <Card  title={x.codigo}  style={{borderRadius: 12, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', margin:'10px', textAlign:'center' }} headStyle={{ fontSize: '1.3em',color:'#BBB', textAlign: 'center' }}>
                          <Liquid
                            height={150}
                            percent={parseFloat(((x.total_estudiantes)/totalEstudiantes ).toFixed(4)) }
                          />
                        <Statistic
                          title={
                            dataEstudiantesPeriodo[y-1]?
                            dataEstudiantesPeriodo[y-1].total_estudiantes < x.total_estudiantes ?   
                            "Matriculados" 
                            :
                            "Desertados"
                            :"-"
                          }
                          value={dataEstudiantesPeriodo[y-1]?
                            dataEstudiantesPeriodo[y-1].total_estudiantes < x.total_estudiantes ?   
                              x.total_estudiantes - dataEstudiantesPeriodo[y-1].total_estudiantes
                              :
                              dataEstudiantesPeriodo[y-1].total_estudiantes - x.total_estudiantes 
                            :0}
                          valueStyle={{color:
                            dataEstudiantesPeriodo[y-1]?
                            dataEstudiantesPeriodo[y-1].total_estudiantes < x.total_estudiantes ?   
                            '#3f8600'
                            :
                            '#cf1322'
                            :""
                          }}
                          prefix={
                            dataEstudiantesPeriodo[y-1]?
                            dataEstudiantesPeriodo[y-1].total_estudiantes < x.total_estudiantes ?   
                            <ArrowUpOutlined />
                              :
                              <ArrowDownOutlined /> 
                            :""
                          }
                          suffix={
                            dataEstudiantesPeriodo[y-1]?
                            dataEstudiantesPeriodo[y-1].total_estudiantes < x.total_estudiantes ?   
                           "+"
                              :
                             "-" 
                            :""
                          }
                        />
                        <Statistic title="Tasa deserción" 
                        value={parseFloat(((totalEstudiantes - x.total_estudiantes)/totalEstudiantes * 100).toFixed(2))}  suffix="%"/>
                    </Card>
                  </Col>
              )})}
        </Row>
        <Row>
        </Row>

        <Row justify={'space-evenly'} >
            {tiposDeGraficos[2].graphic}
            {tiposDeGraficos[0].graphic}
        </Row>
      </Card>
    }
    </div>
  )
}

export default VisualizarDatosTD