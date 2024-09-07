import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { activarModalResult, loadingOff, loadingOn } from '../../../redux/reducer';
import { Modal,Row,Col,Form,Select,InputNumber,Input,Button,Typography ,Tag  } from 'antd'

import {PlusOutlined,MinusCircleOutlined} from '@ant-design/icons';
import UtilService from '../../../api/Services/UtilService'
import ExcelService from '../../../api/Services/ExcelService';
const ModalAsignacionPuntos = (props) => {
    const dispatch = useDispatch();
    const [logrosAprendizaje, setLogrosAprendizaje] = useState([])
    const [configuracion, setConfiguracion] = useState([])
    const [parametrizacion, setParametrizacion] = useState({contador:null,sumatoria:null})
    const [form] = Form.useForm()
    useEffect(() => {
        if(props.status){
            obtenerLogrosAprendizaje()
        }
    }, [props.status])
    const obtenerLogrosAprendizaje = ()=>{
        dispatch(loadingOn())
        UtilService.obtenerLogrosAprendizajeDocente(props.datos)
        .then(response=>{
            setLogrosAprendizaje(response.data.data)
            setConfiguracion(response.data.configuracion)
        })
        .catch(error=>{
            dispatch(activarModalResult({
                success:false,
                title:"Error al obtener los periodos",
                message:error.response.data.error,
            }))
        })
        .finally(()=>dispatch(loadingOff()))
    }
    const cerrarModal = () =>{
        props.close(); 
        form.setFieldsValue({puntuacion:[]})
        setParametrizacion({contador:null,sumatoria:null})
    }
    const onValuesChange = (changedValues, allValues) => {
        setParametrizacion({contador:allValues?.puntuacion?.length, sumatoria:allValues?.puntuacion?.filter(x=>x?.puntuacion !== undefined).reduce((sum,item)=>sum + item.puntuacion,0)})
    };
    const enviarDatos = (datos) =>{
        dispatch(loadingOn())
    ExcelService.descargarFormatoPuntuacion({...datos, datos:props.datos})
    .then(async(response)=>{
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `LOGROS_APRENDIZAJE_${props.datosLabel.periodo}_${props.datosLabel.materia}_${props.datosLabel.docente}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    })
    .catch(error=>{
        dispatch(activarModalResult({
            success:false,
            title:"Error al obtener los periodos",
            message:error.response.data.error,
        }))
    })
    .finally(()=>dispatch(loadingOff()))
}
const  agregarIndice = () =>{
    const datos = form.getFieldsValue().puntuacion.map((x,y)=>({...x,pregunta:y+1}))
    form.setFieldsValue({puntuacion:datos})
}

  return (
    <Modal open={props.status} title="Asignacion de puntos" style={{userSelect:'none'}} onCancel={cerrarModal} footer={false} >
        {parametrizacion.contador > 0 && parametrizacion.contador !== null && 
            <>
            <Tag
                color={configuracion.puntuacion < parametrizacion.sumatoria?"red":configuracion.puntuacion > parametrizacion.sumatoria?"gold":"green" }
                >Puntuacion total: {parametrizacion.sumatoria}</Tag>
            {configuracion.puntuacion < parametrizacion.sumatoria?
            <Typography.Text type='danger'>Te pasaste!</Typography.Text> 
            :configuracion.puntuacion > parametrizacion.sumatoria?
            <Typography.Text type='warning'>Faltan puntos</Typography.Text> 
            :
            <Typography.Text type='success'>Excelente!</Typography.Text> 
            }
            </>
            
        }
        <Form
            form={form}
            onValuesChange={onValuesChange}
            onFinish={enviarDatos}
        >
        <Form.List name="puntuacion">
      {(fields, { add, remove }) => (
          <>
          <table  style={{width:'100%', marginBlock:'20px'}}>
              <thead >
                <tr style={{backgroundColor:'#e6f4ff'}}>
                    <th style={{border:'1px dotted #91caff'}}>N° Pregunta</th>
                    <th style={{border:'1px dotted #91caff'}} >Logro de aprendizaje</th>
                    <th colSpan={2} style={{border:'1px dotted #91caff'}} >Puntuacion</th>
                    
                </tr>
              </thead>
              <tbody>
          {fields.map(({ key, name, ...restField }) => (
            <tr>
            {/* <Space key={key} style={{display: 'flex',marginBottom: 8,}} align="baseline" > */}
                <td>
                <Form.Item
                    {...restField}
                    name={[name, 'pregunta']}
                >
                    <InputNumber  readOnly={true}/>
                </Form.Item>
                </td>
                <td>
                <Form.Item
                    {...restField}
                    
                    name={[name, 'logro']}
                    // rules={[{required: true,message: 'Seleccione un logro',},]}
                >
                    <Select style={{width:'100%'}}  placeholder="Seleccione un logro..." options={logrosAprendizaje} />
                </Form.Item>
                </td>
                <td>
                <Form.Item
                    {...restField}
                    name={[name, 'puntuacion']}
                    // rules={[{required: true,message: 'Requerido',},]}
                >
                    <InputNumber style={{width:'100%'}} placeholder="Ingrese un puntaje" />
                </Form.Item>
                </td>
                <td style={{width:'40px', height:'30px' ,display:'flex', justifyContent:'center', alignContent:'center'}}>
              <MinusCircleOutlined  onClick={() => remove(name)} />
              </td>
            {/* </Space> */}
            </tr>
          ))}
          </tbody>

          </table>
          <Form.Item
        
          >
            <Button type="dashed" onClick={() =>{add(); agregarIndice()}} block icon={<PlusOutlined />}>
              Agregar campo
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
    <Row justify={'end'}>

      <Button type="primary" disabled={configuracion.puntuacion !== parametrizacion.sumatoria} style={{marginInline:'10px'}} htmlType="submit">
        Descargar formato
      </Button>
        <Button onClick={cerrarModal}>
            Cerrar
        </Button>
    </Row>
        </Form>
    </Modal>
  )
}

export default ModalAsignacionPuntos