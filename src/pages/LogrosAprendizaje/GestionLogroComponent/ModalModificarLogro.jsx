import React, { useEffect } from 'react'
import { Form,Modal,Input,Button,Col,Row } from 'antd'
import { loadingOn,activarModalResult, loadingOff } from '../../../redux/reducer';
import { useDispatch } from 'react-redux';
import UtilService from '../../../api/Services/UtilService';

const ModalModificarLogro = (props) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm()

    useEffect(() => {
      if(Object.keys(props.data).length > 0 ){
        form.setFieldsValue({
            descripcion:props.data.descripcion
        })
      }
    }, [props.data])
    
  const AgregarLogro = () =>{
    dispatch(loadingOn());
    const data = form.getFieldsValue();
    UtilService.modificarLogroAprendizaje({id_logros:props.data.id_logros,descripcion:data.descripcion})
    .then(response=>{
        if(response.data.ok){
            props.setData(prev => prev.map(item =>item.id_logros === props.data.id_logros ? { ...item, descripcion:data.descripcion } : item));
            props.cerrar()
        }
    })
    .catch(error=>{
        dispatch(activarModalResult({
            success:false,
            title:"Error al agregar logro de aprendizaje",
            message:error.response.data.error,
          }))

    })
    .finally(()=>{dispatch(loadingOff())})
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
                    >
                        <Input/>
                    </Form.Item>
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

export default ModalModificarLogro