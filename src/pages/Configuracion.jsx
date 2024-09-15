import React, { useEffect, useState } from 'react'
import {InputNumber, Card, Select,Form,Col,Row,Tooltip,Alert,notification} from 'antd';
import UtilService from '../api/Services/UtilService';
import { useDispatch,useSelector } from 'react-redux';
import {CheckOutlined} from '@ant-design/icons';
import { loadingOn,activarModalResult, loadingOff } from "../redux/reducer";



import { FloatButton } from 'antd';
const Configuracion = () => {

    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const [comboCarreras, setComboCarreras] = useState([])
    const [configuracion, setConfiguracion] = useState([])
    const [showNotification, setShowNotification] = useState(false)
    const [carreraActual, setCarreraActual] = useState(null)
    const [listNotification, setListNotification] = useState([])
    const [messageConfig, setMessageConfig] = useState("")

    const getComboCarreras = () =>{
        UtilService.getComboCarreras()
        .then(response=>{
            if(response.data.ok){
                setComboCarreras(response.data.data)
            }
        })
    }

    const obtenerConfiguracion=(e)=>{
        dispatch(loadingOn());
        UtilService.getConfiguracion(e)
        .then(response=>{
            if(response.data.ok){
                if(response.data.data !== null){
                    setMessageConfig("")
                    form.setFieldsValue({
                        id_configuracion:response.data.data.id_configuracion,
                        cantidad_periodos:response.data.data.periodos_desercion,
                        cantidad_total_periodos:response.data.data.total_periodos,
                        cantidad_periodos_gracia:response.data.data.periodos_gracia,
                        
                        porcentaje_min_asistencia:response.data.data.prom_min_asistencia,
                        nota_prom_general:response.data.data.prom_min_notas,

                        puntuacion:response.data.data.puntuacion,
                    })
                    setConfiguracion(response.data)
                }else{
                    form.resetFields()
                    setMessageConfig("No existen datos de configuracion de la carrera seleccionada, ingrese los datos correspondientes para poder presentar informacion.")
                    form.setFieldsValue({carrera:e})
                }
            }else{
                dispatch(activarModalResult({
                    success:false,
                    title:"Error al obtener datos de configuración",
                  }))
            }
        })
        .catch(error=>{
            dispatch(activarModalResult({
                success:false,
                title:"Error al obtener datos de configuración",
                message:error.response.data.message,
              }))
        })
        .finally(()=>dispatch(loadingOff()))
    }
    useEffect(() => {
        getComboCarreras()
    }, [])
    
    const validateInputs = () =>{
        const datosAlerta = [];
        const data = form.getFieldsValue()
        if(data.cantidad_periodos === undefined || data.cantidad_periodos === null){
            datosAlerta.push({
                title:"Cantidad de periodos",
                message:'Este campo no puede estar vacio'
            });
        }
        if(data.cantidad_total_periodos === undefined || data.cantidad_total_periodos === null){
            datosAlerta.push({
                title:"Cantidad total de periodos",
                message:'Este campo no puede estar vacio'
            });
        }
        if(data.cantidad_periodos_gracia === undefined || data.cantidad_periodos_gracia === null){
            datosAlerta.push({
                title:"Cantidad de periodos de gracia",
                message:'Este campo no puede estar vacio'
            });
        }
        if(data.porcentaje_min_asistencia === undefined || data.porcentaje_min_asistencia === null){
            datosAlerta.push({
                title:"Porcentaje minimo de asistencia",
                message:'Este campo no puede estar vacio'
            });
        }
        if(data.nota_prom_general === undefined || data.nota_prom_general === null){
            datosAlerta.push({
                title:"Nota minima de promedio general",
                message:'Este campo no puede estar vacio'
            });
        }
        
        if(data.puntuacion === undefined || data.puntuacion === null){
            datosAlerta.push({
                title:"Puntuación total",
                message:'Este campo no puede estar vacio'
            });
        }
        
        setListNotification(datosAlerta)
        return datosAlerta.length > 0
    }
    const viewNotifications=()=>{
        listNotification.map((x,y)=>{
            api.error({
                message: x.title,
                description:x.message,
            });
        })
        setShowNotification(false)
    }
    useEffect(() => {
          if(showNotification){
              viewNotifications()
          }
    }, [showNotification])
    
    const saveConfiguration=()=>{
        dispatch(loadingOn())
        const datos = form.getFieldsValue()
        UtilService.saveConfiguration(datos)
        .then(response=>{
            dispatch(activarModalResult({
                success:true,
                title:"Configuración guardada exitosamente",
              }))
        })
        .catch(error=>{
            dispatch(activarModalResult({
                success:false,
                title:"Error al guardar los datos de configuración",
                message:error.response.data.message,
              }))
        })
        .finally(()=>dispatch(loadingOff()))
    }

    const enviarDatos=()=>{
        const evaluation = validateInputs();
        if(evaluation){
            setShowNotification(true)
        }else{
            saveConfiguration()
        }
    }
    

  return (
    <div>
         {contextHolder}
         {carreraActual !== null &&
          <FloatButton
          icon={<CheckOutlined />}
          type='primary'
          description={<> GUARDAR</>}
          shape="square"
          style={{ right: 24, width:'100px' }}
          onClick={enviarDatos}
          />
        }

        <h1>Configuracion de la aplicacion</h1>
        <Form
            form={form}
            layout='vertical'
        >
                <Row justify={'space-around'}>
            <Col  xs={{ flex: '100%'}} sm={{ flex: '100%' }} md={{ flex: '99%' }} lg={{flex: '97%'}}xl={{flex: '95%'}}>
            <Card>
                {messageConfig.length > 0 && 
                <Alert message="Alerta de configuracion" description={messageConfig} type="warning" showIcon/>
                }
                <Form.Item
                    label={<h3>Carreras</h3>}
                    name="carrera"
                    >
                    <Select
                        placeholder="Seleccione una carrera"
                        options={comboCarreras}
                        onChange={(e)=>{obtenerConfiguracion(e); setCarreraActual(e)}}
                        />
                </Form.Item>
                        </Card>
                        </Col>
                    <Col  xs={{ flex: '100%'}} sm={{ flex: '100%' }} md={{ flex: '99%' }} lg={{flex: '97%'}}xl={{flex: '95%'}}>
                    <Card>
                            <Col  xs={{ flex: '100%'}} sm={{ flex: '100%' }} md={{ flex: '49%' }} lg={{flex: '49%'}}xl={{flex: '49%'}}>
                                    <Card.Grid  style={{width:'100%'}} > 
                                        <Alert showIcon closable description={<>La cantidad de periodos de la tasa de desercion se usa para ver cuantos periodos se recorre apartir del primer semestre de los estudiantes. <br />  <b>Ejemplo:</b> Si la carrera tiene 10 periodos, y la tasa de desercion evalua hasta la mitad de la carrera, ingrese el numero 5.</>} />
                                        <h3>Tasa de deserción</h3>
                                        <Form.Item
                                            style={{display:'none'}}
                                            name="id_configuracion"
                                            >
                                            <InputNumber
                                                // style={{display:'none'}}
                                                />
                                        </Form.Item>

                                        <Form.Item
                                            label="Cantidad de periodos"
                                            name="cantidad_periodos"
                                            >
                                            <InputNumber
                                                style={{width:'100%'}}
                                                />
                                        </Form.Item>
                                    </Card.Grid>
                            </Col>
                            <Col  xs={{ flex: '100%'}} sm={{ flex: '100%' }} md={{ flex: '49%' }} lg={{flex: '49%'}}xl={{flex: '49%'}}>
                                    <Card.Grid style={{width:'100%'}}>
                                    <Alert showIcon closable description={<>La cantidad total de periodos se refiere a la cantidad de ciclos que tiene la carrera.<br /> Los periodos de gracia hacen referencia a la cantidad maxima de periodos contables despues de que pase los ciclos totales </>}/>

                                        <h3>Tasa de titulación</h3> 
                                        <Form.Item
                                                    label="Cantidad total de periodos"
                                                    name="cantidad_total_periodos"
                                                    >
                                                    <InputNumber
                                                        style={{width:'100%'}}
                                                        />
                                        </Form.Item>
                                        <Form.Item
                                                    label="Cantidad de periodos de gracia"
                                                    name="cantidad_periodos_gracia"
                                                    >
                                                    <InputNumber
                                                        style={{width:'100%'}}
                                                        />
                                        </Form.Item>
                                    </Card.Grid>
                            </Col>
                            <Col  xs={{ flex: '100%'}} sm={{ flex: '100%' }} md={{ flex: '49%' }} lg={{flex: '49%'}}xl={{flex: '49%'}}>
                                    <Card.Grid style={{width:'100%'}}>
                                    <Alert showIcon closable description={
                                        <>
                                        El porcentaje minimo de asistencia es evaluado sobre <b>100%</b>, es decir si el porcentaje minimo de asistencia es <b>70%</b> ingrese <b>70</b>.
                                        <br /> 
                                        La nota minima del promedio general es evaluada en relacion a la <b>Puntuacion total</b> si la puntuacion total es sobre <b>10</b> y la nota minima es <b>7</b> coloque el <b>7</b> </>}/>
                                        <h3>Tasa de reprobados</h3> 
                                        <Form.Item
                                            label="Porcentaje minimo de asistencia"
                                            name="porcentaje_min_asistencia"
                                        >
                                        <InputNumber
                                           style={{width:'100%'}}
                                        />
                                        </Form.Item>
                                        <Form.Item
                                            label="Nota minima de promedio general"
                                            name="nota_prom_general"
                                        >
                                        <InputNumber
                                            style={{width:'100%'}}
                                        />
                                        </Form.Item>
                                    </Card.Grid>
                            </Col>
                            <Col  xs={{ flex: '100%'}} sm={{ flex: '100%' }} md={{ flex: '49%' }} lg={{flex: '49%'}}xl={{flex: '49%'}}>
                                    <Card.Grid style={{width:'100%'}}>
                                        <Alert showIcon closable description={<>La puntuacion total se refiere al puntaje total sobre el que se calificaran los logros. <br /> <b>Ejemplo:</b>Si el puntaje final al sumar todos los logros es de 10, ingrese el numero 10.</>}/>
                                        <h3>Logros de aprendizaje</h3> 
                                        <Form.Item
                                                    label="Puntuación total"
                                                    name="puntuacion"
                                                    >
                                                    <InputNumber
                                                        style={{width:'100%'}}
                                                        />
                                        </Form.Item>
                                    </Card.Grid>
                            </Col>
                                
                    </Card>
                    </Col>
                </Row>
            </Form>
    </div>
  )
}

export default Configuracion