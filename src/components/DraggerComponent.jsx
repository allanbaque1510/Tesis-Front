import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload,Button } from 'antd';
import ExcelService from '../api/Services/ExcelService';
import { useDispatch } from "react-redux";
import { loadingOn, loadingOff } from "../redux/reducer";

const DraggerComponent = () => {
  
  const { Dragger } = Upload;
  const [archivo, setArchivo] = useState({}) 
  const dispatch = useDispatch();

  const customRequest = ({ file, onSuccess }) =>{
    onSuccess('ok')
    message.success(`${file.name} cargado exitosamente.`);
  }
  const onRemove = ()=>{
    setArchivo({})
  } 
  const handleFileChange = (info) => {
    const archivo = info.file.originFileObj;
    setArchivo(archivo)
  };

  const props = {
    name: 'file',
    multiple: false,
    maxCount:1,
    onRemove,
    accept:".xls,.xlsx",
    onChange:handleFileChange,
    customRequest,
  };
  console.log(archivo)
  const registrarDatosExcel = async () =>{
  dispatch(loadingOn());
    await ExcelService.registrarDatosExcel({"file":archivo})
    .then((response)=>{
      console.log(response)
    })
    .catch(error=>{
      console.log(error)
    })
    .finally(()=>dispatch(loadingOff()))
  }

  
  return (
    <>

        <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargarlo</p>
        <p className="ant-upload-hint">
        Solo permite subir un solo archivo archivo de tipo excel 
        </p>
      </Dragger>
      <Button onClick={registrarDatosExcel} >Registrar datos</Button>
    </>

  )
};
export default DraggerComponent;