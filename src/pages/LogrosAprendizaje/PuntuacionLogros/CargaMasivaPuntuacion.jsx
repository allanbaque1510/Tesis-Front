import React, { useEffect, useState } from 'react'
import {CloseOutlined,InboxOutlined  ,CheckOutlined} from '@ant-design/icons';
import { Form, Select, Empty,Radio ,Card,Checkbox,Row,Col,Skeleton,Divider,Alert, message, Button, Badge ,Modal, Upload,Tooltip  } from 'antd'
import { useDispatch } from 'react-redux';
import { activarModalResult, loadingOff, loadingOn } from '../../../redux/reducer';
import MessageAlert from '../../../components/MessageAlert';
import UtilService from '../../../api/Services/UtilService';
import ExcelService from '../../../api/Services/ExcelService';
import DraggerComponent from '../../../components/DraggerComponent';
import ModalAsignacionPuntos from './ModalAsignacionPuntos';

const CargaMasivaPuntuacion = () => {
    const [form] = Form.useForm()
    const { Dragger } = Upload;
    const dispatch = useDispatch()

    const [comboCarreras, setComboCarreras] = useState([])
    const [comboDocente, setComboDocente] = useState([])
    const [periodos, setPeriodos] = useState([])
    const [comboMaterias, setComboMaterias] = useState([])
    const [checkListValue, setCheckListValue] = useState([])
    const [comboGrupos, setComboGrupos] = useState([])
    
    const [archivo, setArchivo] = useState({}) 
    const [statusModalAsignacionPuntos, setStatusModalAsignacionPuntos] = useState(false) 
    

    useEffect(() => {
        form.setFieldsValue({materias:checkListValue})
    }, 
    [checkListValue])


    const obtenerComboCarreras= () =>{
        dispatch(loadingOn())
        UtilService.getComboCarreras()
        .then(response=>{
            if(response.data.ok){
                setComboCarreras(response.data.data)
            }
        })
        .catch(error=>{
            dispatch(activarModalResult({
                success:false,
                title:"Error al asignar los logros",
                message:error.response.data.error,
            }))
        })
        .finally(()=>dispatch(loadingOff()))
    }

    const obtenerDocentes = () =>{
        form.resetFields(['docente','grupo']);
        const data = form.getFieldsValue();
        UtilService.obtenerDocentesPeriodoCarrera(data)
        .then(response=>{
            if(response.data.ok){
                setComboDocente(response.data.data)
            }
        })
        .catch(error=>{
            dispatch(activarModalResult({
                success:false,
                title:"Error al obtener los docentes",
                message:error.response.data.error,
            }))
        })
    }

    const obtenerPeriodos = (data) =>{
        form.resetFields(['docente','grupo','materia','periodos']);

        UtilService.obtenerPeriodoNominaCarreraDocenteMateriaConEstudiantes(data)
        .then(response=>{
            if(response.data.ok){
                setPeriodos(response.data.data)
            }
        })
        .catch(error=>{
            dispatch(activarModalResult({
                success:false,
                title:"Error al obtener los periodos",
                message:error.response.data.error,
            }))
        })
    }

    const obtenerMaterias = () =>{
        form.resetFields(['docente','grupo','materia']);

        const datos = form.getFieldsValue()

        UtilService.obtenerMaterias(datos)
        .then(response=>{
            if(response.data.ok){
                setComboMaterias(response.data.data)
            }
        })
        .catch(error=>{
            dispatch(activarModalResult({
                success:false,
                title:"Error al obtener las materias",
                message:error.response.data.error,
            }))
        })
        .finally(()=>{ 
            // setBuscandoMaterias(false)
        })
    }
    const obtenerGrupos = () =>{
        form.resetFields(["grupo"]);
        const datos = form.getFieldsValue();
        UtilService.obtenerGruposDocenteMateria(datos)
        .then(response=>{
            setComboGrupos(response.data.data)
        })
        .catch(error=>{
            dispatch(activarModalResult({
                success:false,
                title:"Error al obtener los grupos",
                message:error.response.data.error,
            }))
        })
    }
    const customRequest = ({ file, onSuccess }) =>{
        onSuccess('ok')
        message.success(`${file.name} cargado exitosamente.`);
      }
    useEffect(() => {
        obtenerComboCarreras()
      }, [])
      const onRemove = ()=>{
        setArchivo({})
      } 
      const handleFileChange = (info) => {
        if (info.file.status === 'removed') {
          return;
        }
    
        const nuevoArchivo = info.file.originFileObj;
        setArchivo(nuevoArchivo)
      };
      const propiedades = {
        name: 'file',
        multiple: false,
        maxCount:1,
        onRemove,
        accept:".xls,.xlsx",
        onChange:handleFileChange,
        customRequest,
      };
      const subirAsignacionPuntosMasiva = () =>{
        dispatch(loadingOn())
        UtilService.subirAsignacionPuntosMasiva({file:archivo})
        .then(response=>{
            if(response.data.ok){
                form.resetFields()
                setArchivo({})
                setCheckListValue([])
                setComboMaterias([])
                dispatch(activarModalResult({
                    success:true,
                    title:"Puntuacion asignada correctamente",
                }))
            }
        })
        .catch(error=>{
            dispatch(activarModalResult({
                success:false,
                title:"Error al asignar puntuacion a los logros",
                message:error.response.data.error,
            }))
        })
        .finally(()=>dispatch(loadingOff()))
      }
      const obtenerLabels = () =>{
        const datos = form.getFieldsValue()
        const docente = datos.docente&&comboDocente.filter(x=>x.value === datos.docente)[0].label;
        const materia = datos.materia&&comboMaterias.filter(x=>x.value === datos.materia)[0].label;
        const periodo = datos.periodos&&periodos.filter(x=>x.value === datos.periodos)[0].label;
        const data ={docente,materia,periodo};
        return data;
      }
      

  return (
      <div>
        <ModalAsignacionPuntos status={statusModalAsignacionPuntos} datos={form.getFieldsValue()} datosLabel ={obtenerLabels()} close={()=>setStatusModalAsignacionPuntos(false)} />
        <h2>Puntuacion de los logros de aprendizaje</h2>
        <Card>
            <Alert style={{marginBlock:'10px'}} message="Aqui se descargara el formato de los estudiantes inscritos por materia y docentes(Opcional)" showIcon type='info'/>
        <Form
                form={form}
                layout='vertical'
                onFinish={()=>setStatusModalAsignacionPuntos(true)}
        >
            <Row justify={'space-between'}>
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
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
            </Col>

                <Col xs={24} sm={24} md={11} lg={11} xl={11}>
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
                </Col>
                <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                    <Form.Item
                        label="Materia"
                        name="materia"
                        >
                        <Select 
                            maxTagCount={'responsive'}
                            placeholder="Seleccione una materia..."
                            options={comboMaterias}
                            onChange={obtenerDocentes}
                            />
                    </Form.Item>
                </Col>                
                <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                    <Form.Item
                        label="Docente"
                        name="docente"
                        rules={[{required: true, message:'Debe seleccionar un docente'}]}
                        >
                        <Select 
                            maxTagCount={'responsive'}
                            placeholder="Seleccione un docente..."
                            onChange={obtenerGrupos}
                            options={comboDocente}
                            />
                    </Form.Item>
                    
                </Col>
                <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                    <Form.Item
                        label="Grupo"
                        name="grupo"
                        rules={[{required: true, message:'Debe seleccionar un grupo'}]}
                        >
                        <Select 
                            maxTagCount={'responsive'}
                            placeholder="Seleccione un grupo..."
                            options={comboGrupos}
                            />
                    </Form.Item>
                    
                </Col>          
            </Row>
            
            <Row justify={'end'} style={{marginBlock:'30px'}}>
                
            <Button htmlType='submit'  disabled={!comboDocente.length > 0} type='primary' >
                    Asignar puntuación
                </Button>

                <Button onClick={subirAsignacionPuntosMasiva} disabled={!Object.keys(archivo).length > 0} type='primary' >
                    Subir documento
                </Button>
            </Row>

            <Row >
         
                <Col style={{width:'100%'}}>
                    <Dragger {...propiedades}>
            <Alert  style={{marginBlock:'10px'}} message="Una vez llenado el formato, suba el archivo para ingresar los datos al sistema." showIcon type='warning'/>
                            <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                            
                            </p>

                            <p className="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargarlo</p>
                            <p className="ant-upload-hint">
                            Solo permite subir un solo archivo archivo de tipo excel 
                            </p>
                    </Dragger>
    
                </Col>
            </Row>

        </Form>
        </Card>
    </div>
  )
}

export default CargaMasivaPuntuacion