import React, { useEffect, useState } from 'react'
import { Form,Modal,Input,Button,Col,Row,Select,Card,Badge,Empty,Skeleton,Checkbox,Divider } from 'antd'
import { loadingOn,activarModalResult, loadingOff } from '../../../redux/reducer';
import { useDispatch } from 'react-redux';
import UtilService from '../../../api/Services/UtilService';

const ModalAgregarLogro = (props) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm()
    const [buscandoMaterias, setBuscandoMaterias] = useState(false)
    const [checkListValue, setCheckListValue] = useState([])
    const [comboMaterias, setComboMaterias] = useState([])
    
    const [comboCarreras, setComboCarreras] = useState([])
    const [periodos, setPeriodos] = useState([])

    const indeterminate = checkListValue.length > 0 && checkListValue.length < comboMaterias.length;
    const checkAll = comboMaterias.length === checkListValue.length;
  const AgregarLogro = () =>{
    dispatch(loadingOn());
    const data = form.getFieldsValue();
    UtilService.saveLogroAprendizaje(data)
    .then(response=>{
        if(response.data.ok){
            
            props.setData()

            props.cerrar()
        }
    })
    .catch(error=>{
        console.log(error)
        dispatch(activarModalResult({
            success:false,
            title:"Error al agregar logro de aprendizaje",
            message:error.response.data.error,
          }))

    })
    .finally(()=>{dispatch(loadingOff())})
}
const obtenerMaterias = () =>{
    setBuscandoMaterias(true)
    const datos = form.getFieldsValue()

    UtilService.obtenerMaterias(datos)
    .then(response=>{
        if(response.data.ok){
            setComboMaterias(response.data.data)
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
const onChangeCheckList = (e) =>{
    setCheckListValue(e)
}
const onCheckAllChange = (e) => {
    setCheckListValue(e.target.checked ? comboMaterias.map((x) => x.value) : [])
};

console.log(checkListValue)
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
        console.log(error)
        dispatch(activarModalResult({
            success:false,
            title:"Error al asignar los logros",
            message:error.response.data.error,
        }))
    })
    .finally(()=>dispatch(loadingOff()))
}
useEffect(() => {
    obtenerComboCarreras()
  }, [])
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

    return (
    <Modal footer="" title={props.title} open={props.status} onCancel={props.cerrar}>
        <Form
            form={form}
            layout='vertical'
            onFinish={AgregarLogro}
            >
            <Row>
                <Col
                    style={{width:'100%'}}
                >
                    <Form.Item
                        label="Descripcion del logro"
                        name="descripcion"
                        rules={[{ required: true,message:"Por favor ingrese una descripcion" }]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col
                    style={{width:'100%'}}
                >
                    <Form.Item
                        label="Carreras"
                        name="carrera"
                        rules={[{ required: true,message:"Seleccione una carrera" }]}

                        >
                        <Select 
                            placeholder="Seleccione una carrera..."
                            options={comboCarreras}
                            onChange={obtenerPeriodos}
                            />
                    </Form.Item>
                </Col>
                <Col
                    style={{width:'100%'}}
                >
                      <Form.Item
                        label="Periodos"
                        name="periodos"
                        rules={[{ required: true,message:"Seleccione un periodo" }]}

                    >
                        <Select 
                            placeholder="Seleccione un periodo..."
                            options={periodos}
                            onChange={obtenerMaterias} 
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col style={{width:'100%'}}>
                <Card styles={{title:{overflow:'visible'}}}  title={<Row justify={'space-between'}><Badge offset={[15,0]} count={comboMaterias.length}><span>Materias</span></Badge> {checkListValue.length> 0&& <Badge count={checkListValue.length}>Seleccionados</Badge>} </Row> }>
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
                            rules={[{ required: true,message:"Seleccione las materias" }]}
                            >
                                <Checkbox.Group style={{display:'flex', flexDirection:'column'}} onChange={onChangeCheckList} value={checkListValue}  options={comboMaterias}/>
                            </Form.Item>
                        </>
                            :<Empty />
                        }
                    </Card>
                    </Col>
            </Row>

            <Row justify={'end'}>
                <Col>
                    <Button type='primary' style={{marginInline:'10px'}} htmlType="submit" >Guardar</Button>
                    <Button  onClick={props.cerrar} >Cerrar</Button>
                </Col>
            </Row>
        </Form>
    </Modal>
  )
}

export default ModalAgregarLogro