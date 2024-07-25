import React, { useEffect, useState } from 'react'
import {CloseOutlined,CloseSquareFilled ,CheckOutlined} from '@ant-design/icons';
import { Form, Select, Empty,Radio ,Card,Checkbox,Row,Col,Skeleton,Divider,Alert, Button, Badge ,Modal, Tree,Tag  } from 'antd'
import UtilService from '../../../api/Services/UtilService';
import { useDispatch } from 'react-redux';
import { activarModalResult, loadingOff, loadingOn } from '../../../redux/reducer';
import MessageAlert from '../../../components/MessageAlert';
const AsignarLogrosMateria = () => {
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
    const [statusModalAlert, setStatusModalAlert] = useState(false)
    const [statusModalVistaPrevia, setStatusModalVistaPrevia] = useState(false)
    
    const [materiasLogros, setMateriasLogros] = useState({})

    const indeterminateLogro = materiasLogros[checkListValue] ? materiasLogros[checkListValue].length > 0 && materiasLogros[checkListValue].length < comboLogros.length:false;
    const checkAllLogros = materiasLogros[checkListValue]? comboLogros.length === materiasLogros[checkListValue].length:false;
    
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
        setBuscandoMaterias(true)
        setBuscandoLogros(true)
        const datos = form.getFieldsValue()
        form.resetFields(['materias','logros']); 
        setCheckListValue([])
        setCheckListLogros([])
        obtenerMateriasLogrosPeriodo()

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
    
    const guardarLogros = () =>{
        dispatch(loadingOn())
        const datosForm = form.getFieldValue()
        UtilService.asignarLogrosPorMateria({carrera:datosForm.carrera,periodo:datosForm.periodos,data:materiasLogros})
        .then(response=>{
            if(response.data.ok){
                dispatch(activarModalResult({
                    success:true,
                    title:"Asignación de logros por materia exitoso!",
                }))
            }
        })
        .catch(error=>{
            dispatch(activarModalResult({
                success:false,
                title:"Error al obtener logros",
                message:error.response.data.error,
            }))
        })
        .finally(()=>{dispatch(loadingOff()), setStatusModalAlert(false)})
    }
    const obtenerMateriasLogrosPeriodo = ( )=> {
        const datos = form.getFieldsValue();
        UtilService.obtenerMateriasLogrosPeriodo(datos)
        .then(response=>{
            setMateriasLogros(response.data.data)
        })
        .catch(error=>{
            dispatch(activarModalResult({
                success:false,
                title:"Error al obtener los logros asignados al periodo por materia",
                message:error.response.data.error,
            }))
        })

    }
    const onChangeCheckList = (e) =>{
        setCheckListValue(e.target.value)
        form.setFieldsValue({logros:materiasLogros[e.target.value]})
        setCheckListLogros(materiasLogros[e.target.value] ?materiasLogros[e.target.value]:[])
    }

    const onChangeCheckListLogro = (e) =>{
        setCheckListLogros(e)
    }


    const onCheckAllChangeLogro = (e) => {
        const logros = e.target.checked ? comboLogros.map((x) => x.value) : []
        setCheckListLogros(e.target.checked ? comboLogros.map((x) => x.value) : [])
        form.setFieldsValue({logros})


    };
    useEffect(() => {
      obtenerComboCarreras()
    }, [])
    useEffect(() => {
        const datos = form.getFieldsValue()
        if( datos.materias !== undefined && datos.logros !== undefined ){
            setMateriasLogros({...materiasLogros, [datos.materias]:checkListLogros})
        }
    }, [checkListLogros])
    
    const arrayIdMaterias = Object.keys(materiasLogros).map(key => parseInt(key, 10))
    const treeData = comboMaterias.filter(x=>arrayIdMaterias.includes(x.value)).map((a,b)=>{
        const arrayLogos = comboLogros.filter(x=>materiasLogros[a.value].includes(x.value)).map(z=>({title:z.label,key:z.value+"-"+a.value}))
        return{
            title:a.label,
            key:a.value,
            children:arrayLogos
        }
    })
    return (
        <div>
            <Modal title="Vista previa" open={statusModalVistaPrevia} onCancel={()=>setStatusModalVistaPrevia(false)} footer="">
                <Card >
                    <Tree 
                    showLine 
                    height={295}
                    treeData={treeData}
                    />
                </Card>
                <Row justify={'end'}>
                    <Button style={{marginTop:'20px'}} onClick={()=>setStatusModalVistaPrevia(false)}>Cerrar</Button>
                </Row>
            </Modal>
            <MessageAlert 
                status={statusModalAlert}
                cerrar={()=>setStatusModalAlert(false)}
                title="Atencion!"
                message={<>
                ¿Esta seguro que desea continuar?
                <Card>

                    <Tree 
                        showLine 
                        height={295}
                        treeData={treeData}
                    />
                </Card>
                </>}
                funcion={()=>guardarLogros()}
            />
    
            <Form
                form={form}
                layout='vertical'
            >
                <Form.Item
                    label="Carreras"
                    name="carrera"
                >
                    <Select 
                        placeholder="Seleccione una carrera..."
                        options={comboCarreras}
                        onChange={obtenerPeriodos}
                    />
                </Form.Item>
                <Form.Item
                        label="Periodos"
                        name="periodos"
                    >
                        <Select 
                            placeholder="Seleccione un periodo..."
                            options={periodos}
                            onChange={obtenerMaterias} 
                        />
                    </Form.Item>
                
                <Row justify={'space-between'}>
                <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                    <Card styles={{title:{overflow:'visible'}}} title={<Row justify={'space-between'}><span style={{marginTop:'5px'}}>Materias<Badge  offset={[2, -20]} count={comboMaterias.length}/></span> {Object.keys(materiasLogros).length > 0&& <Badge offset={[-1, 5]} count={Object.keys(materiasLogros).length} ><Button onClick={()=>setStatusModalVistaPrevia(true)}  type='primary'>Vista Previa</Button></Badge> } </Row> }>
                        {buscandoMaterias?
                            <>
                                <Skeleton active avatar/>
                                <Skeleton active avatar/>
                                <Skeleton active avatar/>
                            </>
                            :comboMaterias.length  >  0 ? 
                        <>
                            <Form.Item
                            style={{height:'200px', overflowY:'auto'}} 
                            name="materias"
                            >
                                <Radio.Group
                                        options={comboMaterias}
                                        onChange={onChangeCheckList}
                                        value={checkListValue}
                                        style={{display:'flex', flexDirection:'column',padding:'1px'}}
                                        optionType="button"
                                        buttonStyle="solid"
                                    />
                            </Form.Item>
                        </>
                            :<Empty />
                        }
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                    <Card styles={{title:{overflow:'visible'}}} title={<>Logros de aprendizaje<Badge offset={[2, -20]} count={checkListLogros.length}/> </> }>
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
                            style={{height:'130px', overflowY:'auto'}} 
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
                    <Button onClick={()=>setStatusModalAlert(true)} htmlType='submit'disabled={! Object.keys(materiasLogros).length > 0 } type='primary' style={{marginBlock:'15px'}}>
                    <CheckOutlined/>  Asignar logros
                    </Button>
                </Row>
            </Form>
        </div>
  )
}

export default AsignarLogrosMateria