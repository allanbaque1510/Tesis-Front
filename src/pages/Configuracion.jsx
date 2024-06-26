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
            console.log(response.data)
            if(response.data.ok){
                if(response.data.data !== null){
                    setMessageConfig("")
                    console.log()
                    form.setFieldsValue({
                        id_configuracion:response.data.data.id_configuracion,
                        cantidad_periodos:response.data.data.periodos_desercion,
                        cantidad_total_periodos:response.data.data.total_periodos,
                        cantidad_periodos_gracia:response.data.data.periodos_gracia,
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
            console.log(response.data)
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
                        <Tooltip title={<span>La cantidad de periodos de la tasa de desercion se usa para ver cuantos periodos se recorre apartir del primer semestre de los estudiantes. <br /> Ej: Si la carrera tiene 10 periodos, y la tasa de desercion evalua la mitad de carrera, ingrese el numero 5.</span>}> 
                            <Col  xs={{ flex: '100%'}} sm={{ flex: '100%' }} md={{ flex: '49%' }} lg={{flex: '49%'}}xl={{flex: '49%'}}>
                                    <Card.Grid  style={{width:'100%'}} > 
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
                        </Tooltip>
                            <Col  xs={{ flex: '100%'}} sm={{ flex: '100%' }} md={{ flex: '49%' }} lg={{flex: '49%'}}xl={{flex: '49%'}}>
                                    <Card.Grid style={{width:'100%'}}>
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
                                
                    </Card>
                    </Col>
                </Row>
            </Form>
    </div>
  )
}

export default Configuracion