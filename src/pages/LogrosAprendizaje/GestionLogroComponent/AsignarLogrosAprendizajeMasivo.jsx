import React, { useEffect, useState } from 'react'
import {CloseOutlined,CloseSquareFilled ,CheckOutlined} from '@ant-design/icons';
import { Form, Select, Empty ,Card,Checkbox,Row,Col,Skeleton,Divider,Alert, Button, Badge ,Tag,Table, Tooltip  } from 'antd'
import UtilService from '../../../api/Services/UtilService';
import { useDispatch } from 'react-redux';
import { activarModalResult, loadingOff, loadingOn } from '../../../redux/reducer';
import MessageAlert from '../../../components/MessageAlert';
const AsignarLogrosAprendizajeMasivo = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const [comboCarreras, setComboCarreras] = useState([])
    const [comboMaterias, setComboMaterias] = useState([])
    const [comboLogros, setComboLogros] = useState([])
    const [periodos, setPeriodos] = useState([])
    const [buscandoMaterias, setBuscandoMaterias] = useState(false)
    const [buscandoLogros, setBuscandoLogros] = useState(false)
    const [checkListValue, setCheckListValue] = useState([])
    const [checkListLogros, setCheckListLogros] = useState([])
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState({})
    const [statusModalAlert, setStatusModalAlert] = useState(false)
    
    
    useEffect(() => {
        form.setFieldsValue({materias:checkListValue,logros:checkListLogros})
    }, 
    [checkListValue,checkListLogros])
    
    const indeterminate = checkListValue.length > 0 && checkListValue.length < comboMaterias.length;
    const checkAll = comboMaterias.length === checkListValue.length;

    const indeterminateLogro = checkListLogros.length > 0 && checkListLogros.length < comboLogros.length;
    const checkAllLogros = comboLogros.length === checkListLogros.length;

    const obtenerComboCarreras= () =>{
        dispatch(loadingOn())
        UtilService.getComboCarreras()
        .then(response=>{
            if(response.data.ok){
                setComboCarreras(response.data.data)
            }
        })
        .catch(error=>{
            console.log(error)
            dispatch(activarModalResult({
                success:false,
                title:"Error al asignar los logros",
                message:error.response.data.error,
            }))
        })
        .finally(()=>dispatch(loadingOff()))
    }
    
    const obtenerMaterias = (data,periodo) =>{
        setPeriodoSeleccionado(periodo)
        setBuscandoMaterias(true)
        setBuscandoLogros(true)
        const datos = form.getFieldsValue()
        UtilService.obtenerMaterias(datos)
        .then(response=>{
            if(response.data.ok){
                setComboMaterias(response.data.data)
                obtenerLogros()
            }
        })
        .catch(error=>{
            console.log(error)
            dispatch(activarModalResult({
                success:false,
                title:"Error al obtetner las materias",
                message:error.response.data.error,
            }))
        })
        .finally(()=>{ setBuscandoMaterias(false)})
    }

    const obtenerPeriodos = (data) =>{
        UtilService.obtenerPeriodoNominaCarreraDocenteMateria(data)
        .then(response=>{
            if(response.data.ok){
                setPeriodos(response.data.data)
            }
        })
        .catch(error=>{
            console.log(error)
            dispatch(activarModalResult({
                success:false,
                title:"Error al obtetner los periodos",
                message:error.response.data.error,
            }))
        })
    }

    const obtenerLogros = () =>{
        setBuscandoLogros(true)
        UtilService.obtenerLogrosAprendizaje()
        .then(response=>{
            console.log(response)
            // setComboLogros(response.data.data.map((x,y)=>({value:x.id_logros , label:x.descripcion})))
            setComboLogros(response.data.data.map((x,y)=>({value:x.id_logros , label:<><Tag color='green'>{x.codigo}</Tag>{x.descripcion}</>})))

        })
        .catch(error=>{
            dispatch(activarModalResult({
                success:false,
                title:"Error al obtener logros",
                message:error.response.data.error,
            }))
        })
        .finally(()=>setBuscandoLogros(false))

    }
    
    const onChangeCheckList = (e) =>{
        setCheckListValue(e)
    }
    const onCheckAllChange = (e) => {
        setCheckListValue(e.target.checked ? comboMaterias.map((x) => x.value) : [])
    };
    const onChangeCheckListLogro = (e) =>{
        setCheckListLogros(e)
    }


    const onCheckAllChangeLogro = (e) => {
        setCheckListLogros(e.target.checked ? comboLogros.map((x) => x.value) : [])
    };

    const enviarDatos = () =>{
        dispatch(loadingOn())
        const datos = form.getFieldsValue()
        UtilService.asignarLogrosAprendizajeMasivo(datos)
        .then(response=>{
            if(response.data.ok){
                dispatch(activarModalResult({
                    success:true,
                    title:"Asignacion de logros masivo exitoso!",
                }))
                setStatusModalAlert(false)
                setCheckListValue([])
                setCheckListLogros([])
                form.resetFields()
            }
        })
        .catch(error=>{
            dispatch(activarModalResult({
                success:false,
                title:"Error al asignar logros masivamente",
                message:error.response.data.error,
            }))
        })
        .finally(()=>dispatch(loadingOff()))
    }
    useEffect(() => {
      obtenerComboCarreras()
    }, [])
    const dataSource = comboMaterias.filter(x=>checkListValue.includes(x.value))
    .map((x,y) => ({ ...x,key:y, accion:<Tooltip title="Quitar de la lista"><CloseSquareFilled onClick={()=>setCheckListValue(checkListValue.filter(z=>z !==x.value ))}  style={{color:'#FC7F80', fontSize:'20px'}} /></Tooltip> }))
    return (
        <div>
            <MessageAlert 
                status={statusModalAlert}
                cerrar={()=>setStatusModalAlert(false)}
                title="Atencion!"
                message={<>
                Esta seguro que desea continuar, se remplazaran los logros de las siguientes materias, en el siguiente periodo:
                <Table dataSource={dataSource} columns={[{dataIndex:"label", title:periodoSeleccionado.label},{dataIndex:"accion", title:"", width:50}]} pagination={false} scroll={{y: 240}}/>
                </>}
                funcion={()=>enviarDatos()}
            />
            <Alert  
                type='warning' 
                message= {<b>ATENCION!</b>} 
                description="Se sustituiran los logros de aprendizaje de las materias seleccionadas, en el periodo seleccionado" 
                showIcon 
            />
    
            <Form
                form={form}
                layout='vertical'
                // onFinish={enviarDatos}
            >
                <Form.Item
                    label="Carreras"
                    name="carrera"
                >
                    <Select 
                        placeholder="Seleccione una carrera..."
                        options={comboCarreras}
                        onChange={obtenerPeriodos}
                        // onChange={obtenerMaterias} 
                    />
                </Form.Item>
                
                <Form.Item
                    label="Periodos"
                    name="periodos"
                >
                    <Select 
                        placeholder="Seleccione un periodo..."
                        options={periodos}
                        // onChange={obtenerPeriodos}
                        onChange={obtenerMaterias} 
                    />
                </Form.Item>
                
                <Row justify={'space-between'}>
                <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                    <Card title={<Row justify={'space-between'}><span>Materias<Badge count={comboMaterias.length}/></span> {checkListValue.length> 0&& <span>Seleccionados<Badge count={checkListValue.length}/></span>} </Row> }>
                        {buscandoMaterias?
                            <>
                                <Skeleton active avatar/>
                                <Skeleton active avatar/>
                                <Skeleton active avatar/>
                            </>
                            :comboMaterias.length  >  0 ? 
                        <>
                            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>Seleccionar todos</Checkbox>
                            <Divider/>
                            <Form.Item
                            style={{height:'200px', overflowY:'auto'}} 
                            name="materias"
                            >
                                <Checkbox.Group style={{display:'flex', flexDirection:'column'}} onChange={onChangeCheckList} value={checkListValue}  options={comboMaterias}/>
                            </Form.Item>
                        </>
                            :<Empty />
                        }
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                    <Card title={<>Logros de aprendizaje<Badge count={checkListLogros.length}/> </> }>
                        {buscandoLogros?
                            <>
                                <Skeleton active avatar/>
                                <Skeleton active avatar/>
                                <Skeleton active avatar/>
                            </>
                            :comboLogros.length > 0 ? 
                            
                        <>
                            <Checkbox indeterminate={indeterminateLogro} onChange={onCheckAllChangeLogro} checked={checkAllLogros}>Seleccionar todos</Checkbox>
                            <Divider/>
                            <Form.Item
                            style={{height:'200px', overflowY:'auto'}} 
                            name="logros"
                            >
                                <Checkbox.Group style={{display:'flex', flexDirection:'column'}} onChange={onChangeCheckListLogro} options={comboLogros}/>
                            </Form.Item>
                        </>
                                :<Empty />
                            }
                    </Card>
                </Col>
                </Row>
                <Row justify={'end'}>
                    <Button onClick={()=>setStatusModalAlert(true)} htmlType='submit'disabled={! (checkListValue.length > 0 && checkListLogros.length > 0)} type='primary' style={{marginBlock:'15px'}}>
                    <CheckOutlined/>  Asignar logros
                    </Button>
                </Row>
            </Form>
        </div>
  )
}

export default AsignarLogrosAprendizajeMasivo