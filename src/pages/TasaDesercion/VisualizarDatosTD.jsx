import React, { useEffect, useState } from 'react'
import { Select,Form,Col,Row,Alert } from 'antd'
import { useDispatch } from 'react-redux';
import { loadingOn,activarModalResult, loadingOff } from "../../redux/reducer";
import { Line,Bar,Pie } from '@ant-design/plots';

import UtilService from '../../api/Services/UtilService'
const VisualizarDatosTD = () => {
    const [comboPeriodo, setComboPeriodo] = useState([])
    const [comboCarreras, setComboCarreras] = useState([])
    const [comboTipoGrafico, setComboTipoGrafico] = useState([])
    const [tipoGrafico, setTipoGrafico] = useState(0)
    const [existeConfigCarrera, setExisteConfigCarrera] = useState(true)
    

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
      console.log(response.data.data)
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
  
  return (
    <div>
        <h1>Indicador Tasa de Desercion</h1>
        <Form
            form={form}
            layout="vertical"
        >
        {!existeConfigCarrera && <Alert message="No existen datos de configuracion" description="Asigne los datos de configuracion para esta carrera antes de continuar" type="warning" showIcon/>}
          <Row>
            <Col>
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
                  
            <Col>
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

                  <Col>
    <Form.Item
            label="Tipo Grafico"
            name="tipo_grafico"
            >
            <Select
                placeholder="Seleccione un tipo de grafica"
                options={comboTipoGrafico}
                onChange={(value)=>{
                  setTipoGrafico(value)
                  }}
                  />
    </Form.Item>
                  </Col>
                  </Row>

    {tipoGrafico !== 0 && objetoConId3.graphic}
        </Form>
    </div>
  )
}

export default VisualizarDatosTD