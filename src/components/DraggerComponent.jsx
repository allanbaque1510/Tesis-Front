import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload,Button,Row,Col } from 'antd';
import { useDispatch,useSelector } from 'react-redux';

const DraggerComponent = (props) => {
  
  const { Dragger } = Upload;
  const [archivo, setArchivo] = useState({}) 
  const dispatch = useDispatch();
  
  const customRequest = ({ file, onSuccess }) =>{
    onSuccess('ok')
    message.success(`${file.name} cargado exitosamente.`);
  }
  
  const onRemove = ()=>{
    setArchivo({})
    props.onArchivoChange({});
  } 
  const handleFileChange = (info) => {
    if (info.file.status === 'removed') {
      return;
    }

    const nuevoArchivo = info.file.originFileObj;
    setArchivo(nuevoArchivo)
    props.onArchivoChange(nuevoArchivo);
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
  
  return (
    <>

        <Dragger {...propiedades}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargarlo</p>
        <p className="ant-upload-hint">
        Solo permite subir un solo archivo archivo de tipo excel 
        </p>
      </Dragger>
      <Row justify='end' style={{marginBlock:'20px'}}>
        <Button type='primary' disabled={!Object.keys(archivo).length > 0}  onClick={props.funcionEnviarDatos} >Registrar datos</Button>
      </Row>
    </>

  )
};
export default DraggerComponent;