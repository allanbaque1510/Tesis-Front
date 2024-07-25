import React, { Children, useEffect, useState } from 'react'
import {CloseOutlined,CloseSquareFilled ,CheckOutlined} from '@ant-design/icons';
import { Form, Select, Empty ,Card,Checkbox,Row,Col,Skeleton,Divider,Alert,Tag , Button, Badge ,Tree , Tooltip  } from 'antd'
import UtilService from '../../../api/Services/UtilService';
import { useDispatch } from 'react-redux';
import { activarModalResult, loadingOff, loadingOn } from '../../../redux/reducer';
import MessageAlert from '../../../components/MessageAlert';

const ClonarAsignacion = () => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    const [comboCarreras, setComboCarreras] = useState([])
    const [comboMaterias, setComboMaterias] = useState([])
    const [periodoReferencia, setPeriodoReferencia] = useState({})
    const [periodoNuevo, setPeriodoNuevo] = useState({})
    const [buscandoMaterias, setBuscandoMaterias] = useState(false)
    const [checkListValue, setCheckListValue] = useState([])
    const [logrosPeriodoCarrera, setLogrosPeriodoCarrera] = useState([])
    const [periodos, setPeriodos] = useState([])
    const [statusModalAlert, setStatusModalAlert] = useState(false)
    
    const indeterminate = checkListValue.length > 0 && checkListValue.length < comboMaterias.length;
    const checkAll = comboMaterias.length === checkListValue.length;


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
                title:"Error al obtener los periodos",
                message:error.response.data.error,
            }))
        })
    }
    const onChangePeriodoReferencia= (value, periodo) =>{
        setPeriodoReferencia(periodo)
        setBuscandoMaterias(true)
        const datos = form.getFieldsValue()
        UtilService.obtenerMateriasConLogros({periodos:datos.periodo_referencio,carrera:datos.carrera})
        .then(response=>{
            if(response.data.ok){
                setComboMaterias(response.data.data)
            }
        })
        .catch(error=>{
            console.log(error)
            dispatch(activarModalResult({
                success:false,
                title:"Error al obtener las materias",
                message:error.response.data.error,
            }))
        })
        .finally(()=>{ setBuscandoMaterias(false); obtenerLogrosPeriodo()})
    }

    const obtenerLogrosPeriodo = () =>{
        const datos = form.getFieldsValue()
        UtilService.obtenerLogrosPeriodo({periodos:datos.periodo_referencio,carrera:datos.carrera})
        .then(response=>{
            if(response.data.ok){
                console.log(response.data.data)
                setLogrosPeriodoCarrera(response.data.data)
            }
        })
        .catch(error=>{
            console.log(error)
            dispatch(activarModalResult({
                success:false,
                title:"Error al obtener los logros por periodo y carrera",
                message:error.response.data.error,
            }))
        })
    }

        
    const onChangeCheckList = (e) =>{
        setCheckListValue(e)
    }
    const onCheckAllChange = (e) => {
        setCheckListValue(e.target.checked ? comboMaterias.map((x) => x.value) : [])
    };
    useEffect(() => {
        obtenerComboCarreras()
    }, [])

    useEffect(() => {
        form.setFieldsValue({materias:checkListValue})
    }, 
    [checkListValue])

    const enviarDatos = () =>{
        dispatch(loadingOn());
        const datos = form.getFieldsValue();
        UtilService.clonarLogrosPorPeriodo(datos)
        .then(response=>{
            if(response.data.ok){
                dispatch(activarModalResult({
                    success:true,
                    title:"Datos clonados exitosamente!",
                }))
                setStatusModalAlert(false)
                form.resetFields()
                setCheckListValue([])
                setComboMaterias([])

            }
            console.log(response)
        })
        .catch(error=>{
            dispatch(activarModalResult({
                success:false,
                title:"Error al obtener las materias",
                message:error.response.data.error,
            }))
        })
        .finally(()=>dispatch(loadingOff()))
    }
    const listaPeriodoFiltrada = periodos.map((x,y)=>({...x,key:y, disabled:x.value === periodoReferencia.value}))
    

    const filtroLogrosPeriodoCarrera = logrosPeriodoCarrera?.filter(x => checkListValue.includes(x.id_materia)).map((z,y)=>{
        return {
            title:z.materia,
            key:`${y}-${z.id_materia}`,
            children:z.logros.map((a,b)=>({key:`${y}-${z.id_materia}-${b}`,title:<><Tag color='green'>{a.codigo_logro}</Tag> {a.logro}</>}))
        }
    })
    
    return (
    <div>
         <MessageAlert 
                status={statusModalAlert}
                cerrar={()=>setStatusModalAlert(false)}
                title="¿Esta seguro que desea continuar?"
                message={<>
                Se asignaran los logros de las materias seleccionadas del periodo <b>{periodoReferencia.label}</b> , en el siguiente periodo: <b>{periodoNuevo.label}</b>
                </>}
                funcion={()=>enviarDatos()}
            />

          <Alert  
                type='warning' 
                message= {<b>ATENCION!</b>} 
                description="Si las materias del periodo seleccionado tiene logros al momento de clonarla, estos se sustituiran por los logros de referencia asignado" 
                showIcon 
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
            <Row justify={'space-between'}>
                <Col xs={11} sm={11} md={11} lg={11} xl={11}>
                    <Form.Item
                        label="Periodo referencia"
                        name="periodo_referencio"
                    >
                        <Select 
                            placeholder="Seleccione un periodo..."
                            onChange={onChangePeriodoReferencia}
                            options={periodos}
                        />
                    </Form.Item>
                </Col>
                
                <Col xs={11} sm={11} md={11} lg={11} xl={11}>
                    <Form.Item
                        label="Periodo nuevo"
                        name="periodo"
                    >
                        <Select 
                            disabled={!Object.keys(periodoReferencia).length > 0}
                            placeholder="Seleccione un periodo..."
                            options={listaPeriodoFiltrada}
                            onChange={(x,y)=>setPeriodoNuevo(y)}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={'space-between'}>
                <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                    <Card title={<>Materias<Badge count={comboMaterias.length}/> </> }>
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
                                <Checkbox.Group style={{display:'flex', flexDirection:'column'}} onChange={onChangeCheckList}  options={comboMaterias}/>
                            </Form.Item>
                        </>
                            :<Empty />
                        }
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                    <Card title={<>Vista Previa<Badge count={checkListValue.length}/> </> } >
                        {
                        checkListValue.length  >  0 ? 
                            <>
                            <Tree 
                                showLine 
                                height={295}
                                defaultExpandAll
                                treeData={filtroLogrosPeriodoCarrera}/>
                            </>
                        :<Empty />
                        }
                    </Card>
                </Col>
            </Row>
            <Row justify='end'>
                <Col style={{marginBlock:'20px'}}>
                        <Button type='primary' disabled={! checkListValue.length  >  0 } onClick={()=>setStatusModalAlert(true)}> <CheckOutlined/> Clonar logros</Button>
                </Col>
            </Row>

        </Form>
    </div>
  )
}

export default ClonarAsignacion